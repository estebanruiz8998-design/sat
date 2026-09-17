#!/usr/bin/env node
/* ============================================================
   Question-bank validator + coverage report.
   Usage: node tools/validate-questions.js
   Exits non-zero on any structural error.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const src = fs.readFileSync(path.join(__dirname, "..", "js", "questions.js"), "utf8");
const ctx = {};
vm.createContext(ctx);
// top-level const/let stay in the script's lexical scope, so export explicitly
vm.runInContext(src + "\n;this.__x = { QUESTIONS, DOMAINS };", ctx);

const { QUESTIONS, DOMAINS } = ctx.__x;
const errors = [];
const warns = [];
const err = (id, msg) => errors.push(`[${id}] ${msg}`);
const warn = (id, msg) => warns.push(`[${id}] ${msg}`);

const domById = {};
for (const sec of ["rw", "math"]) {
  for (const d of DOMAINS[sec]) domById[d.id] = { ...d, section: sec };
}

const seenIds = new Set();
const seenStems = new Map();

for (const q of QUESTIONS) {
  const id = q.id || "(no id)";
  if (!q.id || typeof q.id !== "string") err(id, "missing id");
  if (seenIds.has(q.id)) err(id, "duplicate id");
  seenIds.add(q.id);

  const d = domById[q.domain];
  if (!d) { err(id, `unknown domain "${q.domain}"`); continue; }
  if (q.section !== d.section) err(id, `section "${q.section}" does not match domain section "${d.section}"`);
  if (!d.skills.includes(q.skill)) err(id, `skill "${q.skill}" not in domain "${d.name}" skill list`);
  if (![1, 2, 3].includes(q.diff)) err(id, `bad diff ${q.diff}`);

  if (!q.stem || typeof q.stem !== "string" || q.stem.trim().length < 10) err(id, "stem missing/too short");
  // standard DSAT stems repeat across questions; the passage is what must be unique
  const stemKey = ((q.passage || "") + "||" + (q.stem || "")).replace(/\s+/g, " ").trim().toLowerCase();
  if (seenStems.has(stemKey)) err(id, `duplicate passage+stem of ${seenStems.get(stemKey)}`);
  seenStems.set(stemKey, q.id);

  if (q.type === "spr") {
    // student-produced response (fill-in) — math only
    if (q.section !== "math") err(id, "SPR questions must be math");
    if (q.choices) err(id, "SPR question must not have choices");
    if (typeof q.answer !== "string" || !q.answer.trim()) err(id, "SPR answer must be a non-empty string");
    if (!Array.isArray(q.accept) || !q.accept.length) err(id, "SPR needs accept[] with at least the canonical answer");
    else {
      if (!q.accept.includes(q.answer)) err(id, "SPR accept[] must include the canonical answer");
      for (const a of q.accept) {
        if (!/^-?(\d+(\.\d+)?|\d+\/\d+|\.\d+)$/.test(String(a))) err(id, `SPR accept value "${a}" is not a plain number or fraction`);
      }
    }
  } else {
    if (!Array.isArray(q.choices) || q.choices.length !== 4) err(id, "must have exactly 4 choices");
    else {
      const set = new Set(q.choices.map(c => String(c).trim().toLowerCase()));
      if (set.size !== 4) err(id, "choices contain duplicates");
      if (q.choices.some(c => !String(c).trim())) err(id, "empty choice");
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(id, `bad answer index ${q.answer}`);
  }

  if (!q.explanation || q.explanation.trim().length < 40) err(id, "explanation missing or too short (<40 chars)");
  if (!Array.isArray(q.hints) || q.hints.length < 2) err(id, "needs at least 2 progressive hints");
  else if (q.hints.some(h => !String(h).trim())) err(id, "empty hint");

  if (q.section === "rw" && !q.passage && q.skill !== "Rhetorical Synthesis") {
    // most RW question types are passage-based
    if (!/_{3,}|blank/i.test(q.stem)) warn(id, "RW question without passage");
  }
  if (q.passage && q.passage.length > 1400) warn(id, `passage very long (${q.passage.length} chars)`);
}

/* ---------- coverage report ---------- */
console.log(`\n${QUESTIONS.length} questions total\n`);
const rows = [];
for (const sec of ["rw", "math"]) {
  for (const d of DOMAINS[sec]) {
    const qs = QUESTIONS.filter(q => q.domain === d.id);
    const byDiff = [1, 2, 3].map(k => qs.filter(q => q.diff === k).length);
    const spr = qs.filter(q => q.type === "spr").length;
    rows.push({ domain: d.name, total: qs.length, easy: byDiff[0], med: byDiff[1], hard: byDiff[2], spr });
    for (const sk of d.skills) {
      const n = qs.filter(q => q.skill === sk).length;
      if (n === 0) warn(d.id, `skill "${sk}" has NO questions`);
    }
  }
}
console.table(rows);

if (warns.length) { console.log("WARNINGS:"); warns.forEach(w => console.log("  ⚠ " + w)); }
if (errors.length) {
  console.log("\nERRORS:"); errors.forEach(e => console.log("  ✗ " + e));
  console.log(`\nFAILED: ${errors.length} error(s)`);
  process.exit(1);
}
console.log(`\nOK: all ${QUESTIONS.length} questions structurally valid`);
