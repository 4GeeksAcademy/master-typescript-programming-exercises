import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildExerciseContract,
  exerciseDir,
  listExercises,
  renderAppTs,
} from "./lib/exercise-contract.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dryRun = process.argv.includes("--dry-run");
const overrides = JSON.parse(
  fs.readFileSync(path.join(__dirname, "signature-overrides.json"), "utf8")
);

let updated = 0;

for (const slug of listExercises()) {
  const contract = buildExerciseContract(slug, overrides);
  const nextContent = renderAppTs(contract);
  const appTsPath = path.join(exerciseDir(slug), "app.ts");
  const current = fs.readFileSync(appTsPath, "utf8");

  if (current !== nextContent) {
    updated++;
    if (!dryRun) {
      fs.writeFileSync(appTsPath, nextContent, "utf8");
    }
    console.log(`${dryRun ? "[dry-run] " : ""}updated: ${slug}`);
  }
}

console.log(`\n${dryRun ? "Would update" : "Updated"} ${updated} of ${listExercises().length} exercises.`);
