#!/usr/bin/env node
/* ============================================================
   Regenerate js/videos.js from verified video-research output.
   Usage: node tools/integrate-videos.js <workflow-output.json>

   Merges research results over the existing defaults:
     - per-skill search queries: verified suggestion wins, else keep
     - per-skill picks: only links that pass strict URL validation
     - channels: deduped across domains
   Anything that fails validation is dropped and reported, never
   guessed. Search queries always survive, so the file stays fully
   functional even if every pick is rejected.
   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const inPath = process.argv[2];
if (!inPath) { console.error("usage: node tools/integrate-videos.js <workflow-output.json>"); process.exit(1); }

const VFILE = path.join(__dirname, "..", "js", "videos.js");
const QFILE = path.join(__dirname, "..", "js", "questions.js");

// load current defaults + the domain taxonomy
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync(QFILE, "utf8") + "\n" + fs.readFileSync(VFILE, "utf8") +
  "\n;this.__x = { SKILL_VIDEOS, TOPIC_VIDEOS, VIDEO_CHANNELS, DOMAINS, DOMAIN_BY_ID };", ctx);
const { SKILL_VIDEOS, TOPIC_VIDEOS, DOMAINS, DOMAIN_BY_ID } = ctx.__x;

let payload = JSON.parse(fs.readFileSync(inPath, "utf8"));
if (payload.result) payload = payload.result;
const domains = payload.domains || [];

const dropped = [];
const WATCH_RE = /^https:\/\/(?:www\.)?youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}(?:&[\w=%.-]*)?$/;
const CHANNEL_RE = /^https:\/\/(?:www\.)?youtube\.com\/(?:@[A-Za-z0-9._-]+|c\/[A-Za-z0-9._-]+|channel\/UC[A-Za-z0-9_-]{22}|user\/[A-Za-z0-9._-]+)$/;
const MAX_PICKS_PER_SKILL = 2;

function cleanText(s, max = 120) {
  return String(s || "").replace(/\s+/g, " ").trim().slice(0, max);
}
// same channel reaches us as /@chan, /@chan/, /@chan/videos, /channel/UC...
function normalizeChannelUrl(raw) {
  return String(raw || "").trim()
    .replace(/\?.*$/, "")
    .replace(/\/(videos|featured|about|playlists|shorts)\/?$/i, "")
    .replace(/\/+$/, "");
}
const nameKey = s => cleanText(s, 60).toLowerCase().replace(/[^a-z0-9]/g, "");

/* ---- channels: dedupe by channel NAME, preferring the @handle URL ---- */
const channelMap = new Map();
for (const d of domains) {
  for (const c of d.channels || []) {
    const url = normalizeChannelUrl(c.url);
    if (!CHANNEL_RE.test(url)) { dropped.push(`channel URL rejected: ${c.name} → ${c.url}`); continue; }
    if (!c.name || !c.why) { dropped.push(`channel missing name/why: ${c.url}`); continue; }
    const key = nameKey(c.name);
    const entry = { name: cleanText(c.name, 60), url, why: cleanText(c.why, 110) };
    const existing = channelMap.get(key);
    if (!existing) { channelMap.set(key, entry); continue; }
    // same channel seen again: keep the friendlier @handle form
    if (!existing.url.includes("/@") && url.includes("/@")) channelMap.set(key, entry);
    else dropped.push(`duplicate channel "${c.name}": ${url}`);
  }
}

/* second pass: the same channel can arrive under two different names
   (e.g. "Penguin SAT Prep" and "Penguin Test Prep"), so collapse by URL */
const byUrl = new Map();
for (const [key, entry] of channelMap) {
  const u = entry.url.toLowerCase();
  if (byUrl.has(u)) { dropped.push(`same channel URL under another name: "${entry.name}" → ${entry.url}`); channelMap.delete(key); }
  else byUrl.set(u, key);
}

/* ---- per-skill queries + picks ---- */
const skillOut = {};
for (const sec of ["rw", "math"]) {
  for (const d of DOMAINS[sec]) {
    for (const sk of d.skills) {
      const key = d.id + "|" + sk;
      skillOut[key] = { query: SKILL_VIDEOS[key] ? SKILL_VIDEOS[key].query : `Digital SAT ${sk} explained`, picks: [] };
    }
  }
}
const seenVideo = new Set();
for (const d of domains) {
  const domId = d.d && d.d.id;
  if (!domId || !DOMAIN_BY_ID[domId]) { dropped.push(`unknown domain in results: ${JSON.stringify(d.d)}`); continue; }
  for (const s of d.skills || []) {
    const key = domId + "|" + s.skill;
    if (!skillOut[key]) { dropped.push(`unknown skill: ${key}`); continue; }
    if (s.searchQuery && cleanText(s.searchQuery, 140).length >= 10) {
      skillOut[key].query = cleanText(s.searchQuery, 140);
    }
    for (const v of s.videos || []) {
      if (skillOut[key].picks.length >= MAX_PICKS_PER_SKILL) { dropped.push(`over pick limit for ${key}: ${v.title}`); continue; }
      const url = String(v.url || "").trim();
      if (!WATCH_RE.test(url)) { dropped.push(`video URL rejected: ${v.title} → ${v.url}`); continue; }
      const id = url.split("v=")[1].slice(0, 11);
      if (seenVideo.has(id)) { dropped.push(`duplicate video id ${id}: ${v.title}`); continue; }
      if (!v.title || !v.channel) { dropped.push(`video missing title/channel: ${url}`); continue; }
      // a pick whose channel the researcher could not identify is too weak to ship
      if (/unverified|did not appear|unknown/i.test(v.channel)) {
        dropped.push(`unidentified channel, pick dropped: ${v.title}`); continue;
      }
      seenVideo.add(id);
      skillOut[key].picks.push({
        title: cleanText(v.title, 90),
        channel: cleanText(v.channel, 50),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }
  }
}

/* ---- emit ---- */
const j = (o) => JSON.stringify(o);
let out = `/* ============================================================
   Summit SAT — video learning links
   ------------------------------------------------------------
   Two kinds of link, deliberately:

   1. SEARCH LINKS (always present). A precise YouTube search
      phrase per skill. These can never 404 or go stale — the
      results page always reflects whatever is currently best.
   2. PICKS (optional). Specific videos, only ever added here
      after being found in real search results and independently
      corroborated. Never write one from memory; a wrong video ID
      sends a student to a dead or unrelated page.

   Every skill works with search links alone, so picks are purely
   a bonus and the feature degrades gracefully without them.

   This file is generated by tools/integrate-videos.js.
   ============================================================ */

function ytSearchUrl(query) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
}

/* Trusted channels, shown as general "where to learn this" links.
   Populated only with independently corroborated entries. */
const VIDEO_CHANNELS = [
${[...channelMap.values()].map(c => `  { name: ${j(c.name)}, url: ${j(c.url)}, why: ${j(c.why)} },`).join("\n")}
];

/* key: "<domainId>|<skill>" → { query, picks: [{title, channel, url}] } */
const SKILL_VIDEOS = {
`;
for (const sec of ["rw", "math"]) {
  const secName = sec === "rw" ? "Reading & Writing" : "Math";
  for (const d of DOMAINS[sec]) {
    out += `  // ---------- ${secName} · ${d.name} ----------\n`;
    for (const sk of d.skills) {
      const e = skillOut[d.id + "|" + sk];
      out += `  ${j(d.id + "|" + sk)}: {\n    query: ${j(e.query)},\n`;
      if (!e.picks.length) {
        out += `    picks: [],\n`;
      } else {
        out += `    picks: [\n`;
        e.picks.forEach(p => {
          out += `      { title: ${j(p.title)}, channel: ${j(p.channel)}, url: ${j(p.url)} },\n`;
        });
        out += `    ],\n`;
      }
      out += `  },\n`;
    }
  }
}
out += `};

/* Broader topics that aren't a single skill */
const TOPIC_VIDEOS = {
${Object.entries(TOPIC_VIDEOS).map(([k, v]) =>
  `  ${k}: { label: ${j(v.label)}, query: ${j(v.query)} },`).join("\n")}
};

function videosForSkill(domainId, skill) {
  const entry = SKILL_VIDEOS[domainId + "|" + skill];
  if (!entry) return null;
  return { query: entry.query, url: ytSearchUrl(entry.query), picks: entry.picks || [] };
}
function videosForDomain(domainId) {
  const dom = typeof DOMAIN_BY_ID !== "undefined" ? DOMAIN_BY_ID[domainId] : null;
  if (!dom) return [];
  return dom.skills.map(s => ({ skill: s, ...videosForSkill(domainId, s) })).filter(v => v.query);
}
`;

fs.writeFileSync(VFILE, out);

const pickCount = Object.values(skillOut).reduce((n, e) => n + e.picks.length, 0);
console.log(`channels kept: ${channelMap.size}`);
console.log(`video picks kept: ${pickCount}`);
console.log(`skills with a query: ${Object.keys(skillOut).length}`);
if (dropped.length) {
  console.log(`\ndropped (${dropped.length}):`);
  dropped.forEach(d => console.log("  ✗ " + d));
}
