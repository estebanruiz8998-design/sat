#!/usr/bin/env node
/* ============================================================
   Integrate verified authored questions into js/questions.js.
   Usage: node tools/integrate-questions.js <workflow-output.json>
   Expects {batches:[{d:{id,section}, kept:[...]}]} (or {result:{...}}).
   Appends normalized questions before the closing `];` of QUESTIONS,
   skipping duplicate ids. Run tools/validate-questions.js after.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const outPath = process.argv[2];
if (!outPath) { console.error("usage: node tools/integrate-questions.js <workflow-output.json>"); process.exit(1); }

const QFILE = path.join(__dirname, "..", "js", "questions.js");
const src = fs.readFileSync(QFILE, "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src + "\n;this.__x = { QUESTIONS, DOMAINS };", ctx);
const existingIds = new Set(ctx.__x.QUESTIONS.map(q => q.id));
const domSection = {};
for (const sec of ["rw", "math"]) for (const d of ctx.__x.DOMAINS[sec]) domSection[d.id] = sec;

let payload = JSON.parse(fs.readFileSync(outPath, "utf8"));
if (payload.result) payload = payload.result;
const batches = payload.batches || [];
if (!batches.length) { console.error("no batches found in payload"); process.exit(1); }

const added = [];
let skippedDup = 0, skippedBad = 0;

for (const b of batches) {
  const domId = b.d?.id;
  const section = b.d?.section || domSection[domId];
  if (!domId || !section) continue;
  for (const q of b.kept || []) {
    if (!q?.id || existingIds.has(q.id)) { skippedDup += q?.id ? 1 : 0; continue; }
    const isSpr = q.type === "spr";
    const norm = {
      id: q.id, section, domain: domId, skill: q.skill,
      diff: Math.max(1, Math.min(3, q.diff | 0)),
    };
    if (isSpr) norm.type = "spr";
    if (q.passage && String(q.passage).trim()) norm.passage = String(q.passage).trim();
    norm.stem = String(q.stem).trim();
    if (isSpr) {
      norm.answer = String(q.answer).trim();
      const acc = (q.accept || []).map(a => String(a).trim()).filter(Boolean);
      if (!acc.includes(norm.answer)) acc.unshift(norm.answer);
      norm.accept = [...new Set(acc)];
    } else {
      if (!Array.isArray(q.choices) || q.choices.length !== 4) { skippedBad++; continue; }
      norm.choices = q.choices.map(c => String(c).trim());
      norm.answer = 0; // authors put the correct answer first; the app shuffles at render
    }
    norm.explanation = String(q.explanation).trim();
    norm.hints = (q.hints || []).map(h => String(h).trim()).slice(0, 3);
    if (norm.hints.length !== 3 || !norm.stem || !norm.explanation) { skippedBad++; continue; }
    added.push(norm);
    existingIds.add(norm.id);
  }
}

if (!added.length) { console.error("nothing to add"); process.exit(1); }

const marker = "\n];\n\n/* Helper lookups";
const at = src.indexOf(marker);
if (at === -1) { console.error("could not find QUESTIONS array end marker"); process.exit(1); }

const block = "\n  /* ================= VERIFIED AUTHORED EXPANSION ================= */\n" +
  added.map(q => "  " + JSON.stringify(q, null, 2).split("\n").join("\n  ") + ",").join("\n") + "\n";

fs.writeFileSync(QFILE, src.slice(0, at) + block + src.slice(at + 1));
console.log(`added ${added.length} questions (${skippedDup} duplicate ids skipped, ${skippedBad} structurally bad skipped)`);
const bySec = { rw: 0, math: 0 };
added.forEach(q => bySec[q.section]++);
console.log(`  rw +${bySec.rw}, math +${bySec.math}`);
