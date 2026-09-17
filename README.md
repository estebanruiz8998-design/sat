# ⛰️ Summit SAT

A complete, personalized **Digital SAT prep platform** that runs entirely in the browser — no build step, no backend, no dependencies.

> Inspired by modern SAT-prep platforms (study plans, adaptive practice, AI-tutor coaching), rebuilt from scratch with original branding, original questions, and original code.

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
| `index.html` | Marketing landing page (features, method, testimonials, FAQ) |
| `plans.html` | Pricing page with monthly/yearly toggle |
| `app.html` | The full prep application |

## App functionality

- **Onboarding** — name, test date, target score → generates your plan
- **Diagnostic & mock exams** — timed, *adaptive* module structure like the real Digital SAT (module 2 gets harder if you do well on module 1), with instant 400–1600 scaled-score estimates weighted by question difficulty
- **Adaptive practice** — difficulty rises when you're right, eases when you miss; filter by section or any of the 8 domains; instant explanations on every question
- **Professor Peak (tutor)** — progressive per-question hints while practicing, a chat coach that teaches every tested topic (grammar, transitions, quadratics, exponents, probability, trig…), "explain my last miss" step-by-step reviews, and data-driven "what should I practice next?" advice
- **Learning modules** — 8 domains × 24 subtopics with live per-skill mastery tracking and one-click drills
- **Study plan** — week-by-week tasks generated from your test date and your *actual* weakest domains; recalibrates after your diagnostic; checkable tasks with progress tracking
- **Analytics** — score trend chart (total + per-section vs. target), per-domain accuracy bars, streak calendar, badge collection
- **Gamification** — daily streaks, XP and levels, 10 earnable badges
- **Settings** — edit profile, export/import progress as JSON, full reset

## Question bank

54 original questions across the Digital SAT's eight domains:

- **Reading & Writing:** Information & Ideas, Craft & Structure, Expression of Ideas, Standard English Conventions
- **Math:** Algebra, Advanced Math, Problem-Solving & Data Analysis, Geometry & Trigonometry

Each question carries a difficulty rating (used by the adaptive engine and scoring), a full explanation, and three progressive tutor hints. Answer choices are shuffled at render time. Add questions in `js/questions.js` — the whole app (practice, exams, analytics, tutor) picks them up automatically.

## Storage & privacy

All state (progress, plans, chat, streaks) lives in `localStorage` on the user's device. Nothing is sent anywhere. Export/import from Settings moves progress between devices.

## Tech

Vanilla HTML/CSS/JS. One stylesheet (`css/style.css`), three scripts (`questions.js`, `tutor.js`, `app.js`). Verified with an end-to-end Playwright smoke test covering onboarding, practice, hints, tutor chat, a full 4-module adaptive exam, plan, modules, analytics, settings, and persistence across reloads.

---

*Summit SAT is an independent demo project and is not affiliated with the College Board.*
