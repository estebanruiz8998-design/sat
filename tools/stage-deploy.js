#!/usr/bin/env node
/* ============================================================
   Stage deployment variants of the site into an output dir.
   The question bank and engine ship as separate deployments
   (kept small enough to upload inline), and the main site's
   HTML references them by absolute URL.

   Usage:
     node tools/stage-deploy.js <outDir> [rw1Url] [rw2Url] [mathUrl] [codeUrl]

   Pass the four base URLs once known (no trailing slash) to
   rewrite app.html; omit them to stage only the bank/code files.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const [outDir, rw1Url, rw2Url, mathUrl, codeUrl] = process.argv.slice(2);
if (!outDir) { console.error("usage: node tools/stage-deploy.js <outDir> [rw1Url] [rw2Url] [mathUrl] [codeUrl]"); process.exit(1); }

const src = fs.readFileSync(path.join(ROOT, "js", "questions.js"), "utf8");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(src + "\n;this.__x = { QUESTIONS, DOMAINS };", ctx);
const { QUESTIONS, DOMAINS } = ctx.__x;

const mk = p => fs.mkdirSync(p, { recursive: true });
const w = (p, c) => { mk(path.dirname(p)); fs.writeFileSync(p, c); console.log("  " + p + "  " + c.length + "B"); };

// one field per line: keeps every line short enough for line-based
// tooling while staying compact
const compact = qs => "QUESTIONS.push(\n" + qs.map(q => JSON.stringify(q, null, 1)).join(",\n") + "\n);\n";

/* bank deployments: compact push files, RW split in two to keep
   each upload comfortably small */
const rw1Qs = QUESTIONS.filter(q => q.section === "rw" && ["info", "craft"].includes(q.domain));
const rw2Qs = QUESTIONS.filter(q => q.section === "rw" && ["expr", "conv"].includes(q.domain));
const mathQs = QUESTIONS.filter(q => q.section === "math");
if (rw1Qs.length + rw2Qs.length + mathQs.length !== QUESTIONS.length) {
  console.error("BANK SPLIT LOST QUESTIONS"); process.exit(1);
}
w(path.join(outDir, "rw1", "questions-rw1.js"), compact(rw1Qs));
w(path.join(outDir, "rw2", "questions-rw2.js"), compact(rw2Qs));
w(path.join(outDir, "math", "questions-math.js"), compact(mathQs));

/* code deployment: engine files, verbatim */
w(path.join(outDir, "code", "tutor.js"), fs.readFileSync(path.join(ROOT, "js", "tutor.js"), "utf8"));
w(path.join(outDir, "code", "app.js"), fs.readFileSync(path.join(ROOT, "js", "app.js"), "utf8"));

/* main deployment: bank scaffolding + css + html */
const bankCore = "/* Summit SAT — bank scaffolding (deployment split) */\n" +
  "const DOMAINS = " + JSON.stringify(DOMAINS, null, 2) + ";\n" +
  "const QUESTIONS = [];\n";
const bankIndex = "/* Summit SAT — bank lookups, built after all bank scripts load */\n" +
  "const Q_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));\n" +
  "const ALL_DOMAINS = [...DOMAINS.rw, ...DOMAINS.math];\n" +
  "const DOMAIN_BY_ID = Object.fromEntries(ALL_DOMAINS.map(d => [d.id, d]));\n" +
  "function domainSection(domId) { return DOMAINS.rw.some(d => d.id === domId) ? \"rw\" : \"math\"; }\n";
w(path.join(outDir, "main", "js", "bank-core.js"), bankCore);
w(path.join(outDir, "main", "js", "bank-index.js"), bankIndex);
w(path.join(outDir, "main", "css", "style.css"), fs.readFileSync(path.join(ROOT, "css", "style.css"), "utf8"));

for (const page of ["index.html"]) {
  w(path.join(outDir, "main", page), fs.readFileSync(path.join(ROOT, page), "utf8"));
}

let appHtml = fs.readFileSync(path.join(ROOT, "app.html"), "utf8");
if (rw1Url && rw2Url && mathUrl && codeUrl) {
  const scripts = [
    `<script src="js/bank-core.js"></script>`,
    `<script src="${rw1Url}/questions-rw1.js"></script>`,
    `<script src="${rw2Url}/questions-rw2.js"></script>`,
    `<script src="${mathUrl}/questions-math.js"></script>`,
    `<script src="js/bank-index.js"></script>`,
    `<script src="${codeUrl}/tutor.js"></script>`,
    `<script src="${codeUrl}/app.js"></script>`,
  ].join("\n");
  const before = appHtml;
  appHtml = appHtml.replace(
    /<script src="js\/questions\.js"><\/script>\s*<script src="js\/tutor\.js"><\/script>\s*<script src="js\/app\.js"><\/script>/,
    scripts);
  if (appHtml === before) { console.error("FAILED to rewrite app.html script tags"); process.exit(1); }
  w(path.join(outDir, "main", "app.html"), appHtml);
} else {
  console.log("  (skipping app.html rewrite — bank/code URLs not provided yet)");
}

/* JSON-escaped companions (*.esc): line i is the JSON string encoding
   of source line i, ending in a literal backslash-n. Concatenating all
   .esc lines (no separators) yields the exact JSON string body for the
   whole file — verified here by a round-trip parse. */
const escDirs = ["rw1", "rw2", "math", "code", "main"];
for (const d of escDirs) {
  const dir = path.join(outDir, d);
  if (!fs.existsSync(dir)) continue;
  const walkEsc = p => fs.readdirSync(p, { withFileTypes: true }).forEach(e => {
    const fp = path.join(p, e.name);
    if (e.isDirectory()) return walkEsc(fp);
    if (fp.endsWith(".esc")) return;
    const content = fs.readFileSync(fp, "utf8");
    const lines = content.split("\n");
    // content ends with \n → last element is "", which naturally drops the trailing escape
    const escLines = lines.map((l, i) => {
      const body = JSON.stringify(l).slice(1, -1);
      return i < lines.length - 1 ? body + "\\n" : body;
    }).filter((l, i, a) => !(i === a.length - 1 && l === ""));
    const joined = escLines.join("");
    if (JSON.parse('"' + joined + '"') !== content) {
      console.error("ESC ROUND-TRIP FAILED for " + fp); process.exit(1);
    }
    fs.writeFileSync(fp + ".esc", escLines.join("\n") + "\n");
  });
  walkEsc(dir);
}
console.log("escaped companions written and round-trip verified");

/* checksums for post-deploy verification */
const crypto = require("crypto");
const sums = [];
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else sums.push(crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex").slice(0, 16) + "  " + path.relative(outDir, p));
});
walk(outDir);
console.log("\nchecksums (sha256/16):");
sums.forEach(s => console.log("  " + s));
