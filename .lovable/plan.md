## Practice Areas page — two changes

### Command 1 — Tagline placement

The target tagline ("Explore our practice areas, the industries we serve, and the range of services we deliver to clients across Rwanda and beyond.") currently lives only in one place: the intro paragraph of the **Our Services** section on `src/pages/PracticeAreas.tsx` (line 124), pulled from `practiceAreas.heroTagline2` in `src/i18n/en.json` and `src/i18n/fr.json`.

Changes:
- Remove the `<p>{t("practiceAreas.heroTagline2")}</p>` block from the Our Services section.
- Add a new centered intro paragraph at the top of the **Areas of Expertise** section (just inside `<div class="container">`, above the cards grid), using the same `practiceAreas.heroTagline2` translation key. Styled as a clean, readable intro: centered, `max-w-3xl mx-auto`, muted body color, generous bottom spacing (e.g. `mb-10 md:mb-12`) before the cards begin.
- Keep the existing hero section (with `heroTagline1`) and page header untouched.
- No translation key changes required (already exists in EN and FR; only used once, so removing the old usage is clean).

### Command 2 — Practice area cards with icons

Refactor the **Areas of Expertise** section in `src/pages/PracticeAreas.tsx` from the current vertical list of full-width rows into a responsive card grid.

Layout:
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` inside the existing container.
- Keep section id, padding, and surrounding structure unchanged.

Each card (using existing tokens — `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-primary`, `text-justice`, `font-serif`):
- Top: Lucide line-art icon, `w-8 h-8 text-primary` with default stroke weight (consistent across all cards).
- Number + title in bold serif on one line (e.g. `01  Corporate & Commercial Law`), number in `text-justice` as today.
- Existing 1–2 sentence description in `text-muted-foreground`.
- Optional existing `subsection` block preserved (smaller muted card-within-card), unchanged styling.
- `Clients:` line at the bottom in smaller muted font (`text-xs uppercase tracking-wider text-muted-foreground`, label in `text-primary`) — same content as today, just visually pinned to the bottom of the card via `mt-auto` on a flex column.
- Hover: `transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5` (subtle, brand-consistent).

Icon mapping (added to imports from `lucide-react`):

| areaKey | Icon |
|---|---|
| corporateCommercial | Building2 |
| contractAdvisory | FileSignature |
| regulatoryCompliance | ShieldCheck |
| employmentLabour | Users |
| oilGasEnergy | Zap |
| bankingFinancial | Landmark |
| disputeResolution | Scale |
| taxCorporate | Calculator |
| realEstate | Home |
| privateWealth | TrendingUp |
| ngoGovernance | Globe |
| intellectualProperty | Lightbulb |
| techDataProtection | Lock |
| migration | Plane |
| insolvency | RefreshCw |
| insurance | Umbrella |

(`privateWealth` is the existing key that maps to "Asset Management" per the spec.)

Out of scope (unchanged): hero section, navigation, footer, Industries section, Our Services carousel, all other content, brand tokens.

### Files touched
- `src/pages/PracticeAreas.tsx` — imports updated, areas section refactored into card grid with icons, tagline moved to top of that section, removed from Our Services section.

No i18n, routing, or asset changes needed.
