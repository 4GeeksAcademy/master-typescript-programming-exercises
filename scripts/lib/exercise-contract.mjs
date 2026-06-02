import fs from "fs";
import path from "path";
import ts from "typescript";

const EXERCISES_DIR = path.resolve("exercises");

export function listExercises() {
  return fs
    .readdirSync(EXERCISES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "00-Welcome")
    .map((d) => d.name)
    .sort();
}

export function exerciseDir(slug) {
  return path.join(EXERCISES_DIR, slug);
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function parseFunctionsFromSource(source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    fileName.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.JS
  );

  const functions = [];
  const interfaces = [];

  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const params = node.parameters.map((p) => ({
        name: p.name.getText(sourceFile),
        type: p.type ? p.type.getText(sourceFile) : null,
      }));
      const returnType = node.type ? node.type.getText(sourceFile) : null;
      functions.push({
        name: node.name.getText(sourceFile),
        params,
        returnType,
        body: node.body ? node.body.getText(sourceFile) : null,
      });
    }

    if (ts.isInterfaceDeclaration(node)) {
      interfaces.push(node.getText(sourceFile));
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return { functions, interfaces };
}

export function parseSolution(slug) {
  const filePath = path.join(exerciseDir(slug), "solution.hide.js");
  const source = readIfExists(filePath);
  if (!source) return { functions: [], interfaces: [], source: null, inferred: {} };
  const parsed = parseFunctionsFromSource(source, "solution.hide.js");
  const inferred = inferAllSolutionTypes(source);
  return { ...parsed, source, inferred };
}

export function parseAppTs(slug) {
  const filePath = path.join(exerciseDir(slug), "app.ts");
  const source = readIfExists(filePath);
  if (!source) return { functions: [], interfaces: [], raw: null };
  const parsed = parseFunctionsFromSource(source, "app.ts");
  return { ...parsed, raw: source };
}

function extractFunctionNameFromReadme(text) {
  const patterns = [
    /(?:called|named|Implement)\s+`(\w+)`/i,
    /function\s+`(\w+)`/i,
    /`(\w+)`\s+(?:takes|returns|receives|accepts)/i,
    /The function\s+`(\w+)`/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isValidFunctionName(name) {
  return /^[A-Za-z_$][\w$]*$/.test(name);
}

function extractAllFunctionNamesFromReadme(text) {
  const names = new Set();
  const primary = extractFunctionNameFromReadme(text);
  if (primary && isValidFunctionName(primary)) names.add(primary);

  for (const match of text.matchAll(/`(\w+)`\s+(?:takes|returns|receives|accepts|sets|removes|adds)/gi)) {
    if (isValidFunctionName(match[1])) names.add(match[1]);
  }
  for (const match of text.matchAll(/(?:called|named)\s+`(\w+)`/gi)) {
    if (isValidFunctionName(match[1])) names.add(match[1]);
  }

  return [...names];
}

function extractReturnHintFromReadme(text) {
  const lower = text.toLowerCase();
  if (/\bvoid\b|\bprocedure\b/.test(lower)) return "void";
  if (/returns\s+(?:true|false|whether)|return\s+`true`|return\s+`false`|\bboolean\b/.test(lower)) {
    return "boolean";
  }
  if (/array of strings|array containing only.*string|only the elements of the given array whose length/i.test(lower)) {
    return "string[]";
  }
  if (/returns\s+an\s+array|return\s+an\s+empty\s+array/.test(lower)) return "unknown[]";
  if (/returns\s+an\s+object|return\s+an\s+empty\s+object/.test(lower)) return "Record<string, unknown>";
  if (/returns the length|returns.*length of|returns a number|return type.*number/i.test(lower)) {
    return "number";
  }
  if (/returns\s+a(?:\s+single)?\s+string|return\s+a\s+string/.test(lower)) return "string";
  if (/returns\s+a\s+number|return\s+a\s+number/.test(lower)) return "number";
  return null;
}

function extractReadmeFlags(text) {
  const lower = text.toLowerCase();
  return {
    wantsInterface: /\binterface\b/.test(lower),
    wantsOptional: /optional\s+propert/.test(lower),
    wantsVoid: /\bvoid\b|\bprocedure\b/.test(lower),
  };
}

function countCallArgs(argsText) {
  if (!argsText.trim()) return 0;
  let depth = 0;
  let count = 1;
  for (const ch of argsText) {
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") depth--;
    else if (ch === "," && depth === 0) count++;
  }
  return count;
}

function extractCallExamples(text, functionNames) {
  const examples = [];
  const codeBlocks = text.match(/```[\s\S]*?```/g) || [];

  for (const block of codeBlocks) {
    const lines = block.replace(/```\w*\n?/g, "").split("\n");
    for (const line of lines) {
      for (const fnName of functionNames) {
        const callPattern = new RegExp(`\\b${fnName}\\s*\\(([^)]*)\\)`, "g");
        let match;
        while ((match = callPattern.exec(line)) !== null) {
          const argsText = match[1];
          const argCount = countCallArgs(argsText);
          const trimmed = argsText.trim();
          const singleComplexLiteral =
            argCount === 1 && (trimmed.startsWith("[") || trimmed.startsWith("{"));

          examples.push({
            fnName,
            argCount,
            argsText,
            singleComplexLiteral,
            line: line.trim(),
          });
        }
      }
    }
  }

  return examples;
}

function splitTopLevelArgs(argsText) {
  const parts = [];
  let current = "";
  let depth = 0;
  for (const ch of argsText) {
    if (ch === "(" || ch === "[" || ch === "{") depth++;
    else if (ch === ")" || ch === "]" || ch === "}") depth--;
    else if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function isNumericLiteralText(text) {
  return /^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(text.trim());
}

function inferArrayLiteralType(literalText) {
  const trimmed = literalText.trim();
  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) return null;
  const inner = trimmed.slice(1, -1).trim();
  if (!inner) return null;
  const parts = splitTopLevelArgs(inner);
  if (!parts.length) return null;
  const kinds = parts.map((part) => {
    const value = part.trim();
    if (/^['"`]/.test(value)) return "string";
    if (isNumericLiteralText(value)) return "number";
    if (/^\{/.test(value)) return "object";
    return "unknown";
  });
  if (kinds.every((k) => k === "string")) return "string[]";
  if (kinds.every((k) => k === "number")) return "number[]";
  return "unknown[]";
}

function isStringCollectionContext(name, fnName = "") {
  if (/^words?$|^strings$|^letters$/i.test(name)) return true;
  if (/Word|Letter|String|Name/i.test(fnName) && /^(arr|array|words|list|input|items)$/i.test(name)) {
    return true;
  }
  return false;
}

function isNumericCollectionContext(name, fnName = "") {
  if (/^(nums|numbers|values|scores|digits)$/i.test(name)) return true;
  if (/^(arr|array)$/i.test(name) && /sum|average|product|compute|multiply|between|factorial|digit|modulo|largest|smallest|element|matrix|search|binary|pair|rotate|outlier|squareElements|filterEven|filterOdd/i.test(fnName)) {
    return true;
  }
  return false;
}

function inferParamTypeFromName(name, fnName = "") {
  const map = {
    age: "number",
    n: "number",
    num: "number",
    index: "number",
    level: "number",
    score: "number",
    principal: "number",
    timeInYears: "number",
    compoundingFrequency: "number",
    interestRate: "number",
    width: "number",
    height: "number",
    radius: "number",
    base: "number",
    exponent: "number",
    key: "string",
    name: "string",
    firstName: "string",
    lastName: "string",
    str: "string",
    str1: "string",
    str2: "string",
    string1: "string",
    string2: "string",
    word: "string",
    word1: "string",
    word2: "string",
    word3: "string",
    sentence: "string",
    string: "string",
    obj: "Record<string, unknown>",
    obj1: "Record<string, unknown>",
    obj2: "Record<string, unknown>",
    profile: "Record<string, unknown>",
    book: "Record<string, unknown>",
    input: "unknown",
    words: "string[]",
    strings: "string[]",
    letters: "string[]",
    inventory: "unknown[]",
    matrix: "unknown[][]",
    shoeList: "unknown[]",
  };
  if (map[name]) return map[name];
  if (isStringCollectionContext(name, fnName)) return "string[]";
  if (isNumericCollectionContext(name, fnName)) return "number[]";
  if (/^array$/i.test(name)) return "unknown[]";
  if (/^arr$/i.test(name)) return isNumericCollectionContext(name, fnName) ? "number[]" : "unknown[]";
  if (/Rate$|Frequency$|Years$|^time|^num|^count|^total|^amount|^bill|^price|^size|^limit|^max|^min|^start|^end|^low|^high|^target|^sum|^product|^factor|^digit|^score|^grade|^power|^modulo|^divisor|^multiplier|^operand|^value$/i.test(name)) {
    return "number";
  }
  if (/^arg\d+$/.test(name)) return null;
  return "unknown";
}

const ARITHMETIC_OPS = new Set([
  ts.SyntaxKind.MinusToken,
  ts.SyntaxKind.AsteriskToken,
  ts.SyntaxKind.SlashToken,
  ts.SyntaxKind.AsteriskAsteriskToken,
  ts.SyntaxKind.PercentToken,
]);

function expressionLooksString(expr, sourceFile) {
  if (!expr) return false;
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return true;
  if (ts.isTemplateExpression(expr)) return true;
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return (
      expressionLooksString(expr.left, sourceFile) ||
      expressionLooksString(expr.right, sourceFile)
    );
  }
  return false;
}

function inferPlusOperandType(expr, sourceFile) {
  if (expressionLooksString(expr, sourceFile)) return "string";
  if (ts.isNumericLiteral(expr)) return "number";
  return null;
}

const ARRAY_METHODS = new Set([
  "map",
  "filter",
  "forEach",
  "reduce",
  "slice",
  "sort",
  "find",
  "some",
  "every",
  "concat",
  "flat",
  "includes",
  "indexOf",
  "join",
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
]);

const STRING_METHODS = new Set([
  "split",
  "toLowerCase",
  "toUpperCase",
  "trim",
  "replace",
  "substring",
  "substr",
  "charAt",
  "match",
  "search",
]);

function classifyExpression(expr, sourceFile, paramTypesByName = {}) {
  if (!expr) return null;

  if (ts.isNumericLiteral(expr)) return "number";
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return "string";
  if (expr.kind === ts.SyntaxKind.TrueKeyword || expr.kind === ts.SyntaxKind.FalseKeyword) {
    return "boolean";
  }
  if (ts.isArrayLiteralExpression(expr)) {
    const literalType = inferArrayLiteralType(expr.getText(sourceFile));
    return literalType || "unknown[]";
  }
  if (ts.isObjectLiteralExpression(expr)) return "Record<string, unknown>";

  if (ts.isIdentifier(expr) && paramTypesByName[expr.text]) {
    return paramTypesByName[expr.text];
  }

  if (ts.isBinaryExpression(expr)) {
    if (expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = classifyExpression(expr.left, sourceFile, paramTypesByName);
      const right = classifyExpression(expr.right, sourceFile, paramTypesByName);
      if (left === "string" || right === "string") return "string";
      if (expressionLooksString(expr.left, sourceFile) || expressionLooksString(expr.right, sourceFile)) {
        return "string";
      }
      if (left === "number" && right === "number") return "number";
      return "number";
    }
    if (ARITHMETIC_OPS.has(expr.operatorToken.kind)) return "number";
    if (
      [
        ts.SyntaxKind.EqualsEqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsEqualsToken,
        ts.SyntaxKind.EqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsToken,
        ts.SyntaxKind.LessThanToken,
        ts.SyntaxKind.GreaterThanToken,
        ts.SyntaxKind.LessThanEqualsToken,
        ts.SyntaxKind.GreaterThanEqualsToken,
      ].includes(expr.operatorToken.kind)
    ) {
      return "boolean";
    }
  }

  if (ts.isPrefixUnaryExpression(expr)) {
    if (expr.operator === ts.SyntaxKind.ExclamationToken) return "boolean";
    if (expr.operator === ts.SyntaxKind.MinusToken || expr.operator === ts.SyntaxKind.PlusToken) {
      return "number";
    }
  }

  if (ts.isCallExpression(expr)) {
    if (ts.isPropertyAccessExpression(expr.expression)) {
      const method = expr.expression.name.text;
      const receiver = expr.expression.expression;
      const receiverType =
        ts.isIdentifier(receiver) && paramTypesByName[receiver.text]
          ? paramTypesByName[receiver.text]
          : null;
      if (ARRAY_METHODS.has(method)) {
        if (receiverType === "string[]") return "string[]";
        if (receiverType === "number[]") return "number[]";
        return "unknown[]";
      }
      if (STRING_METHODS.has(method)) return method === "split" ? "string[]" : "string";
    }
  }

  if (ts.isPropertyAccessExpression(expr)) {
    if (expr.name.text === "length") return "number";
    if (STRING_METHODS.has(expr.name.text)) return "string";
    if (ARRAY_METHODS.has(expr.name.text)) return "unknown[]";
  }

  if (ts.isElementAccessExpression(expr)) {
    if (ts.isIdentifier(expr.expression) && paramTypesByName[expr.expression.text]) {
      const elementType = elementTypeFromArrayType(paramTypesByName[expr.expression.text]);
      if (elementType) return elementType;
    }
    return "unknown";
  }

  return null;
}

function mergeInferredTypes(types) {
  const order = [
    "boolean",
    "number",
    "string",
    "string[]",
    "unknown[]",
    "unknown[][]",
    "Record<string, unknown>",
    "unknown",
  ];
  for (const candidate of order) {
    if (types.has(candidate)) return candidate;
  }
  return "unknown";
}

function elementAccessIndexKind(arg) {
  if (!arg) return null;
  if (ts.isStringLiteral(arg)) return "string";
  if (ts.isNumericLiteral(arg)) return "number";
  if (ts.isIdentifier(arg)) {
    if (/^key$/i.test(arg.text)) return "string";
    if (/^(n|index|num|i)$/i.test(arg.text)) return "number";
  }
  return null;
}

function inferParamTypesFromSolutionBody(funcNode, sourceFile, fnName = "") {
  const paramNames = funcNode.parameters.map((p) => p.name.getText(sourceFile));
  const usage = Object.fromEntries(paramNames.map((n) => [n, new Set()]));

  if (!funcNode.body) return usage;

  function record(name, type) {
    if (type && usage[name]) usage[name].add(type);
  }

  function visit(node) {
    if (ts.isIdentifier(node) && usage[node.text]) {
      const parent = node.parent;

      if (ts.isBinaryExpression(parent) && ARITHMETIC_OPS.has(parent.operatorToken.kind)) {
        record(node.text, "number");
      }

      if (
        ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind === ts.SyntaxKind.PlusToken
      ) {
        const operandType =
          inferPlusOperandType(parent.left, sourceFile) ||
          inferPlusOperandType(parent.right, sourceFile);
        if (operandType === "string") record(node.text, "string");
        else if (operandType === "number") record(node.text, "number");
      }

      if (ts.isElementAccessExpression(parent)) {
        if (parent.expression === node) {
          const keyKind = elementAccessIndexKind(parent.argumentExpression);
          if (keyKind === "string") record(node.text, "Record<string, unknown>");
          else if (keyKind === "number") {
            record(node.text, inferParamTypeFromName(node.text, fnName).includes("[]")
              ? inferParamTypeFromName(node.text, fnName)
              : "unknown[]");
          } else {
            record(node.text, inferParamTypeFromName(node.text, fnName));
          }
        }
        if (parent.argumentExpression === node) {
          const keyKind = elementAccessIndexKind(node);
          record(node.text, keyKind === "string" ? "string" : "number");
        }
      }

      if (ts.isPropertyAccessExpression(parent) && parent.expression === node) {
        const method = parent.name.text;
        if (method === "length") {
          const fromName = inferParamTypeFromName(node.text, fnName);
          record(node.text, fromName.includes("[]") ? fromName : "string");
        } else if (ARRAY_METHODS.has(method)) {
          const fromName = inferParamTypeFromName(node.text, fnName);
          record(node.text, fromName.includes("[]") ? fromName : "unknown[]");
        } else if (STRING_METHODS.has(method)) {
          record(node.text, "string");
        } else {
          record(node.text, "Record<string, unknown>");
        }
      }

      if (ts.isCallExpression(parent) && parent.expression === node) {
        record(node.text, "unknown[]");
      }

      if (ts.isVariableDeclaration(parent) && parent.initializer) {
        const initType = classifyExpression(parent.initializer, sourceFile);
        if (initType) record(node.text, initType);
      }

      if (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
        const rhsType = classifyExpression(parent.right, sourceFile);
        if (rhsType) record(node.text, rhsType);
      }

      if (
        ts.isBinaryExpression(parent) &&
        parent.operatorToken.kind === ts.SyntaxKind.InKeyword &&
        parent.right === node
      ) {
        record(node.text, "Record<string, unknown>");
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(funcNode.body);

  const result = {};
  for (const name of paramNames) {
    if (usage[name].size > 0) {
      result[name] = mergeInferredTypes(usage[name]);
    }
  }
  return result;
}

function inferReturnTypeFromSolutionBody(funcNode, sourceFile, paramTypesByName) {
  if (!funcNode.body) return null;
  const types = new Set();

  function visit(node) {
    if (ts.isReturnStatement(node) && node.expression) {
      if (ts.isIdentifier(node.expression) && paramTypesByName[node.expression.text]) {
        types.add(paramTypesByName[node.expression.text]);
      } else {
        const t = classifyExpression(node.expression, sourceFile, paramTypesByName);
        if (t) types.add(t);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(funcNode.body);
  if (!types.size) return null;
  return mergeInferredTypes(types);
}

function extractSolutionCallExamples(source, functionNames) {
  return extractCallExamples(source, functionNames);
}

function inferAllSolutionTypes(source) {
  const sourceFile = ts.createSourceFile(
    "solution.hide.js",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS
  );

  const functionNames = [];
  const inferred = {};

  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const fnName = node.name.getText(sourceFile);
      functionNames.push(fnName);

      const paramTypesFromBody = inferParamTypesFromSolutionBody(node, sourceFile, fnName);
      const paramTypesFromCalls = {};
      const callExamples = extractSolutionCallExamples(source, [fnName]);
      const bestCall = pickBestCallExample(callExamples);

      const paramNames = node.parameters.map((p) => p.name.getText(sourceFile));
      if (bestCall) {
        paramNames.forEach((name, i) => {
          const fromCall = inferParamTypeFromArg(bestCall.argsText, i, name, fnName);
          if (fromCall && fromCall !== "unknown") paramTypesFromCalls[name] = fromCall;
        });
      }

      const params = {};
      for (const name of paramNames) {
        params[name] =
          paramTypesFromCalls[name] ||
          paramTypesFromBody[name] ||
          inferParamTypeFromName(name, fnName);
      }

      const returnType = inferReturnTypeFromSolutionBody(node, sourceFile, params);

      inferred[fnName] = { params, returnType };
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return inferred;
}

function inferParamTypeFromArg(argText, index, paramName, fnName = "") {
  const parts = splitTopLevelArgs(argText);

  if (index < parts.length) {
    const arg = parts[index].trim();
    if (/^['"`]/.test(arg) || /^`/.test(arg)) return "string";
    if (isNumericLiteralText(arg)) return "number";
    if (/^\[/.test(arg)) return inferArrayLiteralType(arg) || inferParamTypeFromName(paramName, fnName);
    if (/^\{/.test(arg)) return "Record<string, unknown>";
    if (/^(true|false)$/.test(arg)) return "boolean";
  }

  return inferParamTypeFromName(paramName, fnName);
}

function elementTypeFromArrayType(arrayType) {
  if (arrayType === "number[]") return "number";
  if (arrayType === "string[]") return "string";
  if (arrayType === "boolean[]") return "boolean";
  if (arrayType?.endsWith("[]")) return "unknown";
  return null;
}

function returnsSingleArrayElement(name) {
  return /^get(?:First|Last|Nth)Element$|^get(?:First|Last|Nth)ElementOfProperty$|^getElementOfArrayProperty$/i.test(
    name
  );
}

function returnsArrayType(name) {
  if (returnsSingleArrayElement(name)) return false;
  if (
    /^compute(?:Sum|Product|Average)|^getLengthOf|^count[A-Z]|^sum$|^average$|^sumDigits$|^calculateBillTotal$|^multiplyBetween$|^computeSumBetween$|^computeSummationToN$|^computeFactorialOfN$|^modulo$|^multiply$|^getIndexOf$|^binarySearch|^detectOutlier|^findPair|^getMatrixValue$|^getProperty$|^getAverageOfElements|^getSumOfAllElements|^getProductOfAllElements|^getSmallestElementAtProperty$|^getLargestElementAtProperty$|^find(?:Shortest|Smallest|Longest|Largest)Element$|^get(?:Longest|Shortest|Largest|Smallest)Element$|^find(?:Shortest|Longest)Word|^get(?:Longest|Shortest)Word|^findSmallestNumber|^getLargestNumber|^getLongestWord|^findShortestWord|^phoneNumber|^PhoneNumber|^Greet|^renderInventory$|^renderAverageCost|^getDisplayName|^renameBook|^Select$|^countAllCharacters$|^longestPalindrome$|^reverseString$|^convertObject|^transformFirst|^fromList|^transformEmployee|^listAll|^getAllKeys$/i.test(
      name
    )
  ) {
    return false;
  }
  if (inferStringArrayReturnFromName(name)) return true;
  return /^(join|filter|remove|keep|addTo|getElements|square|flip|extend|search|findPair|transpose|getAllBut|removeFrom|removeNumbers|removeString|removeOdd|removeEven|removeArray|removeNumber|getOdd|getEven|getSquared|PhoneNumberFormatter|removeProperty|addProperty|addObjectProperty|addFullNameProperty|addArrayProperty|removeNumberValues|removeArrayValues|removeOddValues|removeEvenValues|convertObjectToList|getAllButLastElementOfProperty|isRotated$)/i.test(
    name
  );
}

function inferScalarReturnFromParams(params, fnName) {
  if (!returnsSingleArrayElement(fnName)) return null;
  const arrayParam = params.find((p) => p.type.endsWith("[]"));
  if (arrayParam) return elementTypeFromArrayType(arrayParam.type) || "unknown";
  return "unknown";
}

function inferArrayReturnFromParams(params, fnName) {
  if (!returnsArrayType(fnName)) return null;
  const arrayParamTypes = params.map((p) => p.type).filter((t) => t.endsWith("[]"));
  if (arrayParamTypes.length && arrayParamTypes.every((t) => t === "number[]")) {
    return "number[]";
  }
  if (arrayParamTypes.length && arrayParamTypes.every((t) => t === "string[]")) {
    return "string[]";
  }
  return null;
}

function inferStringArrayReturnFromName(name) {
  return /filter(?:Even|Odd)?LengthWords|filterEvenLengthWords|filterOddLengthWords|getAllWords|getAllLetters|convertDoubleSpaceToSingle|repeatString|getOddLengthWordsAtProperty|getEvenLengthWordsAtProperty|removeStringValuesLongerThan|removeStringValues/i.test(
    name
  );
}

function inferReturnTypeFromName(name) {
  if (/^is[A-Z]/.test(name) || /^has[A-Z]/.test(name)) return "boolean";
  if (
    /^get.*Length|^count|^compute|^calculate|^sum$|^average$|^multiply|^modulo|^square$|^cube$|^double|^convertScore|^convert.*Grade|^getMatrixValue|^binarySearch|^detectOutlier|^findPair|^getProduct|^getSum|^getAverage|^getSmallest|^getLargest|^getProperty$|^phoneNumber|^sumDigits|^factorial|^billTotal|^power$|^area|^perimeter|^renderAverageCostPerDesigner|^getLength/i.test(
      name
    )
  ) {
    return "number";
  }
  if (
    /^find.*Word|^convert.*Grade|^getLace|^greet|^PhoneNumber|^findLongestPalindrome|^reverseString|^Greet|^phone|^longestPalindrome|^renderInventory$|^getDisplayName|^renameBook|^Select$|^Object|^Array|^listAll|^getAllKeys|^convertObject|^transformFirst|^fromList|^transformEmployee|^GreetCustomers|^getLaceNameDataForShoes|^renderInventory$|^phoneNumberFormatter$/i.test(
      name
    )
  ) {
    return "string";
  }
  if (/^renderInventory$|^renderAverageCostPerDesigner$/.test(name)) {
    return null;
  }
  if (inferStringArrayReturnFromName(name)) {
    return "string[]";
  }
  if (returnsSingleArrayElement(name)) {
    return null;
  }
  if (
    /^joinArraysOfArrays$|^findPairForSum$|^search$|^transposeMatrix$|^extend$|^removeNumbers|^squareElements$|^flipPairs$|^flipEveryNChars$|^binarySearchSortedArray$|^detectOutlierValue$|^isRotated$|^keep$|^removeElement$|^removeFrom|^addToFront|^addToBack$|^getElementsAfter$|^getElementsUpTo$|^getAllElementsButNth$|^filterEvenElements$|^filterOddElements$|^getAverageOfElementsAtProperty$|^getSumOfAllElementsAtProperty$|^getProductOfAllElementsAtProperty$|^getSmallestElementAtProperty$|^getLargestElementAtProperty$|^getOddElementsAtProperty$|^getEvenElementsAtProperty$|^getSquaredElementsAtProperty$|^getAllButLastElementOfProperty$|^removeProperty$|^addProperty$|^addObjectProperty$|^addFullNameProperty$|^addArrayProperty$|^removeNumberValues$|^removeArrayValues$|^removeOddValues$|^removeEvenValues$|^removeNumbersLargerThan$|^removeNumbersLessThan$|^countAllCharacters$|^renderInventory$|^getLaceNameDataForShoes$|^findSmallestnumberAmongMixedElements$|^getLargestNumberAmongMixedElements$|^getLongestWordOfMixedElements$|^findShortestWordAmongMixedElements$|^averageIntegers$|^sum$|^calculateBillTotal$|^multiplyBetween$|^computeSumBetween$|^computeSummationToN$|^computeFactorialOfN$|^sumDigits$|^modulo$|^multiply$|^getMatrixValue$|^Select$|^transformFirstAndLast$|^fromListToObject$|^transformEmployeeData$|^getAllKeys$|^listAllValues$|^convertObjectToList$|^renderAverageCostPerDesigner$|^comparePassByValueAndReference$|^PhoneNumberFormatter$/i.test(
      name
    )
  ) {
    return "unknown[]";
  }
  return null;
}

export function parseReadme(slug) {
  const filePath = path.join(exerciseDir(slug), "README.md");
  const text = readIfExists(filePath) || "";
  const functionNames = extractAllFunctionNamesFromReadme(text);
  const returnHint = extractReturnHintFromReadme(text);
  const flags = extractReadmeFlags(text);
  const callExamples = extractCallExamples(text, functionNames);

  return { functionNames, returnHint, flags, callExamples, text };
}

function expectScalarReturnFromTest(text, fnName) {
  if (returnsSingleArrayElement(fnName)) {
    return (
      /expect\(output\)\.toBe\(/.test(text) ||
      /expect\(output\)\.toEqual\(\s*\{/.test(text)
    );
  }
  return /expect\(output\)\.toBe\(\s*-?\d+\s*\)/.test(text) || /expect\(output\)\.toBe\(\s*['"`]/.test(text);
}

function inferScalarReturnFromTest(text) {
  if (/expect\(output\)\.toBe\(\s*-?\d+\s*\)/.test(text)) return "number";
  if (/expect\(output\)\.toBe\(\s*['"`]/.test(text)) return "string";
  if (/expect\(output\)\.toEqual\(\s*\{/.test(text)) return "unknown";
  return null;
}

export function parseTest(slug) {
  const filePath = path.join(exerciseDir(slug), "test.js");
  const text = readIfExists(filePath) || "";
  const functionNames = [];

  for (const match of text.matchAll(/__get__\(['"](\w+)['"]\)/g)) {
    functionNames.push(match[1]);
  }

  const returnTypes = {};
  for (const fnName of functionNames) {
    const typeofMatches = [
      ...text.matchAll(new RegExp(`typeof\\s+${fnName}\\([^)]*\\)[^)]*['"](\\w+)['"]`, "g")),
    ].map((m) => m[1]);
    const typeofKinds = new Set(typeofMatches);

    if (typeofKinds.size > 1) {
      returnTypes[fnName] = "unknown";
    } else if (typeofKinds.has("boolean")) {
      returnTypes[fnName] = "boolean";
    } else if (typeofKinds.has("number")) {
      returnTypes[fnName] = "number";
    } else if (typeofKinds.has("string")) {
      returnTypes[fnName] = "string";
    } else if (new RegExp(`Array\\.isArray\\(${fnName}\\(`).test(text)) {
      returnTypes[fnName] = "unknown[]";
    }
  }

  const callExamples = [];
  for (const fnName of functionNames) {
    const pattern = new RegExp(`${fnName}\\(([^)]*)\\)`, "g");
    let match;
    while ((match = pattern.exec(text)) !== null) {
      callExamples.push({
        fnName,
        argCount: countCallArgs(match[1]),
        argsText: match[1],
      });
    }

    const expectsArrayReturn =
      new RegExp(`Array\\.isArray\\(\\s*${fnName}\\(`).test(text) ||
      new RegExp(`Array\\.isArray\\(\\s*output\\)`).test(text);
    const skipArrayToEqual = returnsSingleArrayElement(fnName) && !expectsArrayReturn;

    if (!skipArrayToEqual && /toEqual\(\s*\[\s*['"`]/.test(text)) {
      returnTypes[fnName] = "string[]";
    } else if (!skipArrayToEqual && /toEqual\(\s*\[\s*-?\d/.test(text)) {
      returnTypes[fnName] = "number[]";
    } else if (expectScalarReturnFromTest(text, fnName)) {
      returnTypes[fnName] = returnTypes[fnName] || inferScalarReturnFromTest(text);
    } else if (!skipArrayToEqual && new RegExp(`${fnName}\\([^)]*\\)[^)]*toEqual\\(\\s*\\[`).test(text)) {
      returnTypes[fnName] = returnTypes[fnName] || "unknown[]";
    } else if (!skipArrayToEqual && /toEqual\(\s*\[/.test(text)) {
      returnTypes[fnName] = returnTypes[fnName] || "unknown[]";
    }
    if (new RegExp(`${fnName}\\([^)]*\\)[^)]*toEqual\\(\\s*\\{`).test(text)) {
      returnTypes[fnName] = returnTypes[fnName] || "Record<string, unknown>";
    }

    if (returnsSingleArrayElement(fnName) && /ElementOfProperty$|getElementOfArrayProperty$/i.test(fnName)) {
      returnTypes[fnName] = "unknown";
    }
  }

  return { functionNames: [...new Set(functionNames)], returnTypes, callExamples, text };
}

function pickBestCallExample(examples) {
  const valid = examples.filter((e) => !e.singleComplexLiteral);
  if (!valid.length) return null;
  return valid.sort((a, b) => b.argCount - a.argCount)[0];
}

function buildParams(fnName, sources) {
  const { solution, readme, test } = sources;
  const solFn = solution.functions.find((f) => f.name === fnName);
  const solInferred = solution.inferred?.[fnName];
  const testCalls = test.callExamples.filter((c) => c.fnName === fnName);
  const readmeCalls = readme.callExamples.filter((c) => c.fnName === fnName);

  const bestReadmeCall = pickBestCallExample(readmeCalls);
  const bestTestCall = testCalls.sort((a, b) => b.argCount - a.argCount)[0];

  let paramCount = solFn?.params.length ?? 0;
  let paramNames =
    solFn?.params.map((p) => p.name).filter((n) => !/^arg\d+$/.test(n)) ?? [];

  // Only infer param count from tests/readme when solution is missing.
  if (!solFn) {
    if (bestTestCall && bestTestCall.argCount > paramCount) {
      paramCount = bestTestCall.argCount;
    }
    if (
      bestReadmeCall &&
      bestReadmeCall.argCount > paramCount &&
      !bestReadmeCall.singleComplexLiteral
    ) {
      paramCount = bestReadmeCall.argCount;
    }
  }

  if (paramNames.length < paramCount) {
    const fallbacks = ["a", "b", "c", "d", "e", "f"];
    while (paramNames.length < paramCount) {
      paramNames.push(fallbacks[paramNames.length] || `param${paramNames.length + 1}`);
    }
  } else if (paramNames.length > paramCount) {
    paramNames = paramNames.slice(0, paramCount);
  }

  const argsSource = bestTestCall?.argsText || bestReadmeCall?.argsText || "";

  return paramNames.map((name, i) => {
    const fromCall = inferParamTypeFromArg(argsSource, i, name, fnName);
    const fromBody = solInferred?.params?.[name];
    const fromName = inferParamTypeFromName(name, fnName);

    let type = fromName;
    if (fromBody && fromBody !== "unknown" && fromBody !== "unknown[]") type = fromBody;
    if (fromCall && fromCall !== "unknown") {
      if (fromCall === "string" && type === "number") type = "string";
      if (fromCall === "string[]" && type === "unknown[]") type = "string[]";
      if (fromCall === "number[]" && type === "unknown[]") type = "number[]";
      else if (!fromBody || fromBody === "unknown") type = fromCall;
      else if (fromCall === fromBody) type = fromCall;
      else type = fromCall;
    }
    if (fromName === "string" && type === "unknown[]") type = "string";
    if (fromName === "string[]" && type === "unknown[]") type = "string[]";

    return { name, type: type || "unknown" };
  });
}

function buildReturnType(fnName, sources) {
  const { readme, test, solution } = sources;
  const solFn = solution.functions.find((f) => f.name === fnName);
  const solInferred = solution.inferred?.[fnName];

  if (readme.flags.wantsVoid) return "void";
  if (test.returnTypes[fnName] === "string[]") return "string[]";
  if (test.returnTypes[fnName] === "number[]") return "number[]";
  if (readme.returnHint === "string[]") return "string[]";
  if (readme.returnHint === "number[]") return "number[]";
  if (inferStringArrayReturnFromName(fnName)) return "string[]";
  if (test.returnTypes[fnName]) return test.returnTypes[fnName];
  if (readme.returnHint) return readme.returnHint;
  if (solInferred?.returnType && solInferred.returnType !== "unknown") {
    return solInferred.returnType;
  }

  const params = buildParams(fnName, sources);
  const scalarReturn = inferScalarReturnFromParams(params, fnName);
  if (scalarReturn) return scalarReturn;
  const arrayReturn = inferArrayReturnFromParams(params, fnName);
  if (arrayReturn) return arrayReturn;

  const fromName = inferReturnTypeFromName(fnName);
  if (fromName) return fromName;

  if (solFn?.returnType) return solFn.returnType;

  return "unknown";
}

export function buildExerciseContract(slug, overrides = {}) {
  const override = overrides[slug] || {};
  const solution = parseSolution(slug);
  const readme = parseReadme(slug);
  const test = parseTest(slug);
  const appTs = parseAppTs(slug);

  const sources = { solution, readme, test };

  let functionNames = [
    ...new Set([
      ...solution.functions.map((f) => f.name),
      ...test.functionNames,
      ...readme.functionNames,
    ]),
  ].filter(isValidFunctionName);

  if (override.functions) {
    functionNames = override.functions.map((f) => f.name);
  }

  const preamble = override.preamble ?? (solution.interfaces.join("\n\n") || "");

  const functions = functionNames.map((fnName) => {
    const overrideFn = override.functions?.find((f) => f.name === fnName);
    if (overrideFn) {
      return {
        name: fnName,
        params: overrideFn.params,
        returnType: overrideFn.returnType,
        body: appTs.functions.find((f) => f.name === fnName)?.body || null,
      };
    }

    return {
      name: fnName,
      params: buildParams(fnName, sources),
      returnType: buildReturnType(fnName, sources),
      body: appTs.functions.find((f) => f.name === fnName)?.body || null,
    };
  });

  return { slug, preamble, functions, readme, test, solution, appTs };
}

export function formatParams(params) {
  return params.map((p) => `${p.name}: ${p.type}`).join(", ");
}

function isPlaceholderBody(normalized, returnType) {
  if (/return\s+undefined\s+as\s+unknown/.test(normalized)) return true;
  if (returnType && returnType !== "unknown" && /return\s+undefined\s+as/.test(normalized)) {
    return true;
  }
  if (
    returnType &&
    /^[A-Z]\w+$/.test(returnType) &&
    new RegExp(`Record<string, unknown>`).test(normalized)
  ) {
    return true;
  }
  return /\/\/ your code here\s*return\s+(\[\]|0|false|''|""|\{\}[^;]*|undefined[^;]*);?\s*$/s.test(
    normalized
  );
}

function defaultStubBody(returnType) {
  switch (returnType) {
    case "void":
      return "  // your code here\n  ";
    case "boolean":
      return "  // your code here\n  return false;";
    case "number":
      return "  // your code here\n  return 0;";
    case "string":
      return "  // your code here\n  return '';";
    case "string[]":
      return "  // your code here\n  return [];";
    case "number[]":
      return "  // your code here\n  return [];";
    case "unknown[]":
      return "  // your code here\n  return [];";
    case "unknown[][]":
      return "  // your code here\n  return [];";
    case "Record<string, unknown>":
      return "  // your code here\n  return {} as Record<string, unknown>;";
    case "unknown":
      return "  // your code here\n  ";
    default:
      if (returnType && /^[A-Z]\w+$/.test(returnType)) {
        return `  // your code here\n  return {} as ${returnType};`;
      }
      return "  // your code here\n  ";
  }
}

function normalizeBody(body, returnType) {
  if (!body) return defaultStubBody(returnType);

  let normalized = body.trim();
  if (normalized.startsWith("{")) normalized = normalized.slice(1);
  if (normalized.endsWith("}")) normalized = normalized.slice(0, -1);
  normalized = normalized.trim();

  if (!normalized.includes("your code here")) {
    normalized = `  // your code here\n${normalized}`;
  }

  const hasReturn = /\breturn\b/.test(normalized);

  if (isPlaceholderBody(normalized, returnType)) {
    return defaultStubBody(returnType);
  }

  if (returnType && returnType !== "void" && !hasReturn) {
    return defaultStubBody(returnType);
  }

  if (returnType === "void" && hasReturn) {
    return "  // your code here\n  ";
  }

  return normalized
    .split("\n")
    .map((line) => (line ? `  ${line.trimStart()}` : ""))
    .join("\n")
    .trimEnd();
}

export function renderAppTs(contract) {
  const parts = [];

  if (contract.preamble?.trim()) {
    parts.push(contract.preamble.trim());
    parts.push("");
  }

  for (const fn of contract.functions) {
    const params = formatParams(fn.params);
    const effectiveReturnType = fn.returnType === "unknown" ? null : fn.returnType;
    const returnSuffix = effectiveReturnType ? `: ${effectiveReturnType}` : "";
    const body = normalizeBody(fn.body, effectiveReturnType);
    parts.push(`function ${fn.name}(${params})${returnSuffix} {`);
    parts.push(body);
    parts.push("}");
    parts.push("");
  }

  parts.push("export {};");
  parts.push("");

  return parts.join("\n");
}

export function auditContract(contract) {
  const issues = [];
  const appFunctions = contract.appTs.functions;

  for (const expected of contract.functions) {
    const actual = appFunctions.find((f) => f.name === expected.name);
    if (!actual) {
      issues.push({ level: "FAIL", message: `Missing function ${expected.name}`, source: "expected" });
      continue;
    }

    const ghostParams = actual.params.filter((p) => /^arg\d+$/.test(p.name));
    if (ghostParams.length) {
      issues.push({
        level: "FAIL",
        message: `Ghost params in ${expected.name}: ${ghostParams.map((p) => p.name).join(", ")}`,
        source: "app.ts",
      });
    }

    if (actual.params.length !== expected.params.length) {
      issues.push({
        level: "FAIL",
        message: `${expected.name}: param count ${actual.params.length} vs expected ${expected.params.length}`,
        source: "merge",
      });
    }

    if (expected.returnType && actual.returnType && actual.returnType !== expected.returnType) {
      issues.push({
        level: "WARN",
        message: `${expected.name}: return type ${actual.returnType} vs expected ${expected.returnType}`,
        source: "readme/test",
      });
    }

    for (const expParam of expected.params) {
      const actParam = actual.params.find((p) => p.name === expParam.name);
      if (
        actParam &&
        actParam.type === "number" &&
        expParam.type === "string" &&
        expParam.name === "key"
      ) {
        issues.push({
          level: "FAIL",
          message: `${expected.name}: key should be string, got number`,
          source: "readme/test",
        });
      }
    }
  }

  if (contract.readme.flags.wantsInterface && !contract.appTs.raw?.includes("interface ")) {
    issues.push({
      level: "WARN",
      message: "README requests interface but app.ts has none",
      source: "readme",
    });
  }

  const level = issues.some((i) => i.level === "FAIL")
    ? "FAIL"
    : issues.some((i) => i.level === "WARN")
      ? "WARN"
      : "OK";

  return { level, issues };
}
