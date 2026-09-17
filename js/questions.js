/* ============================================================
   Summit SAT — question bank
   All questions are original. Fields:
   id, section: "rw"|"math", domain, skill, diff: 1..3,
   passage (optional), stem, choices[4], answer (index),
   explanation, hints[] (progressive tutor hints)
   ============================================================ */

const DOMAINS = {
  rw: [
    { id: "info", name: "Information and Ideas", icon: "🔎", skills: ["Central Ideas", "Evidence & Support", "Inferences"] },
    { id: "craft", name: "Craft and Structure", icon: "🧩", skills: ["Words in Context", "Text Structure & Purpose", "Cross-Text Connections"] },
    { id: "expr", name: "Expression of Ideas", icon: "✍️", skills: ["Transitions", "Rhetorical Synthesis"] },
    { id: "conv", name: "Standard English Conventions", icon: "📏", skills: ["Punctuation & Boundaries", "Subject-Verb Agreement", "Verb Forms & Pronouns"] },
  ],
  math: [
    { id: "alg", name: "Algebra", icon: "📐", skills: ["Linear Equations", "Systems of Equations", "Linear Functions & Graphs"] },
    { id: "adv", name: "Advanced Math", icon: "🚀", skills: ["Quadratics", "Exponents & Radicals", "Nonlinear Functions"] },
    { id: "data", name: "Problem-Solving & Data Analysis", icon: "📊", skills: ["Ratios & Percentages", "Statistics & Probability", "Data Interpretation"] },
    { id: "geo", name: "Geometry & Trigonometry", icon: "📦", skills: ["Angles & Triangles", "Circles & Area", "Right-Triangle Trig"] },
  ],
};

const QUESTIONS = [
  /* ================= READING & WRITING ================= */
  /* ---------- Information and Ideas ---------- */
  {
    id: "rw-info-1", section: "rw", domain: "info", skill: "Central Ideas", diff: 1,
    passage: "Urban beekeeping has surged over the past decade, but a 2023 survey of rooftop hives found that city bees often outproduce their rural counterparts. Researchers attribute the difference to the surprising diversity of flowering plants in parks, balconies, and roadside gardens, which offer nectar across a longer season than single-crop farmland.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      "City bees can be more productive than rural bees because urban plant life is unexpectedly diverse.",
      "Rooftop hives are more difficult to maintain than hives placed on farmland.",
      "Beekeeping has become a popular hobby in cities over the past decade.",
      "Single-crop farmland produces more nectar than urban gardens."
    ],
    answer: 0,
    explanation: "The passage's central claim is that urban bees often outproduce rural bees, and the reason given is the diversity of flowering plants in cities. Choice A captures both the finding and its cause. B is never discussed, C is background detail, and D reverses the passage's point.",
    hints: [
      "Find the sentence that makes a claim the rest of the passage supports.",
      "The survey result — city bees outproduce rural bees — is the key finding. Why does the passage say that happens?",
      "Combine the finding (higher production) with the cause (diverse urban plants). Which choice includes both?"
    ]
  },
  {
    id: "rw-info-2", section: "rw", domain: "info", skill: "Evidence & Support", diff: 2,
    passage: "A music historian argues that the rise of affordable home pianos in the late 1800s did more to spread musical literacy in the United States than formal conservatories did.",
    stem: "Which finding, if true, would most directly support the historian's claim?",
    choices: [
      "Census records show that by 1900, more households owned pianos than the total number of students conservatories had ever enrolled.",
      "Conservatories in the late 1800s frequently held public concerts that attracted large audiences.",
      "Piano manufacturing declined sharply after the invention of the phonograph.",
      "Many famous composers of the era received their training at European conservatories."
    ],
    answer: 0,
    explanation: "The claim compares the reach of home pianos to that of conservatories. Evidence showing home pianos reached far more people (A) directly supports it. B and D are about conservatories' activity or prestige, not relative reach, and C concerns a later decline.",
    hints: [
      "Restate the claim: home pianos spread musical literacy MORE than conservatories did.",
      "Supporting evidence must compare the two — pianos vs. conservatories — in terms of how many people they reached.",
      "Which choice contains a direct numerical comparison favoring home pianos?"
    ]
  },
  {
    id: "rw-info-3", section: "rw", domain: "info", skill: "Inferences", diff: 2,
    passage: "Deep-sea anglerfish rely on bioluminescent lures to attract prey in total darkness. Scientists long assumed the light came from the fish themselves, but genome sequencing revealed that anglerfish lack the genes needed to produce light. Instead, the glow comes from bacteria housed in the lure — bacteria that cannot survive independently in seawater. This suggests that ______",
    stem: "Which choice most logically completes the text?",
    choices: [
      "the anglerfish and the bacteria have evolved a mutual dependence, each providing something the other cannot supply alone.",
      "anglerfish will eventually evolve the genes needed to produce their own light.",
      "the bacteria are harmful parasites that anglerfish are unable to remove.",
      "bioluminescence is rare among organisms that live in deep-sea environments."
    ],
    answer: 0,
    explanation: "The fish can't make light; the bacteria can't survive alone. Each depends on the other, which is exactly a mutual dependence (A). B predicts something unsupported, C contradicts the benefit the fish receives, and D generalizes beyond the passage.",
    hints: [
      "List what each organism lacks: the fish lacks light-producing genes; the bacteria can't live in open seawater.",
      "If each side needs the other, what kind of relationship is that?",
      "The completion must follow logically from BOTH facts, not introduce a new prediction."
    ]
  },
  {
    id: "rw-info-4", section: "rw", domain: "info", skill: "Central Ideas", diff: 3,
    passage: "In her study of 19th-century lighthouse keepers, historian Elena Vargas resists the romantic image of solitary guardians. Keepers' logbooks, she shows, record a dense web of obligations: signaling passing ships, boarding stranded sailors, hosting government inspectors, and trading supplies with nearby villages. Isolation, Vargas concludes, was less a condition of the job than a myth constructed afterward by writers who never kept a light.",
    stem: "Which choice best describes the main purpose of the text?",
    choices: [
      "To explain how a historian uses primary sources to challenge a popular perception of a profession",
      "To argue that lighthouse keeping was the most demanding maritime occupation of the 19th century",
      "To describe the daily schedule that lighthouse keepers were required to follow",
      "To criticize writers who published inaccurate accounts of maritime history"
    ],
    answer: 0,
    explanation: "The text presents Vargas's use of logbooks (primary sources) to overturn the 'solitary guardian' image (a popular perception). A captures this. B overstates, C treats detail as purpose, and D targets writers, which is only a closing aside.",
    hints: [
      "Ask: what is the author DOING, not just saying? Look for a contrast between an old view and new evidence.",
      "The 'romantic image' is the popular view; the logbooks are the evidence against it.",
      "Purpose questions want the move (challenging a perception with sources), not a detail."
    ]
  },
  {
    id: "rw-info-5", section: "rw", domain: "info", skill: "Evidence & Support", diff: 3,
    passage: "Ecologist Priya Nair hypothesizes that artificial night lighting disrupts the navigation of hatchling sea turtles more than beach noise does.",
    stem: "Which experimental result would most directly weaken Nair's hypothesis?",
    choices: [
      "Hatchlings on dark, noisy beaches reached the ocean at significantly lower rates than hatchlings on lit, quiet beaches.",
      "Hatchlings on lit, quiet beaches wandered inland more often than hatchlings on dark, quiet beaches.",
      "Hatchlings on dark, quiet beaches reached the ocean at the highest rates in the study.",
      "Artificial lighting was found to disorient adult turtles as well as hatchlings."
    ],
    answer: 0,
    explanation: "Nair says light is worse than noise. If noisy-but-dark beaches produce worse outcomes than lit-but-quiet ones (A), noise looks more harmful than light — weakening the hypothesis. B and D support the lighting effect, and C is consistent with either factor mattering.",
    hints: [
      "The hypothesis is comparative: light disrupts MORE than noise.",
      "To weaken it, find a result where noise causes more harm than light.",
      "Compare the two mixed conditions: dark+noisy vs. lit+quiet. Which outcome would flip the ranking?"
    ]
  },
  {
    id: "rw-info-6", section: "rw", domain: "info", skill: "Inferences", diff: 1,
    passage: "Community libraries that extended weekend hours in 2022 reported a 40% rise in visits from patrons aged 18–25, while weekday visits from that group stayed flat.",
    stem: "Based on the text, which conclusion is best supported?",
    choices: [
      "The added weekend hours, rather than a general increase in interest, likely drove the rise in young adult visits.",
      "Young adults prefer libraries to any other weekend activity.",
      "Weekday library programming is poorly designed for young adults.",
      "Libraries that did not extend hours saw visits from young adults decline."
    ],
    answer: 0,
    explanation: "Weekend visits rose only where hours were added, while weekday visits didn't change — pointing to the hours themselves (A). B and C overreach, and D describes libraries the text never mentions.",
    hints: [
      "Notice what changed (weekend hours) and what didn't (weekday visits).",
      "If overall interest had risen, weekday visits should have risen too. They didn't.",
      "Pick the conclusion that stays inside the evidence — no extra claims."
    ]
  },

  /* ---------- Craft and Structure ---------- */
  {
    id: "rw-craft-1", section: "rw", domain: "craft", skill: "Words in Context", diff: 1,
    passage: "The committee's report was deliberately ______: rather than naming a single cause of the outage, it listed a dozen contributing factors and left readers to weigh them.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["equivocal", "concise", "emphatic", "celebratory"],
    answer: 0,
    explanation: "The report avoids committing to one cause and leaves interpretation open — that is 'equivocal' (deliberately ambiguous). 'Concise' contradicts a dozen factors, and 'emphatic' and 'celebratory' don't fit the hedging behavior described.",
    hints: [
      "Read after the colon — it defines the missing word.",
      "The report refuses to commit to one answer. What word means 'ambiguous or noncommittal'?",
      "Eliminate words about length (concise) or tone (emphatic, celebratory)."
    ]
  },
  {
    id: "rw-craft-2", section: "rw", domain: "craft", skill: "Words in Context", diff: 2,
    passage: "Although the two mayors publicly praised the regional transit proposal, their support proved ______ when funding votes were held: both quietly instructed their council allies to abstain.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["nominal", "unwavering", "contagious", "indispensable"],
    answer: 0,
    explanation: "Public praise paired with private sabotage means the support existed in name only — 'nominal.' 'Unwavering' contradicts the abstentions; 'contagious' and 'indispensable' don't match the contrast set up by 'Although.'",
    hints: [
      "'Although' signals a contrast: public praise vs. what actually happened.",
      "They said they supported it but acted otherwise. What word means 'in name only'?",
      "Test each word in the sentence — only one preserves the contrast."
    ]
  },
  {
    id: "rw-craft-3", section: "rw", domain: "craft", skill: "Text Structure & Purpose", diff: 2,
    passage: "Most guides to desert plants open with the saguaro's fifty-year wait to grow its first arm. This one begins underground, with the shallow lattice of roots that lets a saguaro drink a season's rain in a single week. The arms are theater; the roots are the plot.",
    stem: "Which choice best describes the function of the final sentence?",
    choices: [
      "It uses a metaphor to summarize the passage's claim that the saguaro's root system matters more than its famous silhouette.",
      "It concedes that the saguaro's arms are more scientifically significant than its roots.",
      "It introduces a new topic that the rest of the passage will explain.",
      "It provides a statistic that quantifies the saguaro's water intake."
    ],
    answer: 0,
    explanation: "'The arms are theater; the roots are the plot' is a metaphor ranking roots (substance) over arms (spectacle) — restating the passage's reversal of the usual focus. B inverts the point, C mislabels a conclusion as an introduction, and D describes content that isn't there.",
    hints: [
      "The passage contrasts the usual focus (arms) with its own focus (roots).",
      "'Theater' vs. 'plot' — which is spectacle, which is substance?",
      "Function questions ask what the sentence DOES: here, it caps the contrast with a metaphor."
    ]
  },
  {
    id: "rw-craft-4", section: "rw", domain: "craft", skill: "Cross-Text Connections", diff: 3,
    passage: "Text 1: Archaeologist Ben Okafor contends that the stone channels at the Miran site were irrigation works, pointing to sediment layers consistent with seasonal water flow.\n\nText 2: Surveying the same channels, Lena Duarte notes that several run uphill for short stretches — impossible for gravity-fed irrigation — and argues they more likely served as ceremonial boundary markers.",
    stem: "Based on the texts, how would Duarte most likely respond to Okafor's interpretation of the sediment layers?",
    choices: [
      "The sediment may indicate occasional water presence, but it cannot explain features of the channels that are incompatible with irrigation.",
      "The sediment layers were probably deposited long after the channels were abandoned.",
      "Sediment analysis is too unreliable to be used in archaeological arguments.",
      "The channels were likely used for irrigation and ceremonial purposes at different times of year."
    ],
    answer: 0,
    explanation: "Duarte doesn't dispute the sediment; she raises a feature (uphill stretches) that irrigation can't explain. A matches that move. B and C invent objections she never makes, and D proposes a compromise neither text offers.",
    hints: [
      "Identify Duarte's actual evidence: some channels run uphill.",
      "She doesn't deny the sediment data — she outflanks it with a fact irrigation can't accommodate.",
      "Pick the response that grants the data but denies the conclusion."
    ]
  },
  {
    id: "rw-craft-5", section: "rw", domain: "craft", skill: "Text Structure & Purpose", diff: 1,
    passage: "To the untrained eye, a violin maker's workshop looks chaotic — shavings underfoot, clamps dangling from wires, half-carved scrolls on every sill. Spend a week there, however, and a strict order emerges: each tool hangs at the height of the task it serves, and every 'stray' piece of wood is aging on a deliberate schedule.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      "It presents a first impression and then reveals the hidden order beneath it.",
      "It lists the steps required to build a violin from raw wood.",
      "It compares the workshops of two different violin makers.",
      "It argues that violin making should be more standardized."
    ],
    answer: 0,
    explanation: "The passage moves from apparent chaos ('untrained eye') to underlying order ('however'). That first-impression-then-correction structure is A. No steps, comparison of makers, or argument for standardization appears.",
    hints: [
      "Find the pivot word — 'however' — and see what changes around it.",
      "Before the pivot: chaos. After: order. What structure is that?",
      "Structure questions describe the shape of the passage, not its topic."
    ]
  },
  {
    id: "rw-craft-6", section: "rw", domain: "craft", skill: "Words in Context", diff: 3,
    passage: "The novelist's late style is often called sparse, but 'sparse' undersells its ______: every omitted adjective is a decision, every short sentence a survivor of a dozen drafts.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ["rigor", "brevity", "spontaneity", "accessibility"],
    answer: 0,
    explanation: "The colon explains the missing word: omissions are decisions, sentences survive many drafts — evidence of disciplined effort, i.e., 'rigor.' 'Brevity' repeats 'sparse' rather than going beyond it, and 'spontaneity' contradicts the drafting process.",
    hints: [
      "The sentence says 'sparse' UNDERSELLS something — so the word must add more than shortness.",
      "What quality is shown by choosing every omission and revising a dozen drafts?",
      "'Spontaneity' is the opposite of what the drafts show. 'Brevity' merely restates 'sparse.'"
    ]
  },

  /* ---------- Expression of Ideas ---------- */
  {
    id: "rw-expr-1", section: "rw", domain: "expr", skill: "Transitions", diff: 1,
    passage: "Meal-kit services promise to reduce household food waste by shipping pre-portioned ingredients. ______ studies tracking actual kitchens find that subscribers throw away nearly as much food as non-subscribers, largely because of the kits' packaging and unused sauce packets.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ["However,", "Therefore,", "Similarly,", "In other words,"],
    answer: 0,
    explanation: "The promise (less waste) is contradicted by the finding (similar waste), so a contrast transition — 'However' — is required. 'Therefore' implies the finding follows from the promise; 'Similarly' and 'In other words' imply agreement or restatement.",
    hints: [
      "Summarize each sentence in three words: 'kits promise less waste' vs. 'waste is similar.'",
      "Do the sentences agree or clash?",
      "A clash needs a contrast word."
    ]
  },
  {
    id: "rw-expr-2", section: "rw", domain: "expr", skill: "Transitions", diff: 2,
    passage: "Glass frogs are nearly transparent while active, an adaptation that helps them blend into leaves. ______ their transparency becomes even more remarkable during sleep: the frogs concentrate most of their red blood cells in their liver, rendering their bodies almost invisible.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ["Moreover,", "Nevertheless,", "For instance,", "In contrast,"],
    answer: 0,
    explanation: "The second sentence intensifies the first (transparency, then even MORE transparency), so an additive/intensifying transition — 'Moreover' — fits. There's no contrast (eliminating B and D), and the sleep behavior is an escalation, not an example of blending into leaves.",
    hints: [
      "Both sentences are about the same trait — transparency. The second one raises the stakes.",
      "Is the second sentence an example, a contrast, or an addition that goes further?",
      "'Even more remarkable' signals building on the previous point."
    ]
  },
  {
    id: "rw-expr-3", section: "rw", domain: "expr", skill: "Rhetorical Synthesis", diff: 2,
    passage: "Notes:\n• The Pearl River Delta contains one of the world's largest urban areas.\n• Researcher Mei Lin studies 'urban heat islands' — cities that are hotter than surrounding rural land.\n• Lin measured nighttime temperatures in the delta in July 2024.\n• Urban sites averaged 4.2°C warmer than rural sites.\n• Tree-lined districts within the city averaged only 1.8°C warmer than rural sites.",
    stem: "The student wants to emphasize the potential of tree planting to reduce urban heat. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "In Lin's measurements, tree-lined districts cut the urban heat island effect from 4.2°C to 1.8°C — evidence that greenery can substantially cool cities.",
      "Mei Lin studies urban heat islands, which are cities that are hotter than the rural land around them.",
      "In July 2024, Lin measured nighttime temperatures at urban and rural sites across the Pearl River Delta.",
      "The Pearl River Delta contains one of the world's largest urban areas and averaged 4.2°C warmer than rural sites at night."
    ],
    answer: 0,
    explanation: "The goal is to emphasize trees' cooling potential, so the answer must contrast 4.2°C (typical urban) with 1.8°C (tree-lined) and frame the difference as trees' effect — choice A. The others describe the researcher, the method, or the problem without the tree comparison.",
    hints: [
      "Underline the goal: emphasize TREES reducing heat.",
      "Which two numbers in the notes make trees look effective when compared?",
      "The right answer must include both temperatures AND credit the trees."
    ]
  },
  {
    id: "rw-expr-4", section: "rw", domain: "expr", skill: "Transitions", diff: 3,
    passage: "Early astronomers catalogued Ceres as a planet, and textbooks listed it as one for half a century. ______ as telescopes improved and dozens of similar bodies were found in the same orbital band, astronomers reclassified Ceres as merely the largest member of the asteroid belt.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ["Eventually,", "Likewise,", "Specifically,", "Regardless,"],
    answer: 0,
    explanation: "The sentences trace a change over time: planet status for decades, then reclassification once better data arrived. 'Eventually' marks that temporal shift. 'Likewise' and 'Specifically' don't signal change, and 'Regardless' wrongly implies the new evidence was ignored.",
    hints: [
      "Look at the time frame: 'half a century' → then something changed.",
      "The second sentence describes what happened LATER, after new evidence.",
      "Which word signals 'after a long time, this changed'?"
    ]
  },
  {
    id: "rw-expr-5", section: "rw", domain: "expr", skill: "Rhetorical Synthesis", diff: 3,
    passage: "Notes:\n• Sofia Reyes is a materials engineer.\n• She developed a brick made from recycled construction dust.\n• Standard clay bricks must be fired at about 1,000°C, consuming large amounts of energy.\n• Reyes's bricks cure at room temperature.\n• In strength tests, her bricks bore loads comparable to standard fired bricks.",
    stem: "The student wants to present Reyes's brick as a viable lower-energy alternative to standard bricks. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "Unlike standard bricks, which require firing at about 1,000°C, Reyes's recycled-dust bricks cure at room temperature while matching fired bricks in load-bearing strength.",
      "Materials engineer Sofia Reyes has developed a new brick made from recycled construction dust.",
      "Standard clay bricks consume large amounts of energy because they must be fired at about 1,000°C.",
      "In strength tests, Reyes's bricks bore loads comparable to standard fired bricks, which are made of clay."
    ],
    answer: 0,
    explanation: "'Viable lower-energy alternative' requires two elements: the energy savings (room temperature vs. 1,000°C) and viability (comparable strength). Only A combines both. B introduces, C states the problem, D shows viability but omits the energy advantage.",
    hints: [
      "The goal has two halves: 'lower-energy' AND 'viable.'",
      "Which notes prove each half? (Firing temp vs. room temp; strength tests.)",
      "The correct choice must contain both halves in one sentence."
    ]
  },
  {
    id: "rw-expr-6", section: "rw", domain: "expr", skill: "Transitions", diff: 1,
    passage: "Sourdough starters need regular feeding to stay active. ______ many bakers keep a small backup portion in the refrigerator, where the cold slows the culture enough to survive weeks of neglect.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ["For this reason,", "In contrast,", "Meanwhile,", "Nonetheless,"],
    answer: 0,
    explanation: "The backup habit is a response to the feeding requirement — a cause-and-effect link, so 'For this reason' fits. The other options signal contrast or mere simultaneity, which the sentences don't have.",
    hints: [
      "Why would bakers keep a backup? Because starters die without feeding.",
      "Sentence 2 is a solution motivated by sentence 1.",
      "Cause → effect needs a 'therefore'-type transition."
    ]
  },

  /* ---------- Standard English Conventions ---------- */
  {
    id: "rw-conv-1", section: "rw", domain: "conv", skill: "Punctuation & Boundaries", diff: 1,
    passage: "The observatory's new camera captures a wider field of view than its ______ astronomers can now photograph an entire star cluster in a single frame.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["predecessor;", "predecessor,", "predecessor", "predecessor, and,"],
    answer: 0,
    explanation: "Both halves are independent clauses ('The camera captures...' and 'astronomers can now photograph...'). A semicolon legally joins them. A comma alone creates a comma splice; no punctuation creates a run-on; 'and,' misplaces the comma.",
    hints: [
      "Check each side of the blank: could each stand alone as a sentence?",
      "Two complete sentences can't be joined by just a comma — that's a comma splice.",
      "What punctuation joins two independent clauses without a conjunction?"
    ]
  },
  {
    id: "rw-conv-2", section: "rw", domain: "conv", skill: "Subject-Verb Agreement", diff: 2,
    passage: "The collection of maps, journals, and navigational instruments donated by the explorer's family ______ now displayed in the museum's east wing.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["is", "are", "were", "have been"],
    answer: 0,
    explanation: "The subject is 'collection' — singular — not the plural nouns inside the prepositional phrase 'of maps, journals, and instruments.' Singular subject takes 'is.'",
    hints: [
      "Cross out prepositional phrases: 'of maps, journals, and instruments' and 'donated by...'",
      "What noun is left as the subject?",
      "'Collection' is singular. Match the verb."
    ]
  },
  {
    id: "rw-conv-3", section: "rw", domain: "conv", skill: "Punctuation & Boundaries", diff: 2,
    passage: "Marisol Chen, whose short stories have appeared in three ______ is publishing her first novel this spring.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["anthologies,", "anthologies;", "anthologies —", "anthologies"],
    answer: 0,
    explanation: "'whose short stories have appeared in three anthologies' is a nonrestrictive clause opened with a comma after 'Chen'; it must be closed with a matching comma. A semicolon or dash breaks the pair, and omitting punctuation leaves the clause unclosed.",
    hints: [
      "Find the comma after 'Chen.' It opens an aside about her stories.",
      "An aside opened with a comma must be closed with what?",
      "Read the sentence without the aside: 'Marisol Chen is publishing her first novel.' The punctuation pair must allow that."
    ]
  },
  {
    id: "rw-conv-4", section: "rw", domain: "conv", skill: "Verb Forms & Pronouns", diff: 1,
    passage: "Each of the robotics teams must submit ______ final design before the qualifying round begins.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["its", "their", "it's", "they're"],
    answer: 0,
    explanation: "The subject is 'Each' — grammatically singular — so the possessive pronoun is 'its.' 'It's' means 'it is,' and 'their'/'they're' are plural or contractions that don't show possession correctly here.",
    hints: [
      "The subject is 'Each,' not 'teams.' Is 'each' singular or plural?",
      "You need a POSSESSIVE pronoun (whose design?).",
      "'It's' = 'it is.' Would 'it is final design' make sense?"
    ]
  },
  {
    id: "rw-conv-5", section: "rw", domain: "conv", skill: "Verb Forms & Pronouns", diff: 3,
    passage: "By the time the restoration crew finishes next month, the mural ______ hidden behind drywall for over sixty years.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["will have been", "has been", "was", "will be"],
    answer: 0,
    explanation: "'By the time [future event]' pointing back over a completed duration requires the future perfect: 'will have been hidden for over sixty years.' 'Has been' lacks the future anchor; 'was' and 'will be' can't carry the 'for over sixty years by then' meaning.",
    hints: [
      "Anchor point: 'By the time the crew finishes NEXT MONTH' — a moment in the future.",
      "The hiding started long ago and continues up to that future moment.",
      "Past-up-to-a-future-point = future perfect tense."
    ]
  },
  {
    id: "rw-conv-6", section: "rw", domain: "conv", skill: "Punctuation & Boundaries", diff: 3,
    passage: "The expedition carried three kinds of ______ dried meals for the ascent, canned goods for base camp, and fresh produce for the first week on the trail.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ["provisions:", "provisions;", "provisions,", "provisions"],
    answer: 0,
    explanation: "The clause before the blank is a complete statement, and what follows is the list it promises ('three kinds'). A colon introduces such a list. A semicolon requires an independent clause after it; a comma or nothing fails to signal the list.",
    hints: [
      "'Three kinds of provisions' sets up an expectation. What follows the blank?",
      "A list explaining a complete statement is introduced by which mark?",
      "A semicolon needs a full sentence on both sides — is 'dried meals for the ascent...' a full sentence?"
    ]
  },

  /* ================= MATH ================= */
  /* ---------- Algebra ---------- */
  {
    id: "m-alg-1", section: "math", domain: "alg", skill: "Linear Equations", diff: 1,
    stem: "If 3x − 7 = 14, what is the value of 6x − 7?",
    choices: ["35", "28", "42", "21"],
    answer: 0,
    explanation: "From 3x − 7 = 14, 3x = 21, so 6x = 42 and 6x − 7 = 35. (Shortcut: 6x − 7 = (3x − 7) + 3x = 14 + 21 = 35.)",
    hints: [
      "First solve for 3x by adding 7 to both sides.",
      "3x = 21. You don't even need x itself — what is 6x?",
      "6x = 2(3x) = 42. Now subtract 7."
    ]
  },
  {
    id: "m-alg-2", section: "math", domain: "alg", skill: "Systems of Equations", diff: 2,
    stem: "The system\n2x + y = 11\nx − y = 4\nhas solution (x, y). What is the value of x + y?",
    choices: ["6", "5", "9", "4"],
    answer: 0,
    explanation: "Add the equations to eliminate y: 3x = 15, so x = 5. Substitute into x − y = 4 to get y = 1. Check: 2(5) + 1 = 11 ✓. Therefore x + y = 5 + 1 = 6.",
    hints: [
      "The y-coefficients are +1 and −1. What happens if you add the equations?",
      "Adding eliminates y: 3x = 15.",
      "Solve for x, substitute back to find y, then add them."
    ]
  },
  {
    id: "m-alg-3", section: "math", domain: "alg", skill: "Linear Functions & Graphs", diff: 1,
    stem: "A gym charges a $25 sign-up fee plus $30 per month. Which function gives the total cost C(m), in dollars, for m months of membership?",
    choices: ["C(m) = 30m + 25", "C(m) = 25m + 30", "C(m) = 55m", "C(m) = 30m − 25"],
    answer: 0,
    explanation: "The $30 recurs each month (rate × m) and the $25 is a one-time fee (constant): C(m) = 30m + 25.",
    hints: [
      "Which number happens once, and which happens every month?",
      "The per-month charge multiplies m; the one-time fee stands alone.",
      "Slope = monthly rate, intercept = sign-up fee."
    ]
  },
  {
    id: "m-alg-4", section: "math", domain: "alg", skill: "Linear Functions & Graphs", diff: 2,
    stem: "Line ℓ passes through the points (2, 5) and (6, 13). What is the y-intercept of line ℓ?",
    choices: ["1", "2", "3", "−1"],
    answer: 0,
    explanation: "Slope = (13 − 5)/(6 − 2) = 8/4 = 2. Using y = 2x + b with (2, 5): 5 = 4 + b, so b = 1.",
    hints: [
      "Start with the slope: rise over run between the two points.",
      "Slope = (13−5)/(6−2) = 2. Now use y = mx + b with either point.",
      "Plug (2,5) into y = 2x + b and solve for b."
    ]
  },
  {
    id: "m-alg-5", section: "math", domain: "alg", skill: "Systems of Equations", diff: 3,
    stem: "For what value of k does the system\n3x + 4y = 12\n6x + ky = 30\nhave NO solution?",
    choices: ["8", "6", "4", "12"],
    answer: 0,
    explanation: "No solution means parallel lines: coefficients proportional but constants not. 6/3 = 2, so we need k/4 = 2 → k = 8. Check constants: 30/12 = 2.5 ≠ 2, so the lines are parallel and distinct. k = 8.",
    hints: [
      "A system has no solution when the two lines are parallel but not identical.",
      "Parallel means the x and y coefficients scale by the same factor. 6 is what multiple of 3?",
      "Set k/4 equal to that factor, then confirm the constants do NOT scale the same way."
    ]
  },
  {
    id: "m-alg-6", section: "math", domain: "alg", skill: "Linear Equations", diff: 3,
    stem: "If (a + b)/2 = 10 and (a − b)/2 = 4, what is the value of a² − b²?",
    choices: ["160", "80", "40", "116"],
    answer: 0,
    explanation: "a + b = 20 and a − b = 8. Since a² − b² = (a + b)(a − b) = 20 × 8 = 160.",
    hints: [
      "Clear the fractions: what are a + b and a − b?",
      "Recall the identity a² − b² = (a + b)(a − b).",
      "Multiply 20 by 8 — no need to find a and b individually."
    ]
  },

  /* ---------- Advanced Math ---------- */
  {
    id: "m-adv-1", section: "math", domain: "adv", skill: "Quadratics", diff: 1,
    stem: "What are the solutions of x² − 5x + 6 = 0?",
    choices: ["x = 2 and x = 3", "x = −2 and x = −3", "x = 1 and x = 6", "x = −1 and x = 6"],
    answer: 0,
    explanation: "Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3. The numbers multiply to +6 and add to −5... their positive pair (2, 3) with negative signs in the factors gives roots +2 and +3.",
    hints: [
      "Find two numbers that multiply to 6 and add to 5.",
      "2 and 3. Now write the factors: (x − 2)(x − 3).",
      "Set each factor to zero and solve."
    ]
  },
  {
    id: "m-adv-2", section: "math", domain: "adv", skill: "Exponents & Radicals", diff: 2,
    stem: "If 2^(x+3) = 64, what is the value of x?",
    choices: ["3", "5", "6", "2"],
    answer: 0,
    explanation: "Rewrite 64 as a power of 2: 64 = 2⁶. With matching bases, the exponents must be equal, so x + 3 = 6, which gives x = 3.",
    hints: [
      "Rewrite 64 as a power of 2.",
      "64 = 2⁶. Now the bases match.",
      "Equal bases means equal exponents: x + 3 = 6."
    ]
  },
  {
    id: "m-adv-3", section: "math", domain: "adv", skill: "Quadratics", diff: 2,
    stem: "The function h(t) = −(t − 4)² + 25 models a drone's height, in meters, t seconds after launch. What is the drone's maximum height?",
    choices: ["25 meters", "4 meters", "21 meters", "29 meters"],
    answer: 0,
    explanation: "The vertex form −(t − 4)² + 25 has vertex (4, 25) and opens downward, so the maximum height is 25 meters (reached at t = 4).",
    hints: [
      "The function is in vertex form: a(t − h)² + k.",
      "The vertex is (4, 25). Does the parabola open up or down?",
      "The negative sign means it opens down — the vertex's y-value is the maximum."
    ]
  },
  {
    id: "m-adv-4", section: "math", domain: "adv", skill: "Nonlinear Functions", diff: 2,
    stem: "A bacteria culture starts with 500 cells and doubles every 3 hours. Which expression gives the number of cells after t hours?",
    choices: ["500 · 2^(t/3)", "500 · 2^(3t)", "500 · (3/2)^t", "500 + 2^(t/3)"],
    answer: 0,
    explanation: "Doubling every 3 hours means t/3 doubling periods in t hours: 500 · 2^(t/3). Choice B doubles 3 times per hour, C uses the wrong growth factor, and D adds instead of multiplies.",
    hints: [
      "How many doubling periods fit in t hours if each takes 3 hours?",
      "t/3 periods. Each period multiplies the count by 2.",
      "Start × 2^(number of periods)."
    ]
  },
  {
    id: "m-adv-5", section: "math", domain: "adv", skill: "Exponents & Radicals", diff: 3,
    stem: "If x > 0 and x^(3/2) = 27, what is the value of x?",
    choices: ["9", "3", "81", "18"],
    answer: 0,
    explanation: "Raise both sides to the 2/3 power: x = 27^(2/3) = (27^(1/3))² = 3² = 9.",
    hints: [
      "To undo the exponent 3/2, raise both sides to its reciprocal.",
      "x = 27^(2/3). Take the cube root first.",
      "Cube root of 27 is 3; now square it."
    ]
  },
  {
    id: "m-adv-6", section: "math", domain: "adv", skill: "Nonlinear Functions", diff: 3,
    stem: "The graph of y = x² − 6x + c touches the x-axis at exactly one point. What is the value of c?",
    choices: ["9", "6", "3", "36"],
    answer: 0,
    explanation: "Exactly one x-intercept means the discriminant is zero: b² − 4ac = 36 − 4c = 0, so c = 9.",
    hints: [
      "One touch point = one repeated root. What does that say about the discriminant?",
      "Set b² − 4ac = 0 with a = 1, b = −6.",
      "36 − 4c = 0. Solve for c."
    ]
  },

  /* ---------- Problem-Solving & Data Analysis ---------- */
  {
    id: "m-data-1", section: "math", domain: "data", skill: "Ratios & Percentages", diff: 1,
    stem: "A jacket originally priced at $80 is on sale for 35% off. What is the sale price?",
    choices: ["$52", "$45", "$28", "$56"],
    answer: 0,
    explanation: "35% of 80 is 28, so the sale price is 80 − 28 = $52. (Or directly: 65% of 80 = 0.65 × 80 = 52.)",
    hints: [
      "35% off means you pay what percent?",
      "You pay 65% of the original price.",
      "0.65 × 80 = ?"
    ]
  },
  {
    id: "m-data-2", section: "math", domain: "data", skill: "Ratios & Percentages", diff: 2,
    stem: "A recipe uses flour and sugar in a ratio of 5 : 2. If a baker uses 3.5 cups of flour, how many cups of sugar are needed?",
    choices: ["1.4", "1.75", "2.5", "0.7"],
    answer: 0,
    explanation: "Sugar = flour × (2/5) = 3.5 × 0.4 = 1.4 cups.",
    hints: [
      "For every 5 parts flour, there are 2 parts sugar.",
      "Set up the proportion: 5/2 = 3.5/s.",
      "Cross-multiply: 5s = 7, so s = ?"
    ]
  },
  {
    id: "m-data-3", section: "math", domain: "data", skill: "Statistics & Probability", diff: 2,
    stem: "The list 4, 7, 7, 9, 13 has mean 8. If the value 13 is replaced by 18, which statement is true?",
    choices: [
      "The mean increases and the median stays the same.",
      "Both the mean and the median increase.",
      "The mean stays the same and the median increases.",
      "Both the mean and the median stay the same."
    ],
    answer: 0,
    explanation: "The new list is 4, 7, 7, 9, 18: the sum rises by 5, so the mean rises to 9, but the middle value (median) is still 7.",
    hints: [
      "Write the new list in order and find its middle value.",
      "The middle value is still 7 — replacing the largest number doesn't move the middle.",
      "The sum increased, so what happens to the mean?"
    ]
  },
  {
    id: "m-data-4", section: "math", domain: "data", skill: "Data Interpretation", diff: 1,
    stem: "A survey of 200 students found that 45% walk to school, 30% take the bus, and the rest ride bikes. How many students ride bikes?",
    choices: ["50", "60", "90", "25"],
    answer: 0,
    explanation: "Bike riders are 100% − 45% − 30% = 25% of 200 = 50 students.",
    hints: [
      "The three groups must total 100%.",
      "100 − 45 − 30 = 25% ride bikes.",
      "Find 25% of 200."
    ]
  },
  {
    id: "m-data-5", section: "math", domain: "data", skill: "Statistics & Probability", diff: 3,
    stem: "A box holds 5 red and 3 blue marbles. Two marbles are drawn at random without replacement. What is the probability that both are red?",
    choices: ["5/14", "25/64", "5/8", "15/56"],
    answer: 0,
    explanation: "P(first red) = 5/8. After one red is removed, 4 red remain out of 7 total, so P(second red | first red) = 4/7. Multiply: (5/8)(4/7) = 20/56 = 5/14. Choice B (25/64) is the with-replacement answer — a classic trap.",
    hints: [
      "'Without replacement' — the second draw has fewer marbles.",
      "First draw: 5 red out of 8. After removing a red, what remains?",
      "Multiply 5/8 by 4/7 and simplify."
    ]
  },
  {
    id: "m-data-6", section: "math", domain: "data", skill: "Data Interpretation", diff: 3,
    stem: "A car's value depreciates by 12% each year. Which expression gives its value, in dollars, 5 years after it was purchased for $24,000?",
    choices: ["24,000(0.88)⁵", "24,000(1.12)⁵", "24,000(0.12)⁵", "24,000 − 5(0.12)(24,000)"],
    answer: 0,
    explanation: "Losing 12% per year means keeping 88%: multiply by 0.88 each year for 5 years — 24,000(0.88)⁵. Choice D is linear depreciation, which doesn't match 'by 12% each year' compounding.",
    hints: [
      "If it loses 12% of its value, what fraction remains each year?",
      "88% remains — a factor of 0.88 applied every year.",
      "Repeated multiplication is exponential: initial × (factor)^years."
    ]
  },

  /* ---------- Geometry & Trigonometry ---------- */
  {
    id: "m-geo-1", section: "math", domain: "geo", skill: "Angles & Triangles", diff: 1,
    stem: "In a triangle, two angles measure 35° and 65°. What is the measure of the third angle?",
    choices: ["80°", "100°", "90°", "70°"],
    answer: 0,
    explanation: "Angles in a triangle sum to 180°: 180 − 35 − 65 = 80°.",
    hints: [
      "What do the angles of any triangle add up to?",
      "180°. Subtract the two known angles.",
      "180 − 35 − 65 = ?"
    ]
  },
  {
    id: "m-geo-2", section: "math", domain: "geo", skill: "Circles & Area", diff: 2,
    stem: "A circle has circumference 16π. What is its area?",
    choices: ["64π", "16π", "32π", "256π"],
    answer: 0,
    explanation: "C = 2πr = 16π gives r = 8. Area = πr² = 64π.",
    hints: [
      "Use C = 2πr to find the radius first.",
      "2πr = 16π → r = 8.",
      "Now apply A = πr²."
    ]
  },
  {
    id: "m-geo-3", section: "math", domain: "geo", skill: "Right-Triangle Trig", diff: 2,
    stem: "In right triangle PQR, the right angle is at Q, PQ = 9, and QR = 12. What is cos(P)?",
    choices: ["3/5", "4/5", "3/4", "5/3"],
    answer: 0,
    explanation: "Hypotenuse PR = √(9² + 12²) = √225 = 15. cos(P) = adjacent/hypotenuse = PQ/PR = 9/15 = 3/5.",
    hints: [
      "First find the hypotenuse with the Pythagorean theorem.",
      "9-12-15 is a scaled 3-4-5 triangle.",
      "cos(P) uses the side ADJACENT to angle P over the hypotenuse. Which leg touches P?"
    ]
  },
  {
    id: "m-geo-4", section: "math", domain: "geo", skill: "Angles & Triangles", diff: 2,
    stem: "Two similar triangles have corresponding side lengths in a ratio of 2 : 5. If the smaller triangle's area is 12, what is the larger triangle's area?",
    choices: ["75", "30", "60", "48"],
    answer: 0,
    explanation: "Area scales with the SQUARE of the side ratio: (5/2)² = 25/4. So the larger area is 12 × 25/4 = 75.",
    hints: [
      "Similar figures: lengths scale by k, but areas scale by what?",
      "Areas scale by k². Here k = 5/2.",
      "Multiply 12 by (5/2)²."
    ]
  },
  {
    id: "m-geo-5", section: "math", domain: "geo", skill: "Circles & Area", diff: 3,
    stem: "A circle in the xy-plane has equation (x − 3)² + (y + 2)² = 25. Which point lies ON the circle?",
    choices: ["(6, 2)", "(3, −2)", "(8, 3)", "(0, 0)"],
    answer: 0,
    explanation: "Test (6, 2): (6−3)² + (2+2)² = 9 + 16 = 25 ✓. (3, −2) is the center (distance 0), (8, 3) gives 25+25 = 50, and (0, 0) gives 9+4 = 13.",
    hints: [
      "A point is on the circle if it satisfies the equation exactly.",
      "Plug each point into (x−3)² + (y+2)² and see which yields 25.",
      "Careful: the center (3, −2) gives 0, not 25 — the center is NOT on the circle."
    ]
  },
  {
    id: "m-geo-6", section: "math", domain: "geo", skill: "Right-Triangle Trig", diff: 3,
    stem: "In a right triangle, sin(A) = 5/13, where A is one of the acute angles. What is tan(A)?",
    choices: ["5/12", "12/13", "12/5", "13/5"],
    answer: 0,
    explanation: "sin(A) = opposite/hypotenuse = 5/13, so the adjacent leg is √(13² − 5²) = √144 = 12. tan(A) = opposite/adjacent = 5/12.",
    hints: [
      "sin = opposite/hypotenuse. Label the sides: opposite 5, hypotenuse 13.",
      "Use the Pythagorean theorem to find the missing adjacent side.",
      "5-12-13 triangle. tan = opposite over adjacent."
    ]
  },
];

/* Helper lookups used by the app */
const Q_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
const ALL_DOMAINS = [...DOMAINS.rw, ...DOMAINS.math];
const DOMAIN_BY_ID = Object.fromEntries(ALL_DOMAINS.map(d => [d.id, d]));
function domainSection(domId) { return DOMAINS.rw.some(d => d.id === domId) ? "rw" : "math"; }
