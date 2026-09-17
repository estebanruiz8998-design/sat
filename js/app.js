/* ============================================================
   Summit SAT — application logic (v2)
   Views: onboarding, dashboard, practice, exam, modules,
   plan, tutor, guide, analytics, settings.
   Evidence-based design:
   - retrieval-first practice, immediate feedback in learning mode
   - spaced review queue (intervals capped at ~15-20% of days-to-test)
   - interleaving: mixed sets, topics hidden until answered
   - error log with one-tap cause tagging
   - untimed → soft-timed → fully-timed progression
   - full-length adaptive mocks at real Digital SAT spec
   All state persists to localStorage. No accounts, no server.
   ============================================================ */

/* ---------------- state ---------------- */
const STORE_KEY = "summit_sat_v1";

const DEFAULT_STATE = () => ({
  profile: null,               // {name, testDate, targetScore}
  attempts: [],                // {qid, correct, diff, ts, mode, secs, cause}
  exams: [],                   // {ts, kind, rw, math, total, correct, count, hardM2, detail:[...]}
  xp: 0,
  streakDays: [],              // ["2026-09-17", ...]
  plan: null,                  // {generatedAt, weeks:[{label, tasks:[{id,text,type,done}]}]}
  badges: [],
  chat: [],                    // {who:"user"|"bot", text}
  reviewQueue: [],             // {qid, due, interval, successes}
  prefs: { timing: "soft" },   // practice timing: "untimed" | "soft"
});

let S = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(DEFAULT_STATE(), JSON.parse(raw));
  } catch (e) { /* corrupted or unavailable storage — start fresh */ }
  return DEFAULT_STATE();
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) { /* storage full/blocked */ }
  renderSideStats();
}

/* ---------------- utilities ---------------- */
const $ = sel => document.querySelector(sel);
const main = () => $("#main");

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}
function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
function addDays(key, n) {
  const d = new Date(key + "T00:00:00");
  d.setDate(d.getDate() + n);
  return todayKey(d);
}
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2800);
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function daysUntil(iso) {
  if (!iso) return null;
  const diff = new Date(iso + "T00:00:00") - new Date(todayKey() + "T00:00:00");
  return Math.round(diff / 86400000);
}
function fmtClock(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
// benchmark pace per question (real Digital SAT): RW ~71s, Math ~95s
const BENCH = { rw: 71, math: 95 };

/* ---------------- streak / xp / badges ---------------- */
const sessionStart = Date.now();

function touchStreak() {
  const t = todayKey();
  if (!S.streakDays.includes(t)) {
    S.streakDays.push(t);
    S.streakDays.sort();
    if (S.streakDays.length > 400) S.streakDays = S.streakDays.slice(-400);
  }
}
function streakCount() {
  const set = new Set(S.streakDays);
  let n = 0;
  const d = new Date();
  if (!set.has(todayKey(d))) d.setDate(d.getDate() - 1);
  while (set.has(todayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function level() { return Math.floor(Math.sqrt(S.xp / 50)); }

const BADGES = [
  { id: "first", ico: "👣", name: "First Steps", desc: "Answer your first question", test: () => S.attempts.length >= 1 },
  { id: "diag", ico: "🩺", name: "Diagnosed", desc: "Complete your diagnostic exam", test: () => S.exams.length >= 1 },
  { id: "s3", ico: "🔥", name: "On a Roll", desc: "3-day study streak", test: () => streakCount() >= 3 },
  { id: "s7", ico: "🌋", name: "Unstoppable", desc: "7-day study streak", test: () => streakCount() >= 7 },
  { id: "xp500", ico: "⭐", name: "Rising Star", desc: "Earn 500 XP", test: () => S.xp >= 500 },
  { id: "xp2000", ico: "🌟", name: "Summit Bound", desc: "Earn 2,000 XP", test: () => S.xp >= 2000 },
  { id: "perfect", ico: "🎯", name: "Perfect Set", desc: "Finish a practice set with 100%", test: () => S._perfectSet === true || S.badges.includes("perfect") },
  { id: "century", ico: "💯", name: "Centurion", desc: "Answer 100 questions", test: () => S.attempts.length >= 100 },
  { id: "mock2", ico: "📝", name: "Battle Tested", desc: "Complete 3 mock exams", test: () => S.exams.length >= 3 },
  { id: "fulltest", ico: "🏟️", name: "Full Distance", desc: "Complete a full-length exam", test: () => S.exams.some(e => e.kind === "full") },
  { id: "reviewer", ico: "🔁", name: "Closer", desc: "Clear 10 spaced reviews", test: () => (S._reviewsCleared || 0) >= 10 || S.badges.includes("reviewer") },
  { id: "1400", ico: "🏔️", name: "Peak 1400", desc: "Score 1400+ on a mock", test: () => S.exams.some(e => e.total >= 1400) },
];
function checkBadges() {
  const earned = [];
  BADGES.forEach(b => {
    if (!S.badges.includes(b.id) && b.test()) { S.badges.push(b.id); earned.push(b); }
  });
  if (earned.length) {
    save();
    toast(`${earned[0].ico} Badge earned: ${earned[0].name}!`);
  }
}

/* ---------------- mastery & prediction ---------------- */
function statsBy(keyFn) {
  const per = {};
  S.attempts.forEach(a => {
    const q = Q_BY_ID[a.qid]; if (!q) return;
    const k = keyFn(q); if (!k) return;
    per[k] = per[k] || { seen: 0, correct: 0 };
    per[k].seen++; if (a.correct) per[k].correct++;
  });
  return per;
}
const statsByDomain = () => statsBy(q => q.domain);
const statsBySkill = () => statsBy(q => q.domain + "|" + q.skill);

function sectionAccuracy(section) {
  let seen = 0, correct = 0;
  S.attempts.forEach(a => {
    const q = Q_BY_ID[a.qid]; if (!q || q.section !== section) return;
    seen++; if (a.correct) correct++;
  });
  return seen ? correct / seen : null;
}

function predictedScore() {
  if (S.exams.length) return S.exams[S.exams.length - 1].total;
  const rw = sectionAccuracy("rw"), m = sectionAccuracy("math");
  if (rw === null && m === null) return null;
  const est = a => a === null ? 500 : Math.round((200 + 600 * a) / 10) * 10;
  return est(rw) + est(m);
}

function weakestDomains(n = 2) {
  const per = statsByDomain();
  const rows = ALL_DOMAINS.map(d => {
    const s = per[d.id] || { seen: 0, correct: 0 };
    return { id: d.id, name: d.name, icon: d.icon, seen: s.seen, acc: s.seen ? s.correct / s.seen : 0.5 };
  });
  rows.sort((a, b) => (a.acc - b.acc) || (a.seen - b.seen));
  return rows.slice(0, n);
}

function bankCount(section) { return QUESTIONS.filter(q => q.section === section).length; }
function fullExamAvailable() { return bankCount("rw") >= 54 && bankCount("math") >= 44; }

/* ---------------- spaced review queue ----------------
   Gap research (Cepeda et al. 2008): optimal review gap is roughly
   10-20% of the retention interval. We cap intervals at ~18% of
   days-until-test, floor 2, ceiling 14. A miss enters at 2 days;
   each spaced success multiplies the interval; 3 spaced successes
   graduate the item out of the queue. */
function reviewCap() {
  const d = daysUntil(S.profile?.testDate);
  if (d === null || d <= 0) return 7;
  return Math.min(14, Math.max(2, Math.round(d * 0.18)));
}
function pushReview(qid) {
  if (S.reviewQueue.some(r => r.qid === qid)) {
    const r = S.reviewQueue.find(r => r.qid === qid);
    r.interval = 2; r.successes = 0; r.due = addDays(todayKey(), 2);
  } else {
    S.reviewQueue.push({ qid, due: addDays(todayKey(), 2), interval: 2, successes: 0 });
  }
}
function reviewOutcome(qid, correct) {
  const r = S.reviewQueue.find(r => r.qid === qid);
  if (!r) return;
  if (correct) {
    r.successes++;
    S._reviewsCleared = (S._reviewsCleared || 0) + 1;
    if (r.successes >= 3) {
      S.reviewQueue = S.reviewQueue.filter(x => x.qid !== qid);
    } else {
      r.interval = Math.min(Math.round(r.interval * 2.2), reviewCap());
      r.due = addDays(todayKey(), r.interval);
    }
  } else {
    r.interval = 2; r.successes = 0; r.due = addDays(todayKey(), 2);
  }
}
function dueReviews() {
  const t = todayKey();
  return S.reviewQueue.filter(r => r.due <= t && Q_BY_ID[r.qid]);
}

/* ---------------- study plan ----------------
   Session science: 25-40 min sessions, 4-6 days/week beats
   marathons; ≥3 timed full simulations per plan with one in the
   final 10 days; interleaved mixed sets after initial learning. */
function generatePlan() {
  const days = daysUntil(S.profile?.testDate) ?? 42;
  const weeksLeft = Math.min(12, Math.max(1, Math.ceil(days / 7)));
  const weak = weakestDomains(2);
  const mockWeeks = new Set([1]);
  if (weeksLeft >= 3) mockWeeks.add(Math.ceil(weeksLeft / 2));
  mockWeeks.add(weeksLeft);
  if (weeksLeft >= 5) mockWeeks.add(weeksLeft - 1);
  const weeks = [];
  for (let w = 1; w <= weeksLeft; w++) {
    const tasks = [];
    const push = (text, type) => tasks.push({ id: `w${w}t${tasks.length}`, text, type, done: false });
    if (w === 1 && !S.exams.length) push("Take your diagnostic mock exam (sets your baseline)", "exam");
    push(`Focused set: 10 questions on ${weak[0].icon} ${weak[0].name} — untimed, accuracy first`, "practice");
    push("Interleaved set: 10 mixed questions, soft-timed (topics hidden — pick the strategy yourself)", "practice");
    push("Clear your spaced review queue (misses come back on schedule — that's the plan working)", "review");
    push(`Focused set: 10 questions on ${weak[1].icon} ${weak[1].name}, soft-timed`, "practice");
    push("Read one module lesson, then drill it with 5 questions", "module");
    if (mockWeeks.has(w) && !(w === 1 && !S.exams.length)) {
      push(w === weeksLeft
        ? "Final timed mock exam (within 10 days of test day)"
        : "Timed mock exam + full review of every miss", "exam");
    }
    if (w === weeksLeft) {
      push("Test-week toolkit: 7-minute worry dump + reframe your nerves (Guide tab)", "guide");
    }
    weeks.push({ label: `Week ${w}`, tasks });
  }
  S.plan = { generatedAt: todayKey(), weeks };
  save();
}
function planProgress() {
  if (!S.plan) return null;
  let all = 0, done = 0;
  S.plan.weeks.forEach(w => w.tasks.forEach(t => { all++; if (t.done) done++; }));
  return all ? Math.round(done / all * 100) : 0;
}

/* ---------------- router ---------------- */
let currentView = "dashboard";
function show(view, arg) {
  currentView = view;
  document.querySelectorAll(".side-link").forEach(b =>
    b.classList.toggle("active", b.dataset.view === view));
  window.scrollTo(0, 0);
  closeCalc();
  const views = {
    dashboard: renderDashboard, practice: renderPracticeSetup, exam: renderExamIntro,
    modules: renderModules, plan: renderPlan, tutor: renderTutor, guide: renderGuide,
    analytics: renderAnalytics, settings: renderSettings,
  };
  (views[view] || renderDashboard)(arg);
}
document.querySelectorAll(".side-link").forEach(b =>
  b.addEventListener("click", () => {
    if (quiz && quiz.mode === "exam" && !confirm("Leave the exam? This module's progress will be lost.")) return;
    stopTimer(); quiz = null;
    show(b.dataset.view);
  }));

function renderSideStats() {
  $("#side-streak").textContent = `🔥 ${streakCount()}-day streak`;
  $("#side-xp").textContent = `⭐ ${S.xp} XP · Lv ${level()}`;
}

/* ============================================================
   ONBOARDING
   ============================================================ */
function renderOnboarding() {
  main().innerHTML = `
    <div style="max-width:560px;margin:40px auto">
      <h1 class="page-title">Welcome to the climb ⛰️</h1>
      <p class="page-sub">Thirty seconds of setup, then we'll build your entire prep plan.</p>
      <div class="card">
        <div class="form-grid">
          <div class="field">
            <label for="ob-name">What should we call you?</label>
            <input id="ob-name" type="text" placeholder="e.g. Alex" maxlength="30">
          </div>
          <div class="field">
            <label for="ob-date">When is your SAT?</label>
            <input id="ob-date" type="date">
            <div class="hint">Your study plan and review schedule are built from this date.</div>
          </div>
          <div class="field">
            <label for="ob-target">Target score</label>
            <select id="ob-target">
              <option value="1200">1200 — solid</option>
              <option value="1300">1300 — strong</option>
              <option value="1400" selected>1400 — competitive</option>
              <option value="1500">1500 — elite</option>
              <option value="1600">1600 — perfect</option>
            </select>
            <div class="hint">Research on real prep: ~20 hours of focused practice averages ≈+115 points. Ranges, not guarantees — but the hours work.</div>
          </div>
          <button class="btn btn-primary btn-lg btn-block" id="ob-go">Build my plan →</button>
        </div>
      </div>
    </div>`;
  const dateEl = $("#ob-date");
  const dflt = new Date(); dflt.setDate(dflt.getDate() + 56);
  dateEl.value = todayKey(dflt);
  dateEl.min = todayKey();
  $("#ob-go").addEventListener("click", () => {
    const name = $("#ob-name").value.trim() || "Climber";
    S.profile = { name, testDate: dateEl.value || todayKey(dflt), targetScore: +$("#ob-target").value };
    generatePlan();
    save();
    toast(`Welcome, ${name}! Your plan is ready.`);
    show("dashboard");
  });
}

/* ============================================================
   DASHBOARD
   ============================================================ */
function renderDashboard() {
  if (!S.profile) return renderOnboarding();
  const pred = predictedScore();
  const days = daysUntil(S.profile.testDate);
  const prog = planProgress();
  const due = dueReviews().length;
  const per = statsByDomain();
  const weakRows = ALL_DOMAINS.map(d => {
    const s = per[d.id] || { seen: 0, correct: 0 };
    return { d, seen: s.seen, acc: s.seen ? s.correct / s.seen : null };
  });

  const diagCta = S.exams.length ? "" : `
    <div class="card" style="border-color:var(--brand);background:var(--brand-soft)">
      <div class="spread">
        <div>
          <h3>🩺 Start with your diagnostic</h3>
          <p class="small muted">A timed adaptive mock pinpoints your score and weak spots. Everything else calibrates from it.</p>
        </div>
        <button class="btn btn-primary" id="go-diag">Take the diagnostic →</button>
      </div>
    </div>`;

  const testWeek = (days !== null && days >= 0 && days <= 10) ? `
    <div class="card" style="border-color:var(--warn)">
      <div class="spread">
        <div>
          <h3>🧘 Test week is here</h3>
          <p class="small muted">Two research-backed nerve tools — a 7-minute worry dump and a 2-minute reframe — are in your Guide.</p>
        </div>
        <button class="btn btn-ghost" id="go-guide">Open the toolkit →</button>
      </div>
    </div>` : "";

  let taskHtml = "";
  if (S.plan) {
    const wk = currentWeekIndex();
    const week = S.plan.weeks[wk];
    const open = week.tasks.filter(t => !t.done).slice(0, 3);
    taskHtml = open.length
      ? open.map(t => `<div class="task"><input type="checkbox" data-w="${wk}" data-t="${esc(t.id)}" class="dash-task"><span class="t-text">${esc(t.text)}</span></div>`).join("")
      : `<p class="muted small">All of this week's tasks are done. Outstanding. 🏆</p>`;
    taskHtml = `<div class="card"><div class="spread"><h3>${esc(week.label)} — up next</h3>
      <button class="btn btn-ghost btn-sm" id="go-plan">Full plan →</button></div>${taskHtml}</div>`;
  }

  main().innerHTML = `
    <h1 class="page-title">Hey ${esc(S.profile.name)} 👋</h1>
    <p class="page-sub">${days !== null && days >= 0 ? `${days} day${days === 1 ? "" : "s"} until test day (${fmtDate(S.profile.testDate)})` : "Set your test date in Settings"} · target ${S.profile.targetScore}</p>

    <div class="tiles">
      <div class="tile brand"><div class="t-label">Predicted score</div>
        <div class="t-value">${pred ?? "—"}</div>
        <div class="t-note">${pred ? (pred >= S.profile.targetScore ? "🎉 at/above target!" : `${S.profile.targetScore - pred} to target`) : "take the diagnostic"}</div></div>
      <div class="tile amber"><div class="t-label">Streak</div>
        <div class="t-value">${streakCount()} 🔥</div>
        <div class="t-note">25-40 min/day beats weekend marathons</div></div>
      <div class="tile ${due ? "amber" : "green"}"><div class="t-label">Reviews due</div>
        <div class="t-value">${due}</div>
        <div class="t-note">${due ? "spaced repetition — clear them today" : "queue is clear"}</div></div>
      <div class="tile"><div class="t-label">Plan progress</div>
        <div class="t-value">${prog ?? 0}%</div>
        <div class="t-note">${S.attempts.length} questions answered</div></div>
    </div>

    ${diagCta}
    ${testWeek}

    <div class="row mt">
      <div class="card">
        <h3>Skill mastery</h3>
        ${weakRows.map(r => `
          <div class="skill-row">
            <span class="name">${r.d.icon} ${esc(r.d.name)}</span>
            <div class="bar ${r.acc === null ? "" : r.acc >= .75 ? "green" : r.acc >= .5 ? "amber" : "red"}"><i style="width:${r.acc === null ? 0 : Math.round(r.acc * 100)}%"></i></div>
            <span class="pct">${r.acc === null ? "—" : Math.round(r.acc * 100) + "%"}</span>
          </div>`).join("")}
        <p class="small muted mt">Red bars are the cheapest points available. Going 40%→70% in one domain beats 90%→95% in your best.</p>
      </div>
      <div>
        ${taskHtml}
        <div class="card">
          <h3>Quick actions</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${due ? `<button class="btn btn-accent" id="qa-review">🔁 Clear ${due} due review${due === 1 ? "" : "s"}</button>` : ""}
            <button class="btn btn-primary" id="qa-practice">🧠 Interleaved practice (10 questions)</button>
            <button class="btn btn-ghost" id="qa-exam">📝 ${S.exams.length ? "Take a mock exam" : "Take the diagnostic"}</button>
            <button class="btn btn-ghost" id="qa-tutor">🦉 Ask Professor Peak</button>
          </div>
        </div>
      </div>
    </div>`;

  $("#go-diag")?.addEventListener("click", () => show("exam"));
  $("#go-guide")?.addEventListener("click", () => show("guide"));
  $("#go-plan")?.addEventListener("click", () => show("plan"));
  $("#qa-review")?.addEventListener("click", () => startPractice({ review: true }));
  $("#qa-practice").addEventListener("click", () => startPractice({ section: "mixed", domain: "any", count: 10 }));
  $("#qa-exam").addEventListener("click", () => show("exam"));
  $("#qa-tutor").addEventListener("click", () => show("tutor"));
  document.querySelectorAll(".dash-task").forEach(cb => cb.addEventListener("change", e => {
    const wk = +e.target.dataset.w, id = e.target.dataset.t;
    const t = S.plan.weeks[wk].tasks.find(x => x.id === id);
    if (t) { t.done = e.target.checked; touchStreak(); save(); checkBadges(); }
    setTimeout(() => renderDashboard(), 250);
  }));
}
function currentWeekIndex() {
  if (!S.plan) return 0;
  const start = new Date(S.plan.generatedAt + "T00:00:00");
  const w = Math.floor((Date.now() - start) / (7 * 86400000));
  return Math.max(0, Math.min(S.plan.weeks.length - 1, w));
}

/* ============================================================
   SHARED QUIZ HELPERS
   ============================================================ */
let quiz = null;   // active session (practice or exam)
let timerH = null;

function stopTimer() { if (timerH) { clearInterval(timerH); timerH = null; } }

function pickQuestions({ section, domain, count, diffMin = 1, diffMax = 3, exclude = [], sprShare = 0 }) {
  const seenCount = {};
  S.attempts.forEach(a => { seenCount[a.qid] = (seenCount[a.qid] || 0) + 1; });
  const rank = qs => qs
    .map(q => ({ q, s: seenCount[q.id] || 0, r: Math.random() }))
    .sort((a, b) => (a.s - b.s) || (a.r - b.r))
    .map(x => x.q);
  const base = q =>
    (section === "mixed" || q.section === section) &&
    (domain === "any" || q.domain === domain) &&
    q.diff >= diffMin && q.diff <= diffMax &&
    !exclude.includes(q.id);
  if (sprShare > 0) {
    // math modules mix in fill-ins at roughly the real test's ~25% share
    const nSpr = Math.round(count * sprShare);
    const spr = rank(QUESTIONS.filter(q => base(q) && q.type === "spr")).slice(0, nSpr);
    const mc = rank(QUESTIONS.filter(q => base(q) && q.type !== "spr")).slice(0, count - spr.length);
    return mc.concat(spr).slice(0, count);
  }
  return rank(QUESTIONS.filter(base)).slice(0, count);
}

/* Real-test module assembly.
   Domain shares from the official framework: RW — Craft 28%, Info 26%,
   Conventions 26%, Expression 20%; Math — Algebra 35%, Advanced 35%,
   PSDA 15%, Geometry/Trig 15%. RW modules follow the fixed skill-order
   sequence (Words in Context first … Rhetorical Synthesis last, easier
   to harder within each block); Math runs easiest→hardest with domains
   interleaved and fill-ins scattered. */
const DOMAIN_SHARE = {
  rw: { craft: .28, info: .26, conv: .26, expr: .20 },
  math: { alg: .35, adv: .35, data: .15, geo: .15 },
};
const RW_SKILL_ORDER = [
  "Words in Context", "Text Structure & Purpose", "Cross-Text Connections",
  "Central Ideas", "Evidence & Support", "Inferences",
  "Punctuation & Boundaries", "Subject-Verb Agreement", "Verb Forms & Pronouns",
  "Transitions", "Rhetorical Synthesis",
];
function buildExamModule({ section, count, diffMin, diffMax, exclude, sprShare }) {
  const shares = DOMAIN_SHARE[section];
  let picked = [];
  const used = [...exclude];
  for (const [dom, share] of Object.entries(shares)) {
    const want = Math.round(count * share);
    const got = pickQuestions({ section, domain: dom, count: want, diffMin, diffMax, exclude: used, sprShare: section === "math" ? sprShare : 0 });
    picked = picked.concat(got);
    got.forEach(q => used.push(q.id));
  }
  if (picked.length < count) {
    const fill = pickQuestions({ section, domain: "any", count: count - picked.length, diffMin, diffMax, exclude: used });
    picked = picked.concat(fill);
    fill.forEach(q => used.push(q.id));
  }
  if (picked.length < count) {
    // thin bank fallback: relax the difficulty window
    const fill = pickQuestions({ section, domain: "any", count: count - picked.length, exclude: used });
    picked = picked.concat(fill);
  }
  picked = picked.slice(0, count);
  if (section === "rw") {
    picked.sort((a, b) => {
      const sa = RW_SKILL_ORDER.indexOf(a.skill), sb = RW_SKILL_ORDER.indexOf(b.skill);
      return (sa - sb) || (a.diff - b.diff);
    });
  } else {
    picked.sort((a, b) => a.diff - b.diff);
  }
  return picked;
}

function shuffledOrder(n) {
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

// SPR entry normalization: accepts "3/8", "0.375", ".375", "-1.5"
function normNum(s) {
  s = String(s ?? "").trim().replace(/^\+/, "");
  const frac = s.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (frac && Number(frac[2]) !== 0) return Number(frac[1]) / Number(frac[2]);
  const n = Number(s);
  return isNaN(n) ? null : n;
}
/* Official Digital SAT SPR grading: exact fraction/number matches count,
   and a long decimal counts when it fills the entry space, truncated OR
   rounded (e.g. for 2/3: .6666, .6667, 0.666, 0.667 — but not .67). */
function sprCorrect(q, entry) {
  entry = String(entry ?? "").trim();
  const v = normNum(entry);
  if (v === null) return false;
  const limit = entry.startsWith("-") ? 6 : 5;
  const decimals = (entry.split(".")[1] || "").length;
  const atCapacity = entry.length >= limit;
  return (q.accept || [q.answer]).some(a => {
    const av = normNum(a);
    if (av === null) return false;
    if (Math.abs(av - v) < 1e-9) return true;                       // exact
    if (entry.includes(".") && atCapacity && decimals > 0) {
      return Math.abs(av - v) < Math.pow(10, -decimals);            // filled-space truncation/rounding
    }
    return false;
  });
}
function validSprEntry(s) {
  // Digital SAT rules: digits, one '.' or '/', optional leading '-';
  // ≤5 characters (6 with the minus sign); no mixed numbers or symbols
  s = String(s ?? "").trim();
  if (!s) return false;
  const limit = s.startsWith("-") ? 6 : 5;
  return s.length <= limit && /^-?(\d+(\.\d*)?|\.\d+|\d+\/\d+)$/.test(s);
}
// Bluebook-style live answer preview ("7/2" → "= 3.5")
function sprPreview(s) {
  if (!validSprEntry(s)) return "";
  const v = normNum(s);
  if (v === null) return "";
  if (s.includes("/")) return `= ${+v.toFixed(6)}`;
  return "";
}

function choiceHtml(q, order, opts = {}) {
  if (q.type === "spr") {
    return `<div class="spr-wrap">
      <input class="spr-input" id="spr-in" autocomplete="off" spellcheck="false"
        placeholder="your answer" value="${esc(opts.value || "")}" maxlength="6">
      <div class="spr-rules" id="spr-prev" style="min-height:1.2em;font-weight:600"></div>
      <div class="spr-rules">Enter a number or a fraction like 7/2. Up to 5 characters (6 with a minus sign). Mixed numbers as improper fractions or decimals (3½ → 7/2 or 3.5). Long decimals: fill the space (2/3 → .6666 or .6667). No symbols or units.</div>
    </div>`;
  }
  return `<div class="choices" id="choices">
    ${order.map((orig, i) => `
      <button class="choice" data-i="${i}" data-orig="${orig}">
        <span class="letter">${"ABCD"[i]}</span><span class="choice-text">${esc(q.choices[orig])}</span>
        <span class="elim-btn" data-el="${i}" title="Cross out this choice">✕</span>
      </button>`).join("")}
  </div>`;
}

/* ============================================================
   PRACTICE (retrieval-first, interleaved, immediate feedback)
   ============================================================ */
function renderPracticeSetup() {
  if (!S.profile) return renderOnboarding();
  const due = dueReviews().length;
  const domOpts = s => DOMAINS[s].map(d => `<option value="${d.id}">${d.icon} ${esc(d.name)}</option>`).join("");
  main().innerHTML = `
    <h1 class="page-title">Practice</h1>
    <p class="page-sub">Questions adapt to you. In mixed sets, topics stay hidden until you answer — picking the strategy is the skill.</p>
    ${due ? `<div class="card mb" style="border-color:var(--warn)">
      <div class="spread">
        <div><h3>🔁 ${due} review${due === 1 ? "" : "s"} due</h3>
        <p class="small muted">Spaced repetition: questions you missed, back at the interval that makes them stick.</p></div>
        <button class="btn btn-accent" id="pr-review">Clear the queue →</button>
      </div></div>` : ""}
    <div class="card" style="max-width:560px">
      <div class="form-grid">
        <div class="field">
          <label>Section</label>
          <div class="seg" id="pr-section">
            <button data-v="mixed" class="on">Mixed</button>
            <button data-v="rw">Reading &amp; Writing</button>
            <button data-v="math">Math</button>
          </div>
        </div>
        <div class="field">
          <label for="pr-domain">Domain</label>
          <select id="pr-domain">
            <option value="any">Any (interleaved mix)</option>
            <optgroup label="Reading &amp; Writing">${domOpts("rw")}</optgroup>
            <optgroup label="Math">${domOpts("math")}</optgroup>
          </select>
        </div>
        <div class="field">
          <label>Length</label>
          <div class="seg" id="pr-count">
            <button data-v="5">5</button>
            <button data-v="10" class="on">10</button>
            <button data-v="15">15</button>
          </div>
        </div>
        <div class="field">
          <label>Timing</label>
          <div class="seg" id="pr-timing">
            <button data-v="untimed" ${S.prefs.timing === "untimed" ? 'class="on"' : ""}>Untimed</button>
            <button data-v="soft" ${S.prefs.timing !== "untimed" ? 'class="on"' : ""}>Soft-timed</button>
          </div>
          <div class="hint">Start untimed for accuracy; move to soft-timed to build the real pace (~71s RW / ~95s Math per question). Full pressure lives in Mock Exams.</div>
        </div>
        <button class="btn btn-primary btn-lg btn-block" id="pr-start">Start practicing →</button>
      </div>
    </div>`;
  const seg = (id) => {
    $(id).querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      $(id).querySelectorAll("button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
    }));
  };
  seg("#pr-section"); seg("#pr-count"); seg("#pr-timing");
  $("#pr-review")?.addEventListener("click", () => startPractice({ review: true }));
  $("#pr-start").addEventListener("click", () => {
    S.prefs.timing = $("#pr-timing .on").dataset.v; save();
    startPractice({
      section: $("#pr-section .on").dataset.v,
      domain: $("#pr-domain").value,
      count: +$("#pr-count .on").dataset.v,
    });
  });
}

function startPractice(cfg) {
  stopTimer();
  if (cfg.review) {
    const due = dueReviews();
    if (!due.length) { toast("No reviews due — the queue is clear!"); return show("practice"); }
    quiz = {
      mode: "practice", review: true,
      cfg: { section: "mixed", domain: "any", count: Math.min(due.length, 15) },
      queue: due.slice(0, 15).map(r => r.qid),
      idx: 0, correct: 0, xpEarned: 0, targetDiff: 2, asked: [], current: null, answered: false,
    };
    return nextPracticeQuestion();
  }
  const per = statsByDomain();
  let acc = null;
  if (cfg.domain !== "any" && per[cfg.domain]?.seen >= 3) acc = per[cfg.domain].correct / per[cfg.domain].seen;
  const startDiff = acc === null ? 2 : acc >= .75 ? 3 : acc >= .45 ? 2 : 1;
  quiz = {
    mode: "practice", cfg, idx: 0, correct: 0, xpEarned: 0,
    targetDiff: startDiff, asked: [], current: null, answered: false,
  };
  nextPracticeQuestion();
}

function nextPracticeQuestion() {
  const { cfg } = quiz;
  if (quiz.idx >= cfg.count) return finishPractice();
  let q = null;
  if (quiz.review) {
    q = Q_BY_ID[quiz.queue[quiz.idx]];
  } else {
    for (const spread of [0, 1, 2]) {
      const got = pickQuestions({
        section: cfg.section, domain: cfg.domain, count: 1,
        diffMin: Math.max(1, quiz.targetDiff - spread),
        diffMax: Math.min(3, quiz.targetDiff + spread),
        exclude: quiz.asked,
      });
      if (got.length) { q = got[0]; break; }
    }
  }
  if (!q) return finishPractice();
  setCurrent(q);
  Tutor.setContext(q.id);
  renderPracticeQuestion();
}

function setCurrent(q) {
  quiz.current = q; quiz.answered = false;
  quiz.qStart = Date.now();
  if (!quiz.asked.includes(q.id)) quiz.asked.push(q.id);
  quiz.choiceOrder = q.type === "spr" ? [] : shuffledOrder(q.choices.length);
}

function renderPracticeQuestion() {
  const q = quiz.current;
  const num = quiz.idx + 1;
  const total = quiz.cfg.count;
  const soft = S.prefs.timing !== "untimed" && !quiz.review;
  const bench = BENCH[q.section];

  main().innerHTML = `
    <div class="quiz-top">
      <div>
        <span class="chip brand">${quiz.review ? "🔁 Review queue" : "🧠 Practice"}</span>
        <span class="chip gray" id="topic-chip">topic hidden until you answer</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        ${soft ? `<div class="pace-note" id="pace"><span>⏱ pace</span><b id="pace-t">${bench}s</b></div>` : ""}
        <span class="muted small">${num} / ${total}</span>
        <button class="btn btn-danger btn-sm" id="q-quit">End set</button>
      </div>
    </div>
    <div class="card">
      ${q.passage ? `<div class="passage">${esc(q.passage)}</div>` : ""}
      <div class="q-stem">${esc(q.stem)}</div>
      ${choiceHtml(q, quiz.choiceOrder)}
      <div id="feedback"></div>
      <div class="quiz-nav">
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" id="q-hint">🦉 Hint</button>
          ${q.section === "math" ? `<button class="tool-btn" id="q-calc">🖩 Calculator</button>` : ""}
        </div>
        <button class="btn btn-primary" id="q-next" ${q.type === "spr" ? "" : "disabled"}>Check answer</button>
      </div>
      <p class="small muted mt" style="margin-bottom:0">Keys: 1-4 select · Enter check/next · H hint</p>
    </div>
    <div id="hint-box"></div>`;

  wireQuestionUI({
    onSubmit: (payload) => submitPractice(payload),
    onNext: () => { quiz.idx++; nextPracticeQuestion(); },
  });
  if (soft) startSoftPace(bench);
}

function startSoftPace(bench) {
  stopTimer();
  let t = bench;
  timerH = setInterval(() => {
    t--;
    const el = $("#pace-t"), wrap = $("#pace");
    if (!el) return;
    if (t >= 0) el.textContent = `${t}s`;
    else { el.textContent = `+${-t}s`; wrap.classList.add("behind"); }
  }, 1000);
}

function wireQuestionUI({ onSubmit, onNext }) {
  const q = quiz.current;
  let selected = null;

  if (q.type === "spr") {
    const inp = $("#spr-in");
    inp.focus();
    inp.addEventListener("input", () => {
      const v = inp.value.trim();
      inp.classList.remove("bad");
      if (v && !validSprEntry(v)) inp.classList.add("bad");
      const pv = $("#spr-prev"); if (pv) pv.textContent = sprPreview(v);
    });
  } else {
    document.querySelectorAll(".choice").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (quiz.answered) return;
        if (e.target.closest(".elim-btn")) {
          btn.classList.toggle("struck");
          if (btn.classList.contains("selected")) { btn.classList.remove("selected"); selected = null; $("#q-next").disabled = true; }
          return;
        }
        if (btn.classList.contains("struck")) btn.classList.remove("struck");
        selected = +btn.dataset.i;
        document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        const nx = $("#q-next"); if (nx) nx.disabled = false;
      });
    });
  }

  $("#q-quit")?.addEventListener("click", () => {
    stopTimer(); Tutor.clearContext();
    finishPractice(true);
  });
  $("#q-hint")?.addEventListener("click", () => {
    const h = Tutor.nextHint();
    if (h) {
      const box = $("#hint-box");
      box.innerHTML = `<div class="card" style="border-left:4px solid var(--brand)"><b>🦉 Professor Peak</b><p class="small" style="margin-top:6px;white-space:pre-wrap">${esc(h)}</p></div>` + box.innerHTML;
    }
  });
  $("#q-calc")?.addEventListener("click", toggleCalc);

  $("#q-next").addEventListener("click", () => {
    if (!quiz.answered) {
      if (q.type === "spr") {
        const v = $("#spr-in").value.trim();
        if (!validSprEntry(v)) { $("#spr-in").classList.add("bad"); toast("Enter a number or fraction like 7/2."); return; }
        onSubmit({ spr: v });
      } else {
        if (selected === null) return;
        onSubmit({ sel: selected });
      }
    } else {
      onNext();
    }
  });

  quiz.keyHandler = (e) => {
    if (e.target.matches("input,textarea,select")) {
      if (e.key === "Enter") { e.preventDefault(); $("#q-next")?.click(); }
      return;
    }
    if (e.key >= "1" && e.key <= "4" && q.type !== "spr" && !quiz.answered) {
      document.querySelectorAll(".choice")[+e.key - 1]?.click();
    } else if (e.key === "Enter") {
      e.preventDefault(); $("#q-next")?.click();
    } else if (e.key.toLowerCase() === "h") {
      $("#q-hint")?.click();
    } else if (e.key.toLowerCase() === "f") {
      $("#q-flag")?.click();
    }
  };
}
document.addEventListener("keydown", e => { if (quiz?.keyHandler) quiz.keyHandler(e); });

function submitPractice(payload) {
  const q = quiz.current;
  const secs = Math.round((Date.now() - quiz.qStart) / 1000);
  stopTimer();
  let correct, answerPos = null;
  if (q.type === "spr") {
    correct = sprCorrect(q, payload.spr);
  } else {
    correct = quiz.choiceOrder[payload.sel] === q.answer;
    answerPos = quiz.choiceOrder.indexOf(q.answer);
  }
  quiz.answered = true;
  if (correct) quiz.correct++;

  const attempt = { qid: q.id, correct, diff: q.diff, ts: Date.now(), mode: quiz.review ? "review" : "practice", secs };
  S.attempts.push(attempt);
  const gained = correct ? 10 * q.diff : 2;
  S.xp += gained;
  quiz.xpEarned += gained;
  if (quiz.review) reviewOutcome(q.id, correct);
  else if (!correct) pushReview(q.id);
  touchStreak(); save(); checkBadges();

  quiz.targetDiff = Math.max(1, Math.min(3, quiz.targetDiff + (correct ? 1 : -1)));

  // reveal topic (interleaving: hidden until answered)
  const dom = DOMAIN_BY_ID[q.domain];
  const chip = $("#topic-chip");
  if (chip) chip.textContent = `${dom.icon} ${dom.name} → ${q.skill}`;

  if (q.type === "spr") {
    const inp = $("#spr-in");
    inp.disabled = true;
    inp.classList.add(correct ? "good" : "bad");
  } else {
    document.querySelectorAll(".choice").forEach(b => {
      const i = +b.dataset.i;
      b.disabled = true; b.classList.remove("struck");
      if (i === answerPos) b.classList.add("correct");
      else if (i === payload.sel && !correct) b.classList.add("wrong");
    });
  }

  const rightAnswerLabel = q.type === "spr" ? esc(q.answer) : "ABCD"[answerPos];
  const causeUi = correct ? "" : `
    <div class="cause-tags" id="cause-tags">
      <span class="small muted" style="align-self:center">Why the miss?</span>
      ${["Didn't know it", "Careless slip", "Misread it", "Too slow", "Guessed"].map(c =>
        `<button data-c="${esc(c)}">${esc(c)}</button>`).join("")}
    </div>`;
  $("#feedback").innerHTML = `
    <div class="explain ${correct ? "" : "bad"}">
      <b>${correct ? `✅ Correct! +${10 * q.diff} XP${secs > BENCH[q.section] * 1.6 ? " · right but slow — worth a re-drill" : ""}`
        : `❌ Not quite — the answer is ${rightAnswerLabel}. +2 XP for the rep${quiz.review ? "" : " · added to your review queue"}`}</b>
      ${esc(q.explanation)}
    </div>${causeUi}`;
  document.querySelectorAll("#cause-tags button").forEach(b => b.addEventListener("click", () => {
    attempt.cause = b.dataset.c;
    document.querySelectorAll("#cause-tags button").forEach(x => x.classList.remove("picked"));
    b.classList.add("picked");
    save();
  }));

  const nextBtn = $("#q-next");
  nextBtn.textContent = quiz.idx + 1 >= quiz.cfg.count ? "See results →" : "Next question →";
  nextBtn.disabled = false;
  nextBtn.focus();
}

function finishPractice(early = false) {
  stopTimer(); Tutor.clearContext();
  closeCalc();
  const answeredCount = quiz.asked.length - (quiz.answered ? 0 : 1);
  if (answeredCount === 0) { quiz = null; return show("practice"); }
  const total = answeredCount;
  const correct = quiz.correct;
  const pct = Math.round(correct / total * 100);
  const wasReview = quiz.review;
  if (!early && total >= 5 && correct === total) { S._perfectSet = true; }
  checkBadges(); save();
  const weak = weakestDomains(1)[0];
  const due = dueReviews().length;
  const longSession = (Date.now() - sessionStart) > 35 * 60 * 1000;
  main().innerHTML = `
    <div class="card score-hero">
      <div style="font-size:2.4rem">${pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "🌱"}</div>
      <div class="big">${correct}/${total}</div>
      <div class="rng">${pct}% correct · +${quiz.xpEarned} XP${wasReview ? " · spaced reviews cleared" : ""}</div>
      <div class="score-split">
        <div class="part"><div class="v">🔥 ${streakCount()}</div><div class="l">day streak</div></div>
        <div class="part"><div class="v">⭐ ${S.xp}</div><div class="l">total XP</div></div>
        <div class="part"><div class="v">Lv ${level()}</div><div class="l">level</div></div>
      </div>
    </div>
    ${longSession ? `<div class="card mt" style="border-color:var(--warn)"><h3>🌤 You've been at it 35+ minutes</h3>
      <p class="small muted" style="margin:0">Focused encoding drops off after ~30-40 minutes. A break now makes the next session count — the streak is already safe for today.</p></div>` : ""}
    <div class="card mt">
      <h3>What's next?</h3>
      <p class="small muted mb">Weakest area right now: ${weak.icon} ${esc(weak.name)}.${due ? ` You also have ${due} spaced review${due === 1 ? "" : "s"} due.` : ""}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${due ? `<button class="btn btn-accent" id="r-review-q">🔁 Clear ${due} review${due === 1 ? "" : "s"}</button>` : ""}
        <button class="btn btn-primary" id="r-weak">Drill ${esc(weak.name)}</button>
        <button class="btn btn-ghost" id="r-again">Another set</button>
        <button class="btn btn-ghost" id="r-review">🦉 Review my misses</button>
        <button class="btn btn-ghost" id="r-home">Home</button>
      </div>
    </div>`;
  $("#r-review-q")?.addEventListener("click", () => startPractice({ review: true }));
  $("#r-weak").addEventListener("click", () => startPractice({ section: "mixed", domain: weak.id, count: 5 }));
  $("#r-again").addEventListener("click", () => show("practice"));
  $("#r-review").addEventListener("click", () => { show("tutor"); setTimeout(() => tutorSend("explain my last miss"), 50); });
  $("#r-home").addEventListener("click", () => show("dashboard"));
  quiz = null;
}

/* ============================================================
   MOCK EXAMS — adaptive, timed, Bluebook-style tools
   ============================================================ */
const EXAM_KINDS = {
  quick: {
    label: "Quick mock (~30 min)",
    sections: [
      { section: "rw", name: "Reading & Writing", perModule: 7, minutes: 8, spr: 0 },
      { section: "math", name: "Math", perModule: 7, minutes: 11, spr: 0.25 },
    ],
    breakSec: 60,
  },
  full: {
    label: "Full-length (2h 14m — real test spec)",
    sections: [
      { section: "rw", name: "Reading & Writing", perModule: 27, minutes: 32, spr: 0 },
      { section: "math", name: "Math", perModule: 22, minutes: 35, spr: 0.25 },
    ],
    breakSec: 600,
  },
};

function renderExamIntro() {
  if (!S.profile) return renderOnboarding();
  const isDiag = !S.exams.length;
  const fullOk = fullExamAvailable();
  main().innerHTML = `
    <h1 class="page-title">${isDiag ? "Diagnostic mock exam" : "Mock exams"}</h1>
    <p class="page-sub">Adaptive two-module structure like the real Digital SAT: do well on module 1 and module 2 gets harder — which is what unlocks top scores.</p>

    <div class="row">
      <div class="card">
        <h3>⚡ Quick mock <span class="chip brand">~30 min</span></h3>
        <p class="small muted">Condensed adaptive mock: 2×7 RW + 2×7 Math questions at the real per-question pace. Great for weekly check-ins${isDiag ? " and your diagnostic" : ""}.</p>
        <div class="task"><span>📖</span><span class="t-text">RW: 2 modules · 7 questions · 8 min each</span></div>
        <div class="task"><span>🧮</span><span class="t-text">Math: 2 modules · 7 questions · 11 min each (incl. fill-ins)</span></div>
        <button class="btn btn-primary btn-block mt" id="ex-quick">Begin ${isDiag ? "diagnostic" : "quick mock"} →</button>
      </div>
      <div class="card">
        <h3>🏟️ Full-length <span class="chip ${fullOk ? "easy" : "gray"}">2h 14m</span></h3>
        <p class="small muted">The real thing: RW 2×27 questions @ 32 min, 10-minute break, Math 2×22 @ 35 min, with flagging, choice elimination, and calculator. Research: students who take 3+ full-lengths average ~60 points higher.</p>
        <div class="task"><span>📖</span><span class="t-text">RW: 2 modules · 27 questions · 32 min each</span></div>
        <div class="task"><span>☕</span><span class="t-text">10-minute break</span></div>
        <div class="task"><span>🧮</span><span class="t-text">Math: 2 modules · 22 questions · 35 min each (~25% fill-ins)</span></div>
        ${fullOk
      ? `<button class="btn btn-accent btn-block mt" id="ex-full">Begin full-length →</button>`
      : `<button class="btn btn-ghost btn-block mt" disabled>Needs a bigger question bank (${bankCount("rw")}/54 RW · ${bankCount("math")}/44 Math)</button>`}
      </div>
    </div>

    <div class="card mt">
      <h3>Exam-mode rules (like test day)</h3>
      <div class="task"><span>🚫</span><span class="t-text">No hints, no instant feedback — full review comes after scoring</span></div>
      <div class="task"><span>🏳️</span><span class="t-text">Flag questions (F key) and move freely within a module</span></div>
      <div class="task"><span>✕</span><span class="t-text">Cross out choices you've eliminated</span></div>
      <div class="task"><span>⏱️</span><span class="t-text">Timer per module. Never leave blanks — there's no wrong-answer penalty</span></div>
      ${S.exams.length ? `<p class="small muted center mt">Last score: <b>${S.exams[S.exams.length - 1].total}</b> (${S.exams[S.exams.length - 1].kind}) on ${new Date(S.exams[S.exams.length - 1].ts).toLocaleDateString()} · <a href="#" id="ex-last-review">review it</a></p>` : ""}
    </div>`;
  $("#ex-quick").addEventListener("click", () => startExam("quick"));
  $("#ex-full")?.addEventListener("click", () => startExam("full"));
  $("#ex-last-review")?.addEventListener("click", (e) => { e.preventDefault(); renderExamReview(S.exams.length - 1); });
}

function startExam(kind) {
  stopTimer();
  quiz = {
    mode: "exam", kind, plan: EXAM_KINDS[kind],
    stage: 0, module: 1,
    asked: [], results: {}, hardM2: {}, detail: [],
    // module-scoped:
    moduleQs: [], answers: {}, flags: new Set(), orders: {}, qSecs: {}, idx: 0,
    secondsLeft: 0, halfWarned: false, lastMinuteWarned: false,
  };
  loadExamModule();
}

function loadExamModule() {
  const sec = quiz.plan.sections[quiz.stage];
  let diffMin = 1, diffMax = 3;
  if (quiz.module === 2) {
    const hard = quiz.m1correct / sec.perModule >= 0.6;
    quiz.hardM2[sec.section] = hard;
    if (hard) { diffMin = 2; diffMax = 3; } else { diffMin = 1; diffMax = 2; }
  }
  quiz.moduleQs = buildExamModule({
    section: sec.section, count: sec.perModule,
    diffMin, diffMax, exclude: quiz.asked, sprShare: sec.spr,
  });
  quiz.moduleQs.forEach(q => { if (!quiz.asked.includes(q.id)) quiz.asked.push(q.id); });
  quiz.answers = {}; quiz.flags = new Set(); quiz.qSecs = {}; quiz.idx = 0;
  quiz.orders = {};
  quiz.moduleQs.forEach(q => { quiz.orders[q.id] = q.type === "spr" ? [] : shuffledOrder(q.choices.length); });
  quiz.secondsLeft = sec.minutes * 60;
  quiz.halfWarned = false; quiz.lastMinuteWarned = false;
  renderModuleIntro();
}

function renderModuleIntro() {
  const sec = quiz.plan.sections[quiz.stage];
  const hardNote = quiz.module === 2
    ? (quiz.hardM2[sec.section]
      ? `<p class="chip hard" style="margin-bottom:12px">Module 2 · harder set unlocked — this is where top scores live</p>`
      : `<p class="chip easy" style="margin-bottom:12px">Module 2 · standard set</p>`)
    : "";
  main().innerHTML = `
    <div class="card center" style="max-width:520px;margin:60px auto;padding:44px 32px">
      <div style="font-size:2.4rem">${sec.section === "rw" ? "📖" : "🧮"}</div>
      <h2 style="margin:10px 0 4px">${esc(sec.name)} — Module ${quiz.module}</h2>
      ${hardNote}
      <p class="muted small mb">${quiz.moduleQs.length} questions · ${sec.minutes} minutes. Move freely, flag anything, answer everything. The timer starts when you click.</p>
      <button class="btn btn-primary btn-lg" id="mod-go">Start module →</button>
    </div>`;
  $("#mod-go").addEventListener("click", () => {
    startModuleTimer();
    gotoExamQ(0);
  });
}

function startModuleTimer() {
  stopTimer();
  timerH = setInterval(() => {
    quiz.secondsLeft--;
    const el = $("#timer");
    if (el) {
      el.textContent = fmtClock(Math.max(0, quiz.secondsLeft));
      el.classList.toggle("low", quiz.secondsLeft <= 60);
    }
    const sec = quiz.plan.sections[quiz.stage];
    const half = sec.minutes * 30;
    if (!quiz.halfWarned && quiz.secondsLeft <= half) {
      quiz.halfWarned = true;
      const shouldBe = Math.ceil(sec.perModule / 2);
      const at = Object.keys(quiz.answers).length;
      if (at < shouldBe - 1) toast(`⏱ Halfway checkpoint: aim to be near question ${shouldBe} — you've answered ${at}.`);
    }
    if (!quiz.lastMinuteWarned && quiz.secondsLeft <= 60) {
      quiz.lastMinuteWarned = true;
      const un = quiz.moduleQs.length - Object.keys(quiz.answers).length;
      if (un > 0) toast(`⚠️ 1 minute left — ${un} unanswered. Never leave blanks: pick something!`);
    }
    if (quiz.secondsLeft <= 0) {
      stopTimer();
      toast("⏱️ Time! Submitting this module.");
      submitModule();
    }
  }, 1000);
}

function gotoExamQ(i) {
  // bank time on the question being left
  if (quiz.currentQid && quiz.qStart) {
    quiz.qSecs[quiz.currentQid] = (quiz.qSecs[quiz.currentQid] || 0) + Math.round((Date.now() - quiz.qStart) / 1000);
  }
  quiz.idx = Math.max(0, Math.min(quiz.moduleQs.length - 1, i));
  const q = quiz.moduleQs[quiz.idx];
  quiz.currentQid = q.id;
  quiz.qStart = Date.now();
  renderExamQuestion();
}

function renderExamQuestion() {
  const q = quiz.moduleQs[quiz.idx];
  const sec = quiz.plan.sections[quiz.stage];
  const order = quiz.orders[q.id];
  const saved = quiz.answers[q.id];

  main().innerHTML = `
    <div class="quiz-top">
      <div>
        <span class="chip brand">${sec.section === "rw" ? "📖" : "🧮"} ${esc(sec.name)} · M${quiz.module}</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="timer" id="timer">${fmtClock(Math.max(0, quiz.secondsLeft))}</div>
        <button class="btn btn-danger btn-sm" id="q-quit">Abandon</button>
      </div>
    </div>
    <div class="q-dots" id="q-dots">
      ${quiz.moduleQs.map((qq, i) => `
        <button class="q-dot ${i === quiz.idx ? "current" : ""} ${quiz.answers[qq.id] !== undefined ? "answered" : ""} ${quiz.flags.has(qq.id) ? "flagged" : ""}"
          data-i="${i}" title="Question ${i + 1}">${i + 1}</button>`).join("")}
    </div>
    <div class="card">
      <div class="spread" style="margin-bottom:12px">
        <span class="muted small">Question ${quiz.idx + 1} of ${quiz.moduleQs.length}</span>
        <div style="display:flex;gap:8px">
          ${sec.section === "math" ? `<button class="tool-btn" id="q-calc">🖩 Calculator</button>` : ""}
          <button class="tool-btn ${quiz.flags.has(q.id) ? "on" : ""}" id="q-flag">🚩 ${quiz.flags.has(q.id) ? "Flagged" : "Flag"}</button>
        </div>
      </div>
      ${q.passage ? `<div class="passage">${esc(q.passage)}</div>` : ""}
      <div class="q-stem">${esc(q.stem)}</div>
      ${choiceHtml(q, order, { value: q.type === "spr" ? (saved ?? "") : "" })}
      <div class="quiz-nav">
        <button class="btn btn-ghost" id="q-prev" ${quiz.idx === 0 ? "disabled" : ""}>← Back</button>
        <div style="display:flex;gap:10px">
          ${quiz.idx === quiz.moduleQs.length - 1
      ? `<button class="btn btn-accent" id="q-submit">Submit module ✓</button>`
      : `<button class="btn btn-primary" id="q-nextq">Next →</button>
             <button class="btn btn-ghost btn-sm" id="q-submit">Submit module</button>`}
        </div>
      </div>
      <p class="small muted mt" style="margin-bottom:0">Keys: 1-4 select · F flag · Enter next</p>
    </div>`;

  // restore state
  if (q.type === "spr") {
    const inp = $("#spr-in");
    inp.addEventListener("input", () => {
      const v = inp.value.trim();
      inp.classList.remove("bad");
      const pv = $("#spr-prev"); if (pv) pv.textContent = sprPreview(v);
      if (v && !validSprEntry(v)) { inp.classList.add("bad"); return; }
      if (v) quiz.answers[q.id] = v; else delete quiz.answers[q.id];
      refreshDots();
    });
  } else {
    if (saved !== undefined) {
      document.querySelector(`.choice[data-i="${saved}"]`)?.classList.add("selected");
    }
    (quiz.elims?.[q.id] || []).forEach(i => document.querySelector(`.choice[data-i="${i}"]`)?.classList.add("struck"));
    document.querySelectorAll(".choice").forEach(btn => {
      btn.addEventListener("click", (e) => {
        if (e.target.closest(".elim-btn")) {
          btn.classList.toggle("struck");
          quiz.elims = quiz.elims || {};
          const set = new Set(quiz.elims[q.id] || []);
          const i = +btn.dataset.i;
          set.has(i) ? set.delete(i) : set.add(i);
          quiz.elims[q.id] = [...set];
          if (btn.classList.contains("selected")) { btn.classList.remove("selected"); delete quiz.answers[q.id]; refreshDots(); }
          return;
        }
        btn.classList.remove("struck");
        document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        quiz.answers[q.id] = +btn.dataset.i;
        refreshDots();
      });
    });
  }

  document.querySelectorAll(".q-dot").forEach(d => d.addEventListener("click", () => gotoExamQ(+d.dataset.i)));
  $("#q-prev").addEventListener("click", () => gotoExamQ(quiz.idx - 1));
  $("#q-nextq")?.addEventListener("click", () => gotoExamQ(quiz.idx + 1));
  $("#q-flag").addEventListener("click", () => {
    quiz.flags.has(q.id) ? quiz.flags.delete(q.id) : quiz.flags.add(q.id);
    renderExamQuestion();
  });
  $("#q-calc")?.addEventListener("click", toggleCalc);
  $("#q-submit").addEventListener("click", () => {
    const un = quiz.moduleQs.length - Object.keys(quiz.answers).length;
    if (un > 0 && !confirm(`${un} question${un === 1 ? " is" : "s are"} unanswered and will count as wrong. Submit anyway?`)) return;
    submitModule();
  });
  $("#q-quit").addEventListener("click", () => {
    if (confirm("Abandon this exam? Nothing will be scored.")) {
      stopTimer(); closeCalc(); quiz = null; show("exam");
    }
  });

  quiz.keyHandler = (e) => {
    if (e.target.matches("input,textarea,select")) return;
    if (e.key >= "1" && e.key <= "4" && q.type !== "spr") {
      document.querySelectorAll(".choice")[+e.key - 1]?.click();
    } else if (e.key === "Enter") {
      e.preventDefault();
      (quiz.idx === quiz.moduleQs.length - 1 ? $("#q-submit") : $("#q-nextq"))?.click();
    } else if (e.key.toLowerCase() === "f") {
      $("#q-flag")?.click();
    } else if (e.key === "ArrowLeft") { $("#q-prev")?.click(); }
    else if (e.key === "ArrowRight") { $("#q-nextq")?.click(); }
  };
}

function refreshDots() {
  document.querySelectorAll(".q-dot").forEach(d => {
    const qq = quiz.moduleQs[+d.dataset.i];
    d.classList.toggle("answered", quiz.answers[qq.id] !== undefined);
    d.classList.toggle("flagged", quiz.flags.has(qq.id));
  });
}

function submitModule() {
  stopTimer(); closeCalc();
  // bank time on the open question
  if (quiz.currentQid && quiz.qStart) {
    quiz.qSecs[quiz.currentQid] = (quiz.qSecs[quiz.currentQid] || 0) + Math.round((Date.now() - quiz.qStart) / 1000);
    quiz.currentQid = null;
  }
  const sec = quiz.plan.sections[quiz.stage];
  const r = quiz.results[sec.section] = quiz.results[sec.section] || { correct: 0, weight: 0, weightMax: 0, count: 0 };
  let correctInMod = 0;
  quiz.moduleQs.forEach(q => {
    const ans = quiz.answers[q.id];
    let correct = false, picked = null;
    if (q.type === "spr") {
      picked = ans ?? null;
      correct = ans !== undefined && sprCorrect(q, ans);
    } else {
      picked = ans !== undefined ? quiz.orders[q.id][ans] : null; // original index picked
      correct = picked === q.answer;
    }
    if (correct) { correctInMod++; r.correct++; r.weight += q.diff; }
    r.weightMax += q.diff; r.count++;
    const secs = quiz.qSecs[q.id] || 0;
    S.attempts.push({ qid: q.id, correct, diff: q.diff, ts: Date.now(), mode: "exam", secs });
    if (!correct) pushReview(q.id);
    quiz.detail.push({
      qid: q.id, section: sec.section, module: quiz.module,
      picked, correct, answered: ans !== undefined,
      flagged: quiz.flags.has(q.id), secs,
    });
    S.xp += correct ? 10 * q.diff : 2;
  });
  touchStreak(); save();

  if (quiz.module === 1) {
    quiz.m1correct = correctInMod;
    quiz.module = 2;
    loadExamModule();
  } else if (quiz.stage + 1 < quiz.plan.sections.length) {
    quiz.stage++; quiz.module = 1;
    renderBreak();
  } else {
    finishExam();
  }
}

function renderBreak() {
  let remaining = quiz.plan.breakSec;
  main().innerHTML = `
    <div class="card break-screen" style="max-width:520px;margin:60px auto">
      <div style="font-size:2.4rem">☕</div>
      <h2 style="margin:10px 0 4px">Break time</h2>
      <p class="muted small">Stand up, stretch, water. On the real test this break is 10 minutes — don't study during it.</p>
      <div class="big-t" id="break-t">${fmtClock(remaining)}</div>
      <button class="btn btn-primary mt" id="break-skip">Start ${esc(quiz.plan.sections[quiz.stage].name)} →</button>
    </div>`;
  stopTimer();
  timerH = setInterval(() => {
    remaining--;
    const el = $("#break-t");
    if (el) el.textContent = fmtClock(Math.max(0, remaining));
    if (remaining <= 0) { stopTimer(); loadExamModule(); }
  }, 1000);
  $("#break-skip").addEventListener("click", () => { stopTimer(); loadExamModule(); });
}

/* Scoring model: rights-only, difficulty-weighted, then scaled.
   On the real test the harder module-2 variant unlocks the full
   200-800 range while the easier variant caps the section score
   (third-party estimates put the cap near 590-640). */
function sectionScore(section) {
  const r = quiz.results[section];
  if (!r || !r.weightMax) return 200;
  const pct = r.weight / r.weightMax;
  const score = quiz.hardM2[section]
    ? 200 + 600 * pct       // full range available
    : 200 + 440 * pct;      // easier M2 caps near 640
  return Math.max(200, Math.min(800, Math.round(score / 10) * 10));
}

function finishExam() {
  stopTimer(); Tutor.clearContext(); closeCalc();
  const rw = sectionScore("rw"), math = sectionScore("math");
  const total = rw + math;
  const kind = S.exams.length ? quiz.kind : "diagnostic";
  const correct = (quiz.results.rw?.correct || 0) + (quiz.results.math?.correct || 0);
  const count = (quiz.results.rw?.count || 0) + (quiz.results.math?.count || 0);
  S.exams.push({
    ts: Date.now(), kind, rw, math, total, correct, count,
    hardM2: { ...quiz.hardM2 }, detail: quiz.detail,
  });
  if (kind === "diagnostic") generatePlan();
  touchStreak(); save(); checkBadges();

  const target = S.profile.targetScore;
  const delta = total - target;
  const prev = S.exams.length > 1 ? S.exams[S.exams.length - 2].total : null;
  const examIdx = S.exams.length - 1;
  quiz = null;
  main().innerHTML = `
    <div class="card score-hero">
      <div style="font-size:2.2rem">${total >= target ? "🏔️🎉" : "🧗"}</div>
      <p class="muted small" style="margin-bottom:4px">${kind === "diagnostic" ? "Diagnostic complete — your baseline is set" : `${kind === "full" ? "Full-length" : "Quick"} mock complete`}</p>
      <div class="big">${total}</div>
      <div class="rng">estimated scaled score (400–1600) · ${correct}/${count} correct</div>
      <div class="score-split">
        <div class="part"><div class="v">${rw}</div><div class="l">Reading &amp; Writing ${S.exams[examIdx].hardM2.rw ? "· hard M2" : ""}</div></div>
        <div class="part"><div class="v">${math}</div><div class="l">Math ${S.exams[examIdx].hardM2.math ? "· hard M2" : ""}</div></div>
        <div class="part"><div class="v">${delta >= 0 ? "+" + delta : delta}</div><div class="l">vs. target ${target}</div></div>
        ${prev !== null ? `<div class="part"><div class="v">${total - prev >= 0 ? "+" + (total - prev) : total - prev}</div><div class="l">vs. last mock</div></div>` : ""}
      </div>
    </div>
    <div class="card mt">
      <h3>The review IS the studying</h3>
      <p class="small muted mb">Every miss you carefully rework is worth more than three questions you got right. Misses are already queued for spaced review.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" id="x-review">📋 Review every question</button>
        <button class="btn btn-ghost" id="x-plan">Study plan</button>
        <button class="btn btn-ghost" id="x-analytics">📈 Analytics</button>
      </div>
    </div>`;
  $("#x-review").addEventListener("click", () => renderExamReview(examIdx));
  $("#x-plan").addEventListener("click", () => show("plan"));
  $("#x-analytics").addEventListener("click", () => show("analytics"));
}

/* ---------- exam review screen ---------- */
function renderExamReview(examIdx, filter = "all") {
  const ex = S.exams[examIdx];
  if (!ex || !ex.detail?.length) { toast("No review data for that exam."); return show("exam"); }
  const items = ex.detail.filter(d =>
    filter === "all" ? true : filter === "miss" ? !d.correct : d.flagged);
  main().innerHTML = `
    <div class="spread">
      <div>
        <h1 class="page-title">Exam review</h1>
        <p class="page-sub">${new Date(ex.ts).toLocaleDateString()} · ${ex.kind} · ${ex.total} (${ex.rw} RW / ${ex.math} M) · ${ex.correct}/${ex.count} correct</p>
      </div>
      <button class="btn btn-ghost" id="rv-back">← Exams</button>
    </div>
    <div class="seg mb" id="rv-filter">
      <button data-v="all" ${filter === "all" ? 'class="on"' : ""}>All (${ex.detail.length})</button>
      <button data-v="miss" ${filter === "miss" ? 'class="on"' : ""}>Misses (${ex.detail.filter(d => !d.correct).length})</button>
      <button data-v="flag" ${filter === "flag" ? 'class="on"' : ""}>Flagged (${ex.detail.filter(d => d.flagged).length})</button>
    </div>
    ${items.length ? items.map((d, i) => {
    const q = Q_BY_ID[d.qid];
    if (!q) return "";
    const bench = BENCH[d.section];
    const pickedText = q.type === "spr"
      ? (d.answered ? d.picked : "—")
      : (d.picked !== null ? q.choices[d.picked] : "—");
    return `
      <div class="review-item" data-i="${i}">
        <div class="rv-head">
          <span class="rv-num">${i + 1}</span>
          <span class="rv-mark ${d.correct ? "good" : d.answered ? "bad" : "skip"}">${d.correct ? "✓ correct" : d.answered ? "✗ missed" : "◌ blank"}</span>
          ${d.flagged ? `<span class="chip med">🚩 flagged</span>` : ""}
          <span class="chip gray">${esc(DOMAIN_BY_ID[q.domain].name)} · ${esc(q.skill)}</span>
          <span class="chip ${d.secs > bench * 1.5 ? "hard" : "gray"}">${d.secs}s${d.secs > bench * 1.5 ? " (slow)" : ""}</span>
        </div>
        <div class="rv-body">
          ${q.passage ? `<div class="passage">${esc(q.passage)}</div>` : ""}
          <div class="q-stem">${esc(q.stem)}</div>
          ${q.type === "spr"
        ? `<p><b>Your answer:</b> ${esc(pickedText)} · <b>Correct:</b> ${esc(q.answer)}</p>`
        : `<div class="choices">${q.choices.map((c, ci) => `
              <div class="choice ${ci === q.answer ? "correct" : ""} ${ci === d.picked && !d.correct ? "wrong" : ""}" style="cursor:default">
                <span class="letter">${"ABCD"[ci]}</span><span>${esc(c)}</span>
              </div>`).join("")}</div>`}
          <div class="explain ${d.correct ? "" : "bad"}"><b>Explanation</b>${esc(q.explanation)}</div>
        </div>
      </div>`;
  }).join("") : `<div class="empty"><div class="big-ico">🎉</div>Nothing in this filter.</div>`}`;
  $("#rv-back").addEventListener("click", () => show("exam"));
  document.querySelectorAll("#rv-filter button").forEach(b =>
    b.addEventListener("click", () => renderExamReview(examIdx, b.dataset.v)));
  document.querySelectorAll(".review-item .rv-head").forEach(h =>
    h.addEventListener("click", () => h.parentElement.classList.toggle("open")));
}

/* ---------- Desmos-style calculator ---------- */
let calcEl = null;
function toggleCalc() {
  if (calcEl) return closeCalc();
  calcEl = document.createElement("div");
  calcEl.className = "calc-pop";
  calcEl.innerHTML = `
    <div class="calc-bar"><span>🖩 Graphing calculator</span><button class="btn btn-ghost btn-sm" id="calc-x">Close</button></div>
    <div id="calc-body" style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:.85rem;padding:14px;text-align:center">Loading calculator…</div>`;
  document.body.appendChild(calcEl);
  calcEl.querySelector("#calc-x").addEventListener("click", closeCalc);
  const body = calcEl.querySelector("#calc-body");
  const boot = () => {
    if (!calcEl) return;
    try {
      body.textContent = ""; body.style.display = "block"; body.style.padding = "0";
      window.__desmos = window.Desmos.GraphingCalculator(body, { keypad: true, expressions: true, settingsMenu: false });
    } catch (e) { calcFallback(body); }
  };
  if (window.Desmos) boot();
  else {
    const s = document.createElement("script");
    // Desmos's published demo API key — for personal/dev use
    s.src = "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    s.onload = boot;
    s.onerror = () => calcFallback(body);
    document.head.appendChild(s);
  }
}
function calcFallback(body) {
  if (!body) return;
  body.innerHTML = `Couldn't load the embedded calculator (offline or blocked).<br><a href="https://www.desmos.com/calculator" target="_blank" rel="noopener">Open Desmos in a new tab →</a><br><span class="small">The real Digital SAT has Desmos built in — practice with it!</span>`;
}
function closeCalc() {
  if (calcEl) { calcEl.remove(); calcEl = null; }
}

/* ============================================================
   MODULES (lessons + mastery + drills)
   ============================================================ */
function renderModules() {
  if (!S.profile) return renderOnboarding();
  const skillStats = statsBySkill();
  const domStats = statsByDomain();
  const block = (sectionName, doms) => `
    <h3 style="margin:26px 0 12px">${sectionName}</h3>
    ${doms.map(d => {
    const s = domStats[d.id] || { seen: 0, correct: 0 };
    const acc = s.seen ? Math.round(s.correct / s.seen * 100) : null;
    const lesson = LESSONS[d.id];
    return `
      <div class="module-card" data-dom="${d.id}">
        <div class="mod-head">
          <div>
            <div class="dom">${esc(sectionName)}</div>
            <h3>${d.icon} ${esc(d.name)}</h3>
          </div>
          <span class="chip ${acc === null ? "gray" : acc >= 75 ? "easy" : acc >= 50 ? "med" : "hard"}">
            ${acc === null ? "Not started" : acc + "% mastery"}
          </span>
        </div>
        <div class="mod-bar">
          <div class="bar ${acc === null ? "" : acc >= 75 ? "green" : acc >= 50 ? "amber" : "red"}"><i style="width:${acc ?? 0}%"></i></div>
          <span>${s.seen} attempts</span>
        </div>
        <div class="subtopics">
          ${d.skills.map(sk => {
      const st = skillStats[d.id + "|" + sk] || { seen: 0, correct: 0 };
      const sa = st.seen ? Math.round(st.correct / st.seen * 100) : null;
      return `<div class="subtopic"><span>• ${esc(sk)}</span>
              <span class="st-stat">${sa === null ? "no attempts yet" : `${sa}% · ${st.seen} attempts`}</span></div>`;
    }).join("")}
          ${lesson ? `<div class="lesson">${lesson}</div>` : ""}
          <div style="margin-top:12px;display:flex;gap:8px">
            <button class="btn btn-primary btn-sm drill" data-dom="${d.id}">Drill this domain →</button>
          </div>
        </div>
      </div>`;
  }).join("")}`;

  main().innerHTML = `
    <h1 class="page-title">Learning modules</h1>
    <p class="page-sub">Every skill the Digital SAT tests, with your live mastery, a strategy lesson, and one-click drills. Lesson first is fine — but the drill is where it sticks.</p>
    ${block("Reading & Writing", DOMAINS.rw)}
    ${block("Math", DOMAINS.math)}`;

  document.querySelectorAll(".module-card").forEach(c => c.addEventListener("click", e => {
    if (e.target.closest(".drill") || e.target.closest("a")) return;
    c.classList.toggle("open");
  }));
  document.querySelectorAll(".drill").forEach(b => b.addEventListener("click", () => {
    startPractice({ section: domainSection(b.dataset.dom), domain: b.dataset.dom, count: 5 });
  }));
}

/* Strategy lessons per domain (original content) */
const LESSONS = {
  info: `<b>The playbook.</b> Main idea = the claim most sentences support; trap answers quote a real detail as if it were the point. Evidence questions are logic, not reading: restate the claim, then demand the answer connect its exact terms — for comparative claims ("X more than Y") the right answer compares BOTH sides. "Logically completes" = combine the stated facts and add NOTHING (no predictions, no new causes). The safest answer usually feels almost boring.`,
  craft: `<b>The playbook.</b> Words in Context: the passage defines the blank — usually right after a colon, dash, or example. Predict your own word BEFORE reading choices; watch contrast markers (although, but) that flip meaning. Purpose/structure questions ask what the author is DOING (challenging a view, tracing a change) — find the pivot word. Cross-text: identify each author's exact claim and evidence; the right answer usually grants the other's data while denying the conclusion.`,
  expr: `<b>The playbook.</b> Transitions: summarize the sentence before and after the blank in ~4 words each, then ask — agree (moreover), clash (however), or cause (therefore)? Never pick by ear. Rhetorical Synthesis: underline the stated goal first; the right answer is whichever combines the note-facts that serve that exact goal — usually two numbers or a cause+effect pair. Wrong answers use real notes that serve a different goal.`,
  conv: `<b>The playbook.</b> Boundaries: can each side of the punctuation stand alone? Both → period/semicolon/comma+FANBOYS. Only the first → colon can introduce. A comma alone NEVER joins two sentences. Asides opened with a comma/dash close with the SAME mark. Agreement: cross out prepositional phrases to find the real subject ("The collection of maps... IS"). Tenses: "by the time X happens" + duration = future perfect (will have been).`,
  alg: `<b>The playbook.</b> Slope = rate ("per"), intercept = starting value ("one-time fee"). Two points → slope first, then plug in. Systems: line up a variable and eliminate; no solution = coefficients proportional but constants not; infinite = everything proportional. See a² − b²? It's (a+b)(a−b) — the SAT loves rewarding identities over grinding. When stuck, the graphing calculator can read intersections for you.`,
  adv: `<b>The playbook.</b> Factoring: two numbers that multiply to c, add to b. Vertex form a(x−h)²+k → vertex (h,k); negative a = maximum. Discriminant b²−4ac: zero means "touches the axis at exactly one point." Exponentials: value = start × factor^(t/period) — doubling every 3 hours is 2^(t/3), NOT 2^(3t). Losing 12%/year = keeping 0.88/year. Fractional exponents undo with the reciprocal power.`,
  data: `<b>The playbook.</b> X% off → pay (100−X)% in ONE multiplication. Ratios: write the proportion with labels, cross-multiply. Median = middle of the SORTED list — changing the biggest value doesn't move it; the mean moves whenever the sum moves. "Without replacement" → the second denominator shrinks: (5/8)(4/7), never (5/8)². Always sanity-check magnitude before moving on.`,
  geo: `<b>The playbook.</b> Triangle angles sum to 180°. SOH-CAH-TOA relative to YOUR angle — draw and label every trig problem. Memorize the families: 3-4-5 (and 9-12-15), 5-12-13. Similar figures: lengths scale by k, areas by k². Circle equation (x−h)²+(y−k)²=r²: watch the signs — (y+2) means k = −2 — and remember the center is NOT on the circle (it gives 0, not r²).`,
};

/* ============================================================
   STUDY PLAN
   ============================================================ */
function renderPlan() {
  if (!S.profile) return renderOnboarding();
  if (!S.plan) generatePlan();
  const prog = planProgress();
  const curW = currentWeekIndex();
  main().innerHTML = `
    <div class="spread">
      <div>
        <h1 class="page-title">Your study plan</h1>
        <p class="page-sub">Built from your test date (${fmtDate(S.profile.testDate)}) and your weakest domains. 25-40 min sessions, 5 days a week, ≥3 timed mocks — the cadence the research supports.</p>
      </div>
      <button class="btn btn-ghost" id="plan-regen">↻ Rebuild plan</button>
    </div>
    <div class="card mb">
      <div class="spread"><h3>Overall progress</h3><b>${prog}%</b></div>
      <div class="bar green mt" style="height:12px"><i style="width:${prog}%"></i></div>
    </div>
    ${S.plan.weeks.map((w, wi) => `
      <div class="card week-card" ${wi === curW ? 'style="border-color:var(--brand)"' : ""}>
        <div class="spread"><h3>${esc(w.label)} ${wi === curW ? '<span class="chip brand">current</span>' : ""}</h3>
          <span class="muted small">${w.tasks.filter(t => t.done).length}/${w.tasks.length} done</span></div>
        ${w.tasks.map(t => `
          <div class="task ${t.done ? "done" : ""}">
            <input type="checkbox" ${t.done ? "checked" : ""} data-w="${wi}" data-t="${esc(t.id)}">
            <span class="t-text">${esc(t.text)}</span>
            ${{ practice: "practice", exam: "exam", module: "modules", tutor: "tutor", review: "review", guide: "guide" }[t.type]
      ? `<button class="btn btn-ghost btn-sm go-task" data-kind="${t.type}">Go</button>` : ""}
          </div>`).join("")}
      </div>`).join("")}`;

  $("#plan-regen").addEventListener("click", () => {
    generatePlan(); toast("Plan rebuilt around your current weak spots."); renderPlan();
  });
  document.querySelectorAll(".task input[type=checkbox]").forEach(cb => cb.addEventListener("change", e => {
    const t = S.plan.weeks[+e.target.dataset.w].tasks.find(x => x.id === e.target.dataset.t);
    if (t) { t.done = e.target.checked; touchStreak(); save(); checkBadges(); renderPlan(); }
  }));
  document.querySelectorAll(".go-task").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.kind;
    if (k === "review") startPractice({ review: true });
    else if (k === "practice") show("practice");
    else show(k === "modules" ? "modules" : k);
  }));
}

/* ============================================================
   TUTOR
   ============================================================ */
function renderTutor() {
  if (!S.profile) return renderOnboarding();
  main().innerHTML = `
    <h1 class="page-title">🦉 Professor Peak</h1>
    <p class="page-sub">Your on-demand coach. Ask about any topic, strategy, or say "explain my last miss".</p>
    <div class="card chat-wrap">
      <div class="chat-log" id="chat-log"></div>
      <div class="chat-suggest">
        <button data-q="Explain my last miss">Explain my last miss</button>
        <button data-q="What should I practice next?">What should I practice next?</button>
        <button data-q="How do commas and semicolons work?">Commas &amp; semicolons</button>
        <button data-q="Help me with transitions">Transitions</button>
        <button data-q="Teach me quadratics">Quadratics</button>
        <button data-q="Tips for pacing and timing">Pacing tips</button>
        <button data-q="I'm nervous about the test">Test nerves</button>
      </div>
      <div class="chat-input">
        <input id="chat-in" type="text" placeholder="Ask Professor Peak anything…" autocomplete="off">
        <button class="btn btn-primary" id="chat-send">Send</button>
      </div>
    </div>`;

  if (!S.chat.length) {
    S.chat.push({
      who: "bot",
      text: `Hoo-hoo, ${S.profile.name}! I'm Professor Peak — your SAT coach. Ask me about any topic (commas, quadratics, transitions, probability…), say "explain my last miss", or ask "what should I practice next?"`
    });
    save();
  }
  drawChat();
  $("#chat-send").addEventListener("click", () => tutorSend());
  $("#chat-in").addEventListener("keydown", e => { if (e.key === "Enter") tutorSend(); });
  document.querySelectorAll(".chat-suggest button").forEach(b =>
    b.addEventListener("click", () => tutorSend(b.dataset.q)));
}
function drawChat() {
  const log = $("#chat-log");
  if (!log) return;
  log.innerHTML = S.chat.map(m => m.who === "user"
    ? `<div class="msg user">${esc(m.text)}</div>`
    : `<div class="msg bot"><div class="msg-name">Professor Peak</div>${esc(m.text)}</div>`).join("");
  log.scrollTop = log.scrollHeight;
}
function tutorSend(preset) {
  const inp = $("#chat-in");
  const text = (preset ?? inp?.value ?? "").trim();
  if (!text) return;
  if (inp) inp.value = "";
  S.chat.push({ who: "user", text });
  if (S.chat.length > 80) S.chat = S.chat.slice(-80);
  drawChat();
  save();
  setTimeout(() => {
    const reply = Tutor.respond(text, S);
    S.chat.push({ who: "bot", text: reply });
    touchStreak(); save(); drawChat();
  }, 350);
}

/* ============================================================
   GUIDE — study science, pacing, test week, resources
   ============================================================ */
function renderGuide() {
  if (!S.profile) return renderOnboarding();
  const days = daysUntil(S.profile.testDate);
  main().innerHTML = `
    <h1 class="page-title">The Guide</h1>
    <p class="page-sub">How to study so it sticks — what the learning research actually supports, built into this app.</p>

    <div class="card">
      <h3>🧠 The four rules this app runs on</h3>
      <div class="task"><span>1️⃣</span><span class="t-text"><b>Retrieval beats re-reading.</b> Answering questions — even wrong — builds memory better than reviewing notes or watching videos. That's why everything here starts with a question.</span></div>
      <div class="task"><span>2️⃣</span><span class="t-text"><b>Spacing beats cramming.</b> The best review gap is ~10-20% of the time until you need it (Cepeda et al., 2008). Your review queue schedules misses at exactly those intervals, tightening as test day nears.</span></div>
      <div class="task"><span>3️⃣</span><span class="t-text"><b>Mixed beats blocked.</b> In a large randomized trial, students doing mixed-topic problem sets scored nearly double on delayed tests vs. one-topic blocks (61% vs 38%, Rohrer et al., 2020). Mixed sets here hide the topic until you answer — choosing the strategy IS the skill.</span></div>
      <div class="task"><span>4️⃣</span><span class="t-text"><b>Short daily sessions beat marathons.</b> Focus quality drops after ~30-40 minutes. 25-40 min, 5 days a week wins — and the streak tracker exists to protect exactly that.</span></div>
    </div>

    <div class="card">
      <h3>⏱️ Pacing playbook</h3>
      <div class="task"><span>🎯</span><span class="t-text">Real pace: ~71 sec/question in Reading &amp; Writing, ~95 in Math. Don't clock-watch per question — check at the halfway point (question 14 of 27 / 11 of 22).</span></div>
      <div class="task"><span>🚩</span><span class="t-text">Two passes: bank the quick ones, flag the grinders, come back with the time you saved.</span></div>
      <div class="task"><span>✍️</span><span class="t-text">Never leave a blank — no wrong-answer penalty. Eliminate what you can, then commit.</span></div>
      <div class="task"><span>📈</span><span class="t-text">Progression: untimed until accurate → soft-timed to build the internal clock → full timed mocks. Your practice settings follow this ladder.</span></div>
    </div>

    <div class="card">
      <h3>📊 What score gains are realistic?</h3>
      <p class="small muted">College Board / Khan Academy data links ~20 hours of focused official practice with an average gain of ~115 points (6-8 hours ≈ +90). Controlled studies of test prep find smaller average causal effects — so treat 50-150 points as an ambitious, attainable range for consistent work, not a guarantee. Biggest gains go to whoever drills their weakest domains hardest.</p>
    </div>

    <div class="card" ${days !== null && days <= 10 && days >= 0 ? 'style="border-color:var(--warn)"' : ""}>
      <h3>🧘 Test-week toolkit ${days !== null && days >= 0 && days <= 10 ? '<span class="chip med">it\'s time</span>' : ""}</h3>
      <p class="small muted mb">Two exercises with randomized-trial support for anxious test-takers:</p>
      <div class="task"><span>📝</span><span class="t-text"><b>The 7-minute worry dump</b> (Ramirez &amp; Beilock, <i>Science</i> 2011): right before a big test, write freely about your worries for ~7 minutes. Offloading them measurably improved exam scores. Private — nothing you type below is stored or sent anywhere.</span></div>
      <div class="task"><span>💓</span><span class="t-text"><b>Reframe the nerves</b> (Jamieson et al.): a racing heart isn't a malfunction — it's your body delivering oxygen for performance. Students trained to read arousal as fuel scored higher. Say it to yourself in the hallway: "I'm not anxious, I'm ready."</span></div>
      <div class="field mt">
        <label for="worry-box">Worry dump (optional — clears when you leave, never saved)</label>
        <textarea id="worry-box" rows="5" style="width:100%;font:inherit;padding:12px;border:1.5px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink)" placeholder="Set a 7-minute timer and write whatever is on your mind about the test…"></textarea>
      </div>
      <button class="btn btn-ghost mt" id="worry-clear">Done — clear it 🗑</button>
    </div>

    <div class="card">
      <h3>🔗 Official free resources (use them too!)</h3>
      <div class="task"><span>🏛️</span><span class="t-text"><a href="https://satsuite.collegeboard.org/practice" target="_blank" rel="noopener">College Board official practice</a> — including full official practice tests in the real Bluebook app. Take at least one there before test day.</span></div>
      <div class="task"><span>🎓</span><span class="t-text"><a href="https://www.khanacademy.org/sat" target="_blank" rel="noopener">Khan Academy Official Digital SAT Prep</a> — free, official, and the source of the 20-hours ≈ +115 points data.</span></div>
      <div class="task"><span>🖩</span><span class="t-text"><a href="https://www.desmos.com/calculator" target="_blank" rel="noopener">Desmos graphing calculator</a> — built into the real test. Practicing with it is free points on Math.</span></div>
      <p class="small muted mt">Summit's original question bank + these official materials = full coverage without paying anyone.</p>
    </div>`;
  $("#worry-clear")?.addEventListener("click", () => { $("#worry-box").value = ""; toast("Cleared. Deep breath — you've done the work. 🏔️"); });
}

/* ============================================================
   ANALYTICS
   ============================================================ */
function renderAnalytics() {
  if (!S.profile) return renderOnboarding();
  const per = statsByDomain();
  const total = S.attempts.length;
  const correct = S.attempts.filter(a => a.correct).length;
  const acc = total ? Math.round(correct / total * 100) : 0;
  const pred = predictedScore();

  // pace stats
  const paceRow = (section) => {
    const at = S.attempts.filter(a => a.secs > 0 && Q_BY_ID[a.qid]?.section === section);
    if (!at.length) return null;
    const avg = Math.round(at.reduce((s, a) => s + a.secs, 0) / at.length);
    return { avg, bench: BENCH[section], n: at.length };
  };
  const paceRw = paceRow("rw"), paceM = paceRow("math");

  // error causes
  const causes = {};
  S.attempts.forEach(a => { if (a.cause) causes[a.cause] = (causes[a.cause] || 0) + 1; });
  const causeTotal = Object.values(causes).reduce((s, n) => s + n, 0);

  main().innerHTML = `
    <h1 class="page-title">Analytics</h1>
    <p class="page-sub">Where your points are — and where the next 50 are hiding.</p>
    <div class="tiles">
      <div class="tile brand"><div class="t-label">Predicted score</div><div class="t-value">${pred ?? "—"}</div><div class="t-note">target ${S.profile.targetScore}</div></div>
      <div class="tile"><div class="t-label">Questions answered</div><div class="t-value">${total}</div><div class="t-note">${correct} correct · ${acc}% accuracy</div></div>
      <div class="tile amber"><div class="t-label">Mock exams</div><div class="t-value">${S.exams.length}</div><div class="t-note">${S.exams.length ? "last: " + S.exams[S.exams.length - 1].total : "3+ full-lengths ≈ +60 pts"}</div></div>
      <div class="tile green"><div class="t-label">Review queue</div><div class="t-value">${S.reviewQueue.length}</div><div class="t-note">${dueReviews().length} due now</div></div>
    </div>

    <div class="card">
      <h3>Score trend</h3>
      ${S.exams.length ? `<div class="chart-box">${scoreTrendSvg()}</div>
        <div class="legend">
          <span><span class="key" style="background:var(--brand)"></span>Total</span>
          <span><span class="key" style="background:#8b5cf6"></span>Reading &amp; Writing (×2)</span>
          <span><span class="key" style="background:var(--accent)"></span>Math (×2)</span>
          <span><span class="key" style="background:var(--warn)"></span>Target</span>
        </div>`
      : `<div class="empty"><div class="big-ico">📈</div>Take your first mock exam to start your trend line.</div>`}
      ${S.exams.length ? `<div class="mt">${S.exams.map((e, i) =>
        `<button class="btn btn-ghost btn-sm" data-x="${i}" style="margin:2px">${new Date(e.ts).toLocaleDateString()} · ${e.total} →</button>`).join("")}</div>` : ""}
    </div>

    <div class="row">
      <div class="card">
        <h3>Accuracy by domain</h3>
        ${ALL_DOMAINS.map(d => {
        const s = per[d.id] || { seen: 0, correct: 0 };
        const a = s.seen ? Math.round(s.correct / s.seen * 100) : null;
        return `<div class="skill-row">
            <span class="name">${d.icon} ${esc(d.name)}</span>
            <div class="bar ${a === null ? "" : a >= 75 ? "green" : a >= 50 ? "amber" : "red"}"><i style="width:${a ?? 0}%"></i></div>
            <span class="pct">${a === null ? "—" : a + "%"}</span>
          </div>`;
      }).join("")}
        <p class="small muted mt">The red bar with the most attempts is your highest-value target.</p>
      </div>
      <div>
        <div class="card">
          <h3>Pace vs. the real test</h3>
          ${paceRw || paceM ? `
            ${paceRw ? `<div class="skill-row"><span class="name">📖 Reading &amp; Writing</span><span class="pct" style="width:auto">${paceRw.avg}s <span class="muted small">(target ${paceRw.bench}s)</span> ${paceRw.avg <= paceRw.bench ? "✅" : "🐢"}</span></div>` : ""}
            ${paceM ? `<div class="skill-row"><span class="name">🧮 Math</span><span class="pct" style="width:auto">${paceM.avg}s <span class="muted small">(target ${paceM.bench}s)</span> ${paceM.avg <= paceM.bench ? "✅" : "🐢"}</span></div>` : ""}
            <p class="small muted mt">Averaged over timed attempts. Slow-but-right still needs a re-drill — speed comes from familiarity, not rushing.</p>`
      : `<p class="small muted">Do some soft-timed practice to see your pace.</p>`}
        </div>
        <div class="card">
          <h3>Why you miss (error log)</h3>
          ${causeTotal ? Object.entries(causes).sort((a, b) => b[1] - a[1]).map(([c, n]) => `
            <div class="skill-row">
              <span class="name">${esc(c)}</span>
              <div class="bar amber"><i style="width:${Math.round(n / causeTotal * 100)}%"></i></div>
              <span class="pct">${n}</span>
            </div>`).join("") + `<p class="small muted mt">${topCauseAdvice(causes)}</p>`
      : `<p class="small muted">Tag your misses in practice ("Why the miss?") and patterns show up here.</p>`}
        </div>
      </div>
    </div>

    <div class="card">
      <h3>Badges</h3>
      <div class="badges">
        ${BADGES.map(b => `
          <div class="badge-card ${S.badges.includes(b.id) ? "" : "locked"}">
            <div class="b-ico">${b.ico}</div><b>${esc(b.name)}</b><span>${esc(b.desc)}</span>
          </div>`).join("")}
      </div>
    </div>

    <div class="card">
      <h3>Study streak — last 14 days</h3>
      <div class="streak-days">${streakStrip(14)}</div>
    </div>`;
  document.querySelectorAll("[data-x]").forEach(b =>
    b.addEventListener("click", () => renderExamReview(+b.dataset.x)));
}

function topCauseAdvice(causes) {
  const top = Object.entries(causes).sort((a, b) => b[1] - a[1])[0]?.[0];
  return {
    "Didn't know it": "Content gaps → hit the matching module lesson, then drill that domain.",
    "Careless slip": "Slips → slow down 5 seconds on the final read of each question; underline what's actually asked.",
    "Misread it": "Misreads → restate the question in your own words before looking at choices.",
    "Too slow": "Time pressure → more soft-timed sets; build the internal clock before full mocks.",
    "Guessed": "Guessing → use elimination first; even one crossed-out choice changes the odds.",
  }[top] || "";
}

function scoreTrendSvg() {
  const W = 640, H = 240, P = 36;
  const exams = S.exams;
  const n = exams.length;
  const xs = i => n === 1 ? W / 2 : P + i * (W - 2 * P) / (n - 1);
  const yFor = v => H - P - ((v - 400) / 1200) * (H - 2 * P);
  // section scores (200-800) are plotted doubled so all three lines share one 400-1600 axis
  const line = (vals, color, dash = "") =>
    `<polyline fill="none" stroke="${color}" stroke-width="2.5" ${dash ? `stroke-dasharray="${dash}"` : ""}
      points="${vals.map((v, i) => `${xs(i)},${yFor(v)}`).join(" ")}"/>` +
    vals.map((v, i) => `<circle cx="${xs(i)}" cy="${yFor(v)}" r="4" fill="${color}"/>`).join("");
  const gridLines = [400, 800, 1200, 1600].map(v =>
    `<line x1="${P}" y1="${yFor(v)}" x2="${W - P}" y2="${yFor(v)}" stroke="var(--line)" stroke-width="1"/>
     <text x="${P - 6}" y="${yFor(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}</text>`).join("");
  const target = S.profile.targetScore;
  const targetLine = `<line x1="${P}" y1="${yFor(target)}" x2="${W - P}" y2="${yFor(target)}" stroke="var(--warn)" stroke-width="1.5" stroke-dasharray="6 4"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Score trend chart">
    ${gridLines}${targetLine}
    ${line(exams.map(e => e.rw * 2), "#8b5cf6", "3 4")}
    ${line(exams.map(e => e.math * 2), "#10b981", "3 4")}
    ${line(exams.map(e => e.total), "#4f46e5")}
    ${exams.map((e, i) => `<text x="${xs(i)}" y="${H - 8}" text-anchor="middle" font-size="10" fill="var(--muted)">${new Date(e.ts).toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}</text>`).join("")}
  </svg>`;
}

function streakStrip(days) {
  const set = new Set(S.streakDays);
  let out = "";
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = todayKey(d);
    const lit = set.has(key);
    out += `<div class="streak-day ${lit ? "lit" : ""}" title="${key}">
      <span>${d.toLocaleDateString(undefined, { weekday: "narrow" })}</span><span>${lit ? "🔥" : d.getDate()}</span></div>`;
  }
  return out;
}

/* ============================================================
   SETTINGS
   ============================================================ */
function renderSettings() {
  if (!S.profile) return renderOnboarding();
  const theme = document.documentElement.dataset.theme || "auto";
  main().innerHTML = `
    <h1 class="page-title">Settings</h1>
    <p class="page-sub">Your data lives in this browser only. Export it to move devices.</p>
    <div class="card" style="max-width:560px">
      <h3>Profile</h3>
      <div class="form-grid">
        <div class="field"><label for="st-name">Name</label><input id="st-name" value="${esc(S.profile.name)}" maxlength="30"></div>
        <div class="field"><label for="st-date">Test date</label><input id="st-date" type="date" value="${esc(S.profile.testDate)}"></div>
        <div class="field"><label for="st-target">Target score</label>
          <select id="st-target">${[1200, 1300, 1400, 1500, 1600].map(v =>
    `<option value="${v}" ${S.profile.targetScore === v ? "selected" : ""}>${v}</option>`).join("")}</select></div>
        <div class="field"><label>Theme</label>
          <div class="seg" id="st-theme">
            <button data-v="auto" ${theme === "auto" ? 'class="on"' : ""}>Auto</button>
            <button data-v="light" ${theme === "light" ? 'class="on"' : ""}>Light</button>
            <button data-v="dark" ${theme === "dark" ? 'class="on"' : ""}>Dark</button>
          </div></div>
        <button class="btn btn-primary" id="st-save">Save changes</button>
      </div>
    </div>
    <div class="card" style="max-width:560px">
      <h3>Data</h3>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-ghost" id="st-export">⬇ Export progress (JSON)</button>
        <label class="btn btn-ghost" style="cursor:pointer">⬆ Import progress<input id="st-import" type="file" accept=".json" style="display:none"></label>
      </div>
      <hr class="soft">
      <h3 style="color:var(--danger)">Danger zone</h3>
      <p class="small muted mb">Erases all progress, plans, and chat history on this device.</p>
      <button class="btn btn-danger" id="st-reset">Reset everything</button>
    </div>`;

  document.querySelectorAll("#st-theme button").forEach(b => b.addEventListener("click", () => {
    document.querySelectorAll("#st-theme button").forEach(x => x.classList.remove("on"));
    b.classList.add("on");
    applyTheme(b.dataset.v);
  }));
  $("#st-save").addEventListener("click", () => {
    S.profile.name = $("#st-name").value.trim() || S.profile.name;
    const oldDate = S.profile.testDate;
    S.profile.testDate = $("#st-date").value || S.profile.testDate;
    S.profile.targetScore = +$("#st-target").value;
    if (oldDate !== S.profile.testDate) generatePlan();
    save(); toast("Saved."); renderSettings();
  });
  $("#st-export").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "summit-sat-progress.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $("#st-import").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (!data || typeof data !== "object" || !("attempts" in data)) throw new Error("bad file");
        S = Object.assign(DEFAULT_STATE(), data);
        save(); toast("Progress imported."); show("dashboard");
      } catch { toast("That file doesn't look like a Summit export."); }
    };
    r.readAsText(f);
  });
  $("#st-reset").addEventListener("click", () => {
    if (confirm("Really erase ALL progress on this device? This cannot be undone.")) {
      localStorage.removeItem(STORE_KEY);
      try { localStorage.removeItem("summit_theme"); } catch (e) { }
      S = DEFAULT_STATE();
      show("dashboard");
      toast("Fresh start. Let's climb.");
    }
  });
}

function applyTheme(t) {
  if (t === "auto") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
  try { t === "auto" ? localStorage.removeItem("summit_theme") : localStorage.setItem("summit_theme", t); } catch (e) { }
}

/* ---------------- boot ---------------- */
try { const t = localStorage.getItem("summit_theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) { }
renderSideStats();
show("dashboard"); // dashboard redirects to onboarding when no profile exists
