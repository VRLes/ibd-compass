// app/mental-health/page.tsx
// IBD Compass — Mental Health & IBD Page

import Nav from "../components/Nav";
import Link from "next/link";

type EvidenceLevel =
  | "strong-clinical"
  | "promising"
  | "traditional-use"
  | "anecdotal"
  | "newly-emerging";

type EvidenceStyle = { bg: string; text: string; dot: string; label: string };

const EVIDENCE_STYLES: Record<EvidenceLevel, EvidenceStyle> = {
  "strong-clinical": {
    bg: "bg-sky-100",
    text: "text-sky-900",
    dot: "bg-sky-900",
    label: "Strong clinical",
  },
  promising: {
    bg: "bg-yellow-100",
    text: "text-yellow-900",
    dot: "bg-yellow-900",
    label: "Promising",
  },
  "traditional-use": {
    bg: "bg-[#F5E6D3]",
    text: "text-[#7A5C2E]",
    dot: "bg-[#7A5C2E]",
    label: "Traditional use",
  },
  anecdotal: {
    bg: "bg-stone-100",
    text: "text-stone-700",
    dot: "bg-stone-700",
    label: "Anecdotal",
  },
  "newly-emerging": {
    bg: "bg-orange-50",
    text: "text-orange-900",
    dot: "bg-orange-900",
    label: "Newly emerging",
  },
};

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const s = EVIDENCE_STYLES[level];
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1.5 ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function WorthKnowing({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl px-4 py-3 mb-3"
      style={{ backgroundColor: "var(--bg-accent)" }}
    >
      <p
        className="text-xs font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Worth knowing
      </p>
      <div
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-primary)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Card({
  id,
  title,
  badges,
  children,
}: {
  id?: string;
  title: string;
  badges?: EvidenceLevel[];
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="rounded-2xl p-6 border shadow-sm"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      {badges && (
        <div className="flex flex-wrap gap-2 mb-3">
          {badges.map((b) => (
            <EvidenceBadge key={b} level={b} />
          ))}
        </div>
      )}
      <div
        className="text-sm leading-relaxed space-y-3"
        style={{ color: "var(--text-secondary)" }}
      >
        {children}
      </div>
    </section>
  );
}

export default function MentalHealthPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Navigation */}
      <Nav active="/mental-health" />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Mental Health &amp; IBD
        </h1>
        <p
          className="text-sm leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Living with Inflammatory Bowel Disease (Crohn&apos;s disease and
          ulcerative colitis) isn&apos;t just a physical experience. Up to half
          of people with IBD experience psychological distress connected to
          their illness — and that&apos;s not a sign of weakness or &ldquo;just
          stress.&rdquo; It reflects a real, measurable, two-way relationship
          between the gut and the brain.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-6">
        {/* Important note */}
        <div
          className="rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "var(--bg-accent)",
            color: "var(--text-primary)",
          }}
        >
          <strong>Important:</strong> This page provides educational information
          to help you understand and talk about these experiences — it is
          complementary information, not psychological treatment, and does not
          replace assessment or care from your GP, gastroenterologist, or a
          registered psychologist.
          <p className="mt-2 mb-1">
            You can also ask our AI Assistant about any of this in your own
            words, any time.
          </p>
          <Link
            href="/ask-the-assistant"
            className="inline-block px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: "#2E8B6A", color: "#ffffff" }}
          >
            Ask the Assistant about this →
          </Link>
        </div>
        <Card
          id="gut-brain"
          title="The Gut-Brain Connection"
          badges={["strong-clinical"]}
        >
          <p>
            Psychiatric disorders are around 1.5–2× more common in people with
            IBD than in the general population — roughly 21% experience clinical
            anxiety and 15% experience depression, with symptom-level rates even
            higher (about a third report elevated anxiety, a quarter elevated
            depression).
          </p>
          <p>
            These rates rise sharply during active flares and are somewhat more
            common in Crohn&apos;s disease than ulcerative colitis, and in
            women. The relationship runs <strong>both ways</strong>:
            inflammation and gut symptoms can affect mood, and psychological
            distress can influence disease course — neither direction is
            &ldquo;the patient&apos;s fault.&rdquo;
          </p>
          <p>
            Young people with IBD have nearly double the risk of any psychiatric
            diagnosis, and six times the risk of depression — a disease-driven
            pattern, not a character trait.
          </p>
          <WorthKnowing>
            This isn&apos;t &ldquo;in your head&rdquo; in the dismissive sense —
            it&apos;s inflammation and gut signalling reaching the brain via
            real biological pathways. Path forward: many gastroenterology
            guidelines now recommend routine mental health screening as part of
            standard IBD care — it&apos;s worth asking your GI team about this
            directly.
          </WorthKnowing>
        </Card>

        <Card
          id="chronic-pain-brain"
          title="Chronic Pain and the Brain"
          badges={["newly-emerging"]}
        >
          <p>
            Living with chronic pain — a reality for many people with IBD — is
            now understood to produce measurable changes in the brain, not just
            &ldquo;in the mind.&rdquo; Brain imaging studies show reduced grey
            matter and altered connectivity in regions involved in attention,
            memory, and emotional regulation.
          </p>
          <p>
            These changes are linked to real difficulties with attention,
            working memory, and decision-making — often described by patients as
            &ldquo;brain fog.&rdquo; This research also points to the gut-brain
            axis itself as one of the pathways involved, alongside
            neuroinflammation.
          </p>
          <WorthKnowing>
            Brain changes linked to chronic pain are increasingly understood to
            improve when the underlying pain and inflammation are brought under
            control — this is not thought to be a fixed or permanent change.
            Path forward: effective IBD treatment is itself a form of brain
            health care, and cognitive symptoms are worth raising with your
            treatment team rather than just living with.
          </WorthKnowing>
        </Card>

        <Card
          id="cognitive-symptoms"
          title='Cognitive Symptoms Specific to IBD ("Brain Fog")'
          badges={["newly-emerging"]}
        >
          <p>
            Several 2024–2025 studies have found mild cognitive impairment
            occurring in people with IBD independent of how active their disease
            currently is — meaning it can show up even during remission, not
            only during flares. This research area is still developing, and
            findings are inconsistent across studies so far.
          </p>
          <WorthKnowing>
            If you or a family member notice memory lapses, trouble
            concentrating, or slower thinking, this has a plausible biological
            basis and is worth mentioning to your doctor specifically — not
            something to dismiss as tiredness or aging.
          </WorthKnowing>
        </Card>

        <Card
          id="mood-swings"
          title="Mood Swings — Understanding the Why"
          badges={["strong-clinical"]}
        >
          <p>Mood changes in IBD generally come from two different sources:</p>
          <p>
            <strong>Disease-driven:</strong> Inflammation itself affects brain
            chemistry. During flares, irritability, low mood, or anxiety can
            intensify — a biological symptom of active disease, similar to
            fatigue or pain, not a personality change.
          </p>
          <p>
            <strong>Medication-driven:</strong> Different medication classes
            carry very different levels of evidence for mood effects:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Corticosteroids</strong> (e.g. prednisone, prednisolone) —
              well and consistently documented to cause mood changes, from
              irritability and anxiety to, less commonly, elevated/manic-like
              mood, typically within the first few weeks. Effects are
              dose-dependent and often ease as the dose is reduced.
            </li>
            <li>
              <strong>JAK inhibitors</strong> (e.g. tofacitinib, upadacitinib) —
              rare but documented case reports of mood effects, including mania,
              after starting treatment.
            </li>
            <li>
              <strong>Biologics</strong> (e.g. infliximab, adalimumab,
              ustekinumab, vedolizumab) and <strong>immunomodulators</strong>{" "}
              (e.g. azathioprine) — multiple longitudinal studies have found
              these are associated with <em>improved</em> mood over time. A
              5-year study found anti-TNF therapy and immunomodulators improved
              anxiety and depression scores independent of full disease
              remission, and a separate study found the same pattern with
              vedolizumab.
            </li>
          </ul>
          <WorthKnowing>
            If a loved one seems unusually irritable, anxious, or &ldquo;not
            themselves&rdquo; after starting or changing a medication, this is
            worth naming directly — steroids in particular are a well-known
            cause. Path forward: report any mood change to the prescribing
            doctor by name of the medication; steroids in particular should
            never be stopped abruptly without medical guidance.
          </WorthKnowing>
          <p
            className="text-sm font-semibold mt-4 mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            For families, doctors, and carers:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Naming the source of a mood change (disease vs. medication) can
              reduce blame and conflict at home.
            </li>
            <li>
              Mood symptoms are frequently a physiological symptom of illness or
              treatment, not a sign someone &ldquo;isn&apos;t coping.&rdquo;
            </li>
          </ul>
        </Card>

        <Card
          id="surgery-stoma"
          title="Bowel Surgery, Stomas, and Mental Health"
          badges={["strong-clinical"]}
        >
          <p>
            The honest answer here is that{" "}
            <strong>the evidence is mixed</strong>, and it depends on the
            individual and the type of surgery.
          </p>
          <p>
            Around 1 in 4 people experience clinically significant psychological
            symptoms after stoma surgery, and several large studies find higher
            rates of new anxiety/depression after{" "}
            <strong>stoma formation</strong> specifically, particularly in the
            first year. However, other well-designed studies comparing surgical
            to non-surgical patients overall find{" "}
            <strong>no significant difference</strong> in anxiety/depression
            rates — and some patients report their mood improves after surgery,
            since it can resolve debilitating symptoms and bring disease into
            remission.
          </p>
          <p>
            Crohn&apos;s patients (who may face multiple surgeries) show
            somewhat higher rates of depression post-surgery than ulcerative
            colitis patients, while UC patients — for whom colectomy is often
            curative — report more anxiety, often about adjusting to a permanent
            stoma rather than about surgery itself.
          </p>
          <WorthKnowing>
            There is no single &ldquo;right&rdquo; emotional response to bowel
            surgery — relief, grief, anxiety, and confidence can all be genuine,
            sometimes at the same time. Path forward: many surgical teams can
            refer to a stoma-care nurse and psychologist as standard post-op
            care — asking for this before surgery tends to help people adjust
            faster.
          </WorthKnowing>
        </Card>

        <Card
          id="substances"
          title="Substances That Can Interact With IBD Medications"
        >
          <p>
            This section covers alcohol, supplements, and recreational drugs
            specifically because they interact with commonly used IBD
            medications — not because using them is wrong.
          </p>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Alcohol
              </p>
              <EvidenceBadge level="strong-clinical" />
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Methotrexate</strong> — well-established: regular or
                heavy alcohol use alongside methotrexate meaningfully increases
                the risk of liver damage over time.
              </li>
              <li>
                <strong>Azathioprine / 6-mercaptopurine</strong> — despite
                similar concerns sometimes raised, the evidence here is much
                weaker, described in gastroenterology literature as
                &ldquo;largely theoretical.&rdquo;
              </li>
              <li>
                <strong>5-aminosalicylates (5-ASA) and cyclosporine</strong> —
                alcohol may reduce how well these medications work.
              </li>
              <li>
                <strong>Metronidazole</strong> (a commonly prescribed IBD
                antibiotic) — can cause a disulfiram-like reaction with alcohol:
                flushing, nausea, a racing heart. Worth knowing in advance since
                it can be alarming if unexpected.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Supplements and herbal products
              </p>
              <EvidenceBadge level="strong-clinical" />
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>St John&apos;s Wort</strong> (commonly used for low
                mood) significantly <em>reduces</em> blood levels of
                immunosuppressants such as tacrolimus and cyclosporine — this
                can mean IBD medication stops working as intended without any
                obvious warning sign.
              </li>
              <li>
                <strong>Grapefruit / grapefruit juice</strong> has the opposite
                effect on a different set of medications — roughly doubling
                blood levels of budesonide and roughly tripling levels of
                tacrolimus.
              </li>
            </ul>
            <p className="mt-2">
              General rule: always tell your GI team and pharmacist about any
              supplement, herbal remedy, or vitamin, even ones that seem
              harmless.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Recreational drugs
              </p>
              <EvidenceBadge level="promising" />
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cannabis/CBD</strong> — many people report real relief
                from pain, nausea, and anxiety, but clinical trials consistently
                show it does not reduce gut inflammation itself, so it&apos;s
                best thought of as symptom relief alongside treatment, not
                instead of it. Some research also links cannabis use with a less
                favourable long-term disease course in Crohn&apos;s
                specifically.
              </li>
              <li>
                <strong>Opioid pain medication</strong> — effective short-term,
                but chronic use carries a specific, well-documented risk called{" "}
                <em>narcotic bowel syndrome</em>: escalating doses can
                paradoxically make abdominal pain worse over time.
              </li>
            </ul>
          </div>

          <WorthKnowing>
            None of this is about &ldquo;shouldn&apos;t&rdquo; — it&apos;s about
            knowing which changes in how you feel might be coming from an
            interaction rather than your IBD itself. Path forward: keep a simple
            list of everything you take and share it with your GI team and
            pharmacist at every review.
          </WorthKnowing>
        </Card>

        <Card id="support" title="Support and Resources (Australia)">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Crohn&apos;s &amp; Colitis Australia (CCA)</strong> —
              Psychological Health &amp; IBD page:{" "}
              <a
                href="https://crohnsandcolitis.org.au/living-with-crohns-colitis/lifestyle/psychological-health-ibd/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                crohnsandcolitis.org.au
              </a>
            </li>
            <li>
              <strong>CCA Helpline &amp; NurseLine — 1800 138 029</strong>:
              free, includes support for &ldquo;difficulty coping and
              anxiety,&rdquo; plus a peer-support &ldquo;Connect with a
              Peer&rdquo; service (also available to carers).
            </li>
            <li>
              <strong>Tame Your Gut</strong> — a free 10-week online CBT program
              designed specifically for people with IBD.
            </li>
            <li>
              <strong>IBD Mind Over Gut</strong> — a free 5-week online
              resilience program for people with IBD.
            </li>
            <li>
              <strong>Mental Health Treatment Plan</strong> — available via a GP
              appointment (20+ minutes) if a mental health condition is
              diagnosed; provides Medicare-subsidised psychologist visits.
            </li>
            <li>
              <strong>Lifeline — 13 11 14</strong> and{" "}
              <strong>Beyond Blue — 1300 22 4636</strong>: for anyone needing to
              talk something through, any time.
            </li>
          </ul>
          <WorthKnowing>
            Asking for psychological support alongside gut treatment isn&apos;t
            an extra step — it&apos;s part of best-practice IBD care. Path
            forward: you can ask your GI team directly, &ldquo;Can you refer me
            to a psychologist who understands IBD?&rdquo;
          </WorthKnowing>
        </Card>

        <div
          className="rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "var(--bg-accent)",
            color: "var(--text-primary)",
          }}
        >
          <strong>Worth knowing:</strong> Everything on this page describes
          patterns seen across research studies and large groups of people — it
          won&apos;t match everyone&apos;s experience exactly. If you&apos;re
          struggling, that&apos;s real and valid regardless of what any study
          says about averages. Support is available today via the CCA Helpline
          (1800 138 029) or Lifeline (13 11 14).
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
          This page is for educational support only — not a substitute for
          professional medical or psychological care.
        </p>
      </footer>
    </div>
  );
}
