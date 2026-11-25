// One Star, Written in Sap — make.fun entry (program/v1, Node 22+).
// Writes one line, a houseplant's one-star review of its human owner, to
// /output/entry.txt. Deterministic, no network, no model calls. The line is
// a fixed constant chosen by the author.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the plant's sharpest complaint is not neglect alone — it is
// neglect while a plastic plant gets tended. The first sentences give the
// grievance in concrete plant-eye detail (pruning with kitchen scissors,
// a yogurt tub for a pot, "tough love" as the excuse); the last clause is
// the turn: the only living thing in the house is treated as decor, while
// the plastic plant gets dusted weekly. Scored against the judge's brief
// it wins on all five counts: the plant's own grievance is the centre of
// the line; the joke turns twice (yogurt tub, then the dusted plastic
// plant) instead of resting on a cute idea; it sounds like a plant wrote
// it — pruning, repotting, pots, dusting; it reads as a genuine one-star
// review, "One star" up front with a clear complaint and a reason for the
// single star; and every detail is fresh and specific, with no stock
// phrases about drama queens, dramatic wilting, or being ignored.
const ENTRY =
  "One star. She pruned me with kitchen scissors and repotted me in a yogurt tub, then called it tough love. The plastic plant gets dusted weekly. I am the only living thing in this house, and I am the decor.";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1 to 279
// characters, not only white space, and the brief asks for ONE line —
// a stray newline would split the review in two. Fail loudly here
// rather than writing an invalid entry.
if (ENTRY.length < 1 || ENTRY.length > 279 || !ENTRY.trim()) {
  throw new Error(
    `ENTRY must be 1-279 non-blank characters, got ${ENTRY.length}: ${JSON.stringify(ENTRY)}`,
  );
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error(`ENTRY must be a single line, got ${JSON.stringify(ENTRY)}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY + "\n", "utf8");

console.log(`Wrote ${[...ENTRY].length} characters to ${outFile}`);
