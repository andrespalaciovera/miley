# PDP Component Abstraction Map
**Scope:** Specialty coffee/tea · Gourmet shelf-stable foods · Functional beverages · Nutritional supplements

**Principle:** Every component has a *slot* (position, visual weight, interaction pattern — fixed) and a *content contract* (what fills it — variable). The only design question per component is: does it vary in **vocabulary** (same shape, different words/numbers → parameterize) or in **kind** (the information isn't the same shape at all → offer named variants)?

---

## Zone 1 — Identification & Sensory Expectation

| Component | Variance | Treatment |
|---|---|---|
| Product gallery | None | Single component, all verticals |
| Product name / rating | None | Single component, all verticals |
| **Product Profile block** | **Kind** | Two named variants: **Gauge** (coffee/tea: Roast/Acidity/Body/Caffeine; gourmet foods: Heat/Tanginess/Sweetness; functional beverages: Energy/Focus/Calm) vs **Benefit Chips** (supplements — no gauge, short benefit claims instead) |
| Dietary/allergen badge row | Vocabulary | One component, badge list from metafield (Vegan, Non-GMO, Keto, Gluten-Free, etc. — set varies, shape doesn't) |
| Short description | None | Single component, all verticals |

## Zone 2 — The Economic Decision

| Component | Variance | Treatment |
|---|---|---|
| Multi-Pack Economics Selector | Vocabulary | One component — pack sizes/unit labels vary (3-pack vs 12-count vs 30-day supply), tile mechanic and savings-badge logic is identical |
| One-time / Subscribe toggle | Vocabulary | One component — cadence options vary (weekly for perishables, monthly for supplements), toggle mechanic identical |
| Sticky Add to Cart | None | Single component, all verticals |

## Zone 3 — Functional Transparency & Proof

| Component | Variance | Treatment |
|---|---|---|
| **Facts panel** | **Kind** | Two named variants: **Nutrition Facts** (FDA/EU format — coffee, gourmet foods, functional beverages) vs **Supplement Facts** (FDA format for supplements — different regulatory layout, %DV column, active ingredients). Not interchangeable; pick by product type. |
| Ingredients list | Vocabulary | One component, plain list, all verticals |
| Allergens | Vocabulary | One component, same shape as Zone 1 badges but detailed list form |
| Origin / sourcing | Vocabulary | One component — content differs (farm/origin story vs. facility/testing story) but shape (text block + optional image) is constant |
| **Preparation / usage info** | **Kind** | Three named variants: **Brewing Guide** (steps, coffee/tea), **Usage/Recipe Card** (gourmet foods — e.g. "how to use this sauce"), **Dosage Instructions** (supplements — serving size, timing, table-like) |

## Zone 4 — Trust & Continuation

| Component | Variance | Treatment |
|---|---|---|
| Shipping info | Vocabulary | One component, thresholds/timelines vary by product (perishable vs. shelf-stable) |
| FAQ accordion | None | Single component, all verticals |
| Trust/reassurance signals | Vocabulary | One component, badge/icon set varies (lab-tested vs. farm-direct vs. money-back) |
| Complementary products | None | Single component, all verticals |

---

## Summary: What needs real design work

Only **3 components** across the whole PDP are kind-varying and need distinct named variants designed:
1. **Product Profile** (Gauge vs. Benefit Chips)
2. **Facts Panel** (Nutrition Facts vs. Supplement Facts)
3. **Preparation/Usage** (Brewing Guide vs. Recipe Card vs. Dosage Instructions)

Everything else in the PDP is a single component with a flexible content contract (metafield-driven). This is a good sign — it means the "specialty ingestible consumables" thesis holds structurally: most of the PDP is genuinely universal, and the real vertical-specific design effort concentrates in a small, known set of places.
