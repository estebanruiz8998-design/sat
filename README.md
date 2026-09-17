# ⛰️ Summit SAT

A complete, personalized **Digital SAT prep platform** that runs entirely in the browser — no build step, no backend, no dependencies, free forever.

> Feature-inspired by modern SAT-prep platforms, built from scratch with original branding, an original verified question bank, and evidence-based study mechanics.

## Run it

Open `index.html` in a browser, or serve the folder statically:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Works as-is on GitHub Pages, Netlify, Vercel, or any static host.

## Pages

| File | What it is |
|---|---|
| `index.html` | Marketing landing page |
| `plans.html` | Pricing page (everything is free in this build) |
| `app.html` | The full prep application |

## The prep engine (what's inside)

**Mock exams at real Digital SAT spec**
- Quick mocks (~30 min) and full-length exams (RW 2×27q @ 32 min, 10-minute break, Math 2×22q @ 35 min)
- Two-stage adaptive routing: strong module 1 → harder module 2, which is what unlocks top scores (easier module 2 caps the section, as on the real test)
- Bluebook-style tools: free navigation with a question grid, flag for review (F), answer eliminator, embedded graphing calculator, per-module timers, halfway pace checkpoints, unanswered-question warning
- Math fill-ins (student-produced responses) with the official entry rules — 5/6-character limit, fraction/decimal equivalence, filled-space decimal grading, live answer preview
- Question-by-question review screen after every exam: your answer vs. correct, explanation, time spent, filters for misses/flagged

**Evidence-based practice loop**
- Retrieval-first: everything starts with a question; explanations come after your attempt
- Interleaved mixed sets that hide the topic until you answer — choosing the strategy is the skill (Rohrer et al. 2020)
- Spaced review queue: misses return at intervals capped at ~18% of days-to-test (Cepeda et al. 2008); three spaced successes graduate an item
- Error log with one-tap cause tagging (didn't know / careless / misread / too slow / guessed) and pattern analytics
- Untimed → soft-timed → fully-timed progression, with real per-question pace targets (~71s RW / ~95s Math)
- 25-40-minute session guidance with a break nudge

**Coaching & content**
- Professor Peak: progressive per-question hints, topic lessons on every tested skill, "explain my last miss" step-by-step reviews, data-driven practice advice
- 8 learning modules with strategy playbooks and per-skill mastery tracking
- Personalized week-by-week study plan: 5 sessions/week, ≥3 timed mocks with one in the final 10 days, rebuilt around your measured weak domains
- The Guide: how-to-study science, pacing playbook, realistic score-gain framing, test-week anxiety toolkit (expressive writing + arousal reappraisal), links to official free resources
- Gamification that serves the learning: streaks, XP, levels, 12 badges
- Dark mode, keyboard shortcuts, JSON export/import

## Question bank

Original questions across the Digital SAT's eight domains — every one written for this project (no College Board or third-party content), each with a difficulty rating, a full explanation, and three progressive hints. Multiple-choice answers are shuffled at render time; Math includes fill-in (SPR) items.

Structural integrity is enforced by `tools/validate-questions.js` (unique IDs, valid taxonomy, 4 distinct choices, answer keys, hint/explanation presence, SPR entry-rule compliance):

```bash
node tools/validate-questions.js
```

Exam modules assemble to the official domain distribution (RW: Craft 28% / Info 26% / Conventions 26% / Expression 20%; Math: Algebra 35% / Advanced 35% / PSDA 15% / Geometry 15%), with RW questions in the real test's fixed skill order and Math sorted easiest→hardest.

## Storage & privacy

All state (progress, plans, chat, streaks, review queue) lives in `localStorage` on the user's device. Nothing is sent anywhere. Export/import from Settings moves progress between devices. The test-week worry-dump exercise is never stored at all.

## Tech

Vanilla HTML/CSS/JS. One stylesheet, three scripts (`questions.js`, `tutor.js`, `app.js`), one validator. Verified by an end-to-end Playwright suite (45 assertions) covering onboarding, practice, interleaving, the review queue, cause tagging, hints, tutor chat, a full 4-module adaptive exam with navigation/flags/eliminator/break screen, the exam review screen, guide, modules, analytics, theming, and persistence.

---

*Summit SAT is an independent project and is not affiliated with the College Board. For official practice, use [Bluebook](https://satsuite.collegeboard.org/practice) and [Khan Academy](https://www.khanacademy.org/sat) alongside it.*
