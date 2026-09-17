/* ============================================================
   Summit SAT — Professor Peak, the built-in tutor
   A rule-based coach: question-aware step hints + strategy
   knowledge for every Digital SAT domain. No network calls.
   ============================================================ */

const Tutor = (() => {

  // Active question context, set by the practice/exam engine.
  let context = null; // { qid, hintIndex }

  const KNOWLEDGE = [
    {
      keys: ["comma", "semicolon", "colon", "punctuation", "dash", "apostrophe", "boundaries"],
      reply:
        "Punctuation on the SAT comes down to sentence boundaries. My checklist:\n\n" +
        "1. Can each side of the punctuation stand alone as a sentence?\n" +
        "   • Both alone → use a period, a semicolon, or comma + FANBOYS (for, and, nor, but, or, yet, so).\n" +
        "   • Only the first → a colon can introduce a list or explanation.\n" +
        "2. A comma alone can NEVER join two complete sentences — that's a comma splice.\n" +
        "3. Asides opened with a comma, dash, or parenthesis must be CLOSED with the same mark.\n\n" +
        "Want to drill this? Head to Practice → Standard English Conventions."
    },
    {
      keys: ["transition", "however", "therefore", "moreover", "connector"],
      reply:
        "Transitions are a 3-second decision once you have the method:\n\n" +
        "1. Summarize the sentence BEFORE the blank in ~4 words.\n" +
        "2. Summarize the sentence AFTER the blank in ~4 words.\n" +
        "3. Ask: do they agree (moreover, indeed), clash (however, nevertheless), or is one the result of the other (therefore, for this reason)?\n\n" +
        "Never pick by ear — pick by relationship. Try a set in Practice → Expression of Ideas."
    },
    {
      keys: ["words in context", "vocab", "vocabulary", "word choice", "precise word"],
      reply:
        "For Words in Context, the passage always defines the blank — usually right after a colon, dash, or example. My method:\n\n" +
        "1. Cover the choices. Predict your own word from the surrounding clues.\n" +
        "2. Watch for contrast markers (although, but, however) that flip the meaning.\n" +
        "3. Match your prediction to the closest choice; eliminate words that are close in topic but wrong in direction.\n\n" +
        "The wrong answers are usually real words that fit the TOPIC but not the LOGIC."
    },
    {
      keys: ["main idea", "central idea", "purpose", "structure"],
      reply:
        "Central-idea and purpose questions test the same skill: altitude. Read the passage asking \"what is the author DOING?\" not just \"what happens?\"\n\n" +
        "• Main idea = the claim most of the sentences support.\n" +
        "• Purpose = the move: challenging a view, explaining a finding, tracing a change.\n" +
        "• Trap answers quote a real detail but treat it as the whole point.\n\n" +
        "If two choices survive, pick the one that covers MORE of the passage."
    },
    {
      keys: ["evidence", "support", "weaken", "strengthen", "claim"],
      reply:
        "Evidence questions are logic puzzles, not reading puzzles:\n\n" +
        "1. Restate the claim in your own words — especially if it's comparative (\"X matters MORE than Y\").\n" +
        "2. Supporting evidence must connect the claim's exact terms; weakening evidence must break them.\n" +
        "3. Beware answers that are true and on-topic but don't touch the claim's logic.\n\n" +
        "For comparative claims, the right answer almost always compares BOTH sides."
    },
    {
      keys: ["inference", "logically completes", "conclusion"],
      reply:
        "For \"logically completes\" questions, the answer is already written in the passage — in pieces.\n\n" +
        "1. List the 2–3 facts the passage establishes.\n" +
        "2. The correct completion combines those facts and NOTHING more.\n" +
        "3. Eliminate anything that predicts the future, adds new causes, or generalizes beyond the evidence.\n\n" +
        "The safest answer usually feels almost boring — that's a good sign."
    },
    {
      keys: ["linear", "slope", "intercept", "y=mx", "line "],
      reply:
        "Linear functions decoded:\n\n" +
        "• Slope m = rise/run = (y₂−y₁)/(x₂−x₁) — the RATE (per month, per item…).\n" +
        "• y-intercept b — the STARTING value (a flat fee, initial height…).\n" +
        "• In word problems: \"per\" → slope; \"one-time / initial\" → intercept.\n\n" +
        "Given two points? Slope first, then plug one point into y = mx + b to find b."
    },
    {
      keys: ["system", "no solution", "infinitely many", "elimination", "substitution"],
      reply:
        "Systems of equations, three situations:\n\n" +
        "1. One solution — lines cross. Solve by elimination (line up a variable to cancel) or substitution.\n" +
        "2. NO solution — parallel lines: coefficients proportional, constants NOT.\n" +
        "3. Infinitely many — the same line: everything proportional.\n\n" +
        "SAT favorite: \"for what value of k does the system have no solution?\" → match the coefficient ratio, then verify the constants break it."
    },
    {
      keys: ["quadratic", "parabola", "vertex", "factor", "discriminant", "roots"],
      reply:
        "Quadratics toolkit:\n\n" +
        "• Factoring: find two numbers that multiply to c and add to b.\n" +
        "• Vertex form a(x−h)² + k → vertex (h, k); a < 0 means the vertex is a MAXIMUM.\n" +
        "• Discriminant b²−4ac: positive → 2 roots, zero → 1 (graph touches the axis), negative → none.\n\n" +
        "\"Touches the x-axis at exactly one point\" is code for: set b²−4ac = 0."
    },
    {
      keys: ["exponent", "radical", "power", "exponential", "growth", "decay", "doubles"],
      reply:
        "Exponents & exponential models:\n\n" +
        "• Same base trick: rewrite both sides as powers of the same base, then set exponents equal.\n" +
        "• Fractional exponents: x^(a/b) = b-th root of x, raised to a. Undo with the reciprocal power.\n" +
        "• Growth model: value = start × (factor)^(t/period). Doubling every 3 hours → 2^(t/3).\n" +
        "• Decay: losing 12% per year means KEEPING 88% → factor 0.88.\n\n" +
        "The classic trap is 2^(3t) instead of 2^(t/3) — always ask \"how many periods fit in t?\""
    },
    {
      keys: ["ratio", "percent", "proportion", "discount", "markup"],
      reply:
        "Ratios & percentages, fast and safe:\n\n" +
        "• X% off → you pay (100−X)%. One multiplication, no subtraction errors.\n" +
        "• Ratios: write the proportion with labels (flour/sugar = 5/2) and cross-multiply.\n" +
        "• Percent change = (new − old)/old × 100.\n\n" +
        "Sanity-check every answer: a 35% discount on $80 must land a bit above half price."
    },
    {
      keys: ["probability", "mean", "median", "statistics", "standard deviation", "data"],
      reply:
        "Stats & probability essentials:\n\n" +
        "• Median = middle of the SORTED list. Changing the largest value doesn't move it.\n" +
        "• Mean moves whenever the sum moves.\n" +
        "• \"Without replacement\" → the denominator shrinks on the second draw: (5/8)(4/7), not (5/8)².\n" +
        "• Probability of A AND B (independent) → multiply; A OR B (exclusive) → add.\n\n" +
        "Read whether they want a count, a fraction, or a percent — that's a free 30 seconds."
    },
    {
      keys: ["circle", "radius", "circumference", "area", "equation of a circle"],
      reply:
        "Circles cheat sheet:\n\n" +
        "• C = 2πr, A = πr². Given one, extract r, then compute the other.\n" +
        "• Equation: (x−h)² + (y−k)² = r² → center (h, k), radius r. Watch the SIGNS: (y+2) means k = −2.\n" +
        "• A point is ON the circle if plugging it in gives exactly r². The center gives 0, not r² — it is NOT on the circle.\n\n" +
        "Most circle errors are sign errors. Slow down for 5 seconds at the equation."
    },
    {
      keys: ["trig", "sine", "cosine", "tangent", "sohcahtoa", "triangle", "similar", "angle"],
      reply:
        "Triangles & trig:\n\n" +
        "• Angles of a triangle sum to 180°.\n" +
        "• SOH-CAH-TOA: sin = opp/hyp, cos = adj/hyp, tan = opp/adj — always relative to the angle you're using.\n" +
        "• Memorize the families: 3-4-5 (and 9-12-15), 5-12-13.\n" +
        "• Similar triangles: sides scale by k, areas scale by k².\n\n" +
        "Given sin(A) = 5/13? Draw it. The missing side is one Pythagorean step away."
    },
    {
      keys: ["fill-in", "fill in", "spr", "grid-in", "grid in", "student-produced", "no choices"],
      reply:
        "Fill-in (student-produced response) questions — about 1 in 4 Math questions. Entry rules that cost real points:\n\n" +
        "• Up to 5 characters (6 if negative). Digits, one decimal point OR one slash.\n" +
        "• Mixed numbers must be improper fractions or decimals: 3½ → 7/2 or 3.5. Typing '31/2' reads as thirty-one halves!\n" +
        "• Long decimals must FILL the space: for 2/3, enter 2/3, .6666, or .6667 — .67 is wrong.\n" +
        "• No symbols, units, %, $, or π. A percent answer of 50% is just 50.\n" +
        "• Fractions don't need reducing, and negatives are allowed.\n\n" +
        "Practice them here in Math sets and mock exams — the entry box enforces the real rules."
    },
    {
      keys: ["bluebook", "official score", "import", "upload", "score report", "real test", "practice test score"],
      reply:
        "Import your real Bluebook results — it's the single best thing you can do for accuracy here.\n\n" +
        "Go to \"Official Scores\" in the sidebar, then either paste the report text or upload the PDF. Get it from My Practice at satsuite.collegeboard.org/digital/scores, or the Scores tab in Bluebook — open Score Details and copy the whole page.\n\n" +
        "Why it matters: a real College Board test is a far better measure than any practice question bank. Once imported, your official result takes over your predicted score, and every question in it counts double when I work out your weakest domains and rebuild your study plan.\n\n" +
        "Import as many as you like — each one is kept, so you can watch your real scores climb over time."
    },
    {
      keys: ["review queue", "spaced", "repetition", "why is this question back", "queue"],
      reply:
        "The review queue is spaced repetition — the most evidence-backed study technique there is.\n\n" +
        "When you miss a question, it comes back about 2 days later. Get it right and the gap stretches (the optimal gap is roughly 10-20% of the time until your test — the app computes that for you). Three spaced successes and it graduates.\n\n" +
        "Why it works: recalling something just as you're about to forget it is what makes memory stick. Clearing the queue when it's due is the highest-value 10 minutes of your day."
    },
    {
      keys: ["timing", "pacing", "time management", "run out of time", "slow"],
      reply:
        "Pacing rules I coach everyone on:\n\n" +
        "1. Reading & Writing: ~71 seconds per question. Math: ~95. But NEVER pace question-by-question — check the clock every 5 questions instead.\n" +
        "2. Two-pass strategy: answer what's quick, flag the grinders, return with the time you banked.\n" +
        "3. Never leave blanks — there's no wrong-answer penalty.\n" +
        "4. In practice here, the timer trains your internal clock. Trust the reps."
    },
    {
      keys: ["calculator", "desmos", "graph"],
      reply:
        "The built-in graphing calculator on the Digital SAT is a weapon if you train with it:\n\n" +
        "• Systems of equations → graph both lines, read the intersection.\n" +
        "• Quadratics → graph and read the vertex or x-intercepts instead of factoring under pressure.\n" +
        "• \"Which equation matches the table?\" → plot the points and test each choice.\n\n" +
        "Rule of thumb: if a question is pure computation, the calculator should do it — save your brain for setup."
    },
    {
      keys: ["study plan", "plan", "schedule", "how should i study", "how to study"],
      reply:
        "Here's the plan structure that works:\n\n" +
        "1. Diagnostic first — you can't fix what you haven't measured. (Mock Exam tab.)\n" +
        "2. 20–30 focused minutes a day beats a 4-hour Sunday cram. Protect the streak.\n" +
        "3. Spend 70% of practice time on your two weakest domains — check Analytics to find them.\n" +
        "4. One mock every 1–2 weeks to recalibrate.\n\n" +
        "Your Study Plan tab already has this laid out week by week. Go check off today's task!"
    },
    {
      keys: ["score", "prediction", "1400", "1500", "improve", "points"],
      reply:
        "How scoring works here: each section (Reading & Writing, Math) is scaled 200–800 from your mock performance, weighted by question difficulty, for a 400–1600 total.\n\n" +
        "To move it: raw accuracy in your WEAKEST domain is the cheapest points available. Going from 40% → 70% in one domain is worth more than 90% → 95% in your best one. Analytics will show you exactly where that is."
    },
    {
      keys: ["motivat", "tired", "give up", "stressed", "anxious", "nervous", "hard"],
      reply:
        "Totally normal — every strong scorer I've coached hit this wall. Three things:\n\n" +
        "1. Shrink the task: just 5 questions today. Momentum beats motivation.\n" +
        "2. Look at your Analytics trend, not today's misses. Progress is a line, not a point.\n" +
        "3. Misses are the product. Every wrong answer you review carefully is worth more than three right ones.\n\n" +
        "I'm here for every single question. Let's do 5 together — open Practice and I'll hint you through."
    },
    {
      keys: ["hello", "hi ", "hey", "who are you", "what can you do"],
      reply:
        "Hoo-hoo! I'm Professor Peak 🦉 — your on-demand SAT coach. I can:\n\n" +
        "• Walk you through any question step by step (press \"Get a hint\" while practicing)\n" +
        "• Explain your last miss (\"explain my last miss\")\n" +
        "• Teach any topic: commas, transitions, quadratics, exponents, probability, trig, circles…\n" +
        "• Coach strategy: pacing, calculator use, study planning\n\n" +
        "What are we working on?"
    },
  ];

  function setContext(qid) { context = { qid, hintIndex: 0 }; }
  function clearContext() { context = null; }

  function nextHint() {
    if (!context) return null;
    const q = Q_BY_ID[context.qid];
    if (!q) return null;
    if (context.hintIndex >= q.hints.length) {
      return "That was my last hint for this one — you have everything you need. Commit to an answer, and I'll show the full explanation after.";
    }
    const h = q.hints[context.hintIndex++];
    return `Hint ${context.hintIndex} of ${q.hints.length}: ${h}`;
  }

  function explainMiss(state) {
    const misses = (state.attempts || []).filter(a => !a.correct);
    if (!misses.length) {
      return "No misses on record — either you're perfect or you haven't practiced yet. 😄 Head to Practice and bring me back something to explain!";
    }
    const last = misses[misses.length - 1];
    const q = Q_BY_ID[last.qid];
    if (!q) return "I couldn't find that question anymore — try a fresh practice set.";
    const dom = DOMAIN_BY_ID[q.domain];
    let out = `Let's rework your last miss (${dom.name} → ${q.skill}):\n\n`;
    if (q.passage) out += `“${q.passage.length > 220 ? q.passage.slice(0, 220) + "…" : q.passage}”\n\n`;
    out += `Q: ${q.stem}\n\n`;
    out += `Step-by-step:\n`;
    q.hints.forEach((h, i) => { out += `${i + 1}. ${h}\n`; });
    out += `\n✅ Answer: ${q.choices[q.answer]}\n\n${q.explanation}`;
    return out;
  }

  function respond(raw, state) {
    const text = (raw || "").toLowerCase().trim();
    if (!text) return "Ask me anything — a topic, a strategy, or say \"explain my last miss\".";

    if (/(explain|review|show).*(miss|wrong|mistake)/.test(text) || text.includes("last miss")) {
      return explainMiss(state);
    }
    if (/^(hint|help|stuck|another hint|next hint)\b/.test(text) && context) {
      return nextHint();
    }
    if (/(weak|worst|focus on|what should i (do|practice|study) (next|first|today))/.test(text)) {
      return weakestAdvice(state);
    }

    // score best-matching knowledge entry
    let best = null, bestScore = 0;
    for (const k of KNOWLEDGE) {
      const s = k.keys.reduce((acc, key) => acc + (text.includes(key) ? key.length : 0), 0);
      if (s > bestScore) { bestScore = s; best = k; }
    }
    if (best) return best.reply;

    return "Good question! I'm strongest on specific topics — try asking about:\n\n" +
      "• Grammar: commas, semicolons, transitions, subject-verb agreement\n" +
      "• Reading: main ideas, evidence, inference, words in context\n" +
      "• Math: linear equations, systems, quadratics, exponents, ratios, probability, circles, trig\n" +
      "• Strategy: pacing, calculator, study plan, score prediction\n\n" +
      "Or say \"explain my last miss\" and I'll rebuild your most recent wrong answer step by step.";
  }

  function weakestAdvice(state) {
    const per = {};
    (state.attempts || []).forEach(a => {
      const q = Q_BY_ID[a.qid]; if (!q) return;
      per[q.domain] = per[q.domain] || { seen: 0, correct: 0, official: 0 };
      per[q.domain].seen++; if (a.correct) per[q.domain].correct++;
    });
    // real College Board results count too, and count for more
    (state.official || []).forEach(rep => {
      Object.entries(rep.perDomain || {}).forEach(([d, v]) => {
        per[d] = per[d] || { seen: 0, correct: 0, official: 0 };
        per[d].seen += v.seen * 2;
        per[d].correct += v.correct * 2;
        per[d].official += v.seen;
      });
    });
    const rows = Object.entries(per).filter(([, v]) => v.seen >= 2)
      .map(([d, v]) => ({ d, acc: v.correct / v.seen, seen: v.seen, official: v.official }))
      .sort((a, b) => a.acc - b.acc);
    if (!rows.length) {
      return "I don't have enough data yet. Do a 10-question mixed practice set (Practice → Mixed), or import an official Bluebook score report under Official Scores — then I can tell you exactly where your points are hiding.";
    }
    const w = rows[0], dom = DOMAIN_BY_ID[w.d];
    const src = w.official
      ? `\n\nThis includes ${w.official} question${w.official === 1 ? "" : "s"} from your real College Board test${w.official === 1 ? "" : "s"}, which I weight double — that's the most trustworthy signal you have.`
      : "";
    return `Based on your history, your weakest area is ${dom.icon} ${dom.name} — about ${Math.round(w.acc * 100)}% accuracy.${src}\n\nThat's where the cheapest points live. Go to Practice, select that domain, and do a focused 5-question set. I'll hint you through anything that fights back.`;
  }

  return { respond, setContext, clearContext, nextHint };
})();
