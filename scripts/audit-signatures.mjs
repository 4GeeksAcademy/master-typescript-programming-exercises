import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  auditContract,
  buildExerciseContract,
  listExercises,
} from "./lib/exercise-contract.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const overrides = JSON.parse(
  fs.readFileSync(path.join(__dirname, "signature-overrides.json"), "utf8")
);

const results = [];
let failCount = 0;
let warnCount = 0;

for (const slug of listExercises()) {
  const contract = buildExerciseContract(slug, overrides);
  const audit = auditContract(contract);
  if (audit.level === "FAIL") failCount++;
  if (audit.level === "WARN") warnCount++;
  results.push({ slug, level: audit.level, issues: audit.issues });
}

const summary = {
  total: results.length,
  ok: results.filter((r) => r.level === "OK").length,
  warn: warnCount,
  fail: failCount,
};

console.log(JSON.stringify({ summary, results: results.filter((r) => r.level !== "OK") }, null, 2));

if (failCount > 0) {
  process.exitCode = 1;
}
