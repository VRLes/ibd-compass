"use client";
import Nav from "../components/Nav";
// app/treatments/page.tsx
// IBD Compass — Treatments Page

import { useState } from "react";
import Link from "next/link";

type EvidenceType =
  | "Strong clinical"
  | "Promising"
  | "Traditional use"
  | "Anecdotal"
  | "Newly emerging";

type ConditionType = "Both" | "Crohn's" | "UC";

interface Treatment {
  name: string;
  category: "Medical" | "Complementary" | "Comfort";
  condition: ConditionType;
  evidence: EvidenceType;
  ucNote?: string;
  description: string;
  worthKnowing: string;
  individual: string;
  sourceUrl?: string;
  sourceLabel?: string;
}

const treatments: Treatment[] = [
  // MEDICAL
  {
    name: "Biologics",
    category: "Medical",
    condition: "Both",
    evidence: "Strong clinical",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11794990/",
    sourceLabel: "Network meta-analysis, 6 biologics in Crohn's",
    ucNote:
      "Vedolizumab is particularly well-studied in UC and is often a preferred first-line biologic. Infliximab and ustekinumab are also approved for UC.",
    description:
      "Medications like adalimumab, infliximab, vedolizumab and ustekinumab that target specific proteins driving inflammation. The most effective treatments currently available for moderate to severe Crohn's disease.",
    worthKnowing:
      "May increase susceptibility to infections and require regular monitoring. Effectiveness can reduce over time in some people. Administered by injection or infusion.",
    individual:
      "Response varies significantly between individuals. What works well for one person may not work for another. Your gastroenterologist will consider your specific disease pattern, location, and history.",
  },
  {
    name: "JAK Inhibitors",
    category: "Medical",
    condition: "Both",
    evidence: "Newly emerging",
    sourceUrl: "https://www.nejm.org/doi/full/10.1056/NEJMoa2212728",
    sourceLabel: "NEJM — U-EXCEL/U-EXCEED phase 3 trials",
    description:
      "Upadacitinib is currently the only oral advanced therapy approved for Crohn's disease in Australia. Targets the JAK signalling pathway to reduce inflammation.",
    worthKnowing:
      "Newer class of medication — long-term safety data still emerging. Not suitable for everyone. Discuss carefully with your gastroenterologist.",
    individual:
      "Approved for moderate to severe Crohn's where other treatments haven't worked. Individual suitability depends on your overall health profile.",
  },
  {
    name: "Immunosuppressants",
    category: "Medical",
    condition: "Both",
    evidence: "Strong clinical",
    sourceUrl:
      "https://www.cochrane.org/evidence/CD000067_azathioprine-or-6-mercaptopurine-maintenance-remission-crohns-disease",
    sourceLabel: "Cochrane review — azathioprine/6-MP",
    description:
      "Medications including azathioprine and methotrexate that suppress the overactive immune response causing inflammation. Often used alongside biologics or as maintenance therapy.",
    worthKnowing:
      "Regular blood tests required to monitor liver function and blood counts. Takes weeks to months to reach full effect. Sun sensitivity with methotrexate.",
    individual:
      "Some people metabolise these medications differently — your doctor may test for this before prescribing. Not suitable during pregnancy.",
  },
  {
    name: "Corticosteroids",
    category: "Medical",
    condition: "Both",
    evidence: "Strong clinical",
    sourceUrl:
      "https://www.cochrane.org/evidence/CD000296_budesonide-treatment-people-active-crohns-disease",
    sourceLabel: "Cochrane review — budesonide",
    description:
      "Prednisolone and budesonide are used to rapidly reduce inflammation during flares. Effective for short-term relief but not suitable for long-term use.",
    worthKnowing:
      "Long-term use carries significant side effects including bone density loss, weight gain, and adrenal suppression. Used to bridge to longer-term treatments, not as ongoing therapy.",
    individual:
      "Budesonide has fewer systemic side effects than prednisolone and may suit some people better depending on disease location.",
  },
  {
    name: "Aminosalicylates (5-ASA)",
    category: "Medical",
    condition: "Both",
    evidence: "Strong clinical",
    sourceUrl: "https://gi.org/journals-publications/ebgi/zhai_dalal_sep2025/",
    sourceLabel: "2025 ACG guideline, Crohn's disease",
    description:
      "Medications like mesalazine that reduce inflammation directly in the gut lining. More commonly used in ulcerative colitis but sometimes prescribed in Crohn's disease.",
    worthKnowing:
      "Current international guidelines do not recommend 5-ASA as standard treatment for Crohn's disease. Evidence is stronger for ulcerative colitis. Discuss with your gastroenterologist whether it is appropriate for your specific situation.",
    individual:
      "Effectiveness depends heavily on where your Crohn's disease is located in the digestive tract.",
  },
  {
    name: "Exclusive Enteral Nutrition (EEN)",
    category: "Medical",
    condition: "Crohn's",
    evidence: "Strong clinical",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28815649/",
    sourceLabel: "Meta-analysis, paediatric Crohn's",
    description:
      "A liquid nutritional formula that replaces all food for a period of time — typically 6 to 8 weeks. Particularly effective in children and adolescents. Used to induce remission and heal the gut lining.",
    worthKnowing:
      "Requires commitment to a liquid-only diet. Can be taken orally or via a nasogastric tube. Nutritional support from a dietitian is essential.",
    individual:
      "Particularly effective in paediatric Crohn's. Adults may find it more challenging to maintain. Discuss with your care team whether it suits your circumstances.",
  },
  // COMPLEMENTARY
  {
    name: "Boswellia Serrata",
    category: "Complementary",
    condition: "Crohn's",
    evidence: "Promising",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/11215357/",
    sourceLabel: "Gerhardt et al. 2001 RCT vs mesalazine",
    description:
      "Resin from the Boswellia tree, used in traditional Ayurvedic medicine for centuries. Clinical studies have shown anti-inflammatory effects, with one RCT showing results comparable to mesalazine in IBD.",
    worthKnowing:
      "Can interact with anti-inflammatory medications. May affect blood clotting. Quality and standardisation of products varies significantly — look for Aflapin or AprèsFlex forms which are better absorbed.",
    individual:
      "Not suitable for everyone. Some people experience digestive upset. Always discuss with your gastroenterologist before starting, particularly if you are on other medications.",
  },
  {
    name: "Curcumin (Turmeric)",
    category: "Complementary",
    condition: "Both",
    evidence: "Promising",
    sourceUrl: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11973083/",
    sourceLabel: "Mohseni et al. 2025 meta-analysis",
    description:
      "The active compound in turmeric. Inhibits NF-κB, an inflammatory signalling protein central to IBD. Several randomised controlled trials show promise as a complementary therapy alongside conventional treatment.",
    worthKnowing:
      "Important: curcumin can be detrimental for some people. It has blood-thinning properties and can cause digestive irritation at high doses. May interfere with certain medications including blood thinners and chemotherapy. Poor absorption without piperine (black pepper extract). Gallstone risk at high doses.",
    individual:
      "Evidence is stronger for ulcerative colitis than Crohn's specifically. Individual response varies considerably. Do not take high-dose curcumin supplements without discussing with your gastroenterologist first.",
  },
  {
    name: "Saccharomyces Boulardii",
    category: "Complementary",
    condition: "Both",
    evidence: "Promising",
    sourceUrl:
      "https://www.cghjournal.org/article/S1542-3565(13)00278-4/fulltext",
    sourceLabel: "FLORABEST trial, 165 patients, 52 weeks",
    description:
      "A beneficial yeast-based probiotic that has been studied more than most other probiotics in Crohn's disease. Early small trials suggested a possible benefit for maintaining remission, but the largest and most rigorous trial to date did not find a significant effect.",
    worthKnowing:
      "Being yeast-based it is different to bacterial probiotics and generally better tolerated. However it is not suitable for people with yeast sensitivities or those who are immunocompromised. The largest trial (FLORABEST, 165 patients, 52 weeks) found S. boulardii did not significantly prevent relapse in Crohn's disease, though it was safe and well tolerated. Earlier positive results came from much smaller studies (20–32 patients).",
    individual:
      "Probiotic responses are highly individual. Multi-strain bacterial probiotics have inconsistent results in Crohn's. S. boulardii is one of the more studied probiotics, but current evidence for preventing relapse is mixed rather than strongly positive — it may still be worth discussing with your gastroenterologist as a well-tolerated option.",
  },
  {
    name: "Wormwood (Artemisia absinthium)",
    category: "Complementary",
    condition: "Crohn's",
    evidence: "Promising",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/17240130/",
    sourceLabel: "Omer et al. 2007 RCT",
    description:
      "An ancient medicinal herb with clinical studies showing it blocks TNF-α — the same inflammatory protein targeted by some biologic medications. One RCT showed steroid-sparing effects in Crohn's disease.",
    worthKnowing:
      "Raw wormwood plant is dangerous at high doses — only standardised preparations should be used. Can interact with medications. Not safe during pregnancy. Long-term safety data is limited.",
    individual:
      "This is a herb that requires careful medical supervision. Do not self-medicate with wormwood. Only use standardised preparations and always discuss with your gastroenterologist.",
  },
  {
    name: "Vitamin D",
    category: "Complementary",
    condition: "Both",
    evidence: "Promising",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/32385487/",
    sourceLabel: "Systematic review and meta-analysis",
    description:
      "People with Crohn's disease are frequently deficient in Vitamin D due to malabsorption and reduced sun exposure. Supplementation is widely supported and low Vitamin D is associated with increased disease activity.",
    worthKnowing:
      "Get your levels tested before supplementing — too much Vitamin D can be harmful. Your gastroenterologist or GP can prescribe the right dose based on your blood results.",
    individual:
      "Deficiency is very common in Crohn's but levels vary between individuals. Testing is essential to find your correct dose.",
  },
  {
    name: "Aloe Vera",
    category: "Complementary",
    condition: "Both",
    evidence: "Traditional use",
    sourceUrl:
      "https://onlinelibrary.wiley.com/doi/10.1111/j.1365-2036.2004.01902.x",
    sourceLabel: "Langmead et al. 2004 RCT",
    description:
      "Used in traditional medicine for thousands of years for digestive conditions. Some small studies show anti-inflammatory properties in the gut. More evidence exists for ulcerative colitis than Crohn's specifically.",
    worthKnowing:
      "Aloe latex (from the skin of the leaf) is a strong laxative and should be avoided — only use aloe vera gel products. Can interact with some medications.",
    individual:
      "Evidence in Crohn's specifically is limited. Individual responses vary. Choose food-grade inner leaf gel products only and discuss with your care team.",
  },
  // COMFORT
  {
    name: "Castor Oil Heat Pack",
    category: "Comfort",
    condition: "Both",
    evidence: "Anecdotal",
    description:
      "A cloth soaked in castor oil and applied warm to the abdomen. Widely used in traditional and folk medicine and reported by many Crohn's patients as soothing during cramping and pain. The warmth and gentle pressure appear to provide comfort during flares.",
    worthKnowing:
      "Important: oral castor oil is NOT recommended for people with Crohn's disease or IBD — it is a powerful laxative and can worsen symptoms. External castor oil packs are different. The benefit is likely from the heat rather than the castor oil penetrating the skin. Do not apply to broken or inflamed skin.",
    individual:
      "Many people find heat packs comforting during flares regardless of the oil component. If you find it soothing it may be worth continuing — but it is a comfort measure, not a treatment for inflammation. Always check with your doctor if you are unsure.",
  },
  {
    name: "Heat Therapy",
    category: "Comfort",
    condition: "Both",
    evidence: "Anecdotal",
    description:
      "Applying a warm heat pack or hot water bottle to the abdomen during cramping and pain. A simple, safe, and widely reported comfort measure among people living with Crohn's disease.",
    worthKnowing:
      "Avoid applying heat directly to skin without a cloth barrier. Do not use on areas of active surgical wounds or stomas. If pain is severe or sudden — seek medical attention rather than applying heat.",
    individual:
      "Many people find heat genuinely helpful for cramping. It does not treat inflammation but can make difficult moments more manageable.",
  },
  {
    name: "Gentle Movement & Walking",
    category: "Comfort",
    condition: "Both",
    evidence: "Promising",
    sourceUrl: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4022156/",
    sourceLabel: "Review — exercise in IBD",
    description:
      "Regular gentle exercise including walking has been shown in studies to positively affect gut motility, reduce stress hormones, and support overall wellbeing in people with IBD. It does not need to be intense to be beneficial.",
    worthKnowing:
      "During active flares, rest is often more appropriate. Listen to your body. Intense exercise can sometimes worsen symptoms during active disease.",
    individual:
      "Exercise tolerance varies greatly depending on disease activity, fatigue levels, and overall health. Even short gentle walks on good days can be beneficial.",
  },
  {
    name: "Surgery & Stoma Care",
    category: "Medical",
    condition: "Both",
    evidence: "Strong clinical",
    sourceUrl: "https://link.springer.com/article/10.1007/s00384-021-03857-2",
    sourceLabel: "Surgical management of Crohn's disease — review",
    description:
      "Surgery is sometimes part of the IBD journey — and for many people, it brings genuine relief after years of difficult symptoms. Procedures range from bowel resection to stoma formation (ileostomy or colostomy) and, for UC patients, the J-pouch (ileal pouch-anal anastomosis). A stoma may be temporary or permanent depending on your individual situation.",
    worthKnowing:
      "Surgical decisions are highly individual and depend on disease location, severity, and your overall health. A stoma is not a failure — many people find it life-changing in a positive way. Specialist stoma nurses provide essential support before and after surgery.",
    individual:
      "Ask the Assistant about surgical options, stoma care, or what to expect before and after surgery. Every surgical journey is different.",
  },
];
const evidenceColors: Record<
  EvidenceType,
  { bg: string; text: string; dot: string }
> = {
  "Strong clinical": { bg: "#e0f2fe", text: "#0c4a6e", dot: "#38bdf8" },
  Promising: { bg: "#fef9c3", text: "#713f12", dot: "#fde047" },
  "Traditional use": { bg: "#F5E6D3", text: "#7A5C2E", dot: "#B8895A" },
  Anecdotal: { bg: "#f5f5f4", text: "#44403c", dot: "#a8a29e" },
  "Newly emerging": { bg: "#fff7ed", text: "#7c2d12", dot: "#fb923c" },
};

const castorOilProtocol = (
  <div
    className="mt-4 rounded-xl p-4 text-xs"
    style={{ backgroundColor: "var(--bg-accent)", color: "var(--text-muted)" }}
  >
    <p className="font-semibold mb-2">🌿 How to make a castor oil heat pack</p>
    <p className="mb-2 font-medium">What you need:</p>
    <ul className="mb-3 space-y-1">
      <li>• Cold-pressed, hexane-free castor oil</li>
      <li>
        • A piece of wool flannel or soft cotton cloth (large enough to cover
        your abdomen)
      </li>
      <li>• A hot water bottle or heat pack</li>
      <li>• An old towel or plastic wrap to protect bedding</li>
    </ul>
    <p className="mb-2 font-medium">Protocol:</p>
    <ol className="mb-3 space-y-1 list-none">
      <li>
        1. Warm (do not boil) the castor oil slightly — it should be comfortably
        warm, not hot
      </li>
      <li>2. Soak the cloth in the oil until saturated but not dripping</li>
      <li>3. Lie down and place the cloth directly on your abdomen</li>
      <li>4. Place your hot water bottle or heat pack on top of the cloth</li>
      <li>5. Cover with an old towel to retain heat and protect bedding</li>
      <li>6. Rest for 30 to 60 minutes</li>
      <li>7. Remove and gently wipe skin clean with warm water</li>
    </ol>
    <p className="mb-2 font-medium">How often:</p>
    <p className="mb-3">
      Many people use 3 to 4 times per week during periods of discomfort. Daily
      use is also reported but listen to your body.
    </p>
    <p className="font-medium mb-1">Worth knowing:</p>
    <p>
      Store the used cloth in a sealed container in the fridge — it can be
      reused multiple times. Do not apply to broken skin, wounds, or stomas. If
      skin irritation occurs, discontinue use. Always check with your doctor if
      you are unsure.
    </p>
  </div>
);

export default function Treatments() {
  const [activeCondition, setActiveCondition] = useState<
    "All" | "Crohn's" | "UC"
  >("All");
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Medical" | "Complementary" | "Comfort"
  >("All");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {},
  );
  const [showCastorProtocol, setShowCastorProtocol] = useState(false);

  const toggleCard = (name: string) => {
    setExpandedCards((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const filtered = treatments.filter((t) => {
    const conditionMatch =
      activeCondition === "All" ||
      t.condition === activeCondition ||
      t.condition === "Both";
    const categoryMatch =
      activeCategory === "All" || t.category === activeCategory;
    return conditionMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Navigation */}
      <Nav active="/treatments" />
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 spt-10 pb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Treatments
        </h1>
        <p
          className="text-sm leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          An overview of medical, complementary, and comfort approaches for IBD
          — each clearly labelled by strength of evidence.
        </p>

        {/* Individual disclaimer */}
        <div
          className="mt-4 rounded-xl px-6 py-4"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            ⚠️ Every person with IBD is different
          </p>
          <p
            className="text-sm"
            style={{
              color: "var(--text-primary)",
            }}
          >
            What works well for one person may not suit another — and in some
            cases may cause harm. Always discuss any complementary therapy with
            your gastroenterologist before trying it. This page provides
            information only — not medical advice.
          </p>
        </div>
        {/* Condition Tabs */}
        <div className="max-w-6xl mx-auto px-6 pt-2 pb-0">
          <div
            className="flex gap-1 border-b"
            style={{ borderColor: "var(--border-color)" }}
          >
            {(["All", "Crohn's", "UC"] as const).map((cond) => (
              <button
                key={cond}
                onClick={() => setActiveCondition(cond)}
                className="px-6 py-3 text-sm font-medium transition-all"
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
                    ? "Crohn's disease"
                    : "Ulcerative colitis"}
              </button>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* Filter Buttons */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex flex-wrap gap-3">
          {(["All", "Medical", "Complementary", "Comfort"] as const).map(
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
      </div>
      {/* Evidence Legend */}
      <div className="max-w-6xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(evidenceColors) as EvidenceType[]).map((label) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-xs font-medium"
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
                }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
      {/* Treatment Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((treatment) => {
            const isExpanded = expandedCards[treatment.name];
            const isCastor = treatment.name === "Castor Oil Heat Pack";

            const howToUse: Record<
              string,
              { title: string; content: React.ReactNode }
            > = {
              "Exclusive Enteral Nutrition (EEN)": {
                title: "How EEN works in practice",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">What it is:</span> A
                      complete liquid nutritional formula that replaces all food
                      — giving your gut complete rest while maintaining full
                      nutrition.
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> Typically 6
                      to 8 weeks of liquid-only intake.
                    </p>
                    <p>
                      <span className="font-medium">How it&apos;s taken:</span>{" "}
                      Sipped orally throughout the day, or delivered via a
                      nasogastric tube if oral intake is difficult.
                    </p>
                    <p>
                      <span className="font-medium">
                        Formulas available in Australia:
                      </span>{" "}
                      Several specialist formulas are available — your
                      gastroenterologist or dietitian will recommend the right
                      one for your situation.
                    </p>
                    <p>
                      <span className="font-medium">What to expect:</span> The
                      first week can be challenging. Hunger, food cravings and
                      fatigue are common. Symptoms often begin improving by week
                      2 to 3.
                    </p>
                    <p>
                      <span className="font-medium">
                        Transitioning back to food:
                      </span>{" "}
                      Food is reintroduced slowly and carefully — usually guided
                      by a dietitian over several weeks. Rushing this step can
                      trigger a relapse.
                    </p>
                    <p>
                      <span className="font-medium">Getting support:</span> Ask
                      your gastroenterologist for a referral to a dietitian
                      experienced in IBD before starting. Crohn&apos;s &amp;
                      Colitis Australia can also help connect you with support.
                    </p>
                  </div>
                ),
              },
              "Boswellia Serrata": {
                title: "How to use Boswellia Serrata",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Best form:</span> Look for
                      standardised extracts labelled Aflapin or AprèsFlex —
                      these are significantly better absorbed than standard
                      Boswellia powder.
                    </p>
                    <p>
                      <span className="font-medium">
                        Typical dose in studies:
                      </span>{" "}
                      300mg to 500mg of standardised extract, 2 to 3 times daily
                      — but always follow product instructions and discuss with
                      your doctor.
                    </p>
                    <p>
                      <span className="font-medium">Take with food:</span>{" "}
                      Absorption is improved when taken with a meal containing
                      some fat.
                    </p>
                    <p>
                      <span className="font-medium">
                        When to expect results:
                      </span>{" "}
                      Studies suggest 4 to 8 weeks before meaningful results.
                      Don&apos;t judge too early.
                    </p>
                    <p>
                      <span className="font-medium">Quality matters:</span>{" "}
                      Supplement quality in Australia varies. Look for products
                      with a TGA-listed AUST L number on the label.
                    </p>
                  </div>
                ),
              },
              "Curcumin (Turmeric)": {
                title: "How to use Curcumin safely",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Absorption is key:</span>{" "}
                      Curcumin is poorly absorbed on its own. Look for products
                      containing piperine (black pepper extract) or use
                      phospholipid-complexed forms like Meriva or BCM-95.
                    </p>
                    <p>
                      <span className="font-medium">
                        Turmeric in food vs supplements:
                      </span>{" "}
                      Cooking turmeric into food provides very low doses.
                      Therapeutic effects in studies used standardised
                      supplements — these are very different things.
                    </p>
                    <p>
                      <span className="font-medium">
                        Typical dose in studies:
                      </span>{" "}
                      500mg to 1000mg of curcumin with piperine, 2 to 3 times
                      daily — but this varies. Do not self-prescribe high doses.
                    </p>
                    <p>
                      <span className="font-medium">
                        Who should NOT take curcumin supplements:
                      </span>{" "}
                      People on blood thinners (warfarin, aspirin), those with
                      gallstones or bile duct issues, people on chemotherapy,
                      and those with known sensitivity. High doses can worsen
                      some people&apos;s gut symptoms.
                    </p>
                    <p>
                      <span className="font-medium">Australia:</span> Look for
                      TGA-listed products with an AUST L number for quality
                      assurance.
                    </p>
                  </div>
                ),
              },
              "Saccharomyces Boulardii": {
                title: "How to use Saccharomyces Boulardii",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">
                        What makes it different:
                      </span>{" "}
                      S. boulardii is a yeast, not a bacterial probiotic. This
                      means it survives stomach acid better and is not affected
                      by antibiotics.
                    </p>
                    <p>
                      <span className="font-medium">Typical dose:</span> 250mg
                      to 500mg twice daily. Available in capsule or sachet form.
                    </p>
                    <p>
                      <span className="font-medium">
                        Timing with antibiotics:
                      </span>{" "}
                      Unlike bacterial probiotics, S. boulardii can be taken at
                      the same time as antibiotics — it won&apos;t be killed by
                      them.
                    </p>
                    <p>
                      <span className="font-medium">Storage:</span> Some forms
                      require refrigeration — check the product label.
                    </p>
                    <p>
                      <span className="font-medium">Who should avoid it:</span>{" "}
                      People who are immunocompromised or have a central venous
                      catheter should not take live yeast supplements without
                      medical supervision.
                    </p>
                    <p>
                      <span className="font-medium">
                        Common products in Australia:
                      </span>{" "}
                      Florastor and Saccharomyces boulardii by Blackmores are
                      available at most pharmacies.
                    </p>
                  </div>
                ),
              },
              "Wormwood (Artemisia absinthium)": {
                title: "How to use Wormwood safely",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">
                        Critical safety point:
                      </span>{" "}
                      Raw wormwood plant and high-dose wormwood tinctures are
                      dangerous. Only use standardised, commercially prepared
                      supplements.
                    </p>
                    <p>
                      <span className="font-medium">What to look for:</span>{" "}
                      Standardised extracts with a known percentage of
                      absinthin. Avoid products with unclear labelling.
                    </p>
                    <p>
                      <span className="font-medium">
                        Typical use in studies:
                      </span>{" "}
                      500mg standardised extract three times daily — but this
                      should only be trialled under medical supervision.
                    </p>
                    <p>
                      <span className="font-medium">Duration:</span> Studies
                      used wormwood for 10 weeks maximum. Long-term safety data
                      is not available.
                    </p>
                    <p>
                      <span className="font-medium">Who must avoid it:</span>{" "}
                      Pregnant or breastfeeding women, people with kidney or
                      liver disease, people on seizure medications or blood
                      thinners.
                    </p>
                    <p>
                      <span className="font-medium">
                        Our strong recommendation:
                      </span>{" "}
                      Do not try wormwood without first discussing it with your
                      gastroenterologist. This is one of the more potent herbal
                      treatments on this list.
                    </p>
                  </div>
                ),
              },
              "Aloe Vera": {
                title: "How to choose and use Aloe Vera",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Critical distinction:</span>{" "}
                      There are two very different parts of the aloe plant — the
                      inner gel (safe) and the latex from the outer leaf (a
                      powerful laxative that can be harmful, especially in IBD).
                    </p>
                    <p>
                      <span className="font-medium">What to buy:</span> Only use
                      products labelled &quot;inner leaf gel&quot; or
                      &quot;decolorised aloe vera&quot; — these have the latex
                      removed.
                    </p>
                    <p>
                      <span className="font-medium">Forms available:</span> Aloe
                      vera juice (inner leaf only), capsules, or gel. Avoid
                      products with added sugars, colours or preservatives.
                    </p>
                    <p>
                      <span className="font-medium">Typical use:</span> 50ml to
                      100ml of inner leaf aloe vera juice once or twice daily,
                      taken before meals. Start low and increase slowly.
                    </p>
                    <p>
                      <span className="font-medium">What to watch for:</span>{" "}
                      Any increase in diarrhoea or cramping — this may indicate
                      latex contamination in the product. Stop and switch
                      brands.
                    </p>
                    <p>
                      <span className="font-medium">Australia:</span> Look for
                      certified organic, inner leaf only products from health
                      food stores or pharmacies.
                    </p>
                  </div>
                ),
              },
              "Castor Oil Heat Pack": {
                title: "How to make and use a castor oil heat pack",
                content: (
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">What you need:</span>{" "}
                      Cold-pressed hexane-free castor oil · Wool flannel or soft
                      cotton cloth large enough to cover your abdomen · A hot
                      water bottle or heat pack · An old towel to protect
                      bedding.
                    </p>
                    <p>
                      <span className="font-medium">Protocol:</span>
                    </p>
                    <ol className="list-none space-y-1 pl-2">
                      <li>
                        1. Warm the castor oil gently — comfortably warm, not
                        hot
                      </li>
                      <li>
                        2. Soak the cloth until saturated but not dripping
                      </li>
                      <li>3. Lie down and place the cloth on your abdomen</li>
                      <li>4. Place your heat pack on top of the cloth</li>
                      <li>5. Cover with a towel to retain heat</li>
                      <li>6. Rest for 30 to 60 minutes</li>
                      <li>7. Wipe skin clean with warm water afterwards</li>
                    </ol>
                    <p>
                      <span className="font-medium">How often:</span> 3 to 4
                      times per week during discomfort. Listen to your body.
                    </p>
                    <p>
                      <span className="font-medium">Storage:</span> Store used
                      cloth in a sealed container in the fridge — reusable many
                      times.
                    </p>
                    <p>
                      <span className="font-medium">Do not use on:</span> Broken
                      skin, wounds, stomas, or areas of active inflammation.
                      Stop if skin irritation occurs.
                    </p>
                  </div>
                ),
              },
            };

            const hasHowTo = howToUse[treatment.name];

            return (
              <div
                key={treatment.name}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Evidence Badge */}
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1.5"
                  style={{
                    backgroundColor: evidenceColors[treatment.evidence].bg,
                    color: evidenceColors[treatment.evidence].text,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: evidenceColors[treatment.evidence].dot,
                      display: "inline-block",
                    }}
                  />
                  {treatment.evidence}
                </span>

                {/* Category Tag */}
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full ml-2"
                  style={{
                    backgroundColor: "var(--bg-page)",
                    color: "#2E8B6A",
                  }}
                >
                  {treatment.category}
                </span>
                {/* UC Note */}
                {activeCondition === "UC" && treatment.ucNote && (
                  <div
                    className="mt-3 rounded-xl px-4 py-3"
                    style={{
                      backgroundColor: "var(--bg-accent)",
                      borderLeft: "3px solid #2E8B6A",
                    }}
                  >
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      UC-specific
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {treatment.ucNote}
                    </p>
                  </div>
                )}

                <h3
                  className="text-lg font-semibold mt-3 mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {treatment.name}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {treatment.description}
                </p>

                {/* Worth Knowing */}
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
                    {treatment.worthKnowing}
                  </p>
                </div>

                {/* Source link */}
                {treatment.sourceUrl && (
                  <a
                    href={treatment.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline inline-block mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    📚 {treatment.sourceLabel || "View source study"}
                  </a>
                )}

                {/* Individual Note */}
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
                    {treatment.individual}
                  </p>
                </div>

                {/* How To Use Dropdown */}
                {hasHowTo && (
                  <div>
                    <button
                      onClick={() => toggleCard(treatment.name)}
                      className="text-xs font-medium flex items-center gap-1 mt-1"
                      style={{ color: "#2E8B6A" }}
                    >
                      {isExpanded ? "▲ Hide" : "▼ Show"} {hasHowTo.title}
                    </button>
                    {isExpanded && (
                      <div
                        className="mt-3 rounded-xl px-4 py-4 text-xs leading-relaxed space-y-1"
                        style={{
                          backgroundColor: "var(--bg-accent)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {hasHowTo.content}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
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
          Always consult your gastroenterologist before making changes to your
          treatment.
        </p>
      </footer>
    </div>
  );
}
