## Goal
Update the home/About hero tagline text only.

## Change
In `src/i18n/en.json` (key `home.heroTagline`), replace:

> "Beacon Attorneys and Consultants is an established Kigali-based, multi-practice law firm optimally equipped to serve businesses, individuals, and institutions in Rwanda and East Africa."

with:

> "Beacon Attorneys and Consultants is a Business law firm optimally equipped to serve businesses and institutions in Rwanda and East Africa."

Mirror the same change in `src/i18n/fr.json` (`home.heroTagline`) with the French equivalent:

> "Beacon Attorneys and Consultants est un cabinet d'avocats d'affaires parfaitement équipé pour servir les entreprises et les institutions au Rwanda et en Afrique de l'Est."

No styling, layout, component, or other copy changes. The tagline renders in `src/pages/Index.tsx` via `t("home.heroTagline")` — no code edits needed.