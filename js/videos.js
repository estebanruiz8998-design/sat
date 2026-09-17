/* ============================================================
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
   ============================================================ */

function ytSearchUrl(query) {
  return "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
}

/* Trusted channels, shown as general "where to learn this" links.
   Populated only with independently corroborated entries. */
const VIDEO_CHANNELS = [];

/* key: "<domainId>|<skill>" → { query, picks: [{title, channel, url}] } */
const SKILL_VIDEOS = {
  // ---------- Reading & Writing · Information and Ideas ----------
  "info|Central Ideas": {
    query: "Digital SAT central ideas and details questions explained",
    picks: [],
  },
  "info|Evidence & Support": {
    query: "Digital SAT command of evidence questions strategy",
    picks: [],
  },
  "info|Inferences": {
    query: "Digital SAT inference questions which choice most logically completes",
    picks: [],
  },

  // ---------- Reading & Writing · Craft and Structure ----------
  "craft|Words in Context": {
    query: "Digital SAT words in context vocabulary strategy",
    picks: [],
  },
  "craft|Text Structure & Purpose": {
    query: "Digital SAT text structure and purpose questions explained",
    picks: [],
  },
  "craft|Cross-Text Connections": {
    query: "Digital SAT cross-text connections paired passages strategy",
    picks: [],
  },

  // ---------- Reading & Writing · Expression of Ideas ----------
  "expr|Transitions": {
    query: "Digital SAT transition words questions explained",
    picks: [],
  },
  "expr|Rhetorical Synthesis": {
    query: "Digital SAT rhetorical synthesis bullet point notes questions",
    picks: [],
  },

  // ---------- Reading & Writing · Standard English Conventions ----------
  "conv|Punctuation & Boundaries": {
    query: "Digital SAT punctuation rules comma semicolon colon sentence boundaries",
    picks: [],
  },
  "conv|Subject-Verb Agreement": {
    query: "Digital SAT subject verb agreement questions explained",
    picks: [],
  },
  "conv|Verb Forms & Pronouns": {
    query: "Digital SAT verb tense and pronoun agreement questions",
    picks: [],
  },

  // ---------- Math · Algebra ----------
  "alg|Linear Equations": {
    query: "Digital SAT linear equations in one variable explained",
    picks: [],
  },
  "alg|Systems of Equations": {
    query: "Digital SAT systems of equations no solution infinitely many solutions",
    picks: [],
  },
  "alg|Linear Functions & Graphs": {
    query: "Digital SAT linear functions slope and y-intercept word problems",
    picks: [],
  },

  // ---------- Math · Advanced Math ----------
  "adv|Quadratics": {
    query: "Digital SAT quadratic equations vertex form discriminant",
    picks: [],
  },
  "adv|Exponents & Radicals": {
    query: "Digital SAT exponent rules and radicals explained",
    picks: [],
  },
  "adv|Nonlinear Functions": {
    query: "Digital SAT exponential growth and decay functions explained",
    picks: [],
  },

  // ---------- Math · Problem-Solving & Data Analysis ----------
  "data|Ratios & Percentages": {
    query: "Digital SAT ratios rates and percentages word problems",
    picks: [],
  },
  "data|Statistics & Probability": {
    query: "Digital SAT probability mean median and standard deviation questions",
    picks: [],
  },
  "data|Data Interpretation": {
    query: "Digital SAT scatterplots line of best fit and data tables",
    picks: [],
  },

  // ---------- Math · Geometry & Trigonometry ----------
  "geo|Angles & Triangles": {
    query: "Digital SAT lines angles and similar triangles explained",
    picks: [],
  },
  "geo|Circles & Area": {
    query: "Digital SAT circles equation of a circle arc length and sector area",
    picks: [],
  },
  "geo|Right-Triangle Trig": {
    query: "Digital SAT right triangle trigonometry SOHCAHTOA explained",
    picks: [],
  },
};

/* Broader topics that aren't a single skill */
const TOPIC_VIDEOS = {
  desmos: { label: "Using the built-in Desmos calculator", query: "Digital SAT Desmos calculator tips and tricks" },
  pacing: { label: "Pacing and timing strategy", query: "Digital SAT pacing strategy timing tips" },
  adaptive: { label: "How the adaptive test works", query: "Digital SAT adaptive modules how scoring works explained" },
  spr: { label: "Fill-in (student-produced response) answers", query: "Digital SAT student produced response grid in rules" },
  overview: { label: "Full Digital SAT overview", query: "Digital SAT format overview what to expect" },
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
