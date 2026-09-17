/* ============================================================
   Summit SAT — application logic
   Views: onboarding, dashboard, practice, exam, modules,
   plan, tutor, analytics, settings.
   All state persists to localStorage. No network calls.
   ============================================================ */

/* ---------------- state ---------------- */
const STORE_KEY = "summit_sat_v1";

const DEFAULT_STATE = () => ({
  profile: null,               // {name, testDate, targetScore}
  attempts: [],                // {qid, correct, diff, ts, mode}
  exams: [],                   // {ts, kind, rw, math, total, correct, count}
  xp: 0,
  streakDays: [],              // ["2026-09-17", ...]
  plan: null,                  // {generatedAt, weeks:[{label, tasks:[{id,text,type,done}]}]}
  badges: [],
  chat: [],                    // {who:"user"|"bot", text}
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
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2600);
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

/* ---------------- streak / xp / badges ---------------- */
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
  // today counts if present; otherwise streak may still be alive from yesterday
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

/* ---------------- study plan ---------------- */
function generatePlan() {
  const weeksLeft = Math.min(12, Math.max(1, Math.ceil((daysUntil(S.profile?.testDate) ?? 42) / 7)));
  const weak = weakestDomains(2);
  const weeks = [];
  for (let w = 1; w <= weeksLeft; w++) {
    const tasks = [];
    const push = (text, type) => tasks.push({ id: `w${w}t${tasks.length}`, text, type, done: false });
    if (w === 1 && !S.exams.length) push("Take your diagnostic mock exam", "exam");
    push(`Adaptive practice: 10 questions on ${weak[0].icon} ${weak[0].name}`, "practice");
    push(`Adaptive practice: 10 questions on ${weak[1].icon} ${weak[1].name}`, "practice");
    push("Mixed practice: 10 questions across all domains", "practice");
    push("Review one learning module and drill its weakest subtopic", "module");
    push("Ask Professor Peak to explain your last miss", "tutor");
    if (w % 2 === 0 || w === weeksLeft) push("Full adaptive mock exam + review every miss", "exam");
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
  const views = {
    dashboard: renderDashboard, practice: renderPracticeSetup, exam: renderExamIntro,
    modules: renderModules, plan: renderPlan, tutor: renderTutor,
    analytics: renderAnalytics, settings: renderSettings,
  };
  (views[view] || renderDashboard)(arg);
}
document.querySelectorAll(".side-link").forEach(b =>
  b.addEventListener("click", () => {
    stopTimer();
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
            <div class="hint">Pick your real or planned test date — your study plan is built from it.</div>
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
          <p class="small muted">A ~15-minute adaptive mock pinpoints your score and your weak spots. Everything else calibrates from it.</p>
        </div>
        <button class="btn btn-primary" id="go-diag">Take the diagnostic →</button>
      </div>
    </div>`;

  // current week's next tasks
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
        <div class="t-note">study daily to keep it alive</div></div>
      <div class="tile green"><div class="t-label">XP · Level</div>
        <div class="t-value">${S.xp}</div>
        <div class="t-note">level ${level()}</div></div>
      <div class="tile"><div class="t-label">Plan progress</div>
        <div class="t-value">${prog ?? 0}%</div>
        <div class="t-note">${S.attempts.length} questions answered</div></div>
    </div>

    ${diagCta}

    <div class="row mt">
      <div class="card">
        <h3>Skill mastery</h3>
        ${weakRows.map(r => `
          <div class="skill-row">
            <span class="name">${r.d.icon} ${esc(r.d.name)}</span>
            <div class="bar ${r.acc === null ? "" : r.acc >= .75 ? "green" : r.acc >= .5 ? "amber" : "red"}"><i style="width:${r.acc === null ? 0 : Math.round(r.acc * 100)}%"></i></div>
            <span class="pct">${r.acc === null ? "—" : Math.round(r.acc * 100) + "%"}</span>
          </div>`).join("")}
        <p class="small muted mt">Bars fill as you practice. Red = cheapest points available.</p>
      </div>
      <div>
        ${taskHtml}
        <div class="card">
          <h3>Quick actions</h3>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button class="btn btn-primary" id="qa-practice">🧠 Adaptive practice (10 questions)</button>
            <button class="btn btn-ghost" id="qa-exam">📝 ${S.exams.length ? "Take a mock exam" : "Take the diagnostic"}</button>
            <button class="btn btn-ghost" id="qa-tutor">🦉 Ask Professor Peak</button>
          </div>
        </div>
      </div>
    </div>`;

  $("#go-diag")?.addEventListener("click", () => show("exam"));
  $("#go-plan")?.addEventListener("click", () => show("plan"));
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
   QUIZ ENGINE (shared by practice + exam)
   ============================================================ */
let quiz = null;   // active quiz session
let timerH = null;

function stopTimer() { if (timerH) { clearInterval(timerH); timerH = null; } }

function pickQuestions({ section, domain, count, diffMin = 1, diffMax = 3, exclude = [] }) {
  const seenCount = {};
  S.attempts.forEach(a => { seenCount[a.qid] = (seenCount[a.qid] || 0) + 1; });
  let pool = QUESTIONS.filter(q =>
    (section === "mixed" || q.section === section) &&
    (domain === "any" || q.domain === domain) &&
    q.diff >= diffMin && q.diff <= diffMax &&
    !exclude.includes(q.id));
  // fewest-seen first, then shuffle within groups
  pool = pool
    .map(q => ({ q, s: seenCount[q.id] || 0, r: Math.random() }))
    .sort((a, b) => (a.s - b.s) || (a.r - b.r))
    .map(x => x.q);
  return pool.slice(0, count);
}

/* ---------- PRACTICE ---------- */
function renderPracticeSetup() {
  if (!S.profile) return renderOnboarding();
  const domOpts = s => DOMAINS[s].map(d => `<option value="${d.id}">${d.icon} ${esc(d.name)}</option>`).join("");
  main().innerHTML = `
    <h1 class="page-title">Adaptive practice</h1>
    <p class="page-sub">Questions adapt to you: get one right and they get harder; miss and they ease off while I explain.</p>
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
            <option value="any">Any (adaptive mix)</option>
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
        <button class="btn btn-primary btn-lg btn-block" id="pr-start">Start practicing →</button>
      </div>
    </div>`;
  const seg = (id) => {
    $(id).querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
      $(id).querySelectorAll("button").forEach(x => x.classList.remove("on"));
      b.classList.add("on");
    }));
  };
  seg("#pr-section"); seg("#pr-count");
  $("#pr-start").addEventListener("click", () => {
    startPractice({
      section: $("#pr-section .on").dataset.v,
      domain: $("#pr-domain").value,
      count: +$("#pr-count .on").dataset.v,
    });
  });
}

function startPractice(cfg) {
  stopTimer();
  // starting difficulty from history in the chosen scope
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
  // pick nearest to target difficulty
  let q = null;
  for (const spread of [0, 1, 2]) {
    const got = pickQuestions({
      section: cfg.section, domain: cfg.domain, count: 1,
      diffMin: Math.max(1, quiz.targetDiff - spread),
      diffMax: Math.min(3, quiz.targetDiff + spread),
      exclude: quiz.asked,
    });
    if (got.length) { q = got[0]; break; }
  }
  if (!q) return finishPractice(); // pool exhausted
  setCurrent(q);
  Tutor.setContext(q.id);
  renderQuestion();
}

// answers are stored at index 0 in the bank, so shuffle the display order
function setCurrent(q) {
  quiz.current = q; quiz.answered = false;
  if (!quiz.asked.includes(q.id)) quiz.asked.push(q.id);
  const order = q.choices.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  quiz.choiceOrder = order;
}

function renderQuestion() {
  const q = quiz.current;
  const dom = DOMAIN_BY_ID[q.domain];
  const isExam = quiz.mode === "exam";
  const num = quiz.idx + 1;
  const total = isExam ? quiz.moduleQs.length : quiz.cfg.count;
  const diffChip = q.diff === 1 ? `<span class="chip easy">Easy</span>` : q.diff === 2 ? `<span class="chip med">Medium</span>` : `<span class="chip hard">Hard</span>`;

  main().innerHTML = `
    <div class="quiz-top">
      <div>
        <span class="chip brand">${dom.icon} ${esc(dom.name)}</span>
        <span class="chip gray">${esc(q.skill)}</span>
        ${isExam ? "" : diffChip}
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        ${isExam ? `<div class="timer" id="timer">--:--</div>` : ""}
        <span class="muted small">${num} / ${total}</span>
        <button class="btn btn-danger btn-sm" id="q-quit">${isExam ? "Abandon" : "End set"}</button>
      </div>
    </div>
    <div class="card">
      ${q.passage ? `<div class="passage">${esc(q.passage)}</div>` : ""}
      <div class="q-stem">${esc(q.stem)}</div>
      <div class="choices" id="choices">
        ${quiz.choiceOrder.map((orig, i) => `
          <button class="choice" data-i="${i}" data-orig="${orig}">
            <span class="letter">${"ABCD"[i]}</span><span>${esc(q.choices[orig])}</span>
          </button>`).join("")}
      </div>
      <div id="feedback"></div>
      <div class="quiz-nav">
        <div>${isExam ? "" : `<button class="btn btn-ghost" id="q-hint">🦉 Get a hint</button>`}</div>
        <button class="btn btn-primary" id="q-next" disabled>${isExam ? "Next →" : "Check answer"}</button>
      </div>
    </div>
    <div id="hint-box"></div>`;

  let selected = null;
  document.querySelectorAll(".choice").forEach(btn => btn.addEventListener("click", () => {
    if (quiz.answered) return;
    selected = +btn.dataset.i;
    document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    $("#q-next").disabled = false;
  }));

  $("#q-quit").addEventListener("click", () => {
    stopTimer(); Tutor.clearContext();
    if (quiz.mode === "exam") { quiz = null; show("exam"); }
    else finishPractice(true);
  });

  $("#q-hint")?.addEventListener("click", () => {
    const h = Tutor.nextHint();
    if (h) {
      const box = $("#hint-box");
      box.innerHTML = `<div class="card" style="border-left:4px solid var(--brand)"><b>🦉 Professor Peak</b><p class="small" style="margin-top:6px;white-space:pre-wrap">${esc(h)}</p></div>` + box.innerHTML;
    }
  });

  $("#q-next").addEventListener("click", () => {
    if (!quiz.answered) {
      if (selected === null) return;
      submitAnswer(selected);
    } else {
      quiz.idx++;
      if (quiz.mode === "exam") nextExamQuestion(); else nextPracticeQuestion();
    }
  });

  if (isExam) renderTimer();
}

function submitAnswer(selected) {
  const q = quiz.current;
  const correct = quiz.choiceOrder[selected] === q.answer;
  const answerPos = quiz.choiceOrder.indexOf(q.answer); // where the right answer is displayed
  quiz.answered = true;
  if (correct) quiz.correct++;

  // record + rewards (both modes)
  S.attempts.push({ qid: q.id, correct, diff: q.diff, ts: Date.now(), mode: quiz.mode });
  const gained = correct ? 10 * q.diff : 2;
  S.xp += gained;
  if (quiz.mode === "practice") quiz.xpEarned += gained; else quiz.xpEarned = (quiz.xpEarned || 0) + gained;
  touchStreak(); save(); checkBadges();

  if (quiz.mode === "exam") {
    // exam: no immediate feedback, keep momentum
    quiz.moduleAnswers[q.id] = correct;
    quiz.idx++; nextExamQuestion();
    return;
  }

  // practice: adapt + show feedback
  quiz.targetDiff = Math.max(1, Math.min(3, quiz.targetDiff + (correct ? 1 : -1)));
  document.querySelectorAll(".choice").forEach(b => {
    const i = +b.dataset.i;
    b.disabled = true;
    if (i === answerPos) b.classList.add("correct");
    else if (i === selected && !correct) b.classList.add("wrong");
  });
  $("#feedback").innerHTML = `
    <div class="explain ${correct ? "" : "bad"}">
      <b>${correct ? `✅ Correct! +${10 * q.diff} XP` : `❌ Not quite — the answer is ${"ABCD"[answerPos]}. +2 XP for the rep`}</b>
      ${esc(q.explanation)}
    </div>`;
  const nextBtn = $("#q-next");
  nextBtn.textContent = quiz.idx + 1 >= quiz.cfg.count ? "See results →" : "Next question →";
  nextBtn.disabled = false;
}

function finishPractice(early = false) {
  stopTimer(); Tutor.clearContext();
  const answeredCount = quiz.asked.length - (quiz.answered ? 0 : 1);
  if (answeredCount === 0) { quiz = null; return show("practice"); }
  const total = answeredCount;
  const correct = quiz.correct;
  const pct = Math.round(correct / total * 100);
  if (!early && total >= 5 && correct === total) { S._perfectSet = true; }
  checkBadges(); save();
  const weak = weakestDomains(1)[0];
  main().innerHTML = `
    <div class="card score-hero">
      <div style="font-size:2.4rem">${pct >= 80 ? "🏆" : pct >= 60 ? "💪" : "🌱"}</div>
      <div class="big">${correct}/${total}</div>
      <div class="rng">${pct}% correct · +${quiz.xpEarned} XP</div>
      <div class="score-split">
        <div class="part"><div class="v">🔥 ${streakCount()}</div><div class="l">day streak</div></div>
        <div class="part"><div class="v">⭐ ${S.xp}</div><div class="l">total XP</div></div>
        <div class="part"><div class="v">Lv ${level()}</div><div class="l">level</div></div>
      </div>
    </div>
    <div class="card mt">
      <h3>What's next?</h3>
      <p class="small muted mb">Your weakest area right now: ${weak.icon} ${esc(weak.name)}.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" id="r-weak">Drill ${esc(weak.name)}</button>
        <button class="btn btn-ghost" id="r-again">Another set</button>
        <button class="btn btn-ghost" id="r-review">🦉 Review my misses</button>
        <button class="btn btn-ghost" id="r-home">Home</button>
      </div>
    </div>`;
  $("#r-weak").addEventListener("click", () => startPractice({ section: "mixed", domain: weak.id, count: 5 }));
  $("#r-again").addEventListener("click", () => show("practice"));
  $("#r-review").addEventListener("click", () => { show("tutor"); setTimeout(() => tutorSend("explain my last miss"), 50); });
  $("#r-home").addEventListener("click", () => show("dashboard"));
  quiz = null;
}

/* ---------- EXAM ---------- */
const EXAM_PLAN = [
  { section: "rw", name: "Reading & Writing", perModule: 5, minutes: 6 },
  { section: "math", name: "Math", perModule: 5, minutes: 8 },
];

function renderExamIntro() {
  if (!S.profile) return renderOnboarding();
  const isDiag = !S.exams.length;
  main().innerHTML = `
    <h1 class="page-title">${isDiag ? "Diagnostic mock exam" : "Adaptive mock exam"}</h1>
    <p class="page-sub">Modeled on the Digital SAT's adaptive structure — module 2 gets harder or easier based on module 1.</p>
    <div class="card" style="max-width:640px">
      <h3>Format (${isDiag ? "diagnostic" : "mock"} — condensed)</h3>
      <div class="task"><span>📖</span><span class="t-text">Reading &amp; Writing · 2 adaptive modules · 5 questions each · 6 min per module</span></div>
      <div class="task"><span>🧮</span><span class="t-text">Math · 2 adaptive modules · 5 questions each · 8 min per module</span></div>
      <div class="task"><span>⏱️</span><span class="t-text">Timed per module — unanswered questions count as incorrect</span></div>
      <div class="task"><span>📊</span><span class="t-text">Instant scaled score (400–1600) with section breakdown</span></div>
      <hr class="soft">
      <p class="small muted mb">Find a quiet spot. No notes, no tutor hints during the exam — just like the real thing.</p>
      <button class="btn btn-primary btn-lg btn-block" id="ex-start">Begin ${isDiag ? "diagnostic" : "exam"} →</button>
      ${S.exams.length ? `<p class="small muted center mt">Last score: <b>${S.exams[S.exams.length - 1].total}</b> on ${new Date(S.exams[S.exams.length - 1].ts).toLocaleDateString()}</p>` : ""}
    </div>`;
  $("#ex-start").addEventListener("click", startExam);
}

function startExam() {
  stopTimer();
  quiz = {
    mode: "exam", idx: 0, correct: 0, xpEarned: 0, asked: [],
    stage: 0,           // index into EXAM_PLAN
    module: 1,          // 1 or 2
    moduleQs: [], moduleCorrect: 0, hardModule2: {}, results: {},
    secondsLeft: 0, answered: false,
  };
  loadExamModule();
}

function loadExamModule() {
  const plan = EXAM_PLAN[quiz.stage];
  let diffMin = 1, diffMax = 3;
  if (quiz.module === 2) {
    const hard = quiz.moduleCorrect / EXAM_PLAN[quiz.stage].perModule >= 0.6;
    quiz.hardModule2[plan.section] = hard;
    if (hard) { diffMin = 2; diffMax = 3; } else { diffMin = 1; diffMax = 2; }
  }
  quiz.moduleQs = pickQuestions({
    section: plan.section, domain: "any", count: plan.perModule,
    diffMin, diffMax, exclude: quiz.asked,
  });
  // fallback if pool is thin: allow any difficulty
  if (quiz.moduleQs.length < plan.perModule) {
    const extra = pickQuestions({
      section: plan.section, domain: "any",
      count: plan.perModule - quiz.moduleQs.length,
      exclude: quiz.asked.concat(quiz.moduleQs.map(q => q.id)),
    });
    quiz.moduleQs = quiz.moduleQs.concat(extra);
  }
  // reserve every question in this module, even ones time may cut off,
  // so a later module never repeats them
  quiz.moduleQs.forEach(q => { if (!quiz.asked.includes(q.id)) quiz.asked.push(q.id); });
  quiz.idx = 0; quiz.moduleCorrect = 0; quiz.moduleAnswers = {};
  quiz.secondsLeft = plan.minutes * 60;
  renderModuleIntro();
}

function renderModuleIntro() {
  const plan = EXAM_PLAN[quiz.stage];
  const hardNote = quiz.module === 2
    ? (quiz.hardModule2[plan.section]
      ? `<p class="chip hard" style="margin-bottom:12px">Module 2 · harder set unlocked</p>`
      : `<p class="chip easy" style="margin-bottom:12px">Module 2 · standard set</p>`)
    : "";
  main().innerHTML = `
    <div class="card center" style="max-width:520px;margin:60px auto;padding:44px 32px">
      <div style="font-size:2.4rem">${plan.section === "rw" ? "📖" : "🧮"}</div>
      <h2 style="margin:10px 0 4px">${esc(plan.name)} — Module ${quiz.module}</h2>
      ${hardNote}
      <p class="muted small mb">${quiz.moduleQs.length} questions · ${plan.minutes} minutes. The timer starts when you click.</p>
      <button class="btn btn-primary btn-lg" id="mod-go">Start module →</button>
    </div>`;
  $("#mod-go").addEventListener("click", () => {
    startModuleTimer();
    nextExamQuestion(true);
  });
}

function startModuleTimer() {
  stopTimer();
  timerH = setInterval(() => {
    quiz.secondsLeft--;
    const el = $("#timer");
    if (el) {
      const m = Math.floor(quiz.secondsLeft / 60), s = quiz.secondsLeft % 60;
      el.textContent = `${m}:${String(s).padStart(2, "0")}`;
      el.classList.toggle("low", quiz.secondsLeft <= 60);
    }
    if (quiz.secondsLeft <= 0) {
      stopTimer();
      toast("⏱️ Time! Moving on.");
      // unanswered questions in this module count as missed (not recorded)
      endModule();
    }
  }, 1000);
}
function renderTimer() {
  const el = $("#timer");
  if (el && quiz) {
    const m = Math.floor(quiz.secondsLeft / 60), s = quiz.secondsLeft % 60;
    el.textContent = `${m}:${String(s).padStart(2, "0")}`;
  }
}

function nextExamQuestion(first = false) {
  if (!first && quiz.idx >= quiz.moduleQs.length) return endModule();
  const q = quiz.moduleQs[quiz.idx];
  if (!q) return endModule();
  setCurrent(q);
  renderQuestion();
}

function endModule() {
  stopTimer();
  const plan = EXAM_PLAN[quiz.stage];
  // score this module from the answers recorded during it;
  // unanswered questions (time expired) count as incorrect
  quiz.moduleCorrect = quiz.moduleQs.filter(q => quiz.moduleAnswers[q.id] === true).length;
  quiz.results[plan.section] = quiz.results[plan.section] || { correct: 0, weight: 0, weightMax: 0, count: 0 };
  const r = quiz.results[plan.section];
  quiz.moduleQs.forEach(q => {
    r.weightMax += q.diff; r.count++;
    if (quiz.moduleAnswers[q.id] === true) { r.correct++; r.weight += q.diff; }
  });

  if (quiz.module === 1) {
    quiz.module = 2;
    loadExamModule();
  } else if (quiz.stage + 1 < EXAM_PLAN.length) {
    quiz.stage++; quiz.module = 1;
    loadExamModule();
  } else {
    finishExam();
  }
}

function sectionScore(section) {
  const r = quiz.results[section];
  if (!r || !r.weightMax) return 200;
  const pct = r.weight / r.weightMax;
  let score = 200 + 550 * pct;
  if (quiz.hardModule2[section]) score += 50 * pct; // harder module unlocks the top band
  return Math.max(200, Math.min(800, Math.round(score / 10) * 10));
}

function finishExam() {
  stopTimer(); Tutor.clearContext();
  const rw = sectionScore("rw"), math = sectionScore("math");
  const total = rw + math;
  const kind = S.exams.length ? "mock" : "diagnostic";
  const correct = (quiz.results.rw?.correct || 0) + (quiz.results.math?.correct || 0);
  const count = (quiz.results.rw?.count || 0) + (quiz.results.math?.count || 0);
  S.exams.push({ ts: Date.now(), kind, rw, math, total, correct, count });
  if (kind === "diagnostic") generatePlan(); // recalibrate plan to real weaknesses
  touchStreak(); save(); checkBadges();

  const target = S.profile.targetScore;
  const delta = total - target;
  const prev = S.exams.length > 1 ? S.exams[S.exams.length - 2].total : null;
  main().innerHTML = `
    <div class="card score-hero">
      <div style="font-size:2.2rem">${total >= target ? "🏔️🎉" : "🧗"}</div>
      <p class="muted small" style="margin-bottom:4px">${kind === "diagnostic" ? "Diagnostic complete — your baseline is set" : "Mock exam complete"}</p>
      <div class="big">${total}</div>
      <div class="rng">estimated scaled score (400–1600) · ${correct}/${count} correct</div>
      <div class="score-split">
        <div class="part"><div class="v">${rw}</div><div class="l">Reading &amp; Writing ${quiz.hardModule2.rw ? "· hard M2" : ""}</div></div>
        <div class="part"><div class="v">${math}</div><div class="l">Math ${quiz.hardModule2.math ? "· hard M2" : ""}</div></div>
        <div class="part"><div class="v">${delta >= 0 ? "+" + delta : delta}</div><div class="l">vs. target ${target}</div></div>
        ${prev !== null ? `<div class="part"><div class="v">${total - prev >= 0 ? "+" + (total - prev) : total - prev}</div><div class="l">vs. last mock</div></div>` : ""}
      </div>
    </div>
    <div class="card mt">
      <h3>${kind === "diagnostic" ? "Your plan just calibrated itself" : "Keep the loop going"}</h3>
      <p class="small muted mb">${kind === "diagnostic"
        ? "Your study plan now targets the exact domains that cost you points. Check it out — week 1 starts today."
        : "Review every miss with Professor Peak, then get back to the plan."}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-primary" id="x-plan">See my study plan</button>
        <button class="btn btn-ghost" id="x-review">🦉 Review my misses</button>
        <button class="btn btn-ghost" id="x-analytics">📈 Analytics</button>
      </div>
    </div>`;
  $("#x-plan").addEventListener("click", () => show("plan"));
  $("#x-review").addEventListener("click", () => { show("tutor"); setTimeout(() => tutorSend("explain my last miss"), 50); });
  $("#x-analytics").addEventListener("click", () => show("analytics"));
  quiz = null;
}

/* ============================================================
   MODULES
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
          <div style="margin-top:12px"><button class="btn btn-primary btn-sm drill" data-dom="${d.id}">Drill this domain →</button></div>
        </div>
      </div>`;
    }).join("")}`;

  main().innerHTML = `
    <h1 class="page-title">Learning modules</h1>
    <p class="page-sub">Every skill the Digital SAT tests, with your live mastery. Click a module to expand its subtopics.</p>
    ${block("Reading & Writing", DOMAINS.rw)}
    ${block("Math", DOMAINS.math)}`;

  document.querySelectorAll(".module-card").forEach(c => c.addEventListener("click", e => {
    if (e.target.closest(".drill")) return;
    c.classList.toggle("open");
  }));
  document.querySelectorAll(".drill").forEach(b => b.addEventListener("click", () => {
    startPractice({ section: domainSection(b.dataset.dom), domain: b.dataset.dom, count: 5 });
  }));
}

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
        <p class="page-sub">Built from your test date (${fmtDate(S.profile.testDate)}) and your weakest domains. Regenerates as you improve.</p>
      </div>
      <button class="btn btn-ghost" id="plan-regen">↻ Rebuild plan</button>
    </div>
    <div class="card mb">
      <div class="spread"><h3>Overall progress</h3><b>${prog}%</b></div>
      <div class="bar green mt" style="height:12px"><i style="width:${prog}%"></i></div>
    </div>
    ${S.plan.weeks.map((w, wi) => `
      <div class="card week-card ${wi === curW ? "" : ""}" ${wi === curW ? 'style="border-color:var(--brand)"' : ""}>
        <div class="spread"><h3>${esc(w.label)} ${wi === curW ? '<span class="chip brand">current</span>' : ""}</h3>
          <span class="muted small">${w.tasks.filter(t => t.done).length}/${w.tasks.length} done</span></div>
        ${w.tasks.map(t => `
          <div class="task ${t.done ? "done" : ""}">
            <input type="checkbox" ${t.done ? "checked" : ""} data-w="${wi}" data-t="${esc(t.id)}">
            <span class="t-text">${esc(t.text)}</span>
            ${t.type === "practice" ? `<button class="btn btn-ghost btn-sm go-task" data-kind="practice">Go</button>` :
              t.type === "exam" ? `<button class="btn btn-ghost btn-sm go-task" data-kind="exam">Go</button>` :
              t.type === "module" ? `<button class="btn btn-ghost btn-sm go-task" data-kind="modules">Go</button>` :
              t.type === "tutor" ? `<button class="btn btn-ghost btn-sm go-task" data-kind="tutor">Go</button>` : ""}
          </div>`).join("")}
      </div>`).join("")}`;

  $("#plan-regen").addEventListener("click", () => {
    generatePlan(); toast("Plan rebuilt around your current weak spots."); renderPlan();
  });
  document.querySelectorAll(".task input[type=checkbox]").forEach(cb => cb.addEventListener("change", e => {
    const t = S.plan.weeks[+e.target.dataset.w].tasks.find(x => x.id === e.target.dataset.t);
    if (t) { t.done = e.target.checked; touchStreak(); save(); checkBadges(); renderPlan(); }
  }));
  document.querySelectorAll(".go-task").forEach(b => b.addEventListener("click", () => show(b.dataset.kind)));
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
   ANALYTICS
   ============================================================ */
function renderAnalytics() {
  if (!S.profile) return renderOnboarding();
  const per = statsByDomain();
  const total = S.attempts.length;
  const correct = S.attempts.filter(a => a.correct).length;
  const acc = total ? Math.round(correct / total * 100) : 0;
  const pred = predictedScore();

  main().innerHTML = `
    <h1 class="page-title">Analytics</h1>
    <p class="page-sub">Where your points are — and where the next 50 are hiding.</p>
    <div class="tiles">
      <div class="tile brand"><div class="t-label">Predicted score</div><div class="t-value">${pred ?? "—"}</div><div class="t-note">target ${S.profile.targetScore}</div></div>
      <div class="tile"><div class="t-label">Questions answered</div><div class="t-value">${total}</div><div class="t-note">${correct} correct</div></div>
      <div class="tile green"><div class="t-label">Overall accuracy</div><div class="t-value">${acc}%</div><div class="t-note">all-time</div></div>
      <div class="tile amber"><div class="t-label">Mock exams</div><div class="t-value">${S.exams.length}</div><div class="t-note">${S.exams.length ? "last: " + S.exams[S.exams.length - 1].total : "none yet"}</div></div>
    </div>

    <div class="card">
      <h3>Score trend</h3>
      ${S.exams.length ? `<div class="chart-box">${scoreTrendSvg()}</div>
        <div class="legend">
          <span><span class="key" style="background:var(--brand)"></span>Total</span>
          <span><span class="key" style="background:#8b5cf6"></span>Reading &amp; Writing</span>
          <span><span class="key" style="background:var(--accent)"></span>Math</span>
          <span><span class="key" style="background:var(--warn)"></span>Target</span>
        </div>`
      : `<div class="empty"><div class="big-ico">📈</div>Take your first mock exam to start your trend line.</div>`}
    </div>

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
      <p class="small muted mt">Focus rule: the red bar with the most attempts is your highest-value practice target.</p>
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
      S = DEFAULT_STATE();
      show("dashboard");
      toast("Fresh start. Let's climb.");
    }
  });
}

/* ---------------- boot ---------------- */
renderSideStats();
show("dashboard"); // dashboard redirects to onboarding when no profile exists
