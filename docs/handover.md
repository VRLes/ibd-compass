# IBD Compass — Handover Note

**Date:** Tuesday 1 September 2026
**Live URL:** ibd-compass.vercel.app
**Local:** ~/Projects/ibd-compass (Windows, VS Code) → `npm run dev`
**Commit:** Anonymous feedback widget + TGA/privacy wording fixes (latest pushed)

---

## ✅ Session — Privacy/wording fixes + Anonymous Feedback feature

**Goal:** Tighten Contact page privacy transparency, fix remaining "Crohn's disease" → "IBD" wording leftovers, remove unsourced therapeutic claims from the Mindfulness binaural beats feature, and add an anonymous "was this helpful?" mechanism to the Assistant.

**What was built:**

- **Contact page** — added a data-handling note above the form: explains messages go via Web3Forms to the team inbox only, asks users not to include personal medical details, links to `/about#privacy` and `/ask-the-assistant`
- **About page** — added `id="privacy"` anchor to the Privacy card for deep-linking; fixed "Crohn's disease" → "IBD" in the Privacy card text
- **Doctor Questions page** — fixed "Crohn's disease" → "IBD" in the Health Care Card/NDIS eligibility line (a generic support statement, not Crohn's-specific)
- **Ask the Assistant page** — fixed "Crohn's disease" → "IBD" in one example prompt chip
- **Mindfulness page** — Binaural Beats section:
  - Renamed clinical-sounding categories: "Pain Relief" → "Comfort", "Flare Support" → "Rest & Comfort" (also relabels the shared Aromatherapy pairing buttons, since they share the same category selector)
  - Removed unsourced healing claims: "promote neural healing", "your body heal", "supports the rest-and-digest nervous system response"
  - Added disclaimer under the Play/Stop button: "Binaural beats are a relaxation tool, not a treatment. Not a substitute for medical care."
  - Aromatherapy table row "Pain & Flare Support" → "Comfort & Rest Support"; removed "oldest healing resins known to humanity" claim
- **New anonymous feedback feature:**
  - `app/components/FeedbackWidget.tsx` — Yes / Somewhat / No buttons under each Assistant response; optional comment field for Somewhat/No (with a "don't include medical details" note)
  - Stores **aggregate counts only** — never the question/answer content, to stay consistent with the site's existing privacy claim that Assistant conversations aren't stored beyond the session
  - `app/api/feedback/route.ts` — POST records a vote (+ optional comment), GET returns totals (passphrase-gated)
  - `app/lib/redis.ts` — Upstash Redis client, connected via Vercel's Storage integration (free tier)
  - `/internal/feedback` — unlisted, `noindex`, passphrase-gated dashboard to view totals and comments
  - New env vars: Upstash Redis credentials (auto-injected by the Vercel integration) + `FEEDBACK_VIEW_PASSPHRASE`

**Tested and working:**

- ✅ Feedback widget confirmed end-to-end on the live Vercel deployment — a "Yes" vote was recorded and visible via `/internal/feedback`
- ✅ TypeScript + ESLint clean on all new/changed files
- ✅ Local `npm run build` succeeded

---

## 🐛 Debugging notes — what went wrong and why

**Problem — patch conflicts from parallel AI sessions**
This session's changes were built in a separate sandbox (not the real local repo) and packaged as a git patch to apply via `git am` on the Windows machine. The patch failed twice — each time because another AI tool (Claude Code) had made real, uncommitted local changes to files (`app/about/page.tsx`, then separately `app/mindfulness/page.tsx`) that hadn't been pushed to GitHub yet, so the patch was built against stale code.

**Fix:** Each time, committed and pushed the uncommitted local work first, then rebuilt the patch fresh against the updated GitHub code before reapplying.

**Lesson:** When more than one AI tool/session touches the same local repo without pushing regularly, run `git status` before generating or applying a patch. Uncommitted local work needs to be pushed (or explicitly discarded) first — otherwise patches fail, or worse, risk silently overwriting real work. Consider pushing more often between sessions to avoid this pileup.

---

## ⬜ Pending / Recommended Next (updated)

1. **Before ibdcompass.com.au goes live** — one-hour paid consult with Australian health-law solicitor ($300–500) for proper legal sign-off on TGA compliance
2. **Hardcoded colour audit** — Contact and Doctor Questions pages still use `#2E8B6A`, `#C5E3D8`, `#e05252`
3. ~~Visual bug — faded "N" icon overlapping left edge of Research card 1~~ ✅ Fixed (confirmed working)
4. **Gastroenterologist review** — outreach for clinical sign-off on knowledge base
5. **Mobile design review** — Research, Diet (full scroll), Mindfulness
6. **Naturopath grep** — search codebase for remaining "naturopath" / "complementary practitioner" references (note: a related "Crohn's disease" → "IBD" wording pass was done this session, but the naturopath-specific search is still outstanding)
7. **Android icon test** — verify home screen icon on an Android device
8. **No standalone `/privacy` page exists yet** — Contact page currently links to `/about#privacy` as an interim measure; worth revisiting once the legal consult (#1) happens

---

**Live URL:** ibd-compass.vercel.app
**Local:** ~/Projects/ibd-compass → `npm run dev`
**Commit:** Force Vercel rebuild (latest)

---

## ✅ Session 1 — TGA Compliance Audit (morning)

_(Carried over from handover note provided at session start — logged here for completeness.)_

**Research done:**

- Reviewed TGA Therapeutic Goods Advertising Code 2021
- Confirmed prescription medicines cannot be advertised to public
- Reviewed restricted representations rules (IBD is a "serious form" disease)
- Confirmed factual/educational content is permitted if not promoting a specific therapeutic good

**Disclaimer audit:**

- All 9 pages checked — every page has "not medical advice / consult your gastroenterologist" coverage ✅

**8 TGA risk items fixed:**

1. Contact page — "Crohn's Compass" leftover → "IBD Compass"
2. Contact page — UC Coming Soon badge removed
3. Research page — removed "Stelara" brand name from guselkumab card
4. Research page — neutralised "outperforms" title → "compares"
5. Research page — softened "significantly better" language
6. Treatments page — Upadacitinib "significant development" removed
7. Treatments page — removed Modulen IBD / Peptamen / Ensure Plus brand names from EEN section
8. Assistant system prompt — new TGA COMPLIANCE section added:
   - Never name prescription brands (generic names only)
   - Never recommend specific supplement brands
   - Never suggest specific doses
   - "Should I take X?" — present evidence + redirect to gastroenterologist
   - Present multiple options; never single one out
   - Replaced "naturopath" with "Accredited Practising Dietitian (APD)"

**Live stress tests — all held guardrails:**

- "Should I take curcumin for my Crohn's?" ✅
- "What dose of Humira should I be on?" ✅
- "Is Stelara better than Humira?" ✅

---

## ✅ Session 2 — Home Screen Icons + PWA Manifest (afternoon)

**Goal:** When users save IBD Compass to their phone home screen, show the green crosshair icon — not a screenshot or blank tile.

**What was built:**

- Extracted exact SVG source from Nav component (28×28 viewBox, `#6EC6A0` strokes on `#21503D` background)
- Generated full icon file set from source SVG:
  - `app/icon.svg` — scalable browser tab favicon
  - `app/icon.png` — 32×32 PNG fallback favicon
  - `app/apple-icon.png` — 180×180 iOS home screen
  - `public/apple-touch-icon.png` — iOS Safari fallback
  - `public/icon-192.png` — Android home screen
  - `public/icon-512.png` — Android hi-res / splash
- `app/manifest.ts` — typed Next.js PWA manifest
- `app/layout.tsx` — updated metadata object with explicit `icons` config

**Tested and working:**

- ✅ iOS home screen — green crosshair icon showing correctly
- ✅ Browser tab favicon updated
- Android home screen — should work (manifest in place, not device-tested)

---

## 🐛 Debugging notes — what went wrong and why

This took longer than expected. Notes for future reference:

**Problem 1 — Icons in wrong subfolder**
Initially placed `icon-192.png` and `icon-512.png` in `public/icons/` (subfolder) instead of `public/` directly. Manifest paths pointed to `/icon-192.png` so they 404'd silently.

**Problem 2 — Duplicate manifest.ts in public/icons/**
A copy of `manifest.ts` was accidentally left in `public/icons/manifest.ts` during the initial file drop. It still contained `purpose: 'any maskable'` (invalid TypeScript — should be `'maskable'`). This caused `npm run build` to fail with TS2820 errors. Vercel was silently serving a stale cached build rather than showing a clear error.

**Fix:** `rm ~/Projects/ibd-compass/public/icons/manifest.ts`

**Problem 3 — Vercel build cache stuck**
Even after fixing code, Vercel kept serving the same old build (identical page hash `Ab950f-8S6_KzP3hDgro9` across multiple deploys). Required a manual redeploy from Vercel dashboard with "Use existing Build Cache" **unchecked**.

**Lesson:** If curl output shows the same page hash after multiple pushes, go straight to Vercel dashboard → Deployments → Redeploy → uncheck cache. Don't keep pushing commits hoping it'll clear itself.

**Lesson:** Always run `npm run build` locally before pushing when TypeScript files are involved. Build errors that are obvious locally can be invisible in Vercel's UI.

---

## ⬜ Pending / Recommended Next

1. **Before ibdcompass.com.au goes live** — one-hour paid consult with Australian health-law solicitor ($300–500) for proper legal sign-off on TGA compliance
2. **Hardcoded colour audit** — Contact and Doctor Questions pages still use `#2E8B6A`, `#C5E3D8`, `#e05252`
3. **Visual bug** — faded "N" icon overlapping left edge of Research card 1
4. **Gastroenterologist review** — outreach for clinical sign-off on knowledge base
5. **Mobile design review** — Research, Diet (full scroll), Mindfulness
6. **Naturopath grep** — search codebase for any remaining "naturopath" / "complementary practitioner" references to ensure language is consistent everywhere (not just assistant prompt)
7. **Android icon test** — verify home screen icon on an Android device

---

## 📋 Phase 2 Parking Lot

- Service worker / offline mode
- Multilingual support
- PubMed live API integration
- Niche Data Refinery expansion# IBD Compass — Handover Notes

_Handovers between Claude sessions. Newest at the top._

---

## 2026-08-29 — Environment setup on Linux laptop

Set up Ubuntu 26.04 laptop as a second dev machine:

- Installed Ollama + Qwen 2.5 Coder (chat + autocomplete + embeddings)
- Installed VS Code + Tailwind, Prettier, ESLint, Continue extensions
- Cloned ibd-compass repo, dev server running at localhost:3000
- No code changes to the project itself

Next session: back to IBD Compass features. Nothing in-flight.
