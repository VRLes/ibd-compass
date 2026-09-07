"use client";

// app/research/page.tsx
// IBD Compass — Research Page

import { useState } from "react";
import Link from "next/link";
import Nav from "../components/Nav";

type ResearchCategory =
  | "All"
  | "New Treatments"
  | "Gut Science"
  | "Diet & Lifestyle"
  | "Future Therapies";

interface ResearchItem {
  title: string;
  category: Exclude<ResearchCategory, "All">;
  date: string;
  source: string;
  sourceUrl: string;
  stage: "Approved" | "Phase 3" | "Phase 2" | "Early Research" | "Ongoing";
  region: string;
  australiaNote?: string;
  summary: string;
  whatItMeans: string;
  hopeFactor: string;
}

const researchItems: ResearchItem[] = [
  // NEW TREATMENTS
  {
    title: "Two new IL-23 inhibitors approved for Crohn's disease",
    category: "New Treatments",
    date: "January–March 2025",
    source: "US FDA / The Lancet",
    sourceUrl:
      "https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-omvohr-mirikizumab-mrkz-crohns-disease",
    stage: "Approved",
    region: "USA (FDA approved)",
    australiaNote:
      "TGA approval status in Australia may differ — speak with your gastroenterologist about availability.",
    summary:
      "Two new medications — mirikizumab (Omvoh) and guselkumab (Tremfya) — received FDA approval in the USA for moderate to severe Crohn's disease in early 2025. Both target a protein called IL-23, which drives gut inflammation. Guselkumab is notable for being the first IL-23 inhibitor that can be self-injected at home rather than requiring a clinic infusion.",
    whatItMeans:
      "People with moderate to severe Crohn's who haven't responded to existing biologics now have more options. In this trial, guselkumab showed better endoscopic outcomes than ustekinumab — meaning improved gut healing, not just symptom relief. These are not cures but represent meaningful progress. Which treatment suits any individual is a decision for a gastroenterologist.",
    hopeFactor:
      "More treatment options mean more chances to find what works for you individually.",
  },
  {
    title: "Head-to-head trial compares guselkumab and ustekinumab",
    category: "New Treatments",
    date: "July 2025",
    source: "The Lancet",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/40684778/",
    stage: "Phase 3",
    region: "International clinical trial",
    australiaNote:
      "Not yet confirmed as available in Australia — discuss with your gastroenterologist.",
    summary:
      "A head-to-head trial published in The Lancet directly compared guselkumab and ustekinumab (a widely used biologic). Guselkumab achieved better long-term outcomes in the trial, including endoscopic response — meaning healing of the gut lining — and clinical remission.",
    whatItMeans:
      "This is significant because most new drugs are only compared against placebo — not existing treatments. Showing superiority over an established drug in a real trial is a higher standard of evidence. It supports IL-23 inhibitors becoming a preferred first-line advanced therapy for Crohn's.",
    hopeFactor:
      "The bar for what remission looks like is rising — deeper healing is becoming the goal, not just symptom control.",
  },
  {
    title:
      "Tulisokibart — a new monoclonal antibody shows strong remission rates",
    category: "New Treatments",
    date: "October 2025",
    source: "The Lancet Gastroenterology & Hepatology / Cedars-Sinai",
    sourceUrl:
      "https://www.cedars-sinai.org/newsroom/study-crohns-disease-investigational-treatment-shows-potential-for-achieving-remission/",
    stage: "Phase 2",
    region: "International clinical trial",
    australiaNote:
      "Currently in clinical trials — not yet available as a treatment anywhere.",
    summary:
      "Cedars-Sinai researchers developed a new monoclonal antibody called tulisokibart that targets a protein called TL1A — a completely different mechanism to existing biologics. A Phase II trial showed significant numbers of moderate to severe Crohn's patients achieved remission, including those who had failed other treatments.",
    whatItMeans:
      "TL1A is a new target that hasn't been used in approved Crohn's treatments before. For people who have exhausted existing biologic options, a therapy with a completely different mechanism is genuinely significant.",
    hopeFactor:
      "A new pathway means new hope for people who haven't responded to existing treatments.",
  },
  {
    title: "Ustekinumab approved for children with Crohn's disease",
    category: "New Treatments",
    date: "2026",
    source: "US FDA",
    sourceUrl:
      "https://www.jnj.com/media-center/press-releases/stelara-pediatric-crohns-disease-fda-approval-j-j-statement",
    stage: "Approved",
    region: "USA (FDA approved)",
    australiaNote:
      "TGA approval status for paediatric use in Australia may differ — speak with your gastroenterologist.",
    summary:
      "The FDA approved ustekinumab for children aged 2 and older with moderately to severely active Crohn's disease in 2026 — giving younger patients access to another advanced biologic treatment option. This is significant as treatment options for children with Crohn's have historically been more limited.",
    whatItMeans:
      "Children and adolescents with Crohn's disease now have more approved treatment options in the USA, reducing reliance on off-label use of adult medications.",
    hopeFactor:
      "Younger patients deserve the same quality of care as adults — this is a step in that direction.",
  },
  // GUT SCIENCE
  {
    title: "AI cracks a 25-year mystery about gut immune cells in Crohn's",
    category: "Gut Science",
    date: "November 2025",
    source: "UC San Diego / ScienceDaily",
    sourceUrl: "https://www.sciencedaily.com/releases/2025/11/251103093012.htm",
    stage: "Early Research",
    region: "USA",
    summary:
      "UC San Diego researchers used artificial intelligence combined with molecular biology to finally understand how immune cells in the gut decide between causing inflammation and promoting healing — a process that goes wrong in Crohn's disease. This decision-making process had been poorly understood for 25 years.",
    whatItMeans:
      "Understanding why gut immune cells get stuck in an inflammatory state rather than switching to healing mode opens the door to more targeted treatments that work with the body's own repair systems rather than simply suppressing the immune response broadly.",
    hopeFactor:
      "AI is accelerating discoveries that would have taken decades — this is a genuine leap forward in understanding Crohn's at its root.",
  },
  {
    title: "CARD9 gene discovery leads to new drug candidates",
    category: "Gut Science",
    date: "January 2026",
    source: "Harvard Medical School / Broad Institute / Cell journal",
    sourceUrl:
      "https://www.broadinstitute.org/news/scientists-develop-molecules-may-treat-crohns-disease",
    stage: "Early Research",
    region: "USA",
    summary:
      "Scientists at Harvard, MIT's Broad Institute and Johnson & Johnson developed small molecules that mimic a rare protective gene variant called CARD9 — which some people naturally have that makes them significantly less likely to develop IBD. The molecules reduced inflammation in both human immune cells and animal models.",
    whatItMeans:
      "Rather than broadly suppressing the immune system, this approach works by mimicking something the body's own genetics can already do. It offers a roadmap for more precise, potentially safer treatments developed directly from human genetic data.",
    hopeFactor:
      "Our own genetics are pointing the way to better treatments — this is precision medicine at its most promising.",
  },
  {
    title:
      "Gut lining repair breakthrough — shifting focus from inflammation to regeneration",
    category: "Gut Science",
    date: "April 2026",
    source: "University of Houston",
    sourceUrl:
      "https://www.uh.edu/news-events/stories/2026/april/04272026-crohns-disease-treatment.php",
    stage: "Early Research",
    region: "USA",
    summary:
      "University of Houston researchers identified a stress signal that stays permanently switched on in Crohn's patients, preventing the gut lining from healing itself. Using low doses of existing cancer medications they found a way to bypass this signal, allowing gut cells to regenerate. The research used patient-derived 'mini-organs' grown in the lab.",
    whatItMeans:
      "Most current Crohn's treatments focus on dampening inflammation — attacking the problem from one direction. This research focuses on the other side: helping the gut lining actually repair itself. Both approaches together could be more powerful than either alone.",
    hopeFactor:
      "Teaching the gut to heal itself is a fundamentally different and exciting approach to Crohn's treatment.",
  },
  {
    title: "Live bacterial therapy based on F. prausnitzii shows promise",
    category: "Gut Science",
    date: "2025",
    source: "Nature Communications",
    sourceUrl: "https://www.nature.com/articles/s41467-026-72375-y",
    stage: "Phase 2",
    region: "International clinical trial",
    summary:
      "A clinical trial of EXL01 — a live bacterial therapy based on Faecalibacterium prausnitzii, a beneficial gut bacteria that is significantly depleted in Crohn's patients — showed it can be safely administered and produces measurable immune gene changes in the gut lining.",
    whatItMeans:
      "F. prausnitzii is consistently found at low levels in people with Crohn's disease. Being able to safely administer it as a therapy and see immune changes in the gut is an early but genuinely promising step toward microbiome-based treatments.",
    hopeFactor:
      "Restoring what's missing rather than just suppressing what's overactive is a compelling direction for IBD research.",
  },
  // DIET & LIFESTYLE
  {
    title: "Low-emulsifier diet reduces inflammation markers in Crohn's",
    category: "Diet & Lifestyle",
    date: "January 2026",
    source: "2026 Crohn's & Colitis Congress — ADDapt Trial",
    sourceUrl:
      "https://news.gastro.org/issues/2026/january/new-crohns-data-spotlight-promising-therapies/",
    stage: "Ongoing",
    region: "International",
    summary:
      "The ADDapt trial presented at the 2026 Crohn's & Colitis Congress found that patients following a low-emulsifier diet were significantly more likely to experience symptom improvement and reductions in faecal calprotectin — an inflammatory marker — over eight weeks compared to those on an emulsifier-rich diet.",
    whatItMeans:
      "Emulsifiers are added to processed foods to improve texture and shelf life — they are found in countless everyday products including bread, margarine, ice cream, and sauces. This trial adds to growing evidence that what we eat affects gut inflammation in Crohn's disease in specific, measurable ways.",
    hopeFactor:
      "Dietary changes are something people can act on today — and the evidence for their impact is getting stronger.",
  },
  {
    title: "Stress plus late-night eating compounds gut damage",
    category: "Diet & Lifestyle",
    date: "May 2026",
    source: "ScienceDaily",
    sourceUrl: "https://www.sciencedaily.com/releases/2026/04/260429102026.htm",
    stage: "Ongoing",
    region: "International",
    summary:
      "New research analysing thousands of people found that those under high stress who also ate a large portion of their calories late at night experienced compounding negative effects on gut health — significantly worse than either factor alone. Chronic stress already disrupts the gut-brain axis, and late-night eating appears to amplify this effect.",
    whatItMeans:
      "For people with Crohn's, this research reinforces that stress management and meal timing both matter — not just what you eat but when you eat it, particularly under psychological stress.",
    hopeFactor:
      "Understanding these interactions gives people more tools to work with beyond medication alone.",
  },
  // FUTURE THERAPIES
  {
    title: "Stem cell intestinal models accelerate drug discovery",
    category: "Future Therapies",
    date: "May 2026",
    source: "ScienceDaily",
    sourceUrl: "https://www.sciencedaily.com/releases/2026/05/260508003127.htm",
    stage: "Early Research",
    region: "International",
    summary:
      "Researchers developed a stem cell-based model of the human intestine that replicates how the gut behaves in IBD. After testing thousands of compounds using this model, they identified glycyrrhizin — a natural substance found in liquorice root — as a potentially promising agent for IBD. This kind of screening would previously have taken years and required animal testing.",
    whatItMeans:
      "Lab-grown 'mini-gut' models allow researchers to test thousands of potential treatments quickly and in human tissue rather than animals. This accelerates the path from discovery to clinical trial significantly.",
    hopeFactor:
      "The speed of drug discovery is accelerating — treatments that might have taken 20 years to find are now being identified in a fraction of that time.",
  },
  {
    title: "Multispecific antibodies — the next generation of biologics",
    category: "Future Therapies",
    date: "2025",
    source: "Johnson & Johnson Innovative Medicine",
    sourceUrl:
      "https://www.jnj.com/innovation/inside-johnson-johnson-decades-long-quest-to-develop-effective-treatments-for-ibd",
    stage: "Early Research",
    region: "International",
    summary:
      "Researchers are developing multispecific antibodies — engineered proteins that can target more than one inflammatory protein simultaneously. Rather than blocking one pathway, these next-generation biologics could address multiple drivers of inflammation at once, potentially achieving remission in patients who don't respond to current single-target therapies.",
    whatItMeans:
      "Current biologics target one protein at a time. Targeting multiple inflammatory pathways simultaneously could raise the ceiling of what treatment can achieve for people who haven't responded to existing options.",
    hopeFactor:
      "The next generation of treatments is already being designed — and they are more sophisticated than anything currently available.",
  },
];
const stageColors: Record<ResearchItem["stage"], { bg: string; text: string }> =
  {
    Approved: { bg: "#D4EDE4", text: "#1B4F3A" },

    "Phase 3": { bg: "#D6EAF8", text: "#1A5276" },
    "Phase 2": { bg: "#FEF9E7", text: "#7D6608" },
    "Early Research": { bg: "#F5EEF8", text: "#6C3483" },
    Ongoing: { bg: "#FDEDEC", text: "#922B21" },
  };

const categoryColors: Record<
  Exclude<ResearchCategory, "All">,
  { bg: string; text: string }
> = {
  "New Treatments": { bg: "#D4EDE4", text: "#1B4F3A" },
  "Gut Science": { bg: "#D6EAF8", text: "#1A5276" },
  "Diet & Lifestyle": { bg: "#FEF9E7", text: "#7D6608" },
  "Future Therapies": { bg: "#F5EEF8", text: "#6C3483" },
};

export default function Research() {
  const [activeCategory, setActiveCategory] = useState<ResearchCategory>("All");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleItem = (title: string) => {
    setExpandedItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const filtered =
    activeCategory === "All"
      ? researchItems
      : researchItems.filter((r) => r.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Navigation */}
      <Nav active="/research" />
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Latest Research
        </h1>
        <p
          className="text-sm leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          IBD research is moving faster than ever. Here we summarise the most
          significant recent findings in plain language — so you can stay
          informed without needing a medical degree.
        </p>

        {/* Global Disclaimer */}
        <div
          className="mt-4 rounded-xl px-6 py-4"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <p
            className="text-sm font-semibold mb-1"
            style={{
              color: "var(--text-primary)",
            }}
          >
            🌍 Important — research and approvals vary by country
          </p>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>
            Information on this page reflects international research as of
            2025–2026. Drug approval in one country does not mean a treatment is
            available in Australia or your region. The TGA (Therapeutic Goods
            Administration) regulates medicines in Australia independently of
            the US FDA or European EMA. Always speak with your
            gastroenterologist about what treatments are currently available and
            suitable for you.
          </p>
        </div>

        {/* Stage Legend */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(stageColors) as ResearchItem["stage"][]).map(
            (stage) => (
              <span
                key={stage}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: stageColors[stage].bg,
                  color: stageColors[stage].text,
                }}
              >
                {stage}
              </span>
            ),
          )}
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex flex-wrap gap-3">
          {(
            [
              "All",
              "New Treatments",
              "Gut Science",
              "Diet & Lifestyle",
              "Future Therapies",
            ] as ResearchCategory[]
          ).map((cat) => (
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
          ))}
        </div>
      </div>{" "}
      {/* Research Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const isExpanded = expandedItems[item.title];
            return (
              <div
                key={item.title}
                className="rounded-2xl p-6 border shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: stageColors[item.stage].bg,
                      color: stageColors[item.stage].text,
                    }}
                  >
                    {item.stage}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: categoryColors[item.category].bg,
                      color: categoryColors[item.category].text,
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-semibold mb-2 leading-snug"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>

                {/* Meta */}
                <div className="flex flex-wrap gap-3 mb-3">
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    📅 {item.date}
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                    style={{ color: "var(--text-muted)" }}
                  >
                    📌 {item.source}
                  </a>

                  <span
                    className="text-xs"
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    🌍 {item.region}
                  </span>
                </div>

                {/* Summary */}
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.summary}
                </p>

                {/* Australia Note */}
                {item.australiaNote && (
                  <div
                    className="rounded-xl px-4 py-3 mb-3"
                    style={{ backgroundColor: "var(--bg-accent)" }}
                  >
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      🇦🇺 Australian availability
                    </p>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.australiaNote}
                    </p>
                  </div>
                )}

                {/* Expand Button */}
                <button
                  onClick={() => toggleItem(item.title)}
                  className="text-xs font-medium flex items-center gap-1 mb-0"
                  style={{ color: "#2E8B6A" }}
                >
                  {isExpanded ? "▲ Hide" : "▼ Show"} what this means for you
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    className="mt-3 rounded-xl px-4 py-4 text-xs leading-relaxed space-y-3"
                    style={{
                      backgroundColor: "var(--bg-accent)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div>
                      <p className="font-semibold mb-1">
                        What this means in plain language
                      </p>
                      <p>{item.whatItMeans}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">💚 Reason for hope</p>
                      <p>{item.hopeFactor}</p>
                    </div>
                    <div
                      className="rounded-lg px-3 py-2"
                      style={{ backgroundColor: "var(--bg-card)" }}
                    >
                      <p
                        className="text-xs"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        ⚕️ For full prescribing information, safety data, and
                        availability in your region, speak with your
                        gastroenterologist or visit the TGA website at{" "}
                        <span className="font-medium">tga.gov.au</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Research Disclaimer */}
        <div
          className="mt-6 rounded-2xl p-6 border"
          style={{
            backgroundColor: "var(--bg-page)",
            borderColor: "var(--border-color)",
          }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            About this research summary
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            All research summaries on this page are based on peer-reviewed
            studies, published clinical trial data, and reports from recognised
            medical institutions and journals including The Lancet, Nature,
            Harvard Medical School, and the American Gastroenterological
            Association. Summaries are written in plain language for
            informational purposes only and do not constitute medical advice.
            Drug approvals, trial results and treatment availability change
            regularly — always verify current information with your
            gastroenterologist.
          </p>
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
          Research summaries are for informational purposes only — not medical
          advice. Always consult your gastroenterologist.
        </p>
      </footer>
    </div>
  );
}
