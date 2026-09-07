"use client";
import Nav from "../components/Nav";
// app/diet/page.tsx
// IBD Compass — Diet & Nutrition Page

import { useState } from "react";

type EvidenceType =
  | "Strong clinical"
  | "Promising"
  | "Traditional use"
  | "Anecdotal"
  | "Newly emerging";
type ConditionType = "Crohn's" | "UC" | "Both";

interface Diet {
  name: string;
  condition: ConditionType;
  category: "Therapeutic" | "Supportive" | "Experimental";
  evidence: EvidenceType;
  summary: string;
  howItWorks: string;
  howLong: string;
  reintroduction: string;
  worthKnowing: string;
  individual: string;
  suits: string;
}

const diets: Diet[] = [
  {
    name: "Crohn's Disease Exclusion Diet (CDED)",
    condition: "Crohn's",
    category: "Therapeutic",
    evidence: "Strong clinical",
    summary:
      "A whole-food diet specifically designed for Crohn's disease that reduces exposure to dietary components shown to harm the gut barrier and microbiome. One of only two diets with strong enough evidence to be used as an induction therapy.",
    howItWorks:
      "The CDED works by excluding processed foods, emulsifiers, certain animal fats, and gluten-containing grains — all of which have been shown to negatively affect the gut lining and microbiome in Crohn's disease. It is typically used alongside Partial Enteral Nutrition (PEN).",
    howLong:
      "Phase 1 (weeks 1–6): Strictest phase, combined with partial enteral nutrition formula. Phase 2 (weeks 7–12): Slightly more food variety introduced while continuing partial enteral nutrition. Phase 3: Ongoing maintenance with gradual food reintroduction guided by a dietitian.",
    reintroduction:
      "Food reintroduction is done slowly and systematically under dietitian guidance. Introduce one new food every 3 to 4 days and monitor symptoms carefully. Keep a food and symptom diary throughout.",
    worthKnowing:
      "This diet requires commitment and ideally professional dietitian support. It is not a diet to attempt without guidance as incorrect implementation can lead to nutritional deficiencies.",
    individual:
      "Most studied in children and young adults but increasingly used in adults. Effectiveness depends on disease location and activity. Always implement with support from an IBD-experienced dietitian.",
    suits: "Active Crohn's disease — induction of remission",
  },
  {
    name: "Exclusive Enteral Nutrition (EEN)",
    condition: "Crohn's",
    category: "Therapeutic",
    evidence: "Strong clinical",
    summary:
      "A complete liquid nutritional formula that replaces all food, giving the gut complete rest while maintaining full nutrition. The most strongly evidenced dietary therapy for Crohn's disease — particularly in children.",
    howItWorks:
      "By removing all solid food and replacing it with a nutritionally complete liquid formula, EEN reduces gut inflammation, promotes mucosal healing, and improves nutritional status simultaneously.",
    howLong:
      "Typically 6 to 8 weeks of liquid-only intake. Some protocols extend to 12 weeks depending on response. After remission is achieved, food is reintroduced very gradually.",
    reintroduction:
      "Reintroduction takes 2 to 4 weeks minimum. Start with easily digestible foods — well-cooked vegetables, white rice, chicken. Add one new food every 3 to 5 days. A dietitian should guide this process.",
    worthKnowing:
      "The first week is often the hardest — hunger, food cravings, and fatigue are common. Symptoms typically begin improving by week 2 to 3. In Australia, Medicare may contribute to costs under a Chronic Disease Management plan — ask your GP.",
    individual:
      "Particularly effective in children and adolescents. Adults can also benefit but may find adherence more challenging. Available as oral sipping formulas or via nasogastric tube.",
    suits:
      "Active Crohn's disease — induction of remission. Particularly children and adolescents.",
  },
  {
    name: "Specific Carbohydrate Diet (SCD)",
    condition: "Both",
    category: "Therapeutic",
    evidence: "Promising",
    summary:
      "A grain-free, lactose-free diet that allows only specific carbohydrates that are easily absorbed. A randomised controlled trial found it comparable to the Mediterranean diet for symptomatic remission in mild to moderate Crohn's disease, with emerging evidence in UC.",
    howItWorks:
      "The SCD eliminates complex carbohydrates that may feed harmful gut bacteria. Allowed foods include fresh fruit, most vegetables, unprocessed meat, fish, eggs, nuts, and certain cheeses. Grains, sugar, most dairy, and processed foods are excluded.",
    howLong:
      "Typically trialled for a minimum of 12 weeks before assessing benefit. Some people follow it long-term. Do not abandon it before 12 weeks as improvement can be gradual.",
    reintroduction:
      "If reintroducing excluded foods after a period of remission, do so one at a time over several weeks. Start with well-tolerated foods like white rice before attempting grains or dairy.",
    worthKnowing:
      "The restrictive nature makes long-term adherence challenging for some people. Nutritional deficiencies are possible if not carefully planned — particularly calcium and B vitamins. Work with a dietitian.",
    individual:
      "Most evidence exists for mild to moderate Crohn's disease. Emerging evidence in UC. May be less effective in severe disease. Individual food tolerances within the SCD vary — what works for one person may not work for another.",
    suits: "Mild to moderate active IBD and maintenance",
  },
  {
    name: "Mediterranean Diet",
    condition: "Both",
    category: "Supportive",
    evidence: "Promising",
    summary:
      "A balanced whole-food diet rich in vegetables, fruits, legumes, whole grains, olive oil, and fish. Shown in a head-to-head randomised trial to achieve similar symptomatic remission rates to the SCD in mild to moderate Crohn's disease — and much easier to sustain long-term. Also associated with reduced UC flare frequency.",
    howItWorks:
      "The anti-inflammatory properties of olive oil, omega-3 rich fish, and plant polyphenols support gut health and reduce systemic inflammation. The diversity of plant foods also supports a healthy gut microbiome.",
    howLong:
      "A long-term sustainable eating pattern rather than a short-term intervention. Benefits tend to build over months rather than weeks.",
    reintroduction:
      "No strict reintroduction phase — this is a lifestyle diet. If starting from a more restricted diet, gradually increase food variety while monitoring symptoms.",
    worthKnowing:
      "One of the most sustainable and nutritionally complete diets on this list. Strong evidence for cardiovascular and overall health benefits alongside its gut benefits.",
    individual:
      "Generally well tolerated but individual food sensitivities still apply. Some people find high-fibre foods like legumes and raw vegetables difficult during active disease — cook vegetables thoroughly and introduce fibre gradually.",
    suits: "Remission maintenance and general gut health",
  },
  {
    name: "Plant-Based Diet",
    condition: "Both",
    category: "Supportive",
    evidence: "Promising",
    summary:
      "A diet centred on vegetables, fruits, legumes, wholegrains, nuts and seeds with minimal or no animal products. Multiple 2024–2025 studies show positive effects on the gut microbiome and inflammation markers in IBD.",
    howItWorks:
      "Plant foods are rich in polyphenols, antioxidants, and prebiotic fibre that feed beneficial gut bacteria and reduce inflammatory markers. A diverse plant-based diet is associated with greater gut microbiome diversity.",
    howLong:
      "A long-term lifestyle approach. Allow at least 3 months before fully assessing benefit on IBD symptoms.",
    reintroduction:
      "If transitioning from a standard diet, introduce plant foods gradually to allow the gut to adjust. Raw legumes and cruciferous vegetables can cause gas — cook thoroughly and introduce slowly.",
    worthKnowing:
      "Nutritional monitoring is important — particularly Vitamin B12, iron, zinc, and Vitamin D, which are commonly deficient in IBD and can be further affected by plant-based eating. Work with a dietitian.",
    individual:
      "Some people find high-fibre plant foods difficult during flares. During active disease, cooked and peeled vegetables are better tolerated than raw. A plant-based diet may be more suitable during remission.",
    suits: "Remission maintenance and microbiome support",
  },
  {
    name: "Low FODMAP Diet",
    condition: "Both",
    category: "Supportive",
    evidence: "Promising",
    summary:
      "A diet that reduces fermentable carbohydrates that can cause gas, bloating, and diarrhoea. Originally developed for IBS, it has shown benefit for symptom management in both Crohn's and UC patients — particularly those with overlapping IBS symptoms.",
    howItWorks:
      "FODMAPs are fermentable carbohydrates that draw water into the gut and are fermented by gut bacteria, producing gas. Reducing them can significantly ease symptoms — though importantly this does not reduce gut inflammation.",
    howLong:
      "The elimination phase lasts 2 to 6 weeks only — it is not meant to be followed long-term. After this, foods are systematically reintroduced to identify personal triggers.",
    reintroduction:
      "Reintroduction is a critical step. Reintroduce one FODMAP group at a time over 3 days, then rest for 3 days before trying the next group. This identifies your personal triggers rather than avoiding everything forever.",
    worthKnowing:
      "Important: Low FODMAP does not reduce inflammation — it only manages symptoms. If you have active inflammation, you need medical treatment alongside this diet. Long-term restriction of all FODMAPs is not recommended as it reduces gut microbiome diversity.",
    individual:
      "Most useful for people in remission who still experience IBS-type symptoms. Less suitable during active flares. Individual FODMAP triggers vary enormously — the reintroduction phase is essential.",
    suits:
      "Symptom management during remission — especially with overlapping IBS",
  },
  {
    name: "Low Residue Diet",
    condition: "UC",
    category: "Supportive",
    evidence: "Promising",
    summary:
      "A diet that reduces the amount of undigested material (residue) passing through the colon. Widely used during UC flares to reduce stool frequency, urgency, and cramping while the bowel is inflamed and healing.",
    howItWorks:
      "By limiting high-fibre and hard-to-digest foods, the low residue diet reduces the volume and frequency of material moving through an inflamed colon. This can ease urgency, cramping, and the number of bowel movements per day — giving the colon some relief during active disease.",
    howLong:
      "Short-term only — typically used during active flares for 2 to 6 weeks. It is not intended as a long-term approach as it restricts many nutritious foods. Once symptoms settle, food variety should be gradually reintroduced.",
    reintroduction:
      "Reintroduce higher-fibre foods one at a time as symptoms improve. Start with well-cooked, peeled vegetables before moving to raw vegetables, skins, and wholegrains. Move at whatever pace feels comfortable.",
    worthKnowing:
      "A low residue diet manages symptoms — it does not treat the underlying inflammation. It should always be used alongside your prescribed medical treatment, not instead of it. Nutritional gaps are possible on this diet, so dietitian support is recommended if following it for more than 2 weeks.",
    individual:
      "Very effective for some people during UC flares; others find it makes little difference. Tolerance of specific foods varies — use this as a general framework and adjust based on your own response. Discuss with your gastroenterologist or dietitian before starting.",
    suits: "Active UC flares — symptom relief and bowel rest",
  },
  {
    name: "Carnivore / Ketogenic Diet",
    condition: "Both",
    category: "Experimental",
    evidence: "Anecdotal",
    summary:
      "A diet consisting primarily or exclusively of animal products — meat, fish, eggs, and animal fats — with minimal or no plant foods. A 2024 case series of 10 IBD patients reported universal clinical improvement. However this is very early-stage evidence.",
    howItWorks:
      "Proponents suggest that eliminating plant fibres reduces fermentation and gut irritation, while ketone bodies produced on a very low carbohydrate diet may have anti-inflammatory effects. The mechanisms are not yet well understood.",
    howLong:
      "Those who report benefit typically see changes within 4 to 12 weeks. If no improvement after 12 weeks, it is unlikely to be the right approach for you.",
    reintroduction:
      "If reintroducing foods after a carnivore period, do so very slowly — one food at a time over several days. The gut microbiome changes significantly on this diet and reintroduction requires care.",
    worthKnowing:
      "Critical balance of evidence: Some people with IBD report significant improvement on a carnivore diet. However, population studies show that carnivore dietary patterns are associated with greater likelihood of developing IBD in the first place. Long-term nutritional risks include fibre deficiency, vitamin C deficiency, and cardiovascular concerns. This is not a diet to try without medical supervision and regular monitoring.",
    individual:
      "Highly individual — some people report life-changing improvement while others experience worsening symptoms. The evidence is insufficient to recommend this diet broadly. If you are curious, discuss it with your gastroenterologist first and ensure regular blood monitoring.",
    suits: "Experimental only — not recommended without medical supervision",
  },
  {
    name: "Autoimmune Protocol (AIP)",
    condition: "Both",
    category: "Experimental",
    evidence: "Anecdotal",
    summary:
      "A highly restrictive elimination diet derived from the Paleo diet that removes grains, legumes, dairy, eggs, nuts, seeds, nightshades, and all processed foods. Widely reported anecdotally by IBD patients but limited clinical trial data exists.",
    howItWorks:
      "The AIP aims to remove foods thought to trigger immune responses and gut permeability, while emphasising nutrient-dense foods. The reintroduction phase is designed to identify personal food triggers.",
    howLong:
      "The elimination phase typically lasts 30 to 90 days minimum before beginning reintroduction. Do not extend elimination beyond 90 days without dietitian support due to nutritional risk.",
    reintroduction:
      "Reintroduction is the most important phase. Introduce one food at a time every 5 to 7 days. Monitor symptoms carefully. Many people find they can successfully reintroduce a number of eliminated foods.",
    worthKnowing:
      "The elimination phase is very restrictive and nutritional deficiencies are a real risk if not carefully managed. Some people feel significantly better; others find it unsustainable. Limited formal clinical trial evidence in IBD specifically.",
    individual:
      "Highly individual. The reintroduction phase often reveals that individual trigger foods — not entire food groups — are the problem. Work with a dietitian experienced in elimination diets.",
    suits: "Experimental — identifying personal food triggers",
  },
];

interface Recipe {
  name: string;
  category: "Flare-friendly" | "Remission-friendly";
  suitsDiets: string[];
  evidence: EvidenceType;
  description: string;
  ingredients: string[];
  method: string[];
  tip: string;
}

const recipes: Recipe[] = [
  {
    name: "Gentle Chicken & Rice Congee",
    category: "Flare-friendly",
    suitsDiets: ["SCD", "Low FODMAP", "CDED"],
    evidence: "Anecdotal",
    description:
      "A soft, easily digestible rice porridge with poached chicken. One of the most universally tolerated comfort foods reported by people with IBD during flares. Warm, nourishing and gentle on the gut.",
    ingredients: [
      "1 cup white rice",
      "6 cups low-sodium chicken broth (homemade or additive-free)",
      "200g chicken breast",
      "1 tsp fresh ginger, finely grated",
      "Salt to taste",
      "Spring onion tips (green part only — low FODMAP) to serve",
    ],
    method: [
      "Place rice and broth in a large pot and bring to a gentle boil",
      "Add chicken breast whole to the pot",
      "Reduce heat and simmer uncovered for 45 to 60 minutes, stirring occasionally, until rice breaks down into a thick porridge",
      "Remove chicken, shred finely and return to pot",
      "Add ginger and season gently with salt",
      "Serve warm — small portions are easier to tolerate during a flare",
    ],
    tip: "Ginger has mild anti-nausea properties and is generally well tolerated. Avoid adding onion or garlic during a flare as these are high FODMAP.",
  },
  {
    name: "Steamed Salmon with Mashed Pumpkin",
    category: "Flare-friendly",
    suitsDiets: ["SCD", "CDED", "Mediterranean", "Carnivore"],
    evidence: "Anecdotal",
    description:
      "Soft steamed salmon with smooth pumpkin mash. Salmon provides easily absorbed protein and omega-3 fatty acids from whole food sources, which are generally better tolerated than supplements in IBD. ⚠️ Butternut pumpkin may not suit everyone in larger amounts — see the recipe disclaimer above.",
    ingredients: [
      "150g salmon fillet, skin removed",
      "300g butternut pumpkin, peeled and cubed",
      "1 tbsp olive oil",
      "Salt to taste",
      "Fresh lemon juice",
    ],
    method: [
      "Steam or boil pumpkin until very soft — approximately 15 minutes",
      "Mash pumpkin with olive oil and salt until completely smooth — no lumps",
      "Steam salmon fillet for 8 to 10 minutes until cooked through and flaky",
      "Serve salmon on top of pumpkin mash with a squeeze of fresh lemon",
    ],
    tip: "Pumpkin is one of the most easily digested vegetables and is low FODMAP in moderate serves. Steaming preserves nutrients better than boiling.",
  },
  {
    name: "Bone Broth",
    category: "Flare-friendly",
    suitsDiets: ["SCD", "CDED", "Carnivore", "AIP"],
    evidence: "Anecdotal",
    description:
      "A slow-simmered broth rich in gelatine, collagen, and minerals. Widely reported by IBD patients as soothing during flares and supportive of gut lining health. Easy to sip and requires minimal digestive effort.",
    ingredients: [
      "1kg chicken carcass or beef bones (ask your butcher)",
      "2 tbsp apple cider vinegar",
      "2 carrots, roughly chopped",
      "2 celery stalks, roughly chopped",
      "1 bay leaf",
      "Enough cold water to cover",
    ],
    method: [
      "Place bones in a large pot and cover with cold water",
      "Add apple cider vinegar and let sit for 30 minutes — this helps draw minerals from the bones",
      "Bring to a boil, then reduce to the lowest possible simmer",
      "Simmer for 12 to 24 hours for chicken bones, 24 to 48 hours for beef bones",
      "Strain through a fine mesh sieve and discard solids",
      "Season lightly with salt and sip warm, or use as a base for soups",
    ],
    tip: "Store in the fridge for up to 5 days or freeze in portions. The broth should gel when cold — this indicates a good gelatine content.",
  },
  {
    name: "Smooth Banana & Pumpkin Smoothie",
    category: "Flare-friendly",
    suitsDiets: ["SCD", "Plant-based", "Mediterranean"],
    evidence: "Anecdotal",
    description:
      "A gentle, nourishing smoothie that provides easily absorbed carbohydrates, potassium and natural sugars — helpful during flares when solid food is difficult. No raw fibre, no high FODMAP fruits. ⚠️ Banana and pumpkin may not suit everyone in larger amounts — see the recipe disclaimer above. ⚠️ Banana and pumpkin may not suit everyone in larger amounts — see the recipe disclaimer above.",
    ingredients: [
      "1 ripe banana (frozen for a thicker texture)",
      "100g cooked and cooled pumpkin",
      "200ml lactose-free milk or coconut milk",
      "1 tsp pure maple syrup (optional)",
      "Pinch of cinnamon",
    ],
    method: [
      "Add all ingredients to a blender",
      "Blend until completely smooth",
      "Add extra milk if needed to reach desired consistency",
      "Serve immediately at room temperature — cold drinks can aggravate cramping for some people",
    ],
    tip: "Ripe bananas are lower in resistant starch and easier to digest than unripe ones. Avoid adding seeds, raw spinach or high-fibre additions during a flare.",
  },
  {
    name: "Anti-Inflammatory Turmeric Chicken Soup",
    category: "Remission-friendly",
    suitsDiets: ["Mediterranean", "SCD", "CDED", "AIP"],
    evidence: "Promising",
    description:
      "A nourishing soup with chicken, vegetables and turmeric. Turmeric contains curcumin which has shown anti-inflammatory properties in IBD research. Black pepper is added to enhance absorption of curcumin significantly.",
    ingredients: [
      "400g chicken thigh, diced",
      "2 medium carrots, sliced",
      "2 zucchini, sliced",
      "1 cup spinach leaves",
      "1 litre additive-free chicken stock",
      "1 tsp turmeric powder",
      "½ tsp freshly ground black pepper",
      "1 tbsp olive oil",
      "Salt to taste",
      "Fresh lemon juice to serve",
    ],
    method: [
      "Heat olive oil in a large pot over medium heat",
      "Add chicken and cook until sealed — about 5 minutes",
      "Add carrots and stock and bring to a gentle simmer",
      "Add turmeric and black pepper and stir well",
      "Simmer for 20 minutes until carrots are tender",
      "Add zucchini and spinach in the last 5 minutes",
      "Season with salt and finish with fresh lemon juice",
    ],
    tip: "Black pepper dramatically increases curcumin absorption from turmeric — never skip it. This soup freezes well and can be made in batches.",
  },
  {
    name: "Baked Salmon with Roasted Vegetables",
    category: "Remission-friendly",
    suitsDiets: ["Mediterranean", "SCD", "Plant-based", "CDED"],
    evidence: "Promising",
    description:
      "A simple, anti-inflammatory meal rich in whole food omega-3 fatty acids, antioxidants and fibre. A cornerstone of the Mediterranean diet approach to IBD management.",
    ingredients: [
      "2 salmon fillets",
      "1 red capsicum, sliced",
      "1 zucchini, sliced",
      "1 cup cherry tomatoes",
      "2 tbsp olive oil",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh lemon to serve",
    ],
    method: [
      "Preheat oven to 200°C",
      "Toss vegetables in olive oil, oregano, salt and pepper",
      "Spread vegetables on a lined baking tray and roast for 15 minutes",
      "Place salmon fillets on top of vegetables",
      "Return to oven and bake for a further 12 to 15 minutes until salmon is cooked through",
      "Serve with fresh lemon",
    ],
    tip: "Whole food fish like salmon provides omega-3 fatty acids in a form that is generally well tolerated by people with IBD — unlike fish oil supplements which can aggravate symptoms in some individuals.",
  },
  {
    name: "Gut-Friendly Overnight Oats",
    category: "Remission-friendly",
    suitsDiets: ["Mediterranean", "Plant-based"],
    evidence: "Promising",
    description:
      "Oats soaked overnight become easier to digest and provide soluble fibre that feeds beneficial gut bacteria. A simple, nourishing breakfast suitable during remission.",
    ingredients: [
      "½ cup rolled oats",
      "¾ cup lactose-free milk or oat milk",
      "1 tbsp chia seeds",
      "1 tbsp pure maple syrup",
      "½ banana, sliced",
      "A small handful of blueberries",
    ],
    method: [
      "Combine oats, milk and chia seeds in a jar or container",
      "Stir well, seal and refrigerate overnight",
      "In the morning, stir again and add a little extra milk if too thick",
      "Top with banana and blueberries",
      "Add maple syrup to taste",
    ],
    tip: "Soaking oats overnight breaks down phytic acid making them easier to digest and nutrients more absorbable. Blueberries are rich in polyphenols that support gut health.",
  },
  {
    name: "Lemon & Herb Baked Chicken Thighs",
    category: "Remission-friendly",
    suitsDiets: ["SCD", "CDED", "Mediterranean", "Carnivore", "AIP"],
    evidence: "Anecdotal",
    description:
      "A simple, versatile protein-rich meal that suits almost every diet approach for IBD. Chicken thighs are more nutrient dense and forgiving to cook than breast meat.",
    ingredients: [
      "4 chicken thighs, bone-in skin-on",
      "2 tbsp olive oil",
      "Juice of 1 lemon",
      "1 tsp dried thyme",
      "1 tsp dried rosemary",
      "Salt and pepper to taste",
    ],
    method: [
      "Preheat oven to 200°C",
      "Mix olive oil, lemon juice, herbs, salt and pepper in a bowl",
      "Coat chicken thighs in the mixture",
      "Place in a baking dish skin side up",
      "Bake for 35 to 40 minutes until skin is golden and juices run clear",
      "Rest for 5 minutes before serving",
    ],
    tip: "Batch cook and refrigerate for up to 3 days. Pairs well with steamed rice or mashed pumpkin for a balanced, easy meal.",
  },
];

const evidenceColors: Record<
  EvidenceType,
  { bg: string; text: string; dot: string }
> = {
  "Strong clinical": { bg: "#EBF5FB", text: "#1A5276", dot: "#2980B9" },
  Promising: { bg: "#E9F7EF", text: "#1E8449", dot: "#27AE60" },
  "Traditional use": { bg: "#F5E6D3", text: "#7A5C2E", dot: "#B8895A" },
  Anecdotal: { bg: "#F4F6F7", text: "#566573", dot: "#95A5A6" },
  "Newly emerging": { bg: "#FDF2E9", text: "#A04000", dot: "#E67E22" },
};

const conditionLabel = (c: ConditionType) => {
  if (c === "Both") return "Crohn's & UC";
  return c === "UC" ? "Ulcerative colitis" : "Crohn's disease";
};

const sharedDifficultFoods = [
  {
    category: "High fructose & hidden sugars",
    detail:
      "Research shows high fructose consumption can accelerate IBD inflammation. Fructose hides under at least 61 different names on food labels including high fructose corn syrup, fruit juice concentrates, agave, and anything ending in 'ose' such as maltose or sucrose. The cumulative effect across multiple processed foods throughout the day is often the problem. Read ingredient lists carefully.",
  },
  {
    category: "Dairy — lactose vs casein sensitivity",
    detail:
      "Not all dairy reactions are the same. Lactose intolerance is more common in Crohn's patients with small bowel involvement, and can occur in UC too. However some people continue to react to dairy even after switching to lactose-free products — this may indicate casein sensitivity. A2 milk (available in Australian supermarkets) and goat or sheep dairy contain a different casein type that some people tolerate better. Discuss with your dietitian before eliminating dairy entirely.",
  },
  {
    category: "Ultra-processed foods",
    detail:
      "Emulsifiers, additives and preservatives in processed foods damage the gut barrier and alter the microbiome. Research shows consuming 10% of daily calories from ultra-processed foods is associated with a 19% increased risk of developing Crohn's disease.",
  },
  {
    category: "Alcohol",
    detail:
      "Alcohol increases intestinal permeability and can directly trigger flares in both Crohn's and UC. Even small amounts affect some individuals significantly.",
  },
  {
    category: "Spicy foods",
    detail:
      "Capsaicin in chilli and spicy foods can irritate the gut lining and worsen cramping during active disease. Tolerance varies significantly between individuals.",
  },
  {
    category: "Raw high-fibre vegetables",
    detail:
      "Raw vegetables like broccoli, cabbage and onion can be difficult during active disease. Cooking thoroughly and peeling skin significantly improves tolerability.",
  },
];

const crohnsDifficultFoods = [
  {
    category: "High-fat foods (Crohn's specific)",
    detail:
      "Fat malabsorption is common in Crohn's disease — particularly when the small bowel is affected. Fatty or fried foods can cause diarrhoea and cramping in some people. Healthy fats from olive oil and oily fish are generally better tolerated than animal or fried fats.",
  },
];

const ucDifficultFoods = [
  {
    category: "High-fibre foods during flares (UC specific)",
    detail:
      "During a UC flare, high-fibre foods — wholegrains, raw vegetables, legumes, nuts and seeds — can worsen urgency and stool frequency. A temporary low residue approach (see Low Residue Diet above) can help manage symptoms while the colon heals. Fibre is important long-term and should be gradually reintroduced once symptoms settle.",
  },
  {
    category: "Caffeine (UC specific)",
    detail:
      "Caffeine stimulates bowel contractions and can worsen urgency and frequency during a UC flare. Coffee, tea, energy drinks and cola are common triggers. Tolerance varies — some people manage small amounts fine, others need to avoid caffeine entirely during active disease.",
  },
];

export default function Diet() {
  const [activeCondition, setActiveCondition] = useState<
    "All" | "Crohn's" | "UC"
  >("All");
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Therapeutic" | "Supportive" | "Experimental"
  >("All");
  const [activeRecipeCategory, setActiveRecipeCategory] = useState<
    "All" | "Flare-friendly" | "Remission-friendly"
  >("All");
  const [expandedDiets, setExpandedDiets] = useState<Record<string, boolean>>(
    {},
  );
  const [expandedRecipes, setExpandedRecipes] = useState<
    Record<string, boolean>
  >({});

  const toggleDiet = (name: string) =>
    setExpandedDiets((prev) => ({ ...prev, [name]: !prev[name] }));
  const toggleRecipe = (name: string) =>
    setExpandedRecipes((prev) => ({ ...prev, [name]: !prev[name] }));

  const filteredDiets = diets.filter((d) => {
    const conditionMatch =
      activeCondition === "All" ||
      d.condition === activeCondition ||
      d.condition === "Both";
    const categoryMatch =
      activeCategory === "All" || d.category === activeCategory;
    return conditionMatch && categoryMatch;
  });

  const filteredRecipes =
    activeRecipeCategory === "All"
      ? recipes
      : recipes.filter((r) => r.category === activeRecipeCategory);

  const difficultFoods = [
    ...sharedDifficultFoods,
    ...(activeCondition === "Crohn's" ? crohnsDifficultFoods : []),
    ...(activeCondition === "UC" ? ucDifficultFoods : []),
    ...(activeCondition === "All"
      ? [...crohnsDifficultFoods, ...ucDifficultFoods]
      : []),
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      <Nav active="/diet" />
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Diet & Nutrition
        </h1>
        <p
          className="text-sm leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          An honest, evidence-based overview of dietary approaches for IBD —
          from strongly evidenced therapeutic diets to emerging and anecdotal
          approaches. Each is clearly labelled so you always know what the
          science says.
        </p>
        <div
          className="mt-4 rounded-xl px-6 py-4"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            🥗 Important — please read before making dietary changes
          </p>
          <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>
            Dietary changes in IBD can have significant effects — both positive
            and negative. Before making major changes to your diet, please speak
            with your gastroenterologist and an Accredited Practising Dietitian
            (APD) experienced in IBD.
          </p>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>
            💡 <span className="font-medium">Australian tip:</span> Ask your GP
            for a referral to a dietitian under a Chronic Disease Management
            (CDM) plan — you may be eligible for Medicare-subsidised dietitian
            appointments. Crohn&apos;s &amp; Colitis Australia can also help
            connect you with IBD-experienced dietitians.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(evidenceColors) as EvidenceType[]).map((label) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
              style={{
                backgroundColor: evidenceColors[label].bg,
                color: evidenceColors[label].text,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: evidenceColors[label].dot,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-6">
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Dietary Approaches
        </h2>
        <div
          className="flex gap-0 mb-6 border-b"
          style={{ borderColor: "var(--border-color)" }}
        >
          {(["All", "Crohn's", "UC"] as const).map((cond) => (
            <button
              key={cond}
              onClick={() => setActiveCondition(cond)}
              className="px-5 py-2 text-sm font-medium transition-all"
              style={{
                color:
                  activeCondition === cond
                    ? "var(--nav-bg)"
                    : "var(--text-secondary)",
                borderBottom:
                  activeCondition === cond
                    ? "2px solid var(--nav-bg)"
                    : "2px solid transparent",
                marginBottom: "-1px",
                backgroundColor: "transparent",
              }}
            >
              {cond === "All"
                ? "All conditions"
                : cond === "Crohn's"
                  ? "Crohn\u2019s disease"
                  : "Ulcerative colitis"}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {(["All", "Therapeutic", "Supportive", "Experimental"] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor:
                    activeCategory === cat ? "var(--nav-bg)" : "var(--bg-card)",
                  color:
                    activeCategory === cat ? "#ffffff" : "var(--text-primary)",
                  border: "1px solid var(--text-primary)",
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {filteredDiets.map((diet) => {
            const isExpanded = expandedDiets[diet.name];
            return (
              <div
                key={diet.name}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      backgroundColor: evidenceColors[diet.evidence].bg,
                      color: evidenceColors[diet.evidence].text,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: evidenceColors[diet.evidence].dot,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {diet.evidence}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--bg-page)",
                      color: "#2E8B6A",
                    }}
                  >
                    {diet.category}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                  >
                    {conditionLabel(diet.condition)}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {diet.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {diet.summary}
                </p>
                <div
                  className="rounded-xl px-4 py-3 mb-3"
                  style={{ backgroundColor: "var(--bg-accent)" }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Worth knowing
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {diet.worthKnowing}
                  </p>
                </div>
                <div
                  className="rounded-xl px-4 py-3 mb-3"
                  style={{ backgroundColor: "var(--bg-page)" }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Individual response varies
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {diet.individual}
                  </p>
                </div>
                <button
                  onClick={() => toggleDiet(diet.name)}
                  className="text-xs font-medium flex items-center gap-1"
                  style={{ color: "#2E8B6A" }}
                >
                  {isExpanded ? "▲ Hide" : "▼ Show"} how this diet works in
                  practice
                </button>
                {isExpanded && (
                  <div
                    className="mt-3 rounded-xl px-4 py-4 text-xs leading-relaxed space-y-3"
                    style={{
                      backgroundColor: "var(--bg-accent)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div>
                      <p className="font-semibold mb-1">How it works</p>
                      <p>{diet.howItWorks}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">How long to try it</p>
                      <p>{diet.howLong}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Reintroducing foods</p>
                      <p>{diet.reintroduction}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Recipes
        </h2>
        <p
          className="text-sm leading-relaxed max-w-3xl mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Simple, nourishing recipes suited to different stages of IBD. Each is
          labelled with which dietary approaches it suits.
        </p>
        <div
          className="rounded-xl px-6 py-4 mb-6"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            ⚠️ Please read before trying these recipes
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            These recipes are shared as general ideas only. Every person with
            IBD has different tolerances — what nourishes one person may not
            suit another. Conditions like SIBO, bowel strictures, bowel
            resection, histamine intolerance, gastroparesis, oxalate
            sensitivity, and individual food intolerances all affect what you
            can safely eat. If you are unsure what is right for you, please
            speak with an Accredited Practising Dietitian experienced in IBD
            before making significant dietary changes. Some ingredients in these
            recipes — including banana and butternut pumpkin — contain fructose
            or fructans and may not be well tolerated by everyone with IBD,
            particularly at larger serving sizes or during a flare. Individual
            tolerance varies significantly — speak with your dietitian before
            trying these recipes. For dietitian-approved recipes and to find an
            IBD-experienced dietitian in Australia, visit{" "}
            <a
              href="https://www.crohnsandcolitis.org.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "#2E8B6A" }}
            >
              Crohn&apos;s &amp; Colitis Australia
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {(["All", "Flare-friendly", "Remission-friendly"] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveRecipeCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor:
                    activeRecipeCategory === cat
                      ? "var(--nav-bg)"
                      : "var(--bg-card)",
                  color:
                    activeRecipeCategory === cat
                      ? "#ffffff"
                      : "var(--text-primary)",
                  border: "1px solid var(--text-primary)",
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => {
            const isExpanded = expandedRecipes[recipe.name];
            return (
              <div
                key={recipe.name}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        recipe.category === "Flare-friendly"
                          ? "#F5EEF8"
                          : "#D4EDE4",
                      color:
                        recipe.category === "Flare-friendly"
                          ? "#6C3483"
                          : "#1B4F3A",
                    }}
                  >
                    {recipe.category}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      backgroundColor: evidenceColors[recipe.evidence].bg,
                      color: evidenceColors[recipe.evidence].text,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: evidenceColors[recipe.evidence].dot,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {recipe.evidence}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {recipe.name}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {recipe.suitsDiets.map((d) => (
                    <span
                      key={d}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#EEF2FF", color: "#4338CA" }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {recipe.description}
                </p>
                <div
                  className="rounded-xl px-4 py-3 mb-3"
                  style={{ backgroundColor: "var(--bg-page)" }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    💡 Tip
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {recipe.tip}
                  </p>
                </div>
                <button
                  onClick={() => toggleRecipe(recipe.name)}
                  className="text-xs font-medium flex items-center gap-1"
                  style={{ color: "#2E8B6A" }}
                >
                  {isExpanded ? "▲ Hide" : "▼ Show"} ingredients & method
                </button>
                {isExpanded && (
                  <div
                    className="mt-3 rounded-xl px-4 py-4 text-xs leading-relaxed space-y-3"
                    style={{
                      backgroundColor: "var(--bg-accent)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div>
                      <p className="font-semibold mb-2">Ingredients</p>
                      <ul className="space-y-1">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>• {ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Method</p>
                      <ol className="space-y-1">
                        {recipe.method.map((step, i) => (
                          <li key={i}>
                            {i + 1}. {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-12 rounded-2xl p-8 border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-color)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            Foods many people with IBD find difficult
          </h2>
          <p
            className="text-xs mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            This is not a list of foods you must avoid — individual tolerances
            vary enormously. Effects can be subtle and build over time. A food
            and symptom diary is one of the most useful tools for identifying
            your personal triggers.
          </p>
          {activeCondition !== "All" && (
            <p
              className="text-xs mb-4 font-medium"
              style={{ color: "#2E8B6A" }}
            >
              Showing shared triggers plus entries specific to{" "}
              {activeCondition === "Crohn's"
                ? "Crohn\u2019s disease"
                : "Ulcerative colitis"}
              .
            </p>
          )}
          {activeCondition === "All" && (
            <p
              className="text-xs mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Use the condition tabs above to filter this list for your specific
              diagnosis.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {difficultFoods.map(({ category, detail }) => (
              <div
                key={category}
                className="rounded-xl px-4 py-3"
                style={{ backgroundColor: "var(--bg-page)" }}
              >
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {category}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer
        className="border-t py-8 text-center"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--footer-bg)",
        }}
      >
        <p
          className="text-sm flex items-center justify-center gap-2 flex-wrap"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>
            IBD Compass — Evidence-based information with hope at its heart
          </span>
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          Always consult your gastroenterologist and an Accredited Practising
          Dietitian before making significant dietary changes.
        </p>
      </footer>
    </div>
  );
}
