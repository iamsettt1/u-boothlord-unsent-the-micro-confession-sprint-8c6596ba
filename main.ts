// Unsent: The Micro-Confession Sprint
// Writes one two-part micro-confession to <output dir>/entry.txt:
// a "To: ..." line, then the unsent message itself, one line, exactly
// as it was typed, with nothing after it.
// Node 22, stdlib only. No network, no secrets, no input.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To: the girl who sat behind me in Year 10 maths\n" +
  "i've liked you since the day you lent me your pen and never asked for it back. two years now and i still haven't said it because i'm scared that if you say no i still have to sit here every day";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 260 characters,
// not only white space, in exactly two parts, with the message line at
// most 200 characters. Fail loudly here rather than ship an invalid entry.
const lines = ENTRY.split("\n");
const message = lines[1] ?? "";
if (lines.length !== 2) {
  throw new Error(`entry must have exactly 2 lines, got ${lines.length}`);
}
if (!lines[0].startsWith("To: ")) {
  throw new Error("first line must be a To: line");
}
if ([...ENTRY].length < 1 || [...ENTRY].length > 260) {
  throw new Error(`entry must be 1-260 characters, got ${[...ENTRY].length}`);
}
if ([...message].length > 200) {
  throw new Error(`message line must be at most 200 characters, got ${[...message].length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

// The grader runs with /output; outside it MAKEFUN_OUTPUT_DIR stands in.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
