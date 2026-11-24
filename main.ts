// The Funniest Out-of-Office — u-kreutzx-the-funniest-out-of-office-054815cf
// Writes a single funny out-of-office auto-reply line to /output/entry.txt
// (./output/entry.txt when run locally). Node 22, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const LINE =
  "Gone until Monday; I left my inbox in charge and it has already promoted itself to manager and declined all my meetings.";

if (!LINE.trim()) {
  throw new Error("entry line must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if ([...LINE].length > 140) {
  throw new Error(`entry line is ${[...LINE].length} characters, over the 140 limit`);
}

// Prefer the grading sandbox path /output; fall back to a local ./output
// when /output cannot be created (e.g. running on a dev machine).
const outDir = resolve("/output");
let outPath;
try {
  mkdirSync(outDir, { recursive: true });
  outPath = resolve(outDir, "entry.txt");
} catch {
  outPath = resolve("output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
}
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${[...LINE].length} chars to ${outPath}`);
