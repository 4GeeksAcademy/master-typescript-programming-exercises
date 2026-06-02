import fs from "fs";
import path from "path";
import ts from "typescript";
import { exerciseDir, listExercises } from "./lib/exercise-contract.mjs";

const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  path.dirname(configPath)
);

const options = {
  ...parsedConfig.options,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2019,
  esModuleInterop: true,
  sourceMap: false,
  inlineSourceMap: false,
};

let ok = 0;
let failed = 0;

for (const slug of listExercises()) {
  const appTsPath = path.join(exerciseDir(slug), "app.ts");
  const appJsPath = path.join(exerciseDir(slug), "app.js");
  const sourceCode = fs.readFileSync(appTsPath, "utf8");

  const result = ts.transpileModule(sourceCode, {
    compilerOptions: options,
    fileName: appTsPath,
    reportDiagnostics: true,
  });

  const errors = (result.diagnostics || []).filter(
    (d) => d.category === ts.DiagnosticCategory.Error
  );

  if (errors.length) {
    failed++;
    console.error(`FAIL ${slug}:`);
    for (const d of errors) {
      console.error(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
    }
    continue;
  }

  fs.writeFileSync(appJsPath, result.outputText, "utf8");
  ok++;
}

console.log(`Transpiled ${ok} exercises (${failed} failed).`);
if (failed > 0) process.exitCode = 1;
