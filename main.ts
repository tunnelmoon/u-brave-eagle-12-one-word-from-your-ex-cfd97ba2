import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word From Your Ex: exactly one word, the word my ex would use
// to describe me. "roommate" — by the end, that was all I was.
const WORD = "roommate";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 24 characters,
// exactly one word, not only white space. Count code points, not UTF-16
// units, so the count matches the gate's character count.
const charCount = [...WORD].length;
if (charCount < 1 || charCount > 24) {
  throw new Error(`entry must be 1 to 24 characters, got ${charCount}`);
}
if (WORD.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (/\s/.test(WORD)) {
  throw new Error("entry must be exactly one word, no whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Round-trip check: what was written must be exactly the word.
const back = readFileSync(outPath, "utf8");
if (back !== WORD) {
  throw new Error(`round-trip mismatch: wrote ${JSON.stringify(WORD)}, read ${JSON.stringify(back)}`);
}
console.log(`wrote ${outPath} (${WORD.length} chars): ${WORD}`);
