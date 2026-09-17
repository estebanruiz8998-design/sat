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
  /* ================= VERIFIED AUTHORED EXPANSION ================= */
  {
    "id": "rw-info-x1",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 1,
    "passage": "In 2021, residents of Elkhart Falls contributed more than 300 family photographs to muralist Dana Okafor, who combined details from them—storefronts, picnics, a long-gone train depot—into a single painting covering the side of the town's water tower. Because its imagery came directly from residents' own archives, the finished mural functions less as one artist's vision than as a shared scrapbook of the town's past.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "By incorporating images supplied by residents, Okafor created a mural that represents the community's collective memory rather than her individual vision.",
      "Okafor's mural is the most historically accurate public artwork ever produced in Elkhart Falls.",
      "Okafor painted the mural on the town's water tower because no other surface was large enough to include all 300 photographs.",
      "Although residents submitted photographs, Okafor relied primarily on her own imagination when designing the mural."
    ],
    "answer": 0,
    "explanation": "The text explains that the mural's imagery came from residents' photographs and therefore works as a 'shared scrapbook' rather than 'one artist's vision,' which the correct choice restates. The choice claiming Okafor relied primarily on her own imagination directly contradicts the text's point that the imagery came from residents' archives, and the 'most historically accurate' option is far more extreme than anything the passage claims.",
    "hints": [
      "Look for the sentence that tells you what the finished mural 'functions as'—that is where the author states the point of the whole text.",
      "The passage contrasts 'one artist's vision' with 'a shared scrapbook of the town's past.' Which side of that contrast does the author say describes the mural?",
      "The right answer must capture both facts: residents supplied the source images, and as a result the mural reflects the community rather than only the artist."
    ]
  },
  {
    "id": "rw-info-x2",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 1,
    "passage": "Lichens are often the first organisms to colonize bare rock. By releasing weak acids, they slowly break stone into mineral fragments, and when they die, their decomposed tissue mixes with those fragments to form thin pockets of soil. Mosses take root in these pockets, trap moisture and dust, and deepen the soil further, eventually allowing grasses and shrubs to establish themselves where nothing could grow before.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Lichens begin a gradual process that transforms bare rock into an environment capable of supporting other plants.",
      "Mosses play a more important role than lichens do in creating new soil on bare rock.",
      "Lichens damage rock formations by releasing acids that break stone apart.",
      "Grasses and shrubs are unable to survive in any habitat where lichens are absent."
    ],
    "answer": 0,
    "explanation": "The text traces a sequence—lichens break rock, soil forms, mosses deepen it, larger plants arrive—so the main idea is that lichens initiate a gradual transformation of bare rock into habitable ground. The choice about lichens 'damaging' rock is tempting because acids do break stone, but it recasts a supporting detail negatively and ignores the passage's real focus on habitat creation; the claim about grasses and shrubs is too extreme, since the text describes one process, not a universal requirement.",
    "hints": [
      "Notice that the passage describes a step-by-step sequence. The main idea should summarize where the whole sequence leads, not just one step.",
      "Ask what the final sentence says becomes possible 'where nothing could grow before,' and who started that chain of events.",
      "The correct answer names lichens as the starting point and describes the overall outcome: rock becoming a place where plants can grow."
    ]
  },
  {
    "id": "rw-info-x3",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 2,
    "passage": "The following text is from a 2019 novel. Marisol had woven the same pattern of diamonds and river-lines for thirty years, just as her grandmother had. Yet each rug that left her loom carried some small deviation—a thread of unexpected saffron, a border a finger's width too wide. Buyers never noticed, but Marisol catalogued every one, for it was in these quiet departures, not the inherited pattern, that she recognized her own hand.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Although Marisol works within an inherited tradition, she finds her individual identity in the small variations she introduces into it.",
      "Marisol regrets that buyers fail to appreciate the traditional pattern that her grandmother taught her.",
      "Marisol hopes to eventually abandon her grandmother's pattern in favor of designs that are entirely her own.",
      "Marisol reproduces her grandmother's pattern so exactly that her rugs cannot be distinguished from older ones."
    ],
    "answer": 0,
    "explanation": "The final sentence states that Marisol recognizes 'her own hand' in the 'quiet departures' from the inherited pattern, so the main idea is that her identity lives in small variations within tradition. The choice about buyers is tempting because the text mentions that buyers never notice the deviations, but the passage attaches no regret to this fact—Marisol simply catalogues the changes for herself—so that choice answers a question the text never raises.",
    "hints": [
      "Focus on the contrast the passage sets up between what Marisol inherited and what she adds herself.",
      "The key phrase is 'it was in these quiet departures, not the inherited pattern, that she recognized her own hand.'",
      "The correct answer must hold both ideas together: she keeps the traditional pattern, and the tiny deviations are where she sees herself."
    ]
  },
  {
    "id": "rw-info-x4",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 2,
    "passage": "Doodling during a lecture is often dismissed as a sign of inattention, but psychologist Renata Voss argues the opposite. In her studies, participants who sketched abstract shapes while listening to recorded speech later recalled about 20 percent more details than those who merely sat and listened. Voss proposes that doodling occupies just enough cognitive capacity to prevent the mind from wandering into full daydreams, keeping listeners loosely anchored to the audio.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Voss's research suggests that, contrary to a common assumption, doodling can support attention and memory by keeping the mind from drifting.",
      "Voss found that doodling improves memory only when participants sketch abstract shapes rather than realistic images.",
      "Voss's studies confirm the widespread belief that doodling during lectures is a sign of inattention.",
      "Voss recommends that lecturers require students to doodle in order to raise their scores on tests of recall."
    ],
    "answer": 0,
    "explanation": "The text opens with the common dismissal of doodling, then presents Voss's contrary evidence and her proposed mechanism, so the main idea is that doodling can aid attention and memory. The 'abstract shapes' option is the strongest trap because the study did use abstract shapes, but the passage never compares them with realistic images or says the benefit occurs 'only' under that condition, making that choice an unsupported overspecification.",
    "hints": [
      "The first sentence states a common view and then signals that Voss 'argues the opposite.' The main idea should capture her side.",
      "Combine the study result (better recall) with Voss's explanation (doodling keeps the mind anchored).",
      "Be wary of any choice that adds a condition or recommendation the passage never makes; the right answer stays within what the study and Voss's proposal actually say."
    ]
  },
  {
    "id": "rw-info-x5",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 2,
    "passage": "When coffeehouses spread through Ottoman cities in the sixteenth century, authorities initially viewed them with suspicion, since patrons lingered for hours discussing trade, poetry, and politics. Historian Leyla Demir notes that this lingering was precisely the point: unlike marketplaces, where conversation was incidental to commerce, coffeehouses were among the first urban spaces where exchanging news and opinions was itself the primary activity, making them, in Demir's phrase, 'engines of public talk.'",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Demir contends that Ottoman coffeehouses were distinctive because conversation was their central purpose rather than a byproduct of some other activity.",
      "Demir argues that Ottoman authorities were justified in their suspicion of coffeehouses because patrons discussed politics there.",
      "Demir claims that marketplaces were more effective than coffeehouses at spreading news through Ottoman cities.",
      "Demir shows that the coffee itself, rather than the opportunity to converse, was what drew most patrons to Ottoman coffeehouses."
    ],
    "answer": 0,
    "explanation": "Demir's point is the contrast with marketplaces: in coffeehouses, exchanging news and opinions was 'itself the primary activity,' which the correct choice captures. The option about the authorities is tempting because the passage opens with their suspicion, but that detail merely sets up Demir's analysis—she evaluates what coffeehouses were, not whether the authorities were right.",
    "hints": [
      "Identify the sentence that presents the historian's own claim rather than the background about authorities.",
      "Notice the comparison: in marketplaces conversation was 'incidental,' but in coffeehouses it was 'the primary activity.'",
      "The correct answer should explain what made coffeehouses new and different, in Demir's view: talk was the point, not a side effect."
    ]
  },
  {
    "id": "rw-info-x6",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 3,
    "passage": "Translators are routinely urged to be 'invisible,' producing prose so fluent that readers forget the text was ever written in another language. Scholar Naoko Ishii questions the ideal itself, not merely its feasibility: a translation that erases every trace of its origin, she argues, quietly assimilates the source culture to the reader's expectations. For Ishii, an occasional strangeness of phrasing is not a lapse of craft but an ethical gesture—a reminder that the text has traveled.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Ishii challenges the ideal of the invisible translator, contending that preserving some trace of a text's foreign origin has ethical value.",
      "Ishii concedes that invisible translation would be desirable in principle but argues that it is impossible to achieve in practice.",
      "Ishii argues that awkward phrasing in translations typically results from translators' insufficient command of the source language.",
      "Ishii maintains that most readers prefer translations that retain the unfamiliar phrasing of the original text."
    ],
    "answer": 0,
    "explanation": "The text says Ishii questions 'the ideal itself, not merely its feasibility' and treats strangeness of phrasing as 'an ethical gesture,' so the correct choice is the one stating that she rejects the invisibility ideal and finds ethical value in retained foreignness. The feasibility option is the subtlest trap: it sounds scholarly and close to the text, but the passage explicitly rules it out by distinguishing her objection from a claim about whether invisibility is achievable.",
    "hints": [
      "Pin down exactly what Ishii is objecting to: is it that invisibility is hard to do, or that it is the wrong goal in the first place?",
      "The phrase 'questions the ideal itself, not merely its feasibility' eliminates any answer framed around whether invisibility is achievable.",
      "Combine two moves: Ishii rejects the invisibility ideal, and she reframes strangeness of phrasing as ethically meaningful rather than as a flaw."
    ]
  },
  {
    "id": "rw-info-x7",
    "section": "rw",
    "domain": "info",
    "skill": "Central Ideas",
    "diff": 3,
    "passage": "The following text is from a 2020 short story. Every spring, Ibrahim redrew the harbor chart, and every spring the sandbars had shifted, mocking the confident lines of the year before. His apprentices found this discouraging; Ibrahim did not. A chart, he told them, was not a portrait of the sea but a letter to next year's sailors—useful precisely because it admitted it would need to be rewritten.",
    "stem": "Which choice best states the main idea of the text?",
    "choices": [
      "Ibrahim regards the impermanence of his charts not as a failure but as essential to what makes them useful.",
      "Ibrahim is frustrated that the shifting sandbars render his carefully drawn charts obsolete every year.",
      "Ibrahim believes his charts would serve sailors better if the harbor's features stopped changing from year to year.",
      "Ibrahim doubts that his apprentices will ever develop the patience that the craft of chartmaking demands."
    ],
    "answer": 0,
    "explanation": "The passage contrasts the apprentices' discouragement with Ibrahim's attitude, and his chart-as-letter metaphor makes the point explicit: a chart is 'useful precisely because it admitted it would need to be rewritten.' The frustration option is the key trap—it attributes to Ibrahim the reaction the text assigns only to his apprentices, while the sentence 'Ibrahim did not' marks his view as the opposite.",
    "hints": [
      "Track whose feelings are whose: the apprentices react one way, and the text says Ibrahim reacts differently.",
      "Look closely at the metaphor: a chart is 'not a portrait of the sea but a letter to next year's sailors.' What does that imply about revision?",
      "The word 'precisely' in the last sentence tells you that, for Ibrahim, the need to rewrite the chart is the source of its value, not a defect."
    ]
  },
  {
    "id": "rw-info-x8",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 1,
    "passage": "Wind turbines can be lethal to migrating bats, which are most active on warm nights with light winds—conditions under which turbines generate relatively little electricity anyway. Ecologist Priya Raman claims that programming turbines to pause on such nights would substantially reduce bat deaths while sacrificing only a small fraction of annual power output.",
    "stem": "Which finding, if true, would most directly support Raman's claim?",
    "choices": [
      "At wind farms that paused their turbines on warm, light-wind nights, bat fatalities fell by more than half while annual electricity generation declined by less than one percent.",
      "Bat fatalities at wind farms are highest during autumn, when many bat species migrate long distances.",
      "Wind farms that paused their turbines on warm, light-wind nights saw bat fatalities decline, but their annual power output dropped by nearly a quarter.",
      "Wind turbines generate the majority of their annual electricity during strong storms, when bats rarely fly."
    ],
    "answer": 0,
    "explanation": "Raman's claim has two parts—pausing turbines on specific nights reduces bat deaths and costs little power—and the correct finding confirms both directly. The finding about a quarter of power output being lost is tempting because it confirms the fatality reduction, but it contradicts the claim's second half; the finding about autumn fatalities describes when bats die without testing the proposed intervention at all.",
    "hints": [
      "Break Raman's claim into its two parts: fewer bat deaths, and only a small loss of electricity.",
      "The supporting finding must come from actually pausing turbines under the stated conditions, not just from general facts about bats.",
      "Check each choice against both halves of the claim; a finding that confirms one half while undermining the other cannot support the claim."
    ]
  },
  {
    "id": "rw-info-x9",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 1,
    "passage": "In her collections published between 1902 and 1911, the poet Harriet Lowe frequently portrays ordinary household objects as though they were living companions, attributing to them moods, habits, and even opinions.",
    "stem": "Which quotation from a poem by Harriet Lowe most effectively illustrates the claim?",
    "choices": [
      "\"The kettle sulks upon the stove, / and grumbles at the morning cold, / then, coaxed by flame, forgets its grief / and sings the song it sang of old.\"",
      "\"Beyond the gate the poplars lean / like travelers waiting for a coach, / their shadows long across the green.\"",
      "\"I polished every pot and pan / until the copper caught the sun / and threw it, blazing, round the room.\"",
      "\"My grandmother would talk for hours / to anyone who crossed her door, / her kitchen warm with borrowed news.\""
    ],
    "answer": 0,
    "explanation": "The claim requires a household object treated as a living companion with moods, and the kettle that sulks, grumbles, forgets its grief, and sings fits every element. The poplar quotation is the closest trap because it also personifies something, but poplars are trees in a landscape, not household objects, so it illustrates a different habit of imagination than the one the claim describes.",
    "hints": [
      "The claim has two requirements: the subject must be a household object, and it must be given lifelike moods or habits.",
      "Eliminate quotations where the personified thing is not a household object, or where a household object appears without any lifelike qualities.",
      "Look for the quotation in which an everyday object experiences emotions—sulking, grieving, being coaxed—exactly as a living companion would."
    ]
  },
  {
    "id": "rw-info-x10",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 2,
    "passage": "Sections of city wall built in China during the Ming dynasty have withstood earthquakes and centuries of weathering. Materials scientist Wen Zhao attributes this durability to the builders' practice of mixing sticky rice soup into lime mortar: the rice's amylopectin, she claims, slowed the growth of calcium carbonate crystals as the mortar cured, producing a denser and more uniform microstructure than lime mortar alone.",
    "stem": "Which finding, if true, would most directly support Zhao's claim?",
    "choices": [
      "Laboratory-made mortar containing amylopectin developed smaller, more evenly distributed calcium carbonate crystals and resisted cracking better than otherwise identical mortar made without it.",
      "Ming dynasty builders also used sticky rice mortar in tombs and pagodas, some of which are still standing today.",
      "Some Ming-era wall sections known to have been built with ordinary lime mortar have also survived intact to the present day.",
      "Sticky rice was costly during the Ming dynasty, so its use in mortar was reserved for the most important structures."
    ],
    "answer": 0,
    "explanation": "Zhao's claim is about a mechanism—amylopectin altering crystal growth to strengthen mortar—so the most direct support is a controlled comparison showing that amylopectin alone produces the predicted microstructure and durability. The finding about tombs and pagodas is tempting because it adds more surviving rice-mortar structures, but it only widens the correlation without testing whether amylopectin caused the durability, and the finding about ordinary-mortar walls surviving would actually weaken the claim.",
    "hints": [
      "Identify what Zhao is really claiming: not just that the walls are durable, but why—amylopectin changed how the crystals formed.",
      "The strongest evidence for a mechanism comes from a comparison in which only the proposed ingredient differs between two samples.",
      "Ask of each choice: does it show that amylopectin itself produces denser crystals and stronger mortar, or does it merely add more examples of old buildings?"
    ]
  },
  {
    "id": "rw-info-x11",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 2,
    "passage": "The Glass Orchard is an 1898 novel by Edith Camborne. In the novel, the character Silas Reed publicly presents himself as indifferent to his neighbors' approval, but the narration suggests that he privately craves it.",
    "stem": "Which quotation from The Glass Orchard most effectively illustrates the claim?",
    "choices": [
      "\"Silas waved away their compliments as a man shoos flies; yet that night he repeated each one to himself, turning them over like coins he pretended not to have pocketed.\"",
      "\"Silas told the assembled farmers that their opinions mattered to him no more than last year's weather, and he strode from the hall without a backward glance.\"",
      "\"What Silas wanted, more than the orchard itself, was to hear his name spoken kindly at the market.\"",
      "\"The neighbors, for their part, had long ago stopped expecting warmth from Silas Reed and gave their compliments elsewhere.\""
    ],
    "answer": 0,
    "explanation": "The claim describes a contrast between Silas's public indifference and his private craving, and only the correct quotation shows both: he dismisses compliments in front of others, then privately savors them. The quotation about wanting his name spoken kindly is the strongest trap because it vividly shows the craving, but it contains no public display of indifference, so it illustrates only half of the two-part claim.",
    "hints": [
      "The claim has two sides: what Silas shows in public and what he feels in private. The best quotation must show both.",
      "Eliminate quotations that show only the public dismissiveness or only the hidden longing.",
      "Look for a quotation with a pivot—a 'yet' or similar turn—where outward rejection of praise gives way to secret enjoyment of it."
    ]
  },
  {
    "id": "rw-info-x12",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 2,
    "passage": "Urban trees are well known to cool streets during the day by blocking sunlight. Climatologist Marta Reyes hypothesizes that trees also cool their surroundings after dark: water evaporating from leaves, she argues, continues to draw heat out of the surrounding air even when the trees are casting no shade.",
    "stem": "Which finding, if true, would most directly support Reyes's hypothesis?",
    "choices": [
      "On summer nights, air temperatures on tree-lined blocks were measurably lower than on treeless blocks with similar buildings and pavement, and the difference increased with the amount of leaf area present.",
      "At midday, when trees cast their densest shade, tree-lined blocks were substantially cooler than comparable treeless blocks.",
      "On summer nights, tree-lined blocks and treeless blocks with similar buildings recorded nearly identical air temperatures.",
      "Pavement on treeless blocks absorbed large amounts of heat during the day and released that heat slowly throughout the night."
    ],
    "answer": 0,
    "explanation": "Reyes's hypothesis concerns nighttime cooling by trees, so the direct support is a nighttime temperature difference between otherwise similar blocks that scales with leaf area—the pattern her evaporation mechanism predicts. The midday finding is tempting because it shows trees cooling streets, but daytime cooling by shade is the already-known effect, not the after-dark effect Reyes is proposing; the pavement finding offers an alternative explanation for warm treeless blocks rather than evidence that trees themselves cool the night air.",
    "hints": [
      "Note exactly when Reyes claims the cooling happens: after dark, when shade cannot be the cause.",
      "A supporting finding should compare tree-lined and treeless areas at night while holding other features constant.",
      "The detail that the temperature gap grows with leaf area matters: more leaves mean more evaporation, which is exactly what Reyes's mechanism predicts."
    ]
  },
  {
    "id": "rw-info-x13",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 3,
    "passage": "Male marsh sparrows in different valleys sing distinct local 'dialects.' Some ornithologists have assumed that these dialects are genetically inherited, but Elena Brooks argues that they are learned: young males, she claims, acquire whichever dialect they hear during their first months of life, regardless of their parentage.",
    "stem": "Which finding, if true, would most directly support Brooks's claim?",
    "choices": [
      "Nestlings moved from one valley to another shortly after hatching grew up to sing the dialect of the valley where they were raised rather than that of the valley where they hatched.",
      "Male marsh sparrows raised in the same valley as their fathers grew up to sing songs nearly identical to their fathers' songs.",
      "Adult male marsh sparrows that relocated to a new valley continued to sing the dialect of the valley where they were born.",
      "The dialects of neighboring valleys differ mainly in the ordering of shared notes rather than in the notes themselves."
    ],
    "answer": 0,
    "explanation": "Only the cross-fostering finding separates the two hypotheses: if relocated nestlings adopt the dialect of their new surroundings, parentage cannot be determining the song, which is exactly what Brooks predicts. The father-son finding is the critical trap—sons matching fathers who share their valley is equally consistent with genetic inheritance and with learning, so it cannot support one hypothesis over the other; the adult-relocation finding concerns birds past the early learning window and likewise fails to distinguish the hypotheses.",
    "hints": [
      "Two competing explanations are in play: inheritance from parents and learning from surroundings. Strong evidence must favor one over the other.",
      "Ask of each finding: could both hypotheses predict this result? If yes, it supports neither.",
      "The decisive test is one in which a bird's parentage and its early acoustic environment point to different dialects—then whichever dialect it sings reveals the true cause."
    ]
  },
  {
    "id": "rw-info-x14",
    "section": "rw",
    "domain": "info",
    "skill": "Evidence & Support",
    "diff": 3,
    "passage": "While resting on leaves during the day, glass frogs become remarkably transparent. Biologist Tomás Ferreira proposes that the frogs achieve this transparency not by possessing unusually few red blood cells but by temporarily withdrawing most of those cells from circulation and packing them into the liver while they sleep.",
    "stem": "Which finding, if true, would most directly support Ferreira's proposal?",
    "choices": [
      "Imaging of sleeping glass frogs showed that nearly all of their red blood cells were concentrated in the liver, and the frogs' transparency faded within minutes of waking, as the cells returned to circulation.",
      "Glass frogs possess roughly the same total number of red blood cells as similarly sized frog species that never become transparent.",
      "Sleeping glass frogs were found to be most transparent during daylight hours, when their predators are most actively hunting.",
      "Several species of fish achieve near-total transparency because their blood lacks red pigment entirely."
    ],
    "answer": 0,
    "explanation": "Ferreira's proposal describes an active, reversible process—cells stored in the liver during sleep—and the imaging finding shows precisely that storage plus the predicted reversal upon waking. The cell-count finding is the subtle trap: it supports only the negative half of the claim (glass frogs do not simply have fewer cells) while providing no evidence for the storage mechanism itself, so it is weaker than the finding that demonstrates the mechanism directly.",
    "hints": [
      "Ferreira's proposal has a positive part—cells are packed into the liver during sleep—and a negative part—the frogs do not simply have fewer cells.",
      "The strongest support demonstrates the mechanism in action, not merely the absence of an alternative explanation.",
      "Look for the finding in which both the storage of cells and the loss of transparency upon their release are observed, since that reversibility is the signature of Ferreira's proposed process."
    ]
  },
  {
    "id": "rw-info-x15",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 1,
    "passage": "When the Hollis Art Museum allowed free entry at any hour, visitors clustered in the early afternoon, crowding galleries and forming long lines. After the museum introduced free timed-entry passes assigning each visitor a one-hour arrival window, total daily attendance remained roughly the same, but complaints about crowding dropped sharply. This outcome suggests that the earlier congestion resulted mainly from _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "when visitors chose to arrive rather than from how many people visited each day.",
      "a total number of daily visitors that exceeded what the museum's galleries could hold.",
      "the museum's decision not to charge an admission fee for entry.",
      "galleries that were too small to display the museum's collection effectively."
    ],
    "answer": 0,
    "explanation": "Since total attendance stayed the same while spreading arrivals across the day eliminated the crowding, the congestion must have stemmed from arrival timing rather than visitor volume. The choice blaming the overall number of visitors is contradicted by the passage: if sheer numbers were the problem, redistributing the same number of people would not have reduced complaints.",
    "hints": [
      "Note which two things changed after the passes were introduced and which one stayed the same.",
      "Attendance was unchanged, yet crowding complaints fell. What did the timed passes alter?",
      "If the same number of people caused less crowding once their arrivals were spread out, the original problem must have been the timing of arrivals."
    ]
  },
  {
    "id": "rw-info-x16",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 1,
    "passage": "Road crews have traditionally scattered solid rock salt onto streets after snow begins to accumulate; much of that salt bounces off the pavement or is pushed aside by passing traffic before it can dissolve and act. Some cities now instead spray liquid salt brine directly onto dry pavement hours before a storm arrives. These cities report achieving the same degree of ice prevention while purchasing significantly less salt, most likely because _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "brine adheres to the road surface, so far less of the applied salt is lost before it can act.",
      "brine is more effective than rock salt at melting snow that has already accumulated on roads.",
      "winter storms in those cities have become considerably less severe in recent years.",
      "rock salt dissolves more quickly than brine once snow has begun to fall."
    ],
    "answer": 0,
    "explanation": "The passage states that solid salt is wasted when it bounces off or is pushed aside, so the logical explanation for equal results with less salt is that brine stays on the pavement and little is lost. The choice about melting accumulated snow contradicts the setup: brine is applied to dry pavement before the storm, so its advantage cannot lie in treating snow that has already fallen.",
    "hints": [
      "Find the problem with rock salt that the passage states explicitly in its first sentence.",
      "The cities use less salt but get the same result, so the completion should explain reduced waste, not greater melting power.",
      "Connect the waste problem (salt bouncing away) to the property a sprayed liquid would have that scattered granules lack."
    ]
  },
  {
    "id": "rw-info-x17",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 2,
    "passage": "Archaeologists long assumed that a group of 4,000-year-old clay vessels excavated in the Caucasus had been used to store grain, since the vessels closely resemble grain jars from nearby settlements of the same period. Recently, however, chemical analysis of residues inside the vessels revealed high concentrations of tartaric acid, a compound abundant in grapes but rare in cereal crops. If the residue analysis is reliable, then the vessels' resemblance to known grain jars _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "may be a poor guide to how the vessels were actually used.",
      "confirms that the vessels were used to store grain as well as grape products.",
      "indicates that the grain jars from nearby settlements were also used to hold grape products.",
      "proves that the vessels were made by grape farmers rather than by grain farmers."
    ],
    "answer": 0,
    "explanation": "The residue evidence points to grapes even though the vessels look like grain jars, so the logical conclusion is that appearance is an unreliable indicator of use in this case. The choice extending the grape use to the nearby settlements' jars is tempting because it also takes the residue seriously, but no residue from those other jars was analyzed, so that inference reaches beyond the evidence; the passage supports doubting the resemblance, not reinterpreting other sites.",
    "hints": [
      "Identify the conflict: the vessels' shape suggested one use, but the chemical residue suggests another.",
      "The completion must state what follows about the resemblance specifically, given that the residue points to grapes.",
      "Choose the conclusion with appropriately cautious scope—one about these vessels and this resemblance, not about jars that were never tested."
    ]
  },
  {
    "id": "rw-info-x18",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 2,
    "passage": "Garments from clothing brands known for durability command unusually high resale prices, sometimes approaching their original retail cost. Some analysts predicted that a robust resale market would cut into sales of new garments from these brands, since shoppers could simply buy used instead. Yet several such brands have seen new-garment sales climb as resale activity expanded. One explanation is that shoppers may treat a garment's high resale value as effectively lowering the cost of buying it new, since _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "they anticipate recovering much of the purchase price by reselling the garment later.",
      "used garments from durable brands often cost nearly as much as new ones do.",
      "durable garments rarely need replacing, which reduces shoppers' lifetime spending on clothing.",
      "resale platforms charge sellers fees that offset most of a garment's resale price."
    ],
    "answer": 0,
    "explanation": "The stated explanation is that high resale value lowers the effective cost of buying new, and that logic works only if buyers expect to recoup money by reselling later. The choice about used garments costing nearly as much as new ones is tempting because it also could explain rising new sales, but it is a different explanation—one about the unattractiveness of buying used—rather than a completion of the sentence's stated logic about resale value reducing the net cost of a new purchase.",
    "hints": [
      "The blank must complete the specific explanation already begun: resale value 'effectively lowering the cost of buying new.'",
      "Ask how owning a resellable garment could make its purchase price feel smaller to the buyer.",
      "The right completion involves what the buyer expects to get back later, turning the purchase into partly recoverable spending."
    ]
  },
  {
    "id": "rw-info-x19",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 3,
    "passage": "Tree rings record growing conditions year by year but rarely extend more than a few thousand years into the past; stalagmites can archive tens of thousands of years of rainfall chemistry but usually cannot resolve individual years. A research team wants to establish both where a drought that struck a region roughly 3,000 years ago fits within the area's long-term climate history and how the drought's severity varied from one year to the next. The team would therefore be best served by planning to _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "use stalagmite records to situate the drought within the long-term climate history and tree-ring records to trace its year-to-year severity.",
      "rely on stalagmite records alone, since the drought falls comfortably within the time span those records cover.",
      "rely on tree-ring records alone, since only those records can distinguish conditions in one year from conditions in the next.",
      "set aside both kinds of records in favor of a method that combines annual resolution with a long time span."
    ],
    "answer": 0,
    "explanation": "The team has two distinct goals that map onto the two proxies' complementary strengths: stalagmites supply the long-term context, and tree rings supply the annual detail, so combining them is the logical plan. The tree-rings-alone choice is the strongest trap because tree rings could plausibly reach back 3,000 years and are indeed the only annual record, but they cannot place the drought within tens of thousands of years of climate history, so using them alone abandons the team's first goal.",
    "hints": [
      "List each record's strength and weakness: one has depth of time, the other has fineness of detail.",
      "Match each of the team's two goals—long-term context and year-to-year severity—to the record that can deliver it.",
      "Neither record alone satisfies both goals, and the passage gives no reason to think some third method exists, so the plan must draw on each record for what it does best."
    ]
  },
  {
    "id": "rw-info-x20",
    "section": "rw",
    "domain": "info",
    "skill": "Inferences",
    "diff": 3,
    "passage": "In a few mountain and island communities, people communicate across long distances using whistled versions of their spoken languages. Whistling preserves a word's pitch contour and rhythm but strips away most of the acoustic detail that distinguishes consonants and vowels. Researchers have observed that whistled Spanish is considerably harder for listeners to decode than whistled forms of tonal languages such as Hmong. This difference is most plausibly explained by the fact that in tonal languages, _______",
    "stem": "Which choice most logically completes the text?",
    "choices": [
      "pitch itself distinguishes many words from one another, so much of the information that identifies a word survives the conversion to whistling.",
      "words tend to be shorter than words in Spanish, so whistled messages can be produced and repeated more quickly.",
      "consonants and vowels are articulated more distinctly than they are in Spanish.",
      "speakers whistle more often in everyday life, giving listeners far more practice at decoding whistled speech."
    ],
    "answer": 0,
    "explanation": "The passage establishes that whistling keeps pitch but discards consonant and vowel detail; since tonal languages use pitch to distinguish words, more word-identifying information survives whistling in those languages, explaining why they remain easier to decode. The practice-based choice is tempting because familiarity genuinely aids comprehension, but the passage offers no information about how often anyone whistles, whereas the correct choice follows directly from the acoustic facts the text supplies; the choice about distinct consonants fails because whistling strips that detail away regardless of how clearly it is spoken.",
    "hints": [
      "Start from what whistling preserves (pitch, rhythm) and what it destroys (consonant and vowel detail).",
      "Ask what role pitch plays in a tonal language that it does not play in Spanish.",
      "The best explanation ties the decoding advantage to information that survives whistling: if pitch identifies words in a tonal language, whistled words still carry their identity."
    ]
  },
  {
    "id": "rw-craft-x1",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 1,
    "passage": "On summer nights in the southern Appalachians, thousands of male fireflies flash together in near-perfect unison. Researchers who filmed the displays found that the light shows are highly ______: each insect continually adjusts the timing of its flashes to match those of its neighbors, producing waves of light that ripple across entire hillsides.",
    "stem": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "coordinated",
      "conspicuous",
      "unpredictable",
      "elaborate"
    ],
    "answer": 0,
    "explanation": "The colon introduces a definition of the blank: each firefly adjusts its timing to match its neighbors, which is precisely what it means for the displays to be coordinated. \"Conspicuous\" is tempting because the displays are certainly noticeable, but the text after the colon describes matching and timing, not visibility, and \"unpredictable\" contradicts the idea of insects deliberately synchronizing with one another.",
    "hints": [
      "Look at what comes after the colon—it defines the missing word.",
      "The key detail is that each insect adjusts its flashes to match its neighbors' flashes.",
      "You need a word that describes many individuals acting in matched, synchronized fashion, not merely a word for being noticeable or impressive."
    ]
  },
  {
    "id": "rw-craft-x2",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 1,
    "passage": "Most animals adjust to seasonal cold through slow shifts in which genes they express, a process that unfolds over weeks or even generations. Octopuses take a faster route: they edit their RNA. When water temperatures drop, cephalopod cells begin recoding thousands of RNA molecules within hours, subtly altering proteins in the nervous system so that neurons keep firing efficiently in the cold.",
    "stem": "Which choice best states the main purpose of the text?",
    "choices": [
      "To describe a rapid molecular process that allows octopuses to cope with falling temperatures",
      "To explain why most animals require weeks or generations to adjust to seasonal cold",
      "To argue that octopuses' nervous systems are more complex than those of other animals",
      "To question whether RNA editing actually alters proteins in octopus neurons"
    ],
    "answer": 0,
    "explanation": "The text's opening contrast sets up its focus: unlike most animals, octopuses adapt to cold quickly by editing RNA, and the rest of the passage describes how that process works. The choice about most animals' slow adjustment is tempting because the text mentions it, but that detail exists only to highlight the octopus's faster mechanism—it answers a different question than the passage's main purpose.",
    "hints": [
      "Ask what the passage spends most of its words doing, not what it mentions in passing.",
      "The first sentence about most animals is a setup for a contrast introduced by \"Octopuses take a faster route.\"",
      "The passage neither doubts nor ranks anything—it simply presents and explains one speedy adaptation mechanism."
    ]
  },
  {
    "id": "rw-craft-x3",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 1,
    "passage": "Text 1: Tardigrades, eight-legged animals smaller than a grain of sand, have survived exposure to the vacuum of space, doses of radiation lethal to most organisms, and temperatures near absolute zero. Such extraordinary hardiness suggests that these creatures could endure nearly any environment our planet offers.\n\nText 2: Tardigrades withstand extremes only after expelling their water and shrinking into a dormant capsule called a tun. In their active state, they must remain in a film of moisture and die quickly in even modest heat or dryness. Their famous toughness belongs to their dormancy, not their daily lives.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the suggestion in Text 1?",
    "choices": [
      "By pointing out that tardigrades' ability to endure extreme conditions applies only when they are dormant, not when they are active",
      "By denying that tardigrades have ever survived radiation or the vacuum of space",
      "By agreeing that tardigrades could thrive in nearly any environment on Earth",
      "By arguing that entering the tun state makes tardigrades more vulnerable to heat than they would otherwise be"
    ],
    "answer": 0,
    "explanation": "Text 2 accepts that tardigrades survive extremes but adds a crucial condition: that toughness exists only in the dormant tun state, while active tardigrades are fragile. The distractor denying survival of radiation and vacuum is too extreme—Text 2 never disputes those feats; it disputes only what they imply about tardigrades' everyday resilience.",
    "hints": [
      "Identify exactly what Text 1 suggests in its final sentence and what condition Text 2 insists on.",
      "Text 2 does not deny the survival feats—it explains when they are possible.",
      "The response should qualify Text 1's suggestion by restricting the hardiness to one particular state."
    ]
  },
  {
    "id": "rw-craft-x4",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 1,
    "passage": "While cataloging plants across the mountain West in the 1870s, naturalist Alma Reyes kept field notebooks that modern botanists describe as remarkably ______: beside each pressed specimen she noted the date of collection, the elevation, the condition of the soil, and the landmarks nearby—details precise enough that researchers today can retrace her routes.",
    "stem": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "thorough",
      "concise",
      "imaginative",
      "influential"
    ],
    "answer": 0,
    "explanation": "The colon lists the many details Reyes recorded for every specimen—date, elevation, soil, landmarks—so the notebooks are best described as thorough. \"Influential\" is tempting because modern botanists still use the notebooks, but the sentence's definition after the colon concerns the completeness of the entries, not their later impact, and \"concise\" points in the opposite direction from such abundant detail.",
    "hints": [
      "The list after the colon tells you what quality the blank names.",
      "Notice how many separate details she recorded for every single specimen.",
      "Choose the word describing completeness of detail, not brevity, creativity, or later importance."
    ]
  },
  {
    "id": "rw-craft-x5",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 1,
    "passage": "The following text is from a 2004 novel.\n\nThe kitchen was the one room Amara refused to modernize. Her grandmother's kettle, carried from Accra four decades ago, still whistled on the back burner, and the shelf above the stove sagged under jars her mother had labeled by hand. When friends teased her about the peeling linoleum, Amara only shrugged. Some floors, she liked to say, remember every foot that has crossed them.",
    "stem": "Which choice best states the main purpose of the text?",
    "choices": [
      "To portray a character's attachment to a room that preserves her family's memories",
      "To criticize a character for refusing to make practical improvements to her home",
      "To explain how a family's belongings were transported from one country to another",
      "To describe a character's plan to restore an aging kitchen to its original condition"
    ],
    "answer": 0,
    "explanation": "Every detail—the grandmother's kettle, the hand-labeled jars, Amara's remark that floors \"remember\"—works to show why she cherishes the kitchen as a keeper of family memory. The choice about criticizing her refusal to modernize misreads the tone: the friends tease, but the narration treats her attachment sympathetically rather than judging it.",
    "hints": [
      "Ask what all the objects in the kitchen have in common.",
      "The kettle, the jars, and the linoleum each connect Amara to a family member or the past.",
      "Consider the tone of the final line—does the text mock her attachment or convey it warmly?"
    ]
  },
  {
    "id": "rw-craft-x6",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 1,
    "passage": "Text 1: Bike-share systems promise to reduce urban car traffic, and early signs are encouraging. In one membership survey, forty percent of riders reported driving less after joining. As cities expand these systems, planners can expect meaningful relief from congestion.\n\nText 2: Trip-level data from bike-share systems in three cities show that most rides replace walking trips or bus rides; fewer than ten percent substitute for a trip by car. Bike-share delivers real benefits—exercise, inexpensive mobility—but a large cut in car traffic is unlikely to be among them.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the expectation stated in Text 1?",
    "choices": [
      "By cautioning that it rests on an overestimate of how often bike-share rides take the place of car trips",
      "By denying that bike-share systems provide any meaningful benefits to the cities that adopt them",
      "By agreeing that expanding bike-share systems will substantially reduce traffic congestion",
      "By arguing that membership surveys are more trustworthy than trip-level ride data"
    ],
    "answer": 0,
    "explanation": "Text 2's data show that under ten percent of rides replace car trips, directly undercutting Text 1's expectation of \"meaningful relief from congestion.\" The distractor denying any benefits is too extreme: Text 2 explicitly grants that bike-share provides exercise and inexpensive mobility—it disputes only the congestion claim.",
    "hints": [
      "Pin down the specific prediction in Text 1's last sentence.",
      "Compare the survey figure in Text 1 with the trip-level figure in Text 2.",
      "Text 2 accepts some benefits of bike-share; its objection targets only one expected outcome."
    ]
  },
  {
    "id": "rw-craft-x7",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 2,
    "passage": "Reviewers of historian Tomas Ferre's new book have questioned whether so slender a volume can sustain the argument built upon it: at barely ninety pages, the study asks a single merchant's diary to bear the weight of sweeping conclusions about a century of Mediterranean trade.",
    "stem": "As used in the text, what does the word \"sustain\" most nearly mean?",
    "choices": [
      "Support",
      "Prolong",
      "Withstand",
      "Nourish"
    ],
    "answer": 0,
    "explanation": "The text restates the doubt as whether a short study can \"bear the weight\" of large conclusions, so \"sustain\" here means support, as a foundation supports a structure. \"Withstand\" is the most tempting wrong answer, but nothing is attacking or pressing against the book from outside; the question is whether the book can hold up the argument resting on it.",
    "hints": [
      "Find the phrase after the colon that restates the reviewers' worry in different words.",
      "\"Bear the weight of\" is the paraphrase of \"sustain\" the text itself provides.",
      "Think of what a foundation does for the building above it, not what a wall does against a storm."
    ]
  },
  {
    "id": "rw-craft-x8",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 2,
    "passage": "City planners often promote tree planting as a remedy for dangerous urban heat, and mature street trees can indeed cool the blocks around them by several degrees. However, a study of 94 neighborhoods in 12 cities found that newly planted trees provide almost no measurable cooling during their first fifteen years of growth. The study's authors therefore urge cities to treat planting campaigns as long-term investments and to pair them with measures, such as reflective roofing, that lower temperatures immediately.",
    "stem": "Which choice best describes the function of the second sentence in the overall structure of the text?",
    "choices": [
      "It presents a research finding that reveals a limitation of the approach described in the first sentence",
      "It offers evidence confirming that mature street trees cool the blocks around them",
      "It recommends that cities adopt reflective roofing instead of planting trees",
      "It explains the physical mechanism by which trees lower urban temperatures"
    ],
    "answer": 0,
    "explanation": "The first sentence presents tree planting as a heat remedy; the second, signaled by \"However,\" introduces a study showing that new trees give little cooling for fifteen years—a limitation of that remedy. The choice about confirming mature trees' cooling reverses the sentence's role: the study concerns newly planted trees and complicates, rather than supports, the planners' promotion of planting.",
    "hints": [
      "Note the transition word that opens the second sentence.",
      "Ask how the study's finding about newly planted trees relates to the claim about tree planting as a remedy.",
      "The sentence neither recommends anything nor explains how cooling works—it delivers a complicating finding."
    ]
  },
  {
    "id": "rw-craft-x9",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 2,
    "passage": "Text 1: The endurance of ancient Roman harbors and aqueducts is usually credited to pozzolana, a volcanic ash the Romans blended into their mortar. Reacting with water over centuries, the ash forms interlocking minerals that allow the concrete to grow stronger as it ages.\n\nText 2: Volcanic ash cannot be the whole story of Roman concrete. Small chunks of unmixed lime scattered through the material, long dismissed as evidence of sloppy preparation, dissolve when water seeps into a crack and then recrystallize, sealing the gap. Roman structures endured in part because their concrete could repair its own damage.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the explanation offered in Text 1?",
    "choices": [
      "By arguing that it is incomplete because it overlooks a self-repair mechanism provided by the lime fragments",
      "By denying that volcanic ash contributes anything to the strength of Roman concrete",
      "By agreeing that mineral growth from the ash fully accounts for the concrete's endurance",
      "By contending that the lime chunks in the concrete resulted from careless preparation"
    ],
    "answer": 0,
    "explanation": "Text 2 opens by saying volcanic ash \"cannot be the whole story,\" then supplies the missing piece: lime chunks that dissolve and recrystallize to seal cracks—so its author would call Text 1's explanation incomplete rather than wrong. The denial-of-ash distractor is too extreme, since \"not the whole story\" concedes that ash plays a real, if partial, role.",
    "hints": [
      "Focus on Text 2's opening phrase about the ash explanation.",
      "\"Cannot be the whole story\" signals partial agreement, not outright rejection.",
      "Text 2 adds a second mechanism—ask what that addition implies about Text 1's account."
    ]
  },
  {
    "id": "rw-craft-x10",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 2,
    "passage": "Municipal officials have often treated street vendors as operating outside the formal urban economy, but a recent survey of vendors in three West African markets suggests that their position is anything but ______: the vendors in the study bought inventory from licensed wholesalers, paid daily stall fees to city authorities, and extended credit to registered storefront businesses.",
    "stem": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "peripheral",
      "lucrative",
      "predictable",
      "collaborative"
    ],
    "answer": 0,
    "explanation": "The phrase \"anything but\" negates the blank, and the evidence after the colon shows vendors woven into the formal economy through wholesalers, fees, and credit—so their position is anything but peripheral, or marginal. \"Collaborative\" fails because \"anything but collaborative\" would mean the vendors do not cooperate with formal businesses, which the listed evidence directly contradicts.",
    "hints": [
      "\"Anything but\" flips the meaning—so the evidence must contradict the word in the blank.",
      "The first clause says officials treated vendors as \"outside\" the formal economy; the survey pushes back on that.",
      "You need a word meaning \"on the margins,\" so that negating it matches the vendors' deep ties to licensed businesses and city authorities."
    ]
  },
  {
    "id": "rw-craft-x11",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 2,
    "passage": "In 1930s Trinidad, percussionists barred from playing traditional drums began beating out rhythms on paint cans and biscuit tins. Players soon discovered that denting a container's surface produced distinct pitches, and by the late 1940s specialized tuners were hammering discarded oil barrels into instruments capable of carrying full melodies. Today, conservatories on several continents offer instruction in the steelpan, and Trinidad and Tobago has declared it the country's national instrument.",
    "stem": "Which choice best describes the overall structure of the text?",
    "choices": [
      "It recounts the improvised origins of a musical instrument and then traces its development into a formally recognized one",
      "It presents competing claims about who invented a musical instrument and then endorses one of them",
      "It describes the decline of a musical tradition and then explains the efforts that revived it",
      "It compares two types of percussion instruments and then argues that one requires greater skill"
    ],
    "answer": 0,
    "explanation": "The text moves chronologically from makeshift beginnings—paint cans and biscuit tins—through technical refinement to institutional recognition in conservatories and as a national instrument. The decline-and-revival choice is tempting because the passage begins with musicians barred from traditional drums, but the text never describes the steelpan itself declining; its arc is continuous ascent from improvisation to recognition.",
    "hints": [
      "Track what happens to the instrument from the first sentence to the last.",
      "Notice the movement from scavenged containers to conservatory instruction and national status.",
      "No inventor dispute, decline, or comparison appears—the text follows one instrument's rise over time."
    ]
  },
  {
    "id": "rw-craft-x12",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 2,
    "passage": "The following text is from a 1913 novel. Marisol has just received an unexpected letter from her estranged brother.\n\nMarisol set the envelope on the table and returned to her mending with a studied indifference. She remarked to her aunt that the post had brought nothing of consequence; yet her hands, which took up the envelope again and again only to set it down, told another story.",
    "stem": "As used in the text, what does the word \"studied\" most nearly mean?",
    "choices": [
      "Deliberate",
      "Scholarly",
      "Sincere",
      "Hasty"
    ],
    "answer": 0,
    "explanation": "Marisol's indifference is a performance: she claims the letter is unimportant while her restless hands reveal she cares deeply, so \"studied\" means deliberate—carefully put on rather than genuine. \"Scholarly\" is the trap based on the everyday association of \"study\" with academics, but nothing in the scene involves learning; \"sincere\" is contradicted outright by her hands telling \"another story.\"",
    "hints": [
      "Compare what Marisol says about the letter with what her hands do.",
      "Her indifference is an act—the word in the blank describes that quality of performance.",
      "Reject the meaning tied to academics; look for the meaning tied to intentional effort."
    ]
  },
  {
    "id": "rw-craft-x13",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 2,
    "passage": "Analyzing video recordings of 115 workplace meetings, a team of sociolinguists found that laughter rarely followed anything resembling a joke. Instead, it clustered around moments of friction: employees laughed while declining requests, softening criticism, or disagreeing with a supervisor. The researchers conclude that meeting-room laughter operates less as a reaction to humor than as a social lubricant that eases tense exchanges.",
    "stem": "Which choice best states the main purpose of the text?",
    "choices": [
      "To present research suggesting that laughter in meetings primarily serves to manage interpersonal tension",
      "To argue that workplace meetings would proceed more smoothly if they included more humor",
      "To describe the methods researchers use to record and classify laughter in offices",
      "To challenge the finding that employees laugh while disagreeing with supervisors"
    ],
    "answer": 0,
    "explanation": "The text reports a study and its conclusion: laughter in meetings functions as a \"social lubricant\" for tense moments rather than a response to jokes, so its purpose is to present that research finding. The methods choice is tempting because the passage opens with the recordings, but the recordings are mentioned only as the study's source—the passage's weight falls on what the researchers found and concluded.",
    "hints": [
      "Notice where the passage ends up—the researchers' conclusion is stated in the final sentence.",
      "The recordings are the study's raw material, not the passage's focus.",
      "The text reports findings; it does not recommend anything or dispute anyone."
    ]
  },
  {
    "id": "rw-craft-x14",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 2,
    "passage": "Text 1: Many songbird populations sing in local dialects: the same species may end its song with a trill in one valley and a buzz in the next. These dialects most likely arise through chance. Young birds learn by copying their neighbors, and small copying errors, accumulating over generations in geographically separated groups, gradually push populations toward different songs.\n\nText 2: In playback studies across one songbird's range, forest populations consistently sang lower-pitched, slower phrases—the kind that travel farthest through dense foliage—while grassland populations favored higher, faster phrases that carry in open air. So systematic a match between song structure and local acoustics suggests dialects are tuned by habitat, not produced by accumulated accident.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the explanation for dialects presented in Text 1?",
    "choices": [
      "By objecting that dialects correspond to local acoustic conditions too consistently to be the product of accumulated copying errors",
      "By denying that young songbirds acquire their songs by imitating neighboring birds",
      "By agreeing that geographic separation is sufficient to explain the differences among dialects",
      "By arguing that songs recorded in playback studies are too variable to reveal any general pattern"
    ],
    "answer": 0,
    "explanation": "Text 1 attributes dialects to chance copying errors; Text 2 counters with evidence that song features match each habitat's acoustics too systematically to be accidental. The distractor about denying imitation goes too far: Text 2 disputes the randomness of the outcome, not the claim that young birds learn songs by copying.",
    "hints": [
      "Identify the causal claim in Text 1—what does its author say produces dialects?",
      "Text 2's key phrase is \"tuned by habitat, not produced by accumulated accident.\"",
      "The disagreement is about whether the variation is random, not about whether birds learn by imitation."
    ]
  },
  {
    "id": "rw-craft-x15",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 3,
    "passage": "When nineteenth-century observers first recorded slight dips in the brightness of a faint variable star, most astronomers dismissed the fluctuations as ______—artifacts of flawed lenses and inconsistent record-keeping rather than genuine changes in the star itself. Only after three observatories, using different instruments, logged identical dimming patterns on the same nights did the variability gain acceptance as a real property of the star.",
    "stem": "Which choice completes the text with the most logical and precise word or phrase?",
    "choices": [
      "spurious",
      "cyclical",
      "imperceptible",
      "momentous"
    ],
    "answer": 0,
    "explanation": "The dash defines the blank: the fluctuations were dismissed as \"artifacts of flawed lenses\" rather than \"genuine changes,\" and the final sentence contrasts this with the variability later being accepted as \"real\"—so the astronomers considered the dips spurious, or false. \"Cyclical\" is tempting because variable stars often dim periodically, but the passage's contrast is between fake and genuine, not between regular and irregular.",
    "hints": [
      "The phrase after the dash restates the missing word—read it as a definition.",
      "\"Artifacts... rather than genuine changes\" opposes the fake to the real.",
      "The last sentence confirms the contrast: the variability was eventually accepted as \"real,\" so the earlier dismissal called it the opposite of real."
    ]
  },
  {
    "id": "rw-craft-x16",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 3,
    "passage": "Digitizing fragile manuscripts protects their contents from loss, and libraries have rightly invested in high-resolution scanning. It is true that a scan cannot capture everything: the heft of the parchment, the stitching of a binding, and erasures visible only under raking light all disappear on screen. Yet these losses argue not against digitization but for pairing it with careful physical conservation, so that the object endures alongside its image.",
    "stem": "Which choice best describes the function of the second sentence in the overall structure of the text?",
    "choices": [
      "It concedes limitations of a practice that the text as a whole continues to support",
      "It provides evidence for the claim that digitization should be replaced by physical conservation",
      "It introduces the text's central argument that scans protect manuscripts' contents",
      "It describes technical improvements that could allow scans to capture more detail"
    ],
    "answer": 0,
    "explanation": "The second sentence, opening with the concessive \"It is true that,\" grants real shortcomings of scanning, but the third sentence's \"Yet\" turns those losses into an argument for pairing digitization with conservation rather than abandoning it—so the sentence is a concession within a text that still endorses the practice. The replacement choice misreads the \"Yet\" turn: the text explicitly says the losses \"argue not against digitization.\"",
    "hints": [
      "Watch the signal phrases: \"It is true that\" in sentence two and \"Yet\" in sentence three.",
      "Ask whether the text ultimately stands by digitization after listing what scans miss.",
      "A sentence that admits weaknesses right before the author reaffirms the practice is playing a concessive role, not a decisive one."
    ]
  },
  {
    "id": "rw-craft-x17",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 3,
    "passage": "Text 1: In laboratory tanks, zooplankton exposed to microplastic particles ate less, grew more slowly, and produced fewer offspring. Because zooplankton anchor ocean food webs, these results signal a threat that could propagate upward to fish, seabirds, and marine mammals as plastic pollution accumulates.\n\nText 2: Laboratory findings on microplastics deserve attention, but caution is warranted: many experiments use particle concentrations hundreds or thousands of times higher than those measured in the open ocean. Until studies test the doses organisms actually encounter, the question of what today's oceanic concentrations do to zooplankton remains open.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the conclusion drawn in Text 1?",
    "choices": [
      "By arguing that its relevance to real oceans is uncertain because the experiments used far higher microplastic concentrations than those found there",
      "By asserting that microplastics at current ocean concentrations have been shown to leave zooplankton unharmed",
      "By disputing the laboratory finding that heavily exposed zooplankton fed less and produced fewer offspring",
      "By agreeing that harm to zooplankton is already spreading upward through ocean food webs"
    ],
    "answer": 0,
    "explanation": "Text 2 accepts the laboratory results but questions whether they apply to real oceans, since experimental doses far exceed measured oceanic concentrations, leaving the real-world question \"open.\" The most tempting distractor claims zooplankton have been shown to be unharmed at ocean concentrations, but Text 2 says the effects are unproven, not disproven—a crucial distinction between uncertainty and a demonstrated null result.",
    "hints": [
      "Note what Text 2 accepts (the lab findings) and what it questions (their applicability).",
      "The dose gap—experimental concentrations versus oceanic ones—is the crux of the objection.",
      "Be careful to distinguish \"the question remains open\" from \"the answer is that there is no harm.\""
    ]
  },
  {
    "id": "rw-craft-x18",
    "section": "rw",
    "domain": "craft",
    "skill": "Words in Context",
    "diff": 3,
    "passage": "In her history of the temperance press, scholar Renata Okafor credits a single 1838 pamphlet with arresting the movement's decline. She is careful not to overstate the case: the pamphlet reversed nothing, she writes, but it stopped the steady loss of members and subscriptions long enough to give organizers a decade of stability in which to regroup.",
    "stem": "As used in the text, what does the word \"arresting\" most nearly mean?",
    "choices": [
      "Halting",
      "Captivating",
      "Seizing",
      "Detaining"
    ],
    "answer": 0,
    "explanation": "The second sentence glosses the claim: the pamphlet \"stopped the steady loss of members,\" so \"arresting\" the decline means halting it. \"Captivating\" is the trap drawn from the common adjectival sense of \"arresting\" (striking or attention-grabbing), but the object here is the movement's decline, not readers' attention, and \"seizing\" and \"detaining\" import the law-enforcement sense that has no place in the sentence.",
    "hints": [
      "Ask what \"arresting\" is being done to—the object is \"the movement's decline.\"",
      "The next sentence paraphrases the claim: the pamphlet \"stopped the steady loss.\"",
      "Set aside the familiar sense of an \"arresting\" image; you need the verb sense of bringing a process to a stop."
    ]
  },
  {
    "id": "rw-craft-x19",
    "section": "rw",
    "domain": "craft",
    "skill": "Text Structure & Purpose",
    "diff": 3,
    "passage": "Biographers long described the 1850s—the decade in which composer Helene Vasquez published nothing—as a creative crisis. Her newly cataloged correspondence complicates that account. Throughout those years she was arranging other composers' symphonies for a touring ensemble, work that was steady, well paid, and artistically exacting but issued under the ensemble's name. The letters suggest that her so-called silent decade was marked not by an absence of music but by an absence of credit.",
    "stem": "Which choice best states the main purpose of the text?",
    "choices": [
      "To argue that a gap in a composer's published output reflected uncredited musical work rather than a creative crisis",
      "To demonstrate that the composer's arrangements were artistically superior to her original compositions",
      "To confirm biographers' long-standing view that the composer stopped making music during the 1850s",
      "To explain how touring ensembles of the period acquired and credited their musical arrangements"
    ],
    "answer": 0,
    "explanation": "The text sets up the biographers' \"creative crisis\" narrative, then uses the correspondence to overturn it, ending with the pointed reframing: an absence of credit, not of music. The superiority choice overreaches—the text calls her arranging \"artistically exacting\" but never ranks it against her own compositions, and the ensemble-practices choice mistakes background detail for the passage's argumentative point.",
    "hints": [
      "The word \"complicates\" in the second sentence signals the text's move against the received account.",
      "Track the contrast in the final sentence: absence of music versus absence of credit.",
      "Praise for the arranging work supports the argument that she was still composing seriously—it is not a claim that this work was her best."
    ]
  },
  {
    "id": "rw-craft-x20",
    "section": "rw",
    "domain": "craft",
    "skill": "Cross-Text Connections",
    "diff": 3,
    "passage": "Text 1: The final chapter of the anonymous 1794 epistolary novel The Glass Courier breaks off mid-correspondence, and generations of readers have judged the ending botched—the telltale sign of an author racing a printer's deadline and failing to finish the job.\n\nText 2: A surviving draft of The Glass Courier contains a completed final exchange of letters that the author struck out before publication. Interruption is the novel's great subject—messages miscarry and letters go astray throughout—so a correspondence severed mid-sentence reads less as a failure of craft than as its fulfillment.",
    "stem": "Based on the texts, how would the author of Text 2 most likely respond to the judgment described in Text 1?",
    "choices": [
      "By arguing that manuscript evidence shows the abrupt ending was a deliberate choice consistent with the novel's central preoccupations",
      "By conceding that the ending was written in haste but insisting that it succeeds artistically nonetheless",
      "By agreeing that the author was likely working against a printer's deadline",
      "By denying that readers have generally found the novel's ending unsatisfying"
    ],
    "answer": 0,
    "explanation": "Text 2 offers two linked rebuttals: the draft shows the author cut a finished ending—so the abruptness was chosen, not forced by time—and the truncation fulfills the novel's own theme of interrupted messages. The concession distractor is subtly wrong because Text 2 never grants haste; the struck-out completed ending is evidence against the deadline story, not an admission of it.",
    "hints": [
      "Ask what the surviving draft proves about whether the author ran out of time.",
      "An ending that existed in full and was then deleted points to choice, not haste.",
      "Text 2 also ties the abruptness to the novel's recurring subject—combine both points to find the response."
    ]
  },
  {
    "id": "rw-expr-x1",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 1,
    "passage": "When the Norwegian government began automating its coastal lighthouses in the 1980s, many observers predicted that the profession of lighthouse keeping would vanish entirely within a decade. ______ a handful of stations, including the remote Sula lighthouse, still employ resident keepers today, largely because overnight visitors pay for the experience and expect a human host.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "However,",
      "Therefore,",
      "Similarly,",
      "For example,"
    ],
    "answer": 0,
    "explanation": "The first sentence describes a prediction that lighthouse keeping would disappear; the second sentence contradicts that prediction by noting keepers still exist. \"However\" correctly signals this contrast. \"Therefore\" is wrong because the second sentence is not a consequence of the prediction—it runs against it.",
    "hints": [
      "Read the two sentences and decide whether the second one continues, contradicts, or results from the first.",
      "The observers predicted the profession would vanish, but the second sentence says some keepers remain employed today.",
      "A prediction followed by an outcome that defies it calls for a contrast word, not a cause-and-effect or example word."
    ]
  },
  {
    "id": "rw-expr-x2",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 1,
    "passage": "Certain bamboo species can grow more than half a meter in a single day, reaching their full height within one growing season. ______ builders in parts of Southeast Asia can harvest mature poles from the same grove year after year without replanting, which makes bamboo scaffolding both inexpensive and rapidly renewable.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "As a result,",
      "For instance,",
      "In contrast,",
      "Nevertheless,"
    ],
    "answer": 0,
    "explanation": "The second sentence describes a consequence of bamboo's extraordinary growth rate: repeated harvests are possible without replanting. \"As a result\" correctly marks this cause-and-effect relationship. \"For instance\" is wrong because the second sentence is an effect of the growth rate, not an example of it.",
    "hints": [
      "Ask what the second sentence does: give an example of fast growth, contradict it, or follow from it?",
      "Because bamboo regrows to full height in one season, harvesting every year becomes possible.",
      "The first sentence is a cause and the second is its effect, so choose the transition that signals consequence."
    ]
  },
  {
    "id": "rw-expr-x3",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 1,
    "passage": "Composer Aya Nishimura often builds her orchestral works around sounds she records in everyday settings. ______ her 2021 piece Timetable opens with the recorded clatter of a train station departure board, a rhythm the percussion section then gradually imitates and transforms.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "For example,",
      "In contrast,",
      "Nonetheless,",
      "In sum,"
    ],
    "answer": 0,
    "explanation": "The first sentence makes a general claim about Nishimura's practice, and the second offers one specific piece, Timetable, that illustrates it. \"For example\" correctly introduces this illustration. \"In sum\" is wrong because the second sentence adds a new, specific detail rather than summarizing what came before.",
    "hints": [
      "Identify the relationship: is the second sentence a summary, an exception, or an illustration of the first?",
      "The first sentence states a general habit of the composer; the second names one specific piece.",
      "A general claim followed by a single concrete case needs a transition that introduces an example."
    ]
  },
  {
    "id": "rw-expr-x4",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 2,
    "passage": "Biologists studying the two-spot octopus found that patches of its skin respond to light even when disconnected from the eyes and brain: the skin itself contains the same light-sensitive proteins found in the retina. ______, the animal may be able to detect light with its entire body, not just its eyes.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "In other words,",
      "In addition,",
      "By contrast,",
      "For example,"
    ],
    "answer": 0,
    "explanation": "The second sentence restates the finding in plainer terms—skin that responds to light means the whole body can detect light—so \"In other words\" is correct. \"In addition\" is tempting because the sentence feels like new information, but it introduces no separate fact; it merely rephrases the discovery already described.",
    "hints": [
      "Compare the content of the two sentences: does the second add a new finding or restate the first differently?",
      "Skin containing retinal light-sensing proteins and a body that can detect light are the same idea expressed two ways.",
      "When a sentence translates a technical finding into simpler terms, choose the transition that signals restatement."
    ]
  },
  {
    "id": "rw-expr-x5",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 2,
    "passage": "To restore its shrinking kelp forests, one coastal community in Tasmania began cultivating young kelp in shore-based tanks before transplanting it to the seabed. ______, restoration teams in California now raise juvenile kelp on spools of twine in nurseries, unwinding the spools across degraded reefs once the plants are hardy enough to survive.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Similarly,",
      "However,",
      "Consequently,",
      "In fact,"
    ],
    "answer": 0,
    "explanation": "Both sentences describe the same strategy—raising young kelp in protected conditions before moving it to the ocean—used by two different groups, so \"Similarly\" correctly signals the parallel. \"Consequently\" is wrong because the California program is not caused by the Tasmanian one; the two are simply alike.",
    "hints": [
      "Look at what the Tasmanian community and the California teams are each doing.",
      "Both groups raise juvenile kelp in sheltered settings and then transfer it to damaged reefs.",
      "Two independent efforts using the same approach call for a transition of comparison, not cause or contrast."
    ]
  },
  {
    "id": "rw-expr-x6",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 2,
    "passage": "In the 1870s, early typewriter manufacturers marketed their machines almost exclusively to court reporters and telegraph operators, assuming that ordinary businesses would see little use for the devices. Sales stayed modest for over a decade. ______ falling prices and the rise of standardized business correspondence in the 1890s made the typewriter a fixture of nearly every office.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Eventually,",
      "Meanwhile,",
      "Likewise,",
      "For example,"
    ],
    "answer": 0,
    "explanation": "The passage traces a change over time: modest sales for a decade, then widespread adoption in the 1890s. \"Eventually\" correctly marks this later development. \"Meanwhile\" is tempting because the passage is chronological, but it would wrongly suggest the 1890s boom happened at the same time as the earlier slow sales rather than after them.",
    "hints": [
      "Track the time markers: the 1870s, a decade of modest sales, then the 1890s.",
      "The final sentence describes something that happened after the long stretch of slow sales, not alongside it.",
      "Choose the transition that signals a later outcome arriving at the end of a sequence."
    ]
  },
  {
    "id": "rw-expr-x7",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 2,
    "passage": "Vertical farms can produce leafy greens using a small fraction of the land and water required by conventional fields, and their sealed indoor environments eliminate the need for most pesticides. ______, these warehouses' reliance on artificial lighting keeps electricity costs so high that many operations struggle to price their produce competitively.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Nevertheless,",
      "As a result,",
      "Moreover,",
      "For instance,"
    ],
    "answer": 0,
    "explanation": "The first sentence lists advantages of vertical farms, while the second introduces a serious drawback, so the contrastive \"Nevertheless\" is correct. \"Moreover\" is tempting because the second sentence does add information, but a transition of addition would wrongly imply the electricity problem extends the list of benefits rather than cutting against it.",
    "hints": [
      "Decide whether the second sentence supports the case for vertical farms or complicates it.",
      "Land savings and pesticide-free growing are benefits; crushing electricity costs are a drawback.",
      "When praise is followed by a significant downside, the passage needs a concessive contrast word."
    ]
  },
  {
    "id": "rw-expr-x8",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 3,
    "passage": "Archivists have long suspected that medieval scribes reused parchment far more often than surviving manuscripts suggest, since erased text is usually invisible to the naked eye. ______, when researchers recently scanned a single monastery's collection with multispectral imaging, they found ghost layers of earlier writing beneath nearly one page in five.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Indeed,",
      "However,",
      "By contrast,",
      "In the meantime,"
    ],
    "answer": 0,
    "explanation": "The scan results confirm and strengthen the archivists' long-held suspicion, so \"Indeed\"—which signals emphatic confirmation of a prior claim—is correct. \"However\" is the trap: because erased text is described as invisible, its detection might feel like a reversal, but the finding actually validates the suspicion rather than contradicting anything in the first sentence.",
    "hints": [
      "First pin down the claim in sentence one: archivists suspect parchment reuse was common but hard to see.",
      "The imaging results—hidden writing under nearly one in five pages—show that the suspicion was well founded.",
      "Evidence that vindicates an earlier hunch calls for a transition of confirmation, not contrast."
    ]
  },
  {
    "id": "rw-expr-x9",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 3,
    "passage": "Because honeybee hives are easy to install on rooftops, many cities have embraced urban beekeeping as a visible sign of ecological commitment. Recent surveys, though, indicate that dense clusters of hives can strip nectar from the very flowers that wild native bees depend on. ______, several municipalities have begun capping hive permits and redirecting enthusiasm toward planting pollinator gardens instead.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Consequently,",
      "Nevertheless,",
      "Similarly,",
      "In other words,"
    ],
    "answer": 0,
    "explanation": "The permit caps and garden programs are responses to the survey findings in the previous sentence, so \"Consequently\" correctly signals cause and effect. \"Nevertheless\" is the trap: the passage already pivoted with \"though\" in the second sentence, and the final sentence follows logically from that pivot rather than contradicting it.",
    "hints": [
      "The blank connects the final sentence to the sentence immediately before it, not to the opening sentence.",
      "The surveys revealed a problem: crowded hives harm wild bees. What did cities then do?",
      "Capping permits is a direct response to the surveys' warning, so the blank should signal a resulting action."
    ]
  },
  {
    "id": "rw-expr-x10",
    "section": "rw",
    "domain": "expr",
    "skill": "Transitions",
    "diff": 3,
    "passage": "Materials scientists have identified why the mother-of-pearl lining of abalone shells resists cracking so effectively despite being composed of brittle minerals. ______, the shell's aragonite tiles are stacked like microscopic bricks within a mortar of elastic proteins, so a crack that begins in one tile is forced to swerve and shed energy at every soft layer it meets.",
    "stem": "Which choice completes the text with the most logical transition?",
    "choices": [
      "Specifically,",
      "For example,",
      "In contrast,",
      "Nevertheless,"
    ],
    "answer": 0,
    "explanation": "The second sentence does not offer one instance among several; it spells out the precise mechanism behind the crack resistance announced in the first sentence, so \"Specifically\" is correct. \"For example\" is the trap: an example would be one case drawn from a broader set, but the brick-and-mortar structure is the complete explanation the scientists identified.",
    "hints": [
      "The first sentence promises an explanation; check what the second sentence delivers.",
      "The tile-and-protein structure is not one illustration among many—it is the full mechanism itself.",
      "Distinguish a transition that narrows into precise detail from one that introduces a sample case."
    ]
  },
  {
    "id": "rw-expr-x11",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 1,
    "passage": "While researching a topic, a student has taken the following notes:\n- Luthiers are craftspeople who build stringed instruments such as violins.\n- Violins made in Italy in the 1700s are prized for their tone.\n- In a 2023 study, acoustician Marta Kowalski asked whether chemical treatments of the wood, not just craftsmanship, shape a violin's sound.\n- Her team analyzed wood shavings from five 18th-century violins.\n- The shavings contained mineral treatments absent from modern instruments.",
    "stem": "The student wants to introduce the study to an audience unfamiliar with it. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "In a 2023 study, acoustician Marta Kowalski asked whether chemical treatments of the wood, and not just craftsmanship, shape the prized tone of violins made in Italy in the 1700s.",
      "Kowalski's team analyzed wood shavings taken from five violins built in the 18th century.",
      "Luthiers are craftspeople who build stringed instruments such as violins.",
      "The wood shavings contained mineral treatments that are absent from modern instruments."
    ],
    "answer": 0,
    "explanation": "An introduction for an unfamiliar audience should name the researcher and state what the study set out to investigate, which the correct choice does. The choice about analyzing wood shavings is factually accurate but presents a methodological detail that assumes the reader already knows what study is being discussed.",
    "hints": [
      "The goal is to introduce the study, so the sentence must work for someone who has never heard of it.",
      "Look for the choice that names the researcher and explains the question her study addressed.",
      "Eliminate choices that jump into methods or results without first saying what the study is about."
    ]
  },
  {
    "id": "rw-expr-x12",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 1,
    "passage": "While researching a topic, a student has taken the following notes:\n- Dust from the Sahara Desert travels across the Atlantic Ocean.\n- The dust delivers phosphorus that fertilizes the Amazon rainforest.\n- Ash from Iceland's volcanic eruptions drifts to mainland Europe.\n- The ash deposits minerals that enrich agricultural soils there.",
    "stem": "The student wants to emphasize a similarity between Saharan dust and Icelandic volcanic ash. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Like Saharan dust, which fertilizes the Amazon rainforest with phosphorus, ash from Iceland's volcanoes enriches distant soils, depositing minerals on European farmland.",
      "Dust from the Sahara Desert travels across the Atlantic Ocean, delivering phosphorus that fertilizes the Amazon rainforest.",
      "Ash from Iceland's volcanic eruptions drifts to mainland Europe and deposits minerals in agricultural soils.",
      "Saharan dust crosses the Atlantic Ocean to reach the Amazon, whereas Icelandic ash drifts only as far as mainland Europe."
    ],
    "answer": 0,
    "explanation": "The correct choice explicitly links the two phenomena with \"Like,\" showing that both airborne materials enrich faraway soils. The \"whereas\" choice is factually consistent with the notes but frames the two as different in how far they travel, which works against the goal of emphasizing a similarity.",
    "hints": [
      "The goal requires both Saharan dust and Icelandic ash to appear in the same sentence.",
      "Two of the choices mention only one of the two phenomena, so they cannot show a similarity.",
      "Between the remaining choices, pick the one whose connecting word signals likeness rather than difference."
    ]
  },
  {
    "id": "rw-expr-x13",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 1,
    "passage": "While researching a topic, a student has taken the following notes:\n- Great tits are small songbirds common in European cities.\n- Male great tits sing to attract mates and defend territory.\n- Researcher Tomás Herrera recorded great tit songs in quiet parks and near busy roads in Madrid.\n- Birds near busy roads sang at higher pitches than birds in quiet parks.\n- Higher-pitched songs are easier to hear over low-frequency traffic noise.",
    "stem": "The student wants to present the study's main finding. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Herrera found that great tits living near busy Madrid roads sang at higher pitches than great tits living in quiet parks.",
      "Herrera recorded the songs of great tits both in quiet parks and near busy roads in Madrid.",
      "Male great tits sing in order to attract mates and to defend their territory.",
      "Great tits are small songbirds that are common in European cities."
    ],
    "answer": 0,
    "explanation": "The main finding is the pitch difference between road-adjacent and park birds, which the correct choice states directly. The choice about recording songs in both settings is accurate but describes the study's method—what Herrera did—rather than what he discovered.",
    "hints": [
      "Separate the notes into background, method, and results before choosing.",
      "A finding is something the researcher learned, not a description of birds in general or of how data was collected.",
      "Look for the choice that reports a comparison the study actually revealed."
    ]
  },
  {
    "id": "rw-expr-x14",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 2,
    "passage": "While researching a topic, a student has taken the following notes:\n- Venus flytraps snap their traps shut to capture insects.\n- Closing a trap costs the plant significant energy.\n- Plants have no nervous systems with which to store information.\n- Biologist Lena Aro's team touched trap hairs with fine brushes at timed intervals.\n- Traps closed only after two touches occurring within about twenty seconds.\n- A single touch, or two touches spaced far apart, never triggered closure.",
    "stem": "The student wants to emphasize a surprising ability of Venus flytraps suggested by the study's results. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Although plants have no nervous systems with which to store information, Venus flytraps closed only after two touches within about twenty seconds, suggesting they can somehow track both the number and the timing of touches.",
      "Aro's team touched the trap hairs of Venus flytraps with fine brushes at carefully timed intervals.",
      "Venus flytraps snap their traps shut to capture insects, and closing a trap costs the plant significant energy.",
      "In Aro's study, a single touch, or two touches spaced far apart, never caused a Venus flytrap to close."
    ],
    "answer": 0,
    "explanation": "The surprise lies in the mismatch between plants' lack of a nervous system and the flytrap's apparent counting and timing ability, and only the correct choice sets up that tension. The choice reporting that single or widely spaced touches never triggered closure is accurate but presents the raw result without framing why it is remarkable.",
    "hints": [
      "Ask which note makes the results startling rather than merely descriptive.",
      "Plants cannot store information the way animals do, yet the traps responded only to a specific pattern of touches.",
      "The best choice pairs the plant's limitation with the ability the results imply, making the surprise explicit."
    ]
  },
  {
    "id": "rw-expr-x15",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 2,
    "passage": "While researching a topic, a student has taken the following notes:\n- Collisions with glass windows kill many songbirds each year.\n- Ornithologist Priya Raman tested two window treatments in a flight tunnel.\n- Vertical stripe decals spaced ten centimeters apart reduced collisions by 90 percent.\n- Single hawk-silhouette decals reduced collisions by 15 percent.",
    "stem": "The student wants to emphasize how much more effective one window treatment was than the other. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "In Raman's flight-tunnel tests, closely spaced vertical stripe decals reduced songbird collisions by 90 percent, whereas single hawk-silhouette decals reduced them by only 15 percent.",
      "In a flight tunnel, ornithologist Priya Raman tested two different treatments designed to prevent songbirds from striking windows.",
      "Vertical stripe decals spaced ten centimeters apart reduced songbird collisions in Raman's flight tunnel by 90 percent.",
      "Because collisions with glass windows kill many songbirds each year, Raman tested two window treatments in a flight tunnel."
    ],
    "answer": 0,
    "explanation": "Emphasizing how much more effective one treatment was requires citing both results side by side, which the correct choice does with the 90 percent versus 15 percent comparison. The choice reporting only the stripe decals' 90 percent reduction is accurate but omits the other treatment, so no comparison of effectiveness is possible.",
    "hints": [
      "A claim that one treatment outperformed another needs figures for both treatments.",
      "Scan each choice for two percentages, not just one.",
      "The word \"whereas\" and the contrast between 90 and 15 percent do exactly what the goal demands."
    ]
  },
  {
    "id": "rw-expr-x16",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 2,
    "passage": "While researching a topic, a student has taken the following notes:\n- Scientists count Arctic seal populations to monitor ecosystem health.\n- Traditional aerial surveys require low-flying planes, which are costly and disturb the seals.\n- A team led by Ingrid Solheim trained a computer model to spot seals in high-resolution satellite images.\n- The satellite method can cover vast areas without disturbing any animals.",
    "stem": "The student wants to emphasize an advantage of the satellite method over traditional aerial surveys. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Unlike traditional aerial surveys, whose costly low-flying planes disturb the seals, Solheim's satellite method can count seals across vast areas without disturbing any animals.",
      "A team led by Ingrid Solheim trained a computer model to spot seals in high-resolution satellite images.",
      "Traditional aerial surveys of Arctic seals require low-flying planes, which are costly and disturb the animals.",
      "Scientists count Arctic seal populations in order to monitor the health of the ecosystem."
    ],
    "answer": 0,
    "explanation": "Showing an advantage over aerial surveys requires mentioning both methods and stating what the satellite approach does better, which the correct choice accomplishes. The choice describing only the drawbacks of aerial surveys is accurate but never mentions the satellite method, so it cannot establish the comparison the goal requires.",
    "hints": [
      "An advantage \"over\" something is a comparison, so both methods should appear.",
      "Find the choice that names a weakness of aerial surveys and shows the satellite method avoiding it.",
      "Choices that describe only one method, or only the study's setup, cannot meet the goal."
    ]
  },
  {
    "id": "rw-expr-x17",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 2,
    "passage": "While researching a topic, a student has taken the following notes:\n- Cuneiform is an ancient writing system of wedge-shaped marks pressed into clay tablets.\n- Hundreds of thousands of cuneiform tablets remain untranslated.\n- Assyriologists, the specialists who read cuneiform, are few in number.\n- A university team built a neural network that drafts translations of Akkadian cuneiform texts.\n- The drafts let Assyriologists review tablets far faster than translating from scratch.",
    "stem": "The student wants to explain the benefit of the neural network to an audience already familiar with cuneiform. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "By producing draft translations of Akkadian texts, the new neural network lets the small community of Assyriologists review untranslated tablets far faster than translating from scratch.",
      "Cuneiform, an ancient writing system of wedge-shaped marks pressed into clay tablets, survives on hundreds of thousands of untranslated tablets.",
      "A university team built a neural network capable of drafting translations of Akkadian cuneiform texts.",
      "Assyriologists, the specialists trained to read cuneiform texts, are few in number."
    ],
    "answer": 0,
    "explanation": "For readers who already know what cuneiform is, the sentence should skip definitions and state what the network does for scholars, which the correct choice does by naming the time-saving benefit. The choice defining cuneiform is accurate but wastes the sentence on background this audience does not need and never states a benefit.",
    "hints": [
      "The audience already knows cuneiform, so a definition of it is unnecessary.",
      "The goal asks for a benefit—something the network makes better, easier, or faster.",
      "Find the choice that connects the network's draft translations to how much faster specialists can work."
    ]
  },
  {
    "id": "rw-expr-x18",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 3,
    "passage": "While researching a topic, a student has taken the following notes:\n- A 2024 trial tested whether painting one blade of a wind turbine black reduces bird collisions.\n- At a Norwegian wind farm, painted turbines had 70 percent fewer bird deaths than unpainted ones.\n- The trial involved only four painted turbines at a single site.\n- Researchers caution that the results may not generalize to other landscapes or bird species.",
    "stem": "The student wants to emphasize a limitation of the trial's findings. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Although painted turbines had 70 percent fewer bird deaths, the trial included only four painted turbines at a single Norwegian site, so the results may not generalize to other landscapes or bird species.",
      "At a Norwegian wind farm, turbines with one blade painted black had 70 percent fewer bird deaths than unpainted turbines, suggesting a simple way to protect birds.",
      "A 2024 trial tested whether painting a single blade of a wind turbine black could reduce the number of birds colliding with it.",
      "Painted turbines at the Norwegian wind farm in the 2024 trial had 70 percent fewer bird deaths than turbines left unpainted."
    ],
    "answer": 0,
    "explanation": "The correct choice acknowledges the striking result but foregrounds the trial's small scale and the researchers' caution, which is exactly the limitation the goal requires. The choice calling the finding \"a simple way to protect birds\" is consistent with the notes but emphasizes the trial's promise, the opposite of a limitation.",
    "hints": [
      "A limitation is a reason to be cautious about the findings, not the findings themselves.",
      "Two notes signal caution: the tiny sample of four turbines and the warning about generalizing.",
      "The strongest choice concedes the positive result and then pivots to why it might not hold elsewhere."
    ]
  },
  {
    "id": "rw-expr-x19",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 3,
    "passage": "While researching a topic, a student has taken the following notes:\n- Foley artistry is the craft of performing everyday sound effects live in a studio to match a film's images.\n- Foley artist Ana Duarte created the footstep sounds for the 2022 film Glass Harbor.\n- Duarte performed the footsteps on trays of gravel while watching the film.\n- Foley effects often sound more natural than digitally generated effects.",
    "stem": "The student wants to introduce Foley artistry to an audience unfamiliar with the craft. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Practitioners of Foley artistry—the craft of performing everyday sound effects live in a studio to match a film's images—include Ana Duarte, who created the footstep sounds for the 2022 film Glass Harbor.",
      "Foley artist Ana Duarte performed footstep sounds on trays of gravel while watching the 2022 film Glass Harbor.",
      "Ana Duarte created the footstep sounds heard in the 2022 film Glass Harbor.",
      "Foley effects often sound more natural than sound effects that are generated digitally."
    ],
    "answer": 0,
    "explanation": "Because the audience does not know the craft, the sentence must define Foley artistry, which the correct choice does before grounding it with Duarte's example. The choice describing Duarte performing on gravel trays is accurate and vivid, but it uses the term \"Foley artist\" without explanation, leaving an unfamiliar reader unsure what the craft actually is.",
    "hints": [
      "An unfamiliar audience needs the term explained before any details will make sense.",
      "Check each choice: does it say what Foley artistry actually is?",
      "The best choice both defines the craft and attaches a concrete practitioner to it."
    ]
  },
  {
    "id": "rw-expr-x20",
    "section": "rw",
    "domain": "expr",
    "skill": "Rhetorical Synthesis",
    "diff": 3,
    "passage": "While researching a topic, a student has taken the following notes:\n- Economists predicted that shortening the workweek at Icelandic offices would reduce total output.\n- Between 2015 and 2019, trials cut weekly hours from 40 to about 35 with no reduction in pay.\n- Output stayed the same or improved at most participating workplaces.\n- Workers reported lower stress and less burnout during the trials.",
    "stem": "The student wants to emphasize the contrast between what economists predicted and what the trials found. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    "choices": [
      "Although economists predicted that shorter workweeks would reduce total output, the Icelandic trials found that output stayed the same or improved at most workplaces even as weekly hours fell from 40 to about 35.",
      "Between 2015 and 2019, Icelandic trials cut weekly office hours from 40 to about 35 without reducing workers' pay.",
      "During the Icelandic trials, workers reported experiencing lower stress and less burnout.",
      "The Icelandic trials found that output stayed the same or improved at most participating workplaces, and workers reported less burnout."
    ],
    "answer": 0,
    "explanation": "The goal demands both the prediction and the outcome in tension with it, and only the correct choice pairs the economists' forecast of reduced output with the finding that output held steady or improved. The choice listing steady output and lower burnout is accurate and tempting because it summarizes the results well, but it never mentions the prediction, so no contrast is established.",
    "hints": [
      "A contrast between prediction and result requires the sentence to state both.",
      "Identify the note containing the economists' expectation and the note containing the output finding.",
      "The right choice uses a concessive structure to set the forecast against what actually happened."
    ]
  },
  {
    "id": "rw-conv-x1",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 1,
    "passage": "Tide pools along the rocky coast of the Pacific Northwest appear tranquil at low ______ barnacles, mussels, and sea anemones inside them are locked in a constant struggle for space, food, and shelter from the drying sun.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "tide, but",
      "tide,",
      "tide",
      "tide, however,"
    ],
    "answer": 0,
    "explanation": "Two independent clauses (\"Tide pools...appear tranquil\" and \"barnacles...are locked\") must be joined by a comma plus a coordinating conjunction, which \"tide, but\" provides. The most tempting distractor, \"tide, however,\" fails because \"however\" is a conjunctive adverb, not a conjunction, so it produces a comma splice; the bare comma and the missing punctuation create a comma splice and a run-on, respectively.",
    "hints": [
      "Identify what comes before and after the blank: are both word groups complete sentences on their own?",
      "Both parts are independent clauses, so they cannot be joined by only a comma or by nothing at all.",
      "You need a comma plus a true coordinating conjunction; a word like \"however\" set off by commas cannot do that job."
    ]
  },
  {
    "id": "rw-conv-x2",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 1,
    "passage": "The ______ is often described as sounding like a harp and a guitar played at once. Griot musicians in Senegal, Mali, and The Gambia have performed on the instrument for centuries, using it to accompany epic recitations of history and genealogy.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "kora, a twenty-one-string instrument built from a calabash gourd,",
      "kora, a twenty-one-string instrument built from a calabash gourd",
      "kora a twenty-one-string instrument built from a calabash gourd,",
      "kora—a twenty-one-string instrument built from a calabash gourd,"
    ],
    "answer": 0,
    "explanation": "The phrase \"a twenty-one-string instrument built from a calabash gourd\" is a nonrestrictive appositive describing the kora, so it must be enclosed by a matching pair of commas. The most tempting distractor omits the closing comma, leaving the appositive open before the verb \"is\"; the other options omit the opening comma or mismatch a dash with a comma.",
    "hints": [
      "Look at the descriptive phrase after \"kora\": it renames the noun and could be lifted out of the sentence.",
      "A nonessential appositive needs punctuation on both sides, and the marks must match.",
      "The phrase opens after \"kora\" and must close before \"is,\" using the same punctuation mark at each end."
    ]
  },
  {
    "id": "rw-conv-x3",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 2,
    "passage": "Lake managers in the region face a stubborn ______ the invasive mussels that filter the water to a photogenic clarity also concentrate nutrients in the shallows, fueling mats of toxic algae along the very beaches that swimmers prize.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "paradox:",
      "paradox,",
      "paradox",
      "paradox; while"
    ],
    "answer": 0,
    "explanation": "A colon after the independent clause \"Lake managers...face a stubborn paradox\" correctly introduces the explanation of that paradox. The comma creates a comma splice between two independent clauses, and omitting punctuation fuses them; \"paradox; while\" is wrong because the semicolon would then be followed by a subordinate clause fragment rather than an independent clause.",
    "hints": [
      "Check whether the words before the blank form a complete sentence and whether what follows explains them.",
      "An independent clause followed by an elaboration of \"the paradox\" calls for an introducing mark, not a mere comma.",
      "A colon can sit after a complete statement to announce the explanation; a semicolon plus \"while\" would strand a fragment."
    ]
  },
  {
    "id": "rw-conv-x4",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 2,
    "passage": "More than two kilometers below the ocean surface, hydrothermal ______ sustain dense colonies of tube worms, clams, and blind shrimp. Because sunlight never reaches these depths, the entire food web depends on bacteria that convert dissolved chemicals into usable energy.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "vents—fissures in the seafloor that spew scalding, mineral-rich water—",
      "vents—fissures in the seafloor that spew scalding, mineral-rich water,",
      "vents, fissures in the seafloor that spew scalding, mineral-rich water—",
      "vents—fissures in the seafloor that spew scalding, mineral-rich water"
    ],
    "answer": 0,
    "explanation": "The supplementary definition of the vents is opened with a dash, so it must also be closed with a dash before the verb \"sustain.\" The most tempting distractor swaps in a comma at the close, but punctuation marks framing a single nonessential element must match; the final option never closes the interruption at all, running the definition into the main verb.",
    "hints": [
      "The material between the blank's punctuation marks defines \"vents\" and interrupts the main clause.",
      "Whatever mark opens an interrupting definition must be the same mark that closes it.",
      "Find the choice whose paired punctuation seals the definition off completely before the sentence's verb \"sustain.\""
    ]
  },
  {
    "id": "rw-conv-x5",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 2,
    "passage": "After its debut in Seoul, the retrospective of photographer Seo Yun-ji's forty-year career will travel to three additional cities: Toronto, ______ Lagos, Nigeria; and Mumbai, India. Organizers expect the tour, the artist's first outside East Asia, to continue through 2028.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "Canada;",
      "Canada,",
      "Canada",
      "Canada; and"
    ],
    "answer": 0,
    "explanation": "Because each item in this list already contains an internal comma (city, country), the items themselves must be separated by semicolons, so \"Canada;\" matches the pattern of \"Nigeria;\" later in the list. The comma is the tempting choice, but it would make \"Canada\" and \"Lagos\" look like separate list items; \"Canada; and\" wrongly inserts a conjunction before the second of three items.",
    "hints": [
      "Notice how the other items in this list of cities are punctuated.",
      "When list items contain commas inside them, a stronger mark must divide item from item.",
      "Match the semicolon pattern used after \"Nigeria,\" and save \"and\" for the final item only."
    ]
  },
  {
    "id": "rw-conv-x6",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 3,
    "passage": "The harbor ledger, though scorched along its edges and, in places, blurred by ______ one of the few surviving records of the port's eighteenth-century shipping traffic, and historians have relied on it to reconstruct trade routes once thought lost entirely.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "floodwater, remains",
      "floodwater remains",
      "floodwater; remains",
      "floodwater, remaining"
    ],
    "answer": 0,
    "explanation": "The concessive interrupter beginning \"though scorched\" was opened with a comma after \"ledger,\" so a comma must close it before the main verb \"remains.\" The most tempting distractor, \"floodwater, remaining,\" closes the interrupter correctly but converts the only main verb into a participle, leaving the first half of the sentence without a predicate; the semicolon illegally separates the subject from its verb, and the bare \"floodwater remains\" never closes the interrupter.",
    "hints": [
      "Strip out the material between the commas: the core sentence is \"The harbor ledger ... one of the few surviving records.\"",
      "That core still needs a finite main verb, and the interrupter that opened after \"ledger\" must be closed first.",
      "Choose the option that both seals the \"though...\" phrase with a comma and supplies a conjugated verb, not an -ing form."
    ]
  },
  {
    "id": "rw-conv-x7",
    "section": "rw",
    "domain": "conv",
    "skill": "Punctuation & Boundaries",
    "diff": 3,
    "passage": "When the Elk Hollow Dam began operating in 1964, it trapped nearly all of the river's ______ the marshes downstream of the silt that had replenished them each spring. Within two decades, surveyors could measure how far the delta's edge had retreated.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "sediment, starving",
      "sediment; starving",
      "sediment, it starved",
      "sediment and starving"
    ],
    "answer": 0,
    "explanation": "A comma followed by the participial phrase \"starving the marshes...\" correctly attaches a modifier describing the result of the trapping. The most tempting distractor, \"sediment, it starved,\" creates a comma splice by joining two independent clauses with only a comma; the semicolon leaves a fragment on its right side, and \"and starving\" breaks parallelism by coordinating the finite verb \"trapped\" with a participle.",
    "hints": [
      "Decide what the words after the blank are doing: describing a consequence, or starting a new sentence?",
      "\"Starving the marshes...\" has no subject of its own, so it cannot stand after a semicolon or pair with \"and\" against \"trapped.\"",
      "A comma plus an -ing phrase can hang a result modifier on the clause; adding a new subject like \"it\" would demand stronger punctuation."
    ]
  },
  {
    "id": "rw-conv-x8",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 1,
    "passage": "At the farm's weekly tasting table, visitors quickly learn that the flavor of heirloom tomatoes ______ as much on soil chemistry and watering schedule as on the variety itself, which is why the growers keep detailed notes on every raised bed.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "depends",
      "depend",
      "are depending",
      "have depended"
    ],
    "answer": 0,
    "explanation": "The subject of the clause is the singular noun \"flavor,\" so the singular verb \"depends\" is required. The tempting distractor \"depend\" agrees with \"tomatoes,\" but that plural noun is only the object of the preposition \"of,\" not the subject; the remaining options are plural forms as well.",
    "hints": [
      "Find the true subject of the verb in the \"that\" clause.",
      "\"Of heirloom tomatoes\" is a prepositional phrase—cross it out before matching the verb.",
      "What actually does the depending is the singular \"flavor,\" so pick the verb form that matches a singular subject."
    ]
  },
  {
    "id": "rw-conv-x9",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 1,
    "passage": "In the final act of the touring production, the dancers ______ masks carved from red cedar, each one painted to represent a different river spirit from the stories the choreographer heard as a child.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "wear",
      "wears",
      "is wearing",
      "has worn"
    ],
    "answer": 0,
    "explanation": "The plural subject \"dancers\" requires the plural verb \"wear.\" The tempting distractor \"wears\" is singular, as are \"is wearing\" and \"has worn\"; the singular phrase \"the final act\" earlier in the sentence is part of an introductory prepositional phrase, not the subject.",
    "hints": [
      "Locate the subject that performs the action at the blank.",
      "Ignore the opening phrase about the final act—it only sets the scene.",
      "\"The dancers\" is plural, so the verb must be the form that goes with a plural subject."
    ]
  },
  {
    "id": "rw-conv-x10",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 2,
    "passage": "Beneath the streets of the old commercial district ______ a network of pneumatic tubes that, a century ago, shot canisters of mail between post offices at thirty miles per hour. City engineers rediscovered the system during subway repairs in 2021.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "lies",
      "lie",
      "are lying",
      "have lain"
    ],
    "answer": 0,
    "explanation": "The sentence is inverted: the subject, the singular \"a network,\" follows the verb, so the singular \"lies\" is correct. The tempting distractor \"lie\" agrees with the nearby plurals \"streets\" or \"tubes,\" but \"streets\" sits inside the opening prepositional phrase and \"tubes\" inside the phrase \"of pneumatic tubes,\" so neither is the subject.",
    "hints": [
      "This sentence puts the subject after the verb—find what actually exists beneath the streets.",
      "Neither \"streets\" nor \"tubes\" is the subject; both are objects of prepositions.",
      "The subject is the singular \"a network,\" so choose the singular verb form."
    ]
  },
  {
    "id": "rw-conv-x11",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 2,
    "passage": "The novelist, along with the two translators who rendered her trilogy into English and Portuguese, ______ expected to appear at the festival's closing panel, a discussion of how much a translator should reshape an author's sentences.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "is",
      "are",
      "were",
      "have been"
    ],
    "answer": 0,
    "explanation": "The subject is the singular \"novelist\"; the phrase \"along with the two translators...\" is a modifier, not part of a compound subject, so the singular \"is\" is correct. The tempting distractor \"are\" treats \"along with\" as if it worked like \"and,\" but only \"and\" creates a plural compound subject; \"were\" and \"have been\" are likewise plural.",
    "hints": [
      "Ask whether \"along with the two translators\" changes the number of the subject.",
      "Unlike \"and,\" phrases such as \"along with\" leave the original subject singular.",
      "Match the verb to \"the novelist\" alone and keep it in the present."
    ]
  },
  {
    "id": "rw-conv-x12",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 2,
    "passage": "The research station runs on a patchwork of power sources, but during the darkest weeks of winter, neither the wind turbines nor the backup generator ______ enough electricity to keep every instrument running, so the technicians ration power each night.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "produces",
      "produce",
      "were producing",
      "have produced"
    ],
    "answer": 0,
    "explanation": "With a \"neither...nor\" subject, the verb agrees with the part closer to it—here the singular \"backup generator\"—so \"produces\" is correct. The tempting distractor \"produce\" agrees with the farther, plural \"wind turbines\"; \"were producing\" and \"have produced\" are both plural and also drift from the sentence's present-tense frame.",
    "hints": [
      "The subject is a \"neither...nor\" pair—recall which half controls the verb.",
      "The verb takes its number from the noun nearest to it, not from the first item.",
      "\"The backup generator\" is singular and sits right before the blank, so choose the singular present-tense verb."
    ]
  },
  {
    "id": "rw-conv-x13",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 3,
    "passage": "The number of community seed libraries in the valley, which lend gardeners heirloom bean, squash, and pepper varieties every spring, ______ tripled since 2019—growth that local agronomists attribute to rising grocery prices and renewed interest in home canning.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "has",
      "have",
      "having",
      "are"
    ],
    "answer": 0,
    "explanation": "The subject is the singular phrase \"The number,\" which always takes a singular verb, so \"has tripled\" is correct. The tempting distractor \"have\" agrees with the nearby plurals \"libraries\" and \"varieties,\" but those sit inside a prepositional phrase and a relative clause; \"having\" leaves the sentence without a finite verb, and \"are tripled\" is both plural and the wrong construction.",
    "hints": [
      "Peel away the \"which lend...\" clause and the prepositional phrases to find the bare subject.",
      "The subject is \"The number,\" and \"the number of X\" is grammatically singular even when X is plural.",
      "You need a singular helping verb that pairs with \"tripled\" to form a complete, finite verb."
    ]
  },
  {
    "id": "rw-conv-x14",
    "section": "rw",
    "domain": "conv",
    "skill": "Subject-Verb Agreement",
    "diff": 3,
    "passage": "Cataloging the wreck's scattered artifacts—storage jars, silver coins, carpenters' tools, and bronze fittings from the rigging—______ years of patient conservation work, since each object must be desalinated slowly to keep it from crumbling once it dries.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "requires",
      "require",
      "are requiring",
      "have required"
    ],
    "answer": 0,
    "explanation": "The subject is the gerund phrase \"Cataloging the wreck's scattered artifacts,\" and a gerund subject is singular, so \"requires\" is correct. The tempting distractor \"require\" agrees with the plural nouns in the dash-enclosed list, but that list merely itemizes \"artifacts\" inside the subject phrase; the activity of cataloging, taken as a whole, is one thing.",
    "hints": [
      "Ask what requires years of work: the objects themselves, or the activity named at the start of the sentence?",
      "The material between the dashes is an inserted list—set it aside when matching the verb.",
      "An -ing phrase acting as a subject counts as singular, so pick the verb that fits a singular subject."
    ]
  },
  {
    "id": "rw-conv-x15",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 1,
    "passage": "In 1911, engineer Beatriz Salcedo surveyed the gorge, drafted plans for a funicular railway, and ______ its construction—a project that would carry quarry stone down to the harbor for the next fifty years.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "supervised",
      "supervises",
      "will supervise",
      "is supervising"
    ],
    "answer": 0,
    "explanation": "The blank is the third verb in a series with \"surveyed\" and \"drafted,\" both simple past, so the parallel past form \"supervised\" is required. The tempting distractor \"supervises\" shifts to the present even though the date 1911 and the other verbs fix the events in the past; the remaining options shift to future and present progressive forms.",
    "hints": [
      "Look at the other verbs in the list of things Salcedo did.",
      "\"Surveyed\" and \"drafted\" set the tense, and 1911 confirms it.",
      "The third action in the series should match the simple past form of the first two."
    ]
  },
  {
    "id": "rw-conv-x16",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 1,
    "passage": "When volunteers arrive to restore a section of tallgrass prairie, ______ begin by cutting back invasive honeysuckle, since the shrub leafs out early in spring and shades native seedlings before summer growth can start.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "they",
      "it",
      "one",
      "he or she"
    ],
    "answer": 0,
    "explanation": "The pronoun refers to the plural noun \"volunteers,\" so the plural \"they\" is correct. The tempting distractor \"one\" introduces an inconsistent generic pronoun with no antecedent in the sentence, while \"it\" and \"he or she\" are singular and cannot refer to the plural \"volunteers.\"",
    "hints": [
      "Find the noun in the first clause that the pronoun stands in for.",
      "\"Volunteers\" is plural, so the pronoun must be plural too.",
      "Neither a singular pronoun nor a generic \"one\" can pick up the plural antecedent here."
    ]
  },
  {
    "id": "rw-conv-x17",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 2,
    "passage": "Since 2015, the marine lab ______ thousands of nursery-raised coral fragments onto damaged sections of the reef, and divers now report that some of the outplanted colonies are beginning to spawn on their own.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "has transplanted",
      "transplanted",
      "had transplanted",
      "transplants"
    ],
    "answer": 0,
    "explanation": "The phrase \"Since 2015\" marks an action that began in the past and continues to the present, which calls for the present perfect \"has transplanted.\" The tempting simple past \"transplanted\" treats the work as finished, clashing with \"since\" and with the present-tense report that colonies \"are beginning to spawn\"; \"had transplanted\" needs a later past reference point, and \"transplants\" ignores the 2015 starting point.",
    "hints": [
      "Pay attention to the time frame that \"Since 2015\" establishes.",
      "The action started in the past and is still relevant now—divers report results in the present.",
      "An ongoing span from a past date to the present takes the present perfect with \"has.\""
    ]
  },
  {
    "id": "rw-conv-x18",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 2,
    "passage": "A city that replaces conventional asphalt with permeable pavement can cut ______ stormwater runoff nearly in half, because rain filters down through the porous surface into gravel beds instead of rushing straight into storm drains.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "its",
      "their",
      "it's",
      "our"
    ],
    "answer": 0,
    "explanation": "The antecedent is the singular noun \"A city,\" so the singular possessive \"its\" is correct. The tempting distractor \"their\" treats the city as plural, a common error with collective-sounding nouns; \"it's\" is the contraction of \"it is,\" not a possessive, and \"our\" has no first-person antecedent in the text.",
    "hints": [
      "The pronoun shows whose runoff is being cut—find that noun.",
      "\"A city\" is grammatically singular, even though many people live there.",
      "You need the possessive form of \"it,\" the one written without an apostrophe."
    ]
  },
  {
    "id": "rw-conv-x19",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 3,
    "passage": "By the time the five-month shorebird survey ended in August, the team ______ more than four hundred active nests along the barrier islands—a figure that, the researchers cautioned, probably still undercounted colonies on the least accessible spits of sand.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "had documented",
      "has documented",
      "documented",
      "will have documented"
    ],
    "answer": 0,
    "explanation": "The phrase \"By the time the survey ended\" sets a completed past reference point, and the documenting was finished before that point, so the past perfect \"had documented\" is required. The tempting simple past \"documented\" fails to signal that the counting was already complete by the survey's end; \"has documented\" clashes with the past reference point, and \"will have documented\" wrongly projects into the future.",
    "hints": [
      "Notice the time marker \"By the time the survey ended\"—it names a moment in the past.",
      "The nest counting was completed before that past moment, so you need a tense that shows action finished before another past action.",
      "That relationship—past before past—is expressed with \"had\" plus the past participle."
    ]
  },
  {
    "id": "rw-conv-x20",
    "section": "rw",
    "domain": "conv",
    "skill": "Verb Forms & Pronouns",
    "diff": 3,
    "passage": "On the festival's closing night, every one of the two thousand paper lanterns set adrift on the river carries ______ own small candle, and spectators crowd the banks to watch the glowing flotilla scatter and dim as it drifts downstream.",
    "stem": "Which choice completes the text so that it conforms to the conventions of Standard English?",
    "choices": [
      "its",
      "their",
      "it's",
      "they're"
    ],
    "answer": 0,
    "explanation": "The antecedent is \"every one,\" a singular pronoun, so the singular possessive \"its\" is correct; the singular verb \"carries\" confirms this. The tempting distractor \"their\" agrees with the nearby plural \"lanterns,\" but that noun sits inside the phrase \"of the two thousand paper lanterns\" and is not the antecedent; \"it's\" and \"they're\" are contractions, not possessives.",
    "hints": [
      "The pronoun's antecedent is the subject of \"carries\"—identify it precisely.",
      "\"Every one\" is singular, even though it is followed by \"of the two thousand paper lanterns.\"",
      "The verb \"carries\" already treats the subject as singular, so the possessive pronoun must be singular too—and written without an apostrophe."
    ]
  },
  {
    "id": "m-alg-x1",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 1,
    "stem": "If 5(x - 2) = 35, what is the value of x?",
    "choices": [
      "9",
      "7",
      "5",
      "45"
    ],
    "answer": 0,
    "explanation": "Distributing gives 5x - 10 = 35, so 5x = 45 and x = 9. The tempting answer 7 comes from dividing 35 by 5 while ignoring the -2 inside the parentheses; 45 stops one step short at 5x = 45, and 5 subtracts 2 from 7 instead of adding it.",
    "hints": [
      "Start by dealing with the parentheses: either distribute the 5 or divide both sides by 5.",
      "Dividing both sides by 5 gives x - 2 = 7.",
      "Add 2 to both sides of x - 2 = 7 to isolate x."
    ]
  },
  {
    "id": "m-alg-x2",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 1,
    "stem": "If 3y - 8 = 7, what is the value of y?",
    "choices": [
      "5",
      "15",
      "45",
      "-1/3"
    ],
    "answer": 0,
    "explanation": "Adding 8 to both sides gives 3y = 15, so y = 5. The tempting answer 15 stops one step short at 3y = 15; 45 multiplies 15 by 3 instead of dividing, and -1/3 comes from subtracting 8 from 7 instead of adding it.",
    "hints": [
      "Isolate the term with y first by undoing the subtraction.",
      "Adding 8 to both sides gives 3y = 15.",
      "Divide both sides of 3y = 15 by 3."
    ]
  },
  {
    "id": "m-alg-x3",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 1,
    "type": "spr",
    "stem": "If 2(w + 6) = 22, what is the value of w?",
    "answer": "5",
    "accept": [
      "5"
    ],
    "explanation": "Divide both sides by 2 to get w + 6 = 11, then subtract 6 to get w = 5. Equivalently, distribute to get 2w + 12 = 22, so 2w = 10 and w = 5.",
    "hints": [
      "Both sides are divisible by 2, which removes the parentheses cleanly.",
      "Dividing by 2 gives w + 6 = 11.",
      "Subtract 6 from both sides of w + 6 = 11."
    ]
  },
  {
    "id": "m-alg-x4",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 2,
    "stem": "If (2x + 3)/5 = x - 3, what is the value of x?",
    "choices": [
      "6",
      "2",
      "-6",
      "18"
    ],
    "answer": 0,
    "explanation": "Multiplying both sides by 5 gives 2x + 3 = 5x - 15, so 18 = 3x and x = 6. The tempting answer 2 comes from multiplying only the x on the right by 5 (getting 5x - 3); -6 results from a sign slip when collecting terms, and 18 stops one step short at 3x = 18.",
    "hints": [
      "Clear the fraction by multiplying every term on both sides by 5.",
      "That gives 2x + 3 = 5x - 15; remember the 5 multiplies the entire right side, including the -3.",
      "Collect terms to get 18 = 3x, then divide by 3."
    ]
  },
  {
    "id": "m-alg-x5",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 2,
    "passage": "A storage tank holds 84 liters of water and drains at a constant rate of 3.5 liters per minute. The equation 84 - 3.5t = 49 models the situation, where t is the time in minutes after draining begins.",
    "stem": "After how many minutes will the tank contain exactly 49 liters of water?",
    "choices": [
      "10",
      "14",
      "24",
      "38"
    ],
    "answer": 0,
    "explanation": "Subtracting 84 from both sides gives -3.5t = -35, so t = 10. The tempting answer 24 comes from dividing 84 by 3.5, which finds the time to empty the tank completely; 14 divides 49 by 3.5, and 38 adds 84 and 49 before dividing instead of subtracting.",
    "hints": [
      "The equation asks when the remaining water, 84 - 3.5t, equals 49.",
      "Move the constant: 3.5t must equal 84 - 49.",
      "Compute 35 divided by 3.5."
    ]
  },
  {
    "id": "m-alg-x6",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 2,
    "stem": "If 4(x - 3) - 2(x - 5) = 8, what is the value of x?",
    "choices": [
      "5",
      "15",
      "8",
      "-7"
    ],
    "answer": 0,
    "explanation": "Distributing gives 4x - 12 - 2x + 10 = 8, which simplifies to 2x - 2 = 8, so x = 5. The tempting answer 15 comes from writing -2(x - 5) as -2x - 10 instead of -2x + 10; 8 distributes only to the x terms, and -7 flips the sign on the -12.",
    "hints": [
      "Distribute both the 4 and the -2 carefully before combining terms.",
      "Note that -2(x - 5) = -2x + 10, with a plus sign on the 10.",
      "The equation simplifies to 2x - 2 = 8; solve from there."
    ]
  },
  {
    "id": "m-alg-x7",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Equations",
    "diff": 3,
    "stem": "If 3(x + 2) - 4 = 5(x + 2) + 10, what is the value of x?",
    "choices": [
      "-9",
      "-7",
      "9",
      "-5"
    ],
    "answer": 0,
    "explanation": "Letting u = x + 2 gives 3u - 4 = 5u + 10, so -14 = 2u and u = -7; then x = u - 2 = -9. The tempting answer -7 is the value of x + 2, not of x itself, a one-step-short error; -5 adds 2 to -7 instead of subtracting, and 9 results from a sign slip when collecting terms.",
    "hints": [
      "The expression x + 2 appears on both sides; treat it as a single unknown.",
      "Solving 3u - 4 = 5u + 10 gives u = -7, where u = x + 2.",
      "You have x + 2 = -7, so subtract 2 from both sides."
    ]
  },
  {
    "id": "m-alg-x8",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 1,
    "passage": "x + y = 10\nx - y = 4",
    "stem": "If (x, y) is the solution to the system of equations above, what is the value of x?",
    "choices": [
      "7",
      "3",
      "14",
      "6"
    ],
    "answer": 0,
    "explanation": "Adding the two equations eliminates y: 2x = 14, so x = 7. The tempting answer 3 is the value of y, not x; 14 stops one step short at 2x = 14, and 6 subtracts the two right-hand sides without dividing correctly.",
    "hints": [
      "Look for a way to eliminate one variable by combining the equations.",
      "Adding the equations makes the y terms cancel.",
      "Adding gives 2x = 14; finish by dividing."
    ]
  },
  {
    "id": "m-alg-x9",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 2,
    "type": "spr",
    "passage": "a = 2b - 1\n3a + 2b = 21",
    "stem": "If (a, b) is the solution to the system of equations above, what is the value of b?",
    "answer": "3",
    "accept": [
      "3"
    ],
    "explanation": "Substituting a = 2b - 1 into the second equation gives 3(2b - 1) + 2b = 21, so 6b - 3 + 2b = 21. Then 8b = 24, so b = 3. (Checking: a = 2(3) - 1 = 5, and 3(5) + 2(3) = 21.)",
    "hints": [
      "The first equation already gives a in terms of b, so substitution is fastest.",
      "Replace a in the second equation to get 3(2b - 1) + 2b = 21.",
      "Simplify to 8b - 3 = 21 and solve for b."
    ]
  },
  {
    "id": "m-alg-x10",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 1,
    "stem": "Which ordered pair (x, y) satisfies both y = 2x and x + y = 12?",
    "choices": [
      "(4, 8)",
      "(8, 4)",
      "(6, 6)",
      "(3, 6)"
    ],
    "answer": 0,
    "explanation": "Substituting y = 2x into x + y = 12 gives 3x = 12, so x = 4 and y = 8. The tempting answer (8, 4) reverses the coordinates and fails y = 2x; (6, 6) satisfies only the sum equation, and (3, 6) satisfies only y = 2x.",
    "hints": [
      "The solution must make both equations true, not just one.",
      "Substitute 2x for y in the second equation.",
      "That gives 3x = 12; find x, then double it for y."
    ]
  },
  {
    "id": "m-alg-x11",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 2,
    "passage": "2x + 5y = 24\n2x + y = 8",
    "stem": "If (x, y) is the solution to the system of equations above, what is the value of x?",
    "choices": [
      "2",
      "4",
      "6",
      "16"
    ],
    "answer": 0,
    "explanation": "Subtracting the second equation from the first eliminates x: 4y = 16, so y = 4; then 2x + 4 = 8 gives x = 2. The tempting answer 4 is the value of y, not x; 16 is the intermediate value 4y, and 6 is x + y rather than x.",
    "hints": [
      "Both equations have the same x term, so subtracting one from the other eliminates x.",
      "The subtraction gives 4y = 16, so find y first.",
      "Substitute y = 4 back into 2x + y = 8."
    ]
  },
  {
    "id": "m-alg-x12",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 2,
    "passage": "A community theater sold 30 tickets to a play for a total of $230. Adult tickets cost $9 each, and student tickets cost $5 each.",
    "stem": "How many adult tickets did the theater sell?",
    "choices": [
      "20",
      "10",
      "15",
      "30"
    ],
    "answer": 0,
    "explanation": "With a adult and s student tickets, a + s = 30 and 9a + 5s = 230. Substituting s = 30 - a gives 9a + 150 - 5a = 230, so 4a = 80 and a = 20. The tempting answer 10 is the number of student tickets (or the result of swapping the two prices); 15 assumes an equal split, and 30 is the total number of tickets, not the adult count.",
    "hints": [
      "Set up two equations: one for the number of tickets and one for the money collected.",
      "If a is the adult count, the student count is 30 - a; put that into 9a + 5s = 230.",
      "That simplifies to 4a + 150 = 230; solve for a."
    ]
  },
  {
    "id": "m-alg-x13",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 3,
    "type": "spr",
    "passage": "5x - 2y = 16\n3x + 4y = 7",
    "stem": "If (x, y) is the solution to the system of equations above, what is the value of x - y?",
    "answer": "7/2",
    "accept": [
      "7/2",
      "3.5"
    ],
    "explanation": "Multiplying the first equation by 2 gives 10x - 4y = 32; adding the second equation eliminates y, giving 13x = 39, so x = 3. Then 5(3) - 2y = 16 gives -2y = 1, so y = -1/2. Therefore x - y = 3 - (-1/2) = 7/2, which can be entered as 7/2 or 3.5.",
    "hints": [
      "Multiply the first equation by 2 so the y terms become opposites.",
      "Adding the scaled first equation to the second gives 13x = 39.",
      "With x = 3, find y from either equation; watch the sign, since y is negative and x - y means subtracting a negative."
    ]
  },
  {
    "id": "m-alg-x14",
    "section": "math",
    "domain": "alg",
    "skill": "Systems of Equations",
    "diff": 3,
    "passage": "3x + y = 15\nx + 3y = 9",
    "stem": "If (x, y) satisfies the system of equations above, what is the average (arithmetic mean) of x and y?",
    "choices": [
      "3",
      "6",
      "12",
      "24"
    ],
    "answer": 0,
    "explanation": "Adding the two equations gives 4x + 4y = 24, so x + y = 6 and the mean is 6/2 = 3. The tempting answer 6 is the sum x + y, one step short of the mean; 12 averages the constants 15 and 9, and 24 is the total of the right-hand sides.",
    "hints": [
      "You do not need x and y separately; look for a shortcut to x + y.",
      "Add the two equations and notice both variables get the same coefficient.",
      "From 4x + 4y = 24, find x + y, then divide by 2 for the average."
    ]
  },
  {
    "id": "m-alg-x15",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 1,
    "stem": "What is the slope of the line in the xy-plane given by 4x + 2y = 10?",
    "choices": [
      "-2",
      "2",
      "-4",
      "5"
    ],
    "answer": 0,
    "explanation": "Solving for y gives y = -2x + 5, so the slope is -2. The tempting answer 2 drops the negative sign when moving 4x to the other side; -4 forgets to divide by 2, and 5 is the y-intercept, a swapped slope/intercept error.",
    "hints": [
      "Rewrite the equation in the form y = mx + b.",
      "Subtract 4x from both sides, then divide everything by 2.",
      "In y = -2x + 5, the slope is the coefficient of x."
    ]
  },
  {
    "id": "m-alg-x16",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 2,
    "type": "spr",
    "passage": "The height of a seedling is a linear function of time. When it was planted (week 0), the seedling was 3 centimeters tall, and at week 4 it was 11 centimeters tall.",
    "stem": "According to this model, what will the seedling's height be, in centimeters, at week 7?",
    "answer": "17",
    "accept": [
      "17"
    ],
    "explanation": "The growth rate is (11 - 3)/(4 - 0) = 2 centimeters per week, so the height function is h(w) = 2w + 3. At week 7, h(7) = 2(7) + 3 = 17 centimeters.",
    "hints": [
      "A linear model has a constant rate of change; find it from the two data points.",
      "The seedling grows 8 cm in 4 weeks, so find the growth per week.",
      "Start from 3 cm and add 2 cm for each of the 7 weeks."
    ]
  },
  {
    "id": "m-alg-x17",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 2,
    "passage": "The function V(t) = 12,000 - 900t models the value, in dollars, of a piece of factory equipment t years after it was purchased.",
    "stem": "Which of the following is the best interpretation of the number 900 in this context?",
    "choices": [
      "The equipment's value decreases by $900 each year.",
      "The equipment loses a total of $900 in value over its lifetime.",
      "The equipment was worth $900 when it was purchased.",
      "The equipment's value decreases by $12,000 each year."
    ],
    "answer": 0,
    "explanation": "In V(t) = 12,000 - 900t, the coefficient of t is the rate of change, so the value drops $900 per year. The tempting interpretation that the equipment loses $900 total misreads a yearly rate as a one-time change; the purchase price is 12,000, the constant term, so the choice calling $900 the initial value swaps slope and intercept.",
    "hints": [
      "Identify which number is the initial value and which is the rate of change.",
      "The 12,000 is the value at t = 0; the 900 is multiplied by the number of years.",
      "A coefficient of t tells how much V changes for each one-year increase in t."
    ]
  },
  {
    "id": "m-alg-x18",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 3,
    "passage": "In the xy-plane, line p passes through the points (-2, 4) and (1, -5). Line q is perpendicular to line p and passes through the point (6, 1).",
    "stem": "What is the y-coordinate of the y-intercept of line q?",
    "choices": [
      "-1",
      "3",
      "19",
      "1"
    ],
    "answer": 0,
    "explanation": "Line p has slope (-5 - 4)/(1 - (-2)) = -3, so the perpendicular line q has slope 1/3. Using y = (1/3)x + b with (6, 1) gives 1 = 2 + b, so b = -1. The tempting answer 19 uses line p's slope of -3 instead of the negative reciprocal; 3 uses -1/3 (taking the reciprocal but flipping the sign twice), and 1 mistakes the given point's y-coordinate for the intercept.",
    "hints": [
      "First compute the slope of line p from its two points.",
      "Perpendicular lines have slopes that are negative reciprocals, so q's slope is 1/3.",
      "Substitute (6, 1) into y = (1/3)x + b and solve for b."
    ]
  },
  {
    "id": "m-alg-x19",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 3,
    "type": "spr",
    "passage": "For the linear function g, g(1) = 8 and g(4) = -1.",
    "stem": "For what value of x does g(x) = 0?",
    "answer": "11/3",
    "accept": [
      "11/3",
      "3.666",
      "3.667"
    ],
    "explanation": "The slope is (-1 - 8)/(4 - 1) = -3, so g(x) = -3x + b. Since g(1) = 8, we get 8 = -3 + b, so b = 11 and g(x) = -3x + 11. Setting -3x + 11 = 0 gives x = 11/3, which can be entered as 11/3, 3.666, or 3.667.",
    "hints": [
      "Find the slope of g from the two given values.",
      "The slope is -3; use g(1) = 8 to find the constant term, giving g(x) = -3x + 11.",
      "Set -3x + 11 equal to 0 and solve; the answer is a fraction."
    ]
  },
  {
    "id": "m-alg-x20",
    "section": "math",
    "domain": "alg",
    "skill": "Linear Functions & Graphs",
    "diff": 3,
    "passage": "The function f is defined by f(x) = cx + d, where c and d are constants. It is given that f(3) - f(1) = 12 and f(2) = 5.",
    "stem": "What is the value of f(0)?",
    "choices": [
      "-7",
      "6",
      "-19",
      "17"
    ],
    "answer": 0,
    "explanation": "Since f(3) - f(1) = c(3 - 1) = 2c = 12, the slope is c = 6. Then f(2) = 12 + d = 5 gives d = -7, and f(0) = d = -7. The tempting answer 6 is the slope c rather than f(0); -19 treats the difference 12 as the slope itself (c = 12), and 17 adds 12 and 5 instead of solving.",
    "hints": [
      "For a linear function, f(3) - f(1) equals the slope times the change in x.",
      "From 2c = 12, the slope is 6; use f(2) = 5 to find d.",
      "f(0) is just the constant d, and 6(2) + d = 5."
    ]
  },
  {
    "id": "m-adv-x1",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 1,
    "stem": "What are the solutions to the equation x^2 + 4x - 21 = 0?",
    "choices": [
      "x = -7 and x = 3",
      "x = 7 and x = -3",
      "x = -7 and x = -3",
      "x = 7 and x = 3"
    ],
    "answer": 0,
    "explanation": "Factoring gives (x + 7)(x - 3) = 0, so x = -7 or x = 3; the factors have product -21 and sum +4. The tempting choice x = 7 and x = -3 comes from reading the solutions directly off the factor signs without flipping them when setting each factor equal to zero.",
    "hints": [
      "Look for two numbers whose product is -21 and whose sum is +4.",
      "The numbers 7 and -3 work, so the equation factors as (x + 7)(x - 3) = 0.",
      "Set each factor equal to zero; a factor (x + 7) gives a solution with the opposite sign of +7."
    ]
  },
  {
    "id": "m-adv-x2",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 1,
    "stem": "The function f is defined by f(x) = (x - 4)^2 + 5. What is the vertex of the graph of f in the xy-plane?",
    "choices": [
      "(4, 5)",
      "(-4, 5)",
      "(4, -5)",
      "(5, 4)"
    ],
    "answer": 0,
    "explanation": "In vertex form f(x) = (x - h)^2 + k, the vertex is (h, k), so here the vertex is (4, 5). The choice (-4, 5) results from the classic sign slip of reading h as -4 instead of +4 because the form subtracts h inside the parentheses.",
    "hints": [
      "Recall that vertex form is f(x) = (x - h)^2 + k with vertex (h, k).",
      "Match (x - 4)^2 + 5 to (x - h)^2 + k to identify h and k.",
      "Since the form is x MINUS h, the expression (x - 4) means h is positive 4, and k is the constant added outside."
    ]
  },
  {
    "id": "m-adv-x3",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 2,
    "stem": "The function f is defined by f(x) = 2(x - 3)(x + 5). What is the minimum value of f?",
    "choices": [
      "-32",
      "32",
      "-1",
      "-16"
    ],
    "answer": 0,
    "explanation": "The zeros are x = 3 and x = -5, so by symmetry the vertex is at x = (3 + (-5))/2 = -1, and f(-1) = 2(-4)(4) = -32. The choice -1 is the x-coordinate of the vertex, a one-step-short answer, not the minimum value of the function; -16 comes from dropping the leading coefficient 2.",
    "hints": [
      "The minimum of an upward-opening parabola occurs at the vertex, midway between the zeros.",
      "The zeros are x = 3 and x = -5, so the axis of symmetry is x = -1.",
      "Substitute x = -1 into f, keeping the factor of 2: f(-1) = 2(-1 - 3)(-1 + 5)."
    ]
  },
  {
    "id": "m-adv-x4",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 2,
    "type": "spr",
    "passage": "In the xy-plane, the graph of y = x^2 - 2x - 8 crosses the x-axis at the points (a, 0) and (b, 0), where a > b.",
    "stem": "What is the value of a - b?",
    "answer": "6",
    "accept": [
      "6"
    ],
    "explanation": "Setting x^2 - 2x - 8 = 0 and factoring gives (x - 4)(x + 2) = 0, so the x-intercepts are x = 4 and x = -2. Since a > b, a = 4 and b = -2, so a - b = 4 - (-2) = 6.",
    "hints": [
      "The x-intercepts occur where y = 0, so solve x^2 - 2x - 8 = 0.",
      "Factor: find two numbers with product -8 and sum -2, giving (x - 4)(x + 2) = 0.",
      "With a = 4 and b = -2, compute a - b carefully; subtracting a negative adds."
    ]
  },
  {
    "id": "m-adv-x5",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 3,
    "stem": "The equation x^2 - 4x + c = 0, where c is a constant, has two distinct real solutions, and both solutions are positive. Which of the following could be the value of c?",
    "choices": [
      "3",
      "-2",
      "4",
      "5"
    ],
    "answer": 0,
    "explanation": "Two distinct real solutions require the discriminant 16 - 4c > 0, so c < 4; both solutions positive requires their product c > 0 (the sum, 4, is already positive). Only c = 3 satisfies 0 < c < 4. The tempting choice c = -2 keeps the discriminant positive but makes the product of the roots negative, so one root would be negative; c = 4 gives one repeated root, not two distinct ones.",
    "hints": [
      "Combine two conditions: the discriminant must be positive, and both roots must be positive.",
      "The discriminant 16 - 4c > 0 forces c < 4; check what the product of the roots tells you about the sign of c.",
      "By Vieta's formulas the product of the roots equals c, so you need c > 0 and c < 4 simultaneously."
    ]
  },
  {
    "id": "m-adv-x6",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 3,
    "type": "spr",
    "passage": "In the xy-plane, the line y = 2x + b, where b is a constant, intersects the parabola y = x^2 at exactly one point.",
    "stem": "What is the value of b?",
    "answer": "-1",
    "accept": [
      "-1"
    ],
    "explanation": "Setting x^2 = 2x + b gives x^2 - 2x - b = 0. Exactly one intersection point means this quadratic has exactly one solution, so its discriminant is zero: (-2)^2 - 4(1)(-b) = 4 + 4b = 0, which gives b = -1. (The line y = 2x - 1 is tangent to the parabola at (1, 1).)",
    "hints": [
      "Set the two expressions for y equal to each other to form one quadratic equation.",
      "Exactly one intersection point means the quadratic x^2 - 2x - b = 0 has exactly one solution.",
      "Set the discriminant equal to zero: 4 + 4b = 0, then solve for b, watching the sign of the constant term."
    ]
  },
  {
    "id": "m-adv-x7",
    "section": "math",
    "domain": "adv",
    "skill": "Quadratics",
    "diff": 2,
    "stem": "Which of the following is equivalent to x^2 + 8x + 3?",
    "choices": [
      "(x + 4)^2 - 13",
      "(x + 4)^2 + 3",
      "(x - 4)^2 - 13",
      "(x + 8)^2 - 61"
    ],
    "answer": 0,
    "explanation": "Completing the square: x^2 + 8x + 3 = (x^2 + 8x + 16) - 16 + 3 = (x + 4)^2 - 13. The tempting choice (x + 4)^2 + 3 forgets that adding 16 inside the square must be balanced by subtracting 16 from the constant; (x + 8)^2 - 61 comes from failing to halve the coefficient of x.",
    "hints": [
      "Complete the square: half the coefficient of x, then square it.",
      "Half of 8 is 4, so build (x + 4)^2, which equals x^2 + 8x + 16.",
      "Since (x + 4)^2 adds 16 that was not in the original expression, subtract 16 from the constant 3."
    ]
  },
  {
    "id": "m-adv-x8",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 1,
    "stem": "If 5^x * 5^4 = 5^12, what is the value of x?",
    "choices": [
      "8",
      "3",
      "16",
      "48"
    ],
    "answer": 0,
    "explanation": "Multiplying powers with the same base adds the exponents, so x + 4 = 12 and x = 8. The choice 3 comes from dividing the exponents (12/4), and 16 comes from adding them (12 + 4) instead of solving x + 4 = 12.",
    "hints": [
      "When powers with the same base are multiplied, their exponents are added.",
      "Write the equation for the exponents: x + 4 = 12.",
      "Solve the one-step equation by subtracting 4 from both sides."
    ]
  },
  {
    "id": "m-adv-x9",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 1,
    "stem": "For x > 0, which expression is equivalent to sqrt(64x^16)?",
    "choices": [
      "8x^8",
      "8x^4",
      "32x^8",
      "64x^8"
    ],
    "answer": 0,
    "explanation": "The square root of a product is the product of the square roots: sqrt(64) = 8 and sqrt(x^16) = x^8 (halve the exponent). The choice 8x^4 comes from taking the square root of the exponent (sqrt(16) = 4) instead of halving it, and 32x^8 comes from halving the coefficient 64 instead of taking its square root.",
    "hints": [
      "Take the square root of the coefficient and the variable part separately.",
      "A square root halves an exponent: sqrt(x^16) = x^(16/2).",
      "For the coefficient, ask what number squared gives 64 — do not divide 64 by 2."
    ]
  },
  {
    "id": "m-adv-x10",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 2,
    "stem": "For x > 0, which expression is equivalent to (16x^8)^(3/4)?",
    "choices": [
      "8x^6",
      "12x^6",
      "2x^6",
      "4x^6"
    ],
    "answer": 0,
    "explanation": "Apply the exponent to each factor: 16^(3/4) = (2^4)^(3/4) = 2^3 = 8, and (x^8)^(3/4) = x^6. The tempting choice 12x^6 comes from multiplying 16 by 3/4 instead of raising 16 to the 3/4 power; 2x^6 stops at the fourth root of 16 without cubing.",
    "hints": [
      "Raise the coefficient and the variable factor to the 3/4 power separately.",
      "A 3/4 power means: take the fourth root, then cube the result.",
      "The fourth root of 16 is 2, so 16^(3/4) = 2^3; multiply the exponents 8 and 3/4 for the variable."
    ]
  },
  {
    "id": "m-adv-x11",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 2,
    "type": "spr",
    "stem": "If 4^x = 8, what is the value of x?",
    "answer": "3/2",
    "accept": [
      "3/2",
      "1.5"
    ],
    "explanation": "Rewrite both sides with base 2: 4^x = (2^2)^x = 2^(2x) and 8 = 2^3. Equal bases mean equal exponents, so 2x = 3 and x = 3/2.",
    "hints": [
      "Both 4 and 8 are powers of the same smaller base.",
      "Rewrite: 4 = 2^2 and 8 = 2^3, so the equation becomes 2^(2x) = 2^3.",
      "Set the exponents equal, 2x = 3, and solve for x; the answer is not a whole number."
    ]
  },
  {
    "id": "m-adv-x12",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 3,
    "stem": "What is the solution set of the equation sqrt(2x + 7) = x + 2?",
    "choices": [
      "{1}",
      "{-3, 1}",
      "{-3}",
      "{3}"
    ],
    "answer": 0,
    "explanation": "Squaring both sides gives 2x + 7 = x^2 + 4x + 4, so x^2 + 2x - 3 = 0 and (x + 3)(x - 1) = 0, yielding candidates x = 1 and x = -3. Checking in the original equation: x = 1 gives sqrt(9) = 3 = 1 + 2, valid; x = -3 gives sqrt(1) = 1 but -3 + 2 = -1, so -3 is extraneous. The tempting choice {-3, 1} keeps both algebraic candidates without checking that squaring can introduce extraneous solutions.",
    "hints": [
      "Square both sides to remove the radical, then solve the resulting quadratic.",
      "You should get x^2 + 2x - 3 = 0, which factors as (x + 3)(x - 1) = 0.",
      "Substitute each candidate back into the ORIGINAL equation; a square root is never negative, so compare signs on both sides."
    ]
  },
  {
    "id": "m-adv-x13",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 2,
    "stem": "For x > 0, which expression is equivalent to (x^(1/2) * x^2)^2?",
    "choices": [
      "x^5",
      "x^(5/2)",
      "x^(9/2)",
      "x^2"
    ],
    "answer": 0,
    "explanation": "Inside the parentheses, add exponents: x^(1/2) * x^2 = x^(5/2); then squaring multiplies the exponent by 2, giving x^5. The choice x^(5/2) forgets to apply the outer square, and x^(9/2) squares only the x^2 factor before adding (1/2 + 4).",
    "hints": [
      "Simplify inside the parentheses first by adding the exponents.",
      "x^(1/2) * x^2 = x^(1/2 + 2) = x^(5/2).",
      "The outer exponent 2 multiplies the exponent 5/2 — apply it to the entire product, not just one factor."
    ]
  },
  {
    "id": "m-adv-x14",
    "section": "math",
    "domain": "adv",
    "skill": "Exponents & Radicals",
    "diff": 3,
    "type": "spr",
    "stem": "If 4^a = 5 and 4^b = 20, where a and b are constants, what is the value of 4^(b - a)?",
    "answer": "4",
    "accept": [
      "4"
    ],
    "explanation": "By the quotient rule for exponents, 4^(b - a) = 4^b / 4^a = 20/5 = 4. There is no need to solve for a or b individually; the difference of exponents corresponds to the quotient of the powers.",
    "hints": [
      "You do not need the values of a and b themselves — look for an exponent rule connecting them.",
      "Subtracting exponents with the same base corresponds to dividing the powers: 4^(b - a) = 4^b / 4^a.",
      "Substitute the given values: divide 20 by 5."
    ]
  },
  {
    "id": "m-adv-x15",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 1,
    "stem": "The function f is defined by f(x) = 3 * 2^x. What is the value of f(4)?",
    "choices": [
      "48",
      "16",
      "24",
      "1296"
    ],
    "answer": 0,
    "explanation": "f(4) = 3 * 2^4 = 3 * 16 = 48. The choice 16 drops the coefficient 3, and 24 comes from computing 3 * (2 * 4), multiplying instead of using 4 as an exponent; 1296 comes from combining 3 and 2 into (3*2)^4.",
    "hints": [
      "Substitute x = 4 into the expression, keeping the order of operations.",
      "First evaluate the exponential part: 2^4.",
      "Multiply that result by the coefficient 3 — the 3 is not part of the base."
    ]
  },
  {
    "id": "m-adv-x16",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 1,
    "passage": "A town's recycling program starts with 5,000 registered households. Each year, the number of registered households decreases by 20% of the previous year's total.",
    "stem": "Which function P models the number of registered households t years after the program starts?",
    "choices": [
      "P(t) = 5000(0.8)^t",
      "P(t) = 5000(0.2)^t",
      "P(t) = 5000(1.2)^t",
      "P(t) = 5000 - 1000t"
    ],
    "answer": 0,
    "explanation": "A 20% decrease each year means 80% remains, so the decay factor is 1 - 0.20 = 0.8 and P(t) = 5000(0.8)^t. The tempting choice 5000(0.2)^t uses the rate of decrease itself as the factor, which would remove 80% each year instead of 20%; 5000 - 1000t is a linear model that removes 20% of the ORIGINAL amount every year rather than 20% of the current amount.",
    "hints": [
      "Repeated percent change of the current amount calls for an exponential model, not a linear one.",
      "Each year the town keeps a fixed fraction of the previous year's households — find that fraction.",
      "Losing 20% means keeping 100% - 20% = 80%, so the base of the exponential is 0.8."
    ]
  },
  {
    "id": "m-adv-x17",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 2,
    "passage": "A bakery models its weekly profit, in dollars, from selling boxes of pastries at a price of x dollars per box with the function P(x) = -2(x - 30)^2 + 1800.",
    "stem": "Which of the following is the best interpretation of the number 30 in this context?",
    "choices": [
      "The price per box, in dollars, that results in the maximum weekly profit",
      "The maximum weekly profit, in dollars, the bakery can earn",
      "The minimum price per box, in dollars, at which the bakery earns a profit",
      "The weekly profit, in dollars, when the price per box is 0 dollars"
    ],
    "answer": 0,
    "explanation": "The function is in vertex form with vertex (30, 1800): since the parabola opens downward, the maximum profit of 1,800 dollars occurs when the price is x = 30. The tempting second choice swaps the roles of the vertex coordinates — 1800, not 30, is the maximum profit, while 30 is the input (price) that produces it.",
    "hints": [
      "The function is written in vertex form; identify the vertex first.",
      "The vertex is (30, 1800), and the negative leading coefficient means the vertex is a maximum.",
      "The x-coordinate of the vertex is an input (a price), while the y-coordinate is an output (a profit) — decide which one 30 is."
    ]
  },
  {
    "id": "m-adv-x18",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 2,
    "type": "spr",
    "passage": "A biologist tracks the area covered by an algae bloom on a pond. The area is modeled by g(x) = a * b^x, where g(x) is the area in square meters x days after observation begins and a and b are positive constants. The measured area is 6 square meters on day 0 and 18 square meters on day 1.",
    "stem": "According to the model, what is the area, in square meters, of the algae bloom on day 2?",
    "answer": "54",
    "accept": [
      "54"
    ],
    "explanation": "Since g(0) = a * b^0 = a = 6 and g(1) = 6b = 18, the growth factor is b = 3. Then g(2) = 6 * 3^2 = 6 * 9 = 54 square meters.",
    "hints": [
      "Use the day-0 value to find a: g(0) = a * b^0.",
      "With a = 6, use g(1) = 18 to solve 6b = 18 for the growth factor b.",
      "Evaluate g(2) = 6 * 3^2, applying the exponent before multiplying by 6."
    ]
  },
  {
    "id": "m-adv-x19",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 3,
    "stem": "The function f is defined by f(x) = a * b^x, where a and b are constants with a < 0 and 0 < b < 1. Which statement about the graph of f in the xy-plane must be true?",
    "choices": [
      "f is increasing, and the graph of f approaches the x-axis as x increases",
      "f is decreasing, and the graph of f approaches the x-axis as x increases",
      "f is increasing, and f(x) increases without bound as x increases",
      "f is decreasing, and f(x) decreases without bound as x increases"
    ],
    "answer": 0,
    "explanation": "Because 0 < b < 1, the factor b^x shrinks toward 0 as x increases, and multiplying by the negative constant a makes f(x) a negative number that moves upward toward 0 — so f is increasing and its graph approaches the x-axis from below. The tempting choice \"decreasing, approaches the x-axis\" ignores the sign of a: it describes ordinary decay with a > 0, but reflecting a decaying function below the x-axis turns decreasing values into increasing ones.",
    "hints": [
      "First think about b^x alone when 0 < b < 1, then consider what multiplying by a negative number does.",
      "b^x decays toward 0, so a * b^x is negative and its magnitude shrinks as x increases.",
      "Values like -8, -4, -2, -1, ... are getting LARGER (moving up toward 0), and they never cross the x-axis."
    ]
  },
  {
    "id": "m-adv-x20",
    "section": "math",
    "domain": "adv",
    "skill": "Nonlinear Functions",
    "diff": 3,
    "stem": "The function g is defined by g(x) = x^2 + kx + 1, where k is a constant. If g(2) = g(6), what is the value of k?",
    "choices": [
      "-8",
      "8",
      "-4",
      "4"
    ],
    "answer": 0,
    "explanation": "Since g(2) = g(6), the inputs 2 and 6 are symmetric about the axis of symmetry, so the vertex is at x = (2 + 6)/2 = 4; for g(x) = x^2 + kx + 1 the axis is x = -k/2, so -k/2 = 4 gives k = -8. (Directly: 4 + 2k + 1 = 36 + 6k + 1 leads to 4k = -32.) The tempting choice 8 comes from dropping the negative sign when solving -k/2 = 4, and -4 comes from using x = -k instead of x = -k/2 for the axis of symmetry.",
    "hints": [
      "Equal outputs at two different inputs mean those inputs are symmetric about the parabola's axis of symmetry.",
      "The axis of symmetry is halfway between 2 and 6, at x = 4.",
      "For g(x) = x^2 + kx + 1, the axis of symmetry is x = -k/2; set -k/2 = 4 and watch the sign when solving."
    ]
  },
  {
    "id": "m-data-x1",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 1,
    "passage": "An office printer produces pages at a constant rate. It prints 180 pages in 4 minutes.",
    "stem": "At this rate, how many pages will the printer produce in 7 minutes?",
    "choices": [
      "315",
      "45",
      "187",
      "1,260"
    ],
    "answer": 0,
    "explanation": "The unit rate is 180 ÷ 4 = 45 pages per minute, so in 7 minutes the printer produces 45 × 7 = 315 pages. The most tempting distractor, 45, is only the unit rate — it stops one step short of applying the rate to 7 minutes.",
    "hints": [
      "Start by finding how many pages the printer produces in one minute.",
      "Divide 180 by 4 to get the pages-per-minute rate.",
      "Multiply that per-minute rate by 7 minutes to get the total."
    ]
  },
  {
    "id": "m-data-x2",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 1,
    "type": "spr",
    "passage": "At a school with 480 students, 180 students play a musical instrument.",
    "stem": "What percent of the students at the school play a musical instrument? (Disregard the percent sign when entering your answer.)",
    "answer": "37.5",
    "accept": [
      "37.5",
      "37.50",
      "75/2"
    ],
    "explanation": "The fraction of students who play an instrument is 180/480 = 3/8. Converting to a percent: 3/8 = 0.375 = 37.5%. So the answer is 37.5.",
    "hints": [
      "A percent is a part divided by the whole, times 100.",
      "Form the fraction 180 over 480 and simplify it.",
      "3/8 as a decimal is 0.375 — convert that to a percent."
    ]
  },
  {
    "id": "m-data-x3",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 2,
    "passage": "At an animal shelter, the ratio of cats to dogs is 4 to 7. There are 88 cats and dogs in total at the shelter.",
    "stem": "How many dogs are at the shelter?",
    "choices": [
      "56",
      "32",
      "44",
      "154"
    ],
    "answer": 0,
    "explanation": "The ratio 4:7 means each group of 11 animals contains 7 dogs, so there are 88 ÷ 11 = 8 groups and 7 × 8 = 56 dogs. The most tempting distractor, 32, is the number of cats — it comes from reading the ratio in reverse and reporting the wrong part.",
    "hints": [
      "The ratio 4 to 7 tells you the total splits into 4 + 7 = 11 equal parts.",
      "Divide 88 by 11 to find the size of one part.",
      "Dogs correspond to 7 parts, so multiply 7 by the size of one part."
    ]
  },
  {
    "id": "m-data-x4",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 2,
    "passage": "A gym had 400 members in 2023. Its membership increased by 20% from 2023 to 2024 and then decreased by 25% from 2024 to 2025.",
    "stem": "How many members did the gym have in 2025?",
    "choices": [
      "360",
      "380",
      "480",
      "300"
    ],
    "answer": 0,
    "explanation": "After the increase, membership was 400 × 1.20 = 480; after the decrease, it was 480 × 0.75 = 360. The most tempting distractor, 380, comes from combining the percents into a single net change of −5% and applying it to 400 — but successive percent changes apply to different bases, so they cannot simply be added.",
    "hints": [
      "Apply the two percent changes one at a time, in order.",
      "First find 2024 membership: increase 400 by 20%.",
      "Then take 25% off of the 2024 value, not off of 400."
    ]
  },
  {
    "id": "m-data-x5",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 2,
    "type": "spr",
    "passage": "A furniture store buys a lamp for $60 and marks up the price by 40% to set the regular selling price. During a sale, the store discounts the regular price by 15%.",
    "stem": "What is the sale price of the lamp, in dollars? (Disregard the dollar sign when entering your answer.)",
    "answer": "71.4",
    "accept": [
      "71.4",
      "71.40",
      "357/5"
    ],
    "explanation": "The regular price is 60 × 1.40 = 84 dollars. The sale price is 15% off that amount: 84 × 0.85 = 71.40 dollars. So the answer is 71.4.",
    "hints": [
      "Work in two stages: markup first, then discount.",
      "A 40% markup on $60 means multiplying 60 by 1.40.",
      "Take 15% off the marked price by multiplying it by 0.85."
    ]
  },
  {
    "id": "m-data-x6",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 3,
    "passage": "A chemist has 30 liters of a solution that is 12% acid by volume. She plans to add pure water to the solution to reduce the acid concentration to 8%.",
    "stem": "How many liters of pure water must the chemist add?",
    "choices": [
      "15",
      "45",
      "10",
      "4"
    ],
    "answer": 0,
    "explanation": "The amount of acid stays fixed at 0.12 × 30 = 3.6 liters, so the final volume V must satisfy 3.6/V = 0.08, giving V = 45 liters; the water added is 45 − 30 = 15 liters. The most tempting distractor, 45, is the final total volume — it stops one step short of subtracting the original 30 liters.",
    "hints": [
      "Adding water changes the total volume but not the amount of acid.",
      "Compute the liters of acid in the original solution: 12% of 30.",
      "Set (liters of acid) ÷ (30 + x) equal to 0.08 and solve for x."
    ]
  },
  {
    "id": "m-data-x7",
    "section": "math",
    "domain": "data",
    "skill": "Ratios & Percentages",
    "diff": 3,
    "passage": "At a company, the ratio of full-time employees to part-time employees is 5 to 3. After the company hires 12 additional part-time employees and no additional full-time employees, the ratio of full-time to part-time employees becomes 10 to 9.",
    "stem": "How many full-time employees does the company have?",
    "choices": [
      "40",
      "24",
      "36",
      "64"
    ],
    "answer": 0,
    "explanation": "Let the original counts be 5x full-time and 3x part-time. Then 5x/(3x + 12) = 10/9, so 45x = 30x + 120, giving x = 8 and 5x = 40 full-time employees. The most tempting distractor, 24, is the original number of part-time employees — the value of 3x rather than the full-time count the question asks for.",
    "hints": [
      "Write the original counts as 5x and 3x using one variable.",
      "After the hiring, part-time becomes 3x + 12; set 5x over (3x + 12) equal to 10/9.",
      "Cross-multiply, solve for x, then report 5x — not 3x."
    ]
  },
  {
    "id": "m-data-x8",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 1,
    "passage": "A hiker recorded the lengths, in kilometers, of four trails: 8, 12, 15, 25.",
    "stem": "What is the mean length, in kilometers, of the four trails?",
    "choices": [
      "15",
      "13.5",
      "17",
      "60"
    ],
    "answer": 0,
    "explanation": "The mean is the sum divided by the count: (8 + 12 + 15 + 25) ÷ 4 = 60 ÷ 4 = 15. The most tempting distractor, 13.5, is the median (the average of 12 and 15), which is a different measure of center.",
    "hints": [
      "The mean is the total of the values divided by how many values there are.",
      "Add the four lengths first.",
      "Divide the sum, 60, by 4 — do not confuse the mean with the median."
    ]
  },
  {
    "id": "m-data-x9",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 1,
    "passage": "A game spinner is divided into 12 equal sectors numbered 1 through 12. The arrow is equally likely to land on any sector.",
    "stem": "What is the probability that the arrow lands on a sector numbered with a multiple of 4?",
    "choices": [
      "1/4",
      "1/3",
      "1/12",
      "3/4"
    ],
    "answer": 0,
    "explanation": "The multiples of 4 from 1 to 12 are 4, 8, and 12, so the probability is 3/12 = 1/4. The most tempting distractor, 1/3, comes from counting four favorable outcomes — the count of multiples of 3 (3, 6, 9, 12) — instead of multiples of 4.",
    "hints": [
      "Probability equals favorable outcomes divided by total outcomes.",
      "List the numbers from 1 to 12 that are multiples of 4.",
      "There are exactly 3 such numbers out of 12 — simplify that fraction."
    ]
  },
  {
    "id": "m-data-x10",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 2,
    "passage": "A teacher asked each of 20 students how many siblings they have. The results: 5 students have 0 siblings, 7 students have 1 sibling, 6 students have 2 siblings, and 2 students have 3 siblings.",
    "stem": "What is the median number of siblings for the 20 students?",
    "choices": [
      "1",
      "1.5",
      "2",
      "6"
    ],
    "answer": 0,
    "explanation": "With 20 values in order, the median is the average of the 10th and 11th values. The first 5 values are 0 and the next 7 (positions 6 through 12) are 1, so both the 10th and 11th values are 1, making the median 1. The most tempting distractor, 1.5, comes from averaging the two middle categories (1 and 2) instead of the two middle data values.",
    "hints": [
      "Imagine listing all 20 responses in order from least to greatest.",
      "For 20 values, the median is the average of the 10th and 11th values.",
      "Use running totals of the frequencies: positions 6 through 12 are all 1s."
    ]
  },
  {
    "id": "m-data-x11",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 2,
    "type": "spr",
    "passage": "A box contains 5 green pens, 7 black pens, and 8 blue pens, and no other pens. One pen will be selected at random from the box.",
    "stem": "What is the probability that the selected pen is NOT blue?",
    "answer": "3/5",
    "accept": [
      "3/5",
      "12/20",
      ".6",
      "0.6",
      ".60",
      "0.60"
    ],
    "explanation": "There are 5 + 7 + 8 = 20 pens in total, and 5 + 7 = 12 of them are not blue. The probability is therefore 12/20 = 3/5 = 0.6.",
    "hints": [
      "First count the total number of pens in the box.",
      "\"Not blue\" means green or black — count those pens.",
      "Divide the number of non-blue pens, 12, by the total, 20, and simplify."
    ]
  },
  {
    "id": "m-data-x12",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 2,
    "passage": "In one physics class of 12 students, the mean exam score was 84. In another physics class of 18 students, the mean exam score was 79.",
    "stem": "What was the mean exam score for the 30 students in the two classes combined?",
    "choices": [
      "81",
      "81.5",
      "82",
      "84"
    ],
    "answer": 0,
    "explanation": "The combined total is 12 × 84 + 18 × 79 = 1,008 + 1,422 = 2,430, so the combined mean is 2,430 ÷ 30 = 81. The most tempting distractor, 81.5, is the simple average of 84 and 79, which ignores that the classes have different sizes and must be weighted.",
    "hints": [
      "You cannot just average the two means, because the classes have different numbers of students.",
      "Find each class's total points: mean times number of students.",
      "Add the two totals and divide by all 30 students."
    ]
  },
  {
    "id": "m-data-x13",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 3,
    "passage": "A researcher surveyed a random sample of 400 residents of a city about a proposed bike-lane plan. In the sample, 62% favored the plan, and the estimate has an associated margin of error of 4 percentage points.",
    "stem": "Based on the survey, which of the following is the most appropriate conclusion?",
    "choices": [
      "It is plausible that the percentage of all residents of the city who favor the plan is between 58% and 66%.",
      "Exactly 62% of all residents of the city favor the plan.",
      "In any other random sample of 400 residents, between 58% and 66% of the sample will favor the plan.",
      "The percentage of all residents who favor the plan cannot be less than 58% or greater than 66%."
    ],
    "answer": 0,
    "explanation": "A margin of error gives a plausible interval for the population value: 62% ± 4 points, or 58% to 66%. The most tempting distractor claims exactly 62% of all residents favor the plan, but 62% is only a sample statistic — the survey cannot pin down the population percentage exactly. The other options wrongly apply the interval to future samples or treat it as an absolute guarantee.",
    "hints": [
      "A sample statistic estimates, but does not equal, the population value.",
      "Apply the margin of error to the population percentage: 62% plus or minus 4 points.",
      "The interval 58% to 66% is plausible, not certain — avoid choices with absolute language like \"exactly\" or \"cannot\"."
    ]
  },
  {
    "id": "m-data-x14",
    "section": "math",
    "domain": "data",
    "skill": "Statistics & Probability",
    "diff": 3,
    "passage": "The 100 participants in a coding workshop attended either a morning session or an afternoon session. Of the 40 morning participants, 24 completed the final project and 16 did not. Of the 60 afternoon participants, 30 completed the final project and 30 did not.",
    "stem": "If one participant who completed the final project is selected at random, what is the probability that the participant attended the morning session?",
    "choices": [
      "4/9",
      "6/25",
      "3/5",
      "27/50"
    ],
    "answer": 0,
    "explanation": "The selection is made only from the 24 + 30 = 54 participants who completed the project, and 24 of them attended in the morning, so the probability is 24/54 = 4/9. The most tempting distractor, 3/5, is 24/40 — the probability that a morning participant completed the project, which reverses the given condition.",
    "hints": [
      "The participant is chosen from a restricted group, not from all 100 people.",
      "Count everyone who completed the project: 24 + 30.",
      "Divide the morning completers, 24, by that completer total, 54, and simplify."
    ]
  },
  {
    "id": "m-data-x15",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 1,
    "passage": "The table below shows the number of visitors to a science museum on four days.\n\nThursday: 310 visitors\nFriday: 425 visitors\nSaturday: 590 visitors\nSunday: 475 visitors",
    "stem": "According to the table, how many more visitors did the museum have on Saturday than on Thursday?",
    "choices": [
      "280",
      "165",
      "115",
      "900"
    ],
    "answer": 0,
    "explanation": "Subtract Thursday's count from Saturday's count: 590 − 310 = 280. The most tempting distractor, 165, is Saturday minus Friday (590 − 425) — a misreading of which two days the question compares.",
    "hints": [
      "Find the two rows the question asks about: Saturday and Thursday.",
      "\"How many more\" means subtract the smaller value from the larger.",
      "Compute 590 minus 310, being careful not to grab Friday's value by mistake."
    ]
  },
  {
    "id": "m-data-x16",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 1,
    "passage": "A line graph shows the height of a sunflower seedling over time. The height was 4 cm at week 0, 7 cm at week 1, 10 cm at week 2, 13 cm at week 3, and 16 cm at week 4.",
    "stem": "Based on the graph, by how many centimeters did the seedling's height increase each week?",
    "choices": [
      "3",
      "4",
      "16",
      "12"
    ],
    "answer": 0,
    "explanation": "The height rises by the same amount between consecutive weeks: 7 − 4 = 3 cm, and every later week also increases by 3 cm. The most tempting distractor, 12, is the total increase over all four weeks (16 − 4), not the increase per week.",
    "hints": [
      "Look at how the height changes from one week to the next.",
      "Subtract two consecutive values, such as week 1 minus week 0.",
      "The per-week change is constant — do not use the change over the whole four weeks."
    ]
  },
  {
    "id": "m-data-x17",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 2,
    "passage": "A scatterplot shows the quiz scores y of students who studied x hours. The line of best fit for the data is y = 2.5x + 10.",
    "stem": "Based on the line of best fit, what is the predicted quiz score for a student who studied for 8 hours?",
    "choices": [
      "30",
      "20",
      "82.5",
      "18"
    ],
    "answer": 0,
    "explanation": "Substituting x = 8 into the equation gives y = 2.5(8) + 10 = 20 + 10 = 30. The most tempting distractor, 20, comes from computing 2.5 × 8 but forgetting to add the y-intercept of 10; 82.5 comes from swapping the slope and intercept and computing 10(8) + 2.5.",
    "hints": [
      "The line of best fit gives a prediction when you substitute a value for x.",
      "Replace x with 8 in y = 2.5x + 10.",
      "Multiply 2.5 by 8 first, then remember to add the 10."
    ]
  },
  {
    "id": "m-data-x18",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 2,
    "type": "spr",
    "passage": "A bar graph shows the number of each item a bakery sold on Monday: 45 muffins, 30 croissants, 25 scones, and 50 bagels. No other items were sold.",
    "stem": "Croissants made up what percent of all the items the bakery sold on Monday? (Disregard the percent sign when entering your answer.)",
    "answer": "20",
    "accept": [
      "20",
      "20.0",
      "20.00"
    ],
    "explanation": "The total number of items sold is 45 + 30 + 25 + 50 = 150. Croissants account for 30/150 = 1/5 = 0.20 of the items, which is 20%.",
    "hints": [
      "First find the total number of items sold by adding all four bars.",
      "Form the fraction: croissants divided by the total, 30 over 150.",
      "Simplify 30/150 and convert the result to a percent."
    ]
  },
  {
    "id": "m-data-x19",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 3,
    "passage": "The table below shows enrollment in two programs at a community center.\n\nArt program — Year 1: 120 students; Year 2: 156 students\nMusic program — Year 1: 80 students; Year 2: 110 students",
    "stem": "Which program's enrollment increased by the greater percent from Year 1 to Year 2, and why?",
    "choices": [
      "The music program, because its enrollment increased by 37.5%, which is greater than the art program's 30% increase.",
      "The art program, because its enrollment increased by 36 students, which is more than the music program's increase of 30 students.",
      "The art program, because its enrollment was greater than the music program's enrollment in both years.",
      "Neither program, because the two enrollments increased by roughly the same number of students."
    ],
    "answer": 0,
    "explanation": "Percent increase compares the change with the starting value: art rose 36/120 = 30%, while music rose 30/80 = 37.5%, so music had the greater percent increase even though art gained more students. The most tempting distractor picks art based on its larger absolute increase of 36 students, confusing absolute change with relative (percent) change.",
    "hints": [
      "Percent increase is the change divided by the Year 1 value, not the raw number of new students.",
      "Compute each change: art rose by 36 students and music rose by 30.",
      "Compare 36/120 with 30/80 — a smaller starting enrollment can make a smaller gain a larger percent."
    ]
  },
  {
    "id": "m-data-x20",
    "section": "math",
    "domain": "data",
    "skill": "Data Interpretation",
    "diff": 3,
    "type": "spr",
    "passage": "The table below shows data for two trips a driver took in the same car.\n\nHighway trip: 320 miles driven, 8 gallons of gasoline used\nCity trip: 100 miles driven, 4 gallons of gasoline used",
    "stem": "For the two trips combined, what was the car's average number of miles driven per gallon of gasoline used?",
    "answer": "35",
    "accept": [
      "35",
      "35.0",
      "35.00",
      "420/12"
    ],
    "explanation": "The combined average must use total miles over total gallons: (320 + 100) miles ÷ (8 + 4) gallons = 420 ÷ 12 = 35 miles per gallon. Averaging the two trip rates, (40 + 25)/2 = 32.5, is incorrect because the trips used different amounts of gasoline, so the rates carry different weights.",
    "hints": [
      "An overall rate is total miles divided by total gallons — not the average of the two trip rates.",
      "Add the miles from both trips, and separately add the gallons.",
      "Divide 420 total miles by 12 total gallons."
    ]
  },
  {
    "id": "m-geo-x1",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 1,
    "stem": "Lines p and q are parallel and are intersected by a transversal. Two same-side interior angles are formed, one of which measures 126°. What is the measure, in degrees, of the other same-side interior angle?",
    "choices": [
      "54°",
      "126°",
      "36°",
      "63°"
    ],
    "answer": 0,
    "explanation": "Same-side (co-interior) angles between parallel lines are supplementary, so the other angle measures 180° − 126° = 54°. The tempting choice 126° comes from confusing same-side interior angles with alternate interior angles, which are congruent rather than supplementary.",
    "hints": [
      "Think about the special angle relationships created when a transversal crosses two parallel lines.",
      "Same-side interior angles are not congruent — they have a sum with a specific fixed value.",
      "Subtract 126° from 180° to find the missing angle."
    ]
  },
  {
    "id": "m-geo-x2",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 1,
    "stem": "In an isosceles triangle, the vertex angle between the two congruent sides measures 48°. What is the measure, in degrees, of each base angle?",
    "choices": [
      "66°",
      "132°",
      "48°",
      "42°"
    ],
    "answer": 0,
    "explanation": "The two base angles are congruent and together with the 48° vertex angle sum to 180°, so each base angle is (180° − 48°) ÷ 2 = 66°. The choice 132° is the total of both base angles — a one-step-short error made by forgetting to divide by 2.",
    "hints": [
      "The three interior angles of any triangle sum to 180°.",
      "In an isosceles triangle, the two base angles are equal to each other.",
      "Subtract 48° from 180°, then split the result equally between the two base angles."
    ]
  },
  {
    "id": "m-geo-x3",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 2,
    "stem": "In a triangle, an exterior angle at one vertex measures 112°. One of the remote (nonadjacent) interior angles measures 47°. What is the measure, in degrees, of the other remote interior angle?",
    "choices": [
      "65°",
      "68°",
      "21°",
      "159°"
    ],
    "answer": 0,
    "explanation": "An exterior angle of a triangle equals the sum of the two remote interior angles, so the missing angle is 112° − 47° = 65°. The distractor 68° is the interior angle adjacent to the exterior angle (180° − 112°), which answers a different question, and 21° results from wrongly treating 112° as an interior angle of the triangle.",
    "hints": [
      "Recall the exterior angle theorem for triangles.",
      "The exterior angle equals the sum of the two interior angles that are not adjacent to it.",
      "Set up 47° + x = 112° and solve for x."
    ]
  },
  {
    "id": "m-geo-x4",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 2,
    "type": "spr",
    "passage": "A designer creates two similar triangular pennants. The smaller pennant has side lengths of 6 inches, 8 inches, and 10 inches. The shortest side of the larger pennant is 15 inches long.",
    "stem": "What is the length, in inches, of the longest side of the larger pennant?",
    "answer": "25",
    "accept": [
      "25",
      "25.0",
      "25.00"
    ],
    "explanation": "Corresponding sides of similar triangles are proportional. The shortest sides give the scale factor: 15 ÷ 6 = 2.5. The longest side of the larger pennant is therefore 10 × 2.5 = 25 inches.",
    "hints": [
      "Similar triangles have corresponding side lengths in the same ratio.",
      "Compare the two shortest sides, 6 and 15, to find the scale factor.",
      "Multiply the longest side of the small pennant, 10, by that scale factor."
    ]
  },
  {
    "id": "m-geo-x5",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 2,
    "stem": "The measures of the interior angles of a triangle are in the ratio 2:3:5. What is the measure, in degrees, of the largest angle?",
    "choices": [
      "90°",
      "54°",
      "36°",
      "100°"
    ],
    "answer": 0,
    "explanation": "The ratio parts sum to 2 + 3 + 5 = 10, so each part is 180° ÷ 10 = 18°, and the largest angle is 5 × 18° = 90°. The distractor 54° is the middle angle (3 parts) — a plausible misreading of which angle is requested — and 100° comes from misadding the ratio parts to 9.",
    "hints": [
      "Let the angles be 2x, 3x, and 5x, and use the triangle angle sum.",
      "Solve 2x + 3x + 5x = 180 to find the value of one ratio part.",
      "Multiply the value of x by 5 to get the largest angle."
    ]
  },
  {
    "id": "m-geo-x6",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 3,
    "passage": "In triangle ABC, the measure of angle A is 70°. The bisectors of angle B and angle C intersect at point P inside the triangle.",
    "stem": "What is the measure, in degrees, of angle BPC?",
    "choices": [
      "125°",
      "145°",
      "110°",
      "55°"
    ],
    "answer": 0,
    "explanation": "Since B + C = 180° − 70° = 110°, the half-angles at P satisfy B/2 + C/2 = 55°, so angle BPC = 180° − 55° = 125° (equivalently, 90° + A/2). The tempting distractor 145° comes from computing 90° + (B + C)/2, misapplying the formula by halving the wrong angle sum.",
    "hints": [
      "First find the sum of angles B and C using the triangle angle sum.",
      "In triangle BPC, the angles at B and C are half of the original angles B and C.",
      "Compute 180° minus half of 110° to find angle BPC."
    ]
  },
  {
    "id": "m-geo-x7",
    "section": "math",
    "domain": "geo",
    "skill": "Angles & Triangles",
    "diff": 3,
    "passage": "In triangle DEF, side DE is congruent to side EF. The measure of angle D is (3x)° and the measure of angle F is (5x − 48)°.",
    "stem": "What is the measure, in degrees, of angle E?",
    "choices": [
      "36°",
      "72°",
      "24°",
      "108°"
    ],
    "answer": 0,
    "explanation": "Because DE = EF, the angles opposite those sides — angle F and angle D — are congruent, so 3x = 5x − 48, giving x = 24 and base angles of 72° each. Then angle E = 180° − 72° − 72° = 36°. The distractor 72° is a base angle (stopping one step short), and 24° is the value of x rather than an angle measure.",
    "hints": [
      "Determine which two angles must be congruent when DE = EF: the angles opposite those sides.",
      "Set 3x equal to 5x − 48 and solve for x.",
      "Find each base angle, then subtract both from 180° to get angle E."
    ]
  },
  {
    "id": "m-geo-x8",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 1,
    "stem": "A circle has a radius of 6 centimeters. What is the area, in square centimeters, of the circle?",
    "choices": [
      "36π",
      "12π",
      "6π",
      "144π"
    ],
    "answer": 0,
    "explanation": "The area of a circle is πr², so the area is π(6)² = 36π square centimeters. The distractor 12π is the circumference (2πr), and 144π results from squaring the diameter instead of the radius.",
    "hints": [
      "Recall the formula for the area of a circle in terms of its radius.",
      "Area uses the radius squared, not doubled.",
      "Compute π times 6 squared."
    ]
  },
  {
    "id": "m-geo-x9",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 1,
    "type": "spr",
    "passage": "A rectangular banner has an area of 84 square feet. The length of the banner is 12 feet.",
    "stem": "What is the width, in feet, of the banner?",
    "answer": "7",
    "accept": [
      "7",
      "7.0",
      "7.00",
      "84/12"
    ],
    "explanation": "The area of a rectangle equals length times width, so 12w = 84. Dividing both sides by 12 gives w = 7 feet.",
    "hints": [
      "Use the formula for the area of a rectangle.",
      "Set up the equation 12 × width = 84.",
      "Divide 84 by 12."
    ]
  },
  {
    "id": "m-geo-x10",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 2,
    "stem": "A circle has a radius of 9. What is the area of a sector of the circle with a central angle of 80°?",
    "choices": [
      "18π",
      "4π",
      "81π",
      "36π"
    ],
    "answer": 0,
    "explanation": "The sector is 80/360 = 2/9 of the circle, and the full area is π(9)² = 81π, so the sector area is (2/9)(81π) = 18π. The distractor 4π is the arc length of the same sector — a plausible formula mix-up — and 81π is the area of the entire circle, forgetting the fraction.",
    "hints": [
      "A sector's area is a fraction of the whole circle's area.",
      "The fraction is the central angle divided by 360°.",
      "Multiply 80/360 by π times 9 squared."
    ]
  },
  {
    "id": "m-geo-x11",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 2,
    "stem": "The equation x² + y² + 8x − 2y − 8 = 0 defines a circle in the xy-plane. What are the coordinates of the center of the circle?",
    "choices": [
      "(−4, 1)",
      "(4, −1)",
      "(−8, 2)",
      "(8, −2)"
    ],
    "answer": 0,
    "explanation": "Completing the square gives (x + 4)² + (y − 1)² = 25, so the center is (−4, 1). The tempting distractor (4, −1) comes from a sign slip — reading the center's coordinates directly off the +8x and −2y terms without flipping the signs.",
    "hints": [
      "Rewrite the equation in standard circle form by completing the square in x and in y.",
      "Half of 8 is 4 and half of −2 is −1; square each and add to both sides.",
      "In (x + 4)² + (y − 1)² = 25, the center is the point that makes each squared term zero."
    ]
  },
  {
    "id": "m-geo-x12",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 2,
    "type": "spr",
    "stem": "A circle has a radius of 12. An arc of the circle has a length of 3π. What is the measure, in degrees, of the central angle that intercepts this arc?",
    "answer": "45",
    "accept": [
      "45",
      "45.0",
      "45.00"
    ],
    "explanation": "The circumference is 2π(12) = 24π, so the arc is 3π/24π = 1/8 of the circle. Multiplying 1/8 by 360° gives a central angle of 45°.",
    "hints": [
      "Compare the arc length to the full circumference of the circle.",
      "The circumference is 2π times 12; find what fraction 3π is of that.",
      "Multiply that fraction by 360°."
    ]
  },
  {
    "id": "m-geo-x13",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 3,
    "passage": "A landscaper plans to enlarge a circular patio so that its radius is 50% greater than the current radius.",
    "stem": "The area of the enlarged patio will be what percent greater than the area of the current patio?",
    "choices": [
      "125%",
      "50%",
      "150%",
      "225%"
    ],
    "answer": 0,
    "explanation": "Scaling the radius by a factor of 1.5 scales the area by 1.5² = 2.25, so the new area is 225% of the old area — an increase of 125%. The tempting distractor 50% applies the linear scale factor k instead of k² to area, and 225% reports the new area as a percent of the old rather than the percent increase.",
    "hints": [
      "When lengths scale by a factor k, areas scale by k squared.",
      "A 50% increase in radius means the new radius is 1.5 times the old one.",
      "Square 1.5 to get the area ratio, then subtract 100% to find the increase."
    ]
  },
  {
    "id": "m-geo-x14",
    "section": "math",
    "domain": "geo",
    "skill": "Circles & Area",
    "diff": 3,
    "type": "spr",
    "stem": "For a certain circle, the numerical value of its area, in square units, is equal to the numerical value of its circumference, in units. What is the radius of the circle?",
    "answer": "2",
    "accept": [
      "2",
      "2.0",
      "2.00"
    ],
    "explanation": "Set the area equal to the circumference: πr² = 2πr. Dividing both sides by πr (r ≠ 0) gives r = 2, so the radius is 2 units.",
    "hints": [
      "Write expressions for both the area and the circumference in terms of r.",
      "Set πr² equal to 2πr.",
      "Divide both sides by πr to isolate r."
    ]
  },
  {
    "id": "m-geo-x15",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 1,
    "stem": "A right triangle has legs of length 8 and 15 and a hypotenuse of length 17. What is the sine of the acute angle opposite the side of length 8?",
    "choices": [
      "8/17",
      "15/17",
      "8/15",
      "17/8"
    ],
    "answer": 0,
    "explanation": "Sine is the ratio of the opposite side to the hypotenuse, so sin θ = 8/17. The distractor 15/17 is the cosine of the same angle (adjacent over hypotenuse), and 8/15 is its tangent — both come from mixing up the trig ratio definitions.",
    "hints": [
      "Write out the definition of sine for a right triangle.",
      "Identify which side is opposite the angle and which is the hypotenuse.",
      "Form the ratio of the side of length 8 to the side of length 17."
    ]
  },
  {
    "id": "m-geo-x16",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 1,
    "type": "spr",
    "stem": "A right triangle has legs of length 5 and 12 and a hypotenuse of length 13. What is the value of the tangent of the acute angle opposite the side of length 5?",
    "answer": "5/12",
    "accept": [
      "5/12",
      "10/24",
      ".4166",
      ".4167",
      "0.416",
      "0.417"
    ],
    "explanation": "Tangent is the ratio of the opposite leg to the adjacent leg. For the angle opposite the side of length 5, the adjacent leg is 12, so tan θ = 5/12. The hypotenuse of 13 is not used in the tangent ratio.",
    "hints": [
      "Recall that tangent compares the two legs of the right triangle, not the hypotenuse.",
      "The leg opposite the angle is 5; identify the adjacent leg.",
      "Divide the opposite leg by the adjacent leg."
    ]
  },
  {
    "id": "m-geo-x17",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 2,
    "stem": "If sin(38°) = cos(k°), where 0 < k < 90, what is the value of k?",
    "choices": [
      "52",
      "38",
      "128",
      "142"
    ],
    "answer": 0,
    "explanation": "The sine of an angle equals the cosine of its complement, so k = 90 − 38 = 52. The distractor 38 assumes sine and cosine of the same angle are equal, and 142 comes from using 180° instead of 90° in the relationship.",
    "hints": [
      "Think about how the sine of one acute angle of a right triangle relates to the cosine of the other.",
      "Sine and cosine are equal for complementary angles.",
      "Subtract 38 from 90."
    ]
  },
  {
    "id": "m-geo-x18",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 2,
    "passage": "A 20-foot support cable runs in a straight line from a point on level ground to the top of a vertical pole. The cable makes a 60° angle with the ground.",
    "stem": "What is the height, in feet, of the pole?",
    "choices": [
      "10√3",
      "10",
      "10√2",
      "20√3"
    ],
    "answer": 0,
    "explanation": "The pole is opposite the 60° angle and the cable is the hypotenuse, so height = 20 sin 60° = 20(√3/2) = 10√3 feet. The distractor 10 comes from using cos 60° instead of sin 60° — finding the ground distance rather than the height — and 20√3 misapplies tangent to the hypotenuse.",
    "hints": [
      "Sketch the right triangle formed by the pole, the ground, and the cable.",
      "The pole is opposite the 60° angle, and the 20-foot cable is the hypotenuse, so use sine.",
      "Multiply 20 by sin 60°, which equals √3/2."
    ]
  },
  {
    "id": "m-geo-x19",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 3,
    "passage": "In right triangle PQR, the right angle is at vertex R, and cos P = 4/5.",
    "stem": "What is the value of sin Q?",
    "choices": [
      "4/5",
      "3/5",
      "5/4",
      "3/4"
    ],
    "answer": 0,
    "explanation": "Angles P and Q are complementary since they are the two acute angles of a right triangle, and the sine of an angle equals the cosine of its complement, so sin Q = cos P = 4/5. The tempting distractor 3/5 is sin P, found by building the 3-4-5 triangle but taking the sine of the wrong angle.",
    "hints": [
      "Note that the two acute angles P and Q must add to 90°.",
      "For complementary angles, the sine of one equals the cosine of the other.",
      "No new computation is needed — sin Q equals the given value of cos P."
    ]
  },
  {
    "id": "m-geo-x20",
    "section": "math",
    "domain": "geo",
    "skill": "Right-Triangle Trig",
    "diff": 3,
    "type": "spr",
    "passage": "In a right triangle, the tangent of one acute angle is 3/4. The hypotenuse of the triangle has a length of 40.",
    "stem": "What is the length of the longer leg of the triangle?",
    "answer": "32",
    "accept": [
      "32",
      "32.0",
      "32.00"
    ],
    "explanation": "A tangent of 3/4 means the legs are in the ratio 3:4, so the sides can be written as 3k, 4k, and 5k (a 3-4-5 relationship, since (3k)² + (4k)² = (5k)²). Setting 5k = 40 gives k = 8, so the longer leg is 4k = 32.",
    "hints": [
      "Tangent equals opposite over adjacent, so the legs are in the ratio 3 to 4.",
      "Write the legs as 3k and 4k and use the Pythagorean theorem to express the hypotenuse as 5k.",
      "Solve 5k = 40, then compute the longer leg, 4k."
    ]
  },
];

/* Helper lookups used by the app */
const Q_BY_ID = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
const ALL_DOMAINS = [...DOMAINS.rw, ...DOMAINS.math];
const DOMAIN_BY_ID = Object.fromEntries(ALL_DOMAINS.map(d => [d.id, d]));
function domainSection(domId) { return DOMAINS.rw.some(d => d.id === domId) ? "rw" : "math"; }
