# 06 Decision Log

*Use this document to record major architecture, design, and business decisions so we never lose track of "Why did we do this?"*

| Date | Decision | Rationale | Status |
| :--- | :--- | :--- | :--- |
| 2026-10-07 | Target Specialty Consumables | Repeat purchase economics and high information density provide a clear moat compared to generic themes. | DECIDED |
| 2026-10-07 | Sellable Theme Goal | Prioritizing revenue/distribution over just a portfolio piece demands we respect accessibility, base theme licenses, and app compatibility. | DECIDED |
| 2026-10-07 | 4-Role Color System | Simplifies merchant setup while still allowing light/dark "inverted" section combinations without breaking contrast. | DECIDED |
| | | | |
| 2026-10-09 | 3-Tier Semantic Token Architecture | Abandoned literal "Action/Accent" naming for Functional Roles (Primary/Secondary) to prevent multi-skin collisions (Polaris/Material 3 standard). | DECIDED |
| 2026-10-31 | SPEC-01 Spec-Driven Development Document | Locked tokens, component contracts, and Vanilla Web Component architecture for Sprint 2 build. | DECIDED |
| 2026-11-08 | 100% Pure Primitives & Symmetrical `On-*` Tokens (Architecture A) | Standardized all 19 `Color Tokens` variables to alias 1-hop to `Primitives` (14 primitives total, zero raw hexes in `Color Tokens`), added `Text/On-Tertiary` paired with `Color/Tertiary` (`Selected` badges & chips), and bound `Selected` badges to `Text/On-Tertiary`. | DECIDED |
| 2026-11-08 | Base Theme Switch: `Horizon` → `Shopify/skeleton-theme` | Official `shopify.dev` Theme Store rules automatically reject themes derived from `Dawn` or `Horizon`, and their `LICENSE.md` prohibits off-platform resale. Scaffolding on `Shopify/skeleton-theme` with modern Theme Blocks (`blocks/` + `{% content_for 'blocks' %}`) keeps 100% of `SPEC-01` tokens and Web Components intact while guaranteeing Theme Store eligibility. | DECIDED |
| 2026-11-08 | Single-Track Distribution (Shopify Theme Store) + Dual-Engine to \$2k+ USD/mo | Eliminated cold outreach (Apollo, DMs, paid ads) and off-platform marketplaces. One unified build (~11h/wk, \$0 capital) targeting the official Shopify Theme Store (benchmark: \$300–\$420 USD vs. Foodie/Fresh/Shapes). Live demo stores (`Solstice Coffee` Skin 1 & `Vitality Labs` Skin 2) serve immediately to land a \$2,000–\$3,500 USD/mo US Product Designer / Design Engineer role via open roles & EcommPath leverage, while Theme Store sales (85% rev share) run as passive upside. | DECIDED |
| 2026-11-11 | Onyx-Grade Sensory Telemetry & In-Customizer CRO Operating System | Integrated Onyx Coffee Lab's sensory telemetry (Roast Agtron bar, MASL elevation, process method, multi-brew tabs, pure-SVG radar) and codified an in-editor CRO advisor pattern in `settings_schema.json` and `blocks/*.liquid` using Shopify `paragraph` and `info` schema blocks to guide merchants on psychological pricing, pack economics, and cart gamification. | DECIDED |
| 2026-11-11 | Full Spec-Driven Development (SDD) Contract Closure | Formalized and locked all 4 critical contracts in SPEC-01 (§10 Event Bus Pub/Sub, §11 Liquid JSON Data Island Schema, §12 Defensive Edge-Case Degradation Matrix, §13 Skeleton Theme Block Directory & Composition Map), achieving 100% specification coverage prior to writing code. | DECIDED |
