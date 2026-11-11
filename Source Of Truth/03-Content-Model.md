# 03 Content Model

*This document maps out how the theme will use Shopify Metafields and Metaobjects to drive the UI without hardcoding data.*

## Metaobjects (Complex / Reusable Data)
- **Certification Badges:** Icon + Label pairs.
- **Facts Panel (At-a-glance):** Icon + Value + Label for simpler product facts.
- **Preparation Steps (Cards):** Icon + Value + Label (+ optional intro line) for brewing guides or recipes.
- **Reviews:** Render native review metaobject data via Shop Channel or free extension apps.

## Product Metafields (Specific to a single product)
- **Product Profile (Gauge):** List of `{label, value (1-5), max}`.
- **Product Profile (Chips):** List of text claims (e.g. `Clean Energy`, `No Jitters`).
- **Roaster & Farm Telemetry (Onyx Engine):** Roast level / Agtron spectrum (1-5), Elevation (MASL), Processing method (Washed/Natural/Anaerobic), Variety/Cultivar, and Producer/Station.
- **Cupping Sensory Profile (Radar):** JSON cupping scores `{ acidity, sweetness, body, clean_cup, finish }` driving pure-SVG radar charts.
- **Facts Table (Nutrition/Supplement):** JSON metafield storing Rows `{item, amount, %DV}`, serving size, servings per container, and footers.
- **Multi-Method Brewing Recipes:** JSON tabbed guides (Kalita, V60, Aeropress, Espresso) storing `{ method, dose, yield, ratio, grind, temp, time }`.
- **Ingredients & Allergens:** Rich text fields.
- **Origin / Sourcing:** Pair values `{label, value}` + Story Text + Image + modal transparency data.
- **Unit Economics:** Units-per-variant (used to compute price per unit/serving).

## Theme Settings (Store-wide Configuration)
- **Skins & Schemes:** Color scheme groups and presets (Skin 1 vs. Skin 2).
- **Cart Tiers:** Threshold limits for free shipping and reward types.
