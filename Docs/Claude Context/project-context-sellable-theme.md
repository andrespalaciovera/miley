# Project Context: Specialty Consumables Shopify Theme

*Summary of the full planning conversation, prepared 2026-10-07 to seed the Antigravity project, the Obsidian vault and the roadmap.*

## How to read this document

Status tags used throughout:

- **[DECIDED]** Andres made or explicitly accepted the call.
- **[WORKING]** Built or in use, never formally debated.
- **[HYPOTHESIS]** Plausible, not validated with real data.
- **[UNVERIFIED]** Came from AI-generated research or a single web search. Verify before relying on it.
- **[OPEN]** Decision still pending.

Suggested vault split: `00-brief` (sections 1-2), `01-decisions` (every [DECIDED] item), `02-tokens` (section 8), `03-components` (sections 5-7), `04-content-model` (section 9), `05-validation-and-risks` (sections 3, 12, 13), `06-roadmap` (section 14), `07-working-conventions` (section 15), `08-demo-content` (section 10).

---

## 1. Goal and constraints (UPDATED)

- **Original goal:** build a CRO-optimized Shopify theme as a portfolio piece to prove skills in product design, UX/UI, CRO and Shopify.
- **New goal [DECIDED, 2026-10-07]:** Andres now has a job. The theme must be **sellable**, in this priority: (1) build his reputation, (2) fill his portfolio, (3) maybe earn some money. Revenue is upside, not the plan.
- **Owner:** Andres Palacio, freelance product designer and Shopify developer in Medellín, Colombia. Skills: Figma, Shopify Liquid/theme customization, HTML/CSS/JS, CRO/UX, automation (Mechanic, Flow). Works in English and Spanish.
- **Capacity:** this is now a side project with limited hours. Weekly hours not yet defined **[OPEN]**.
- **Tools:** Figma (variables with modes; Claude + Figma MCP workflow used so far), Antigravity (pro) and Gemini (pro), Claude (he says he is on a free plan), Obsidian (planned).
- **Next action:** create the Antigravity project, then the Obsidian vault and roadmap from this document.

**What "sellable" adds beyond a portfolio piece (analysis, not yet discussed with Andres):** real market validation, a license check on the base theme, a distribution channel and its requirements, merchant-facing docs and demo stores, an update path, accessibility, performance evidence, compatibility testing with real subscription and review apps, a support policy, and pricing. See section 13.

---

## 2. Positioning and thesis

**Category [DECIDED]:** DTC specialty ingestible consumables.

- In scope: specialty coffee/tea, gourmet shelf-stable foods (sauces, oils, snacks), functional beverages, nutritional supplements / functional nutrition.
- Out of scope: alcohol, fresh/perishable, meal kits (different problems: logistics, compliance, freshness windows).
- Target catalog: **30-80 core products, ~100-300 SKUs** with moderate variant complexity, repeat purchase or subscription, and bundle/pack economics. Below ~30 products a merchant needs a landing page, not a theme. Above ~80 they need enterprise search and catalog navigation, which is not the differentiator.

**Core insight [DECIDED]:** general themes are built around physical products (image, then color/size, then price, then Add to Cart). Consumable brands sell information, confidence, replenishment and bundles. The PDP journey is **Understand, Evaluate, Trust, Choose, Commit**.

**Moat:** consumable economics. Repeat purchase, subscription, pack economics, unit price, ingredient transparency, sensory/functional attributes, dietary needs, education, trust, bundles, replenishment.

**Hero of the theme is the PDP**, not the homepage. Test: put a coffee product into this theme and into Dawn. The merchant should think "this theme understands how my products are sold."

**Three headline features [DECIDED]** (revised from an earlier generic set of variant sync / mobile controls / cart):

1. Multi-Pack Economics Selector (pack tiles with per-unit price and savings).
2. Native Facts panel plus Product Profile (nutrition/supplement facts, sensory or functional profile).
3. Slide cart with tiered rewards and subscription cadence clarity.

**Cart hypothesis (Andres's wording, condensed):** the cart is a merchandising and incentive surface. If it clearly shows quantity, subscription cadence, savings and progress toward incentives, customers understand the economic commitment of their order without leaving the cart, which reduces friction and creates room to raise basket value.

**Governing principles [DECIDED, carried from the first research round]:**

1. Eliminate the essential app tax (native versions of what merchants always pay apps for). The original generic "Core-8" list is superseded by the consumables-specific native list in section 7.
2. Mobile first, not mobile adapted (dedicated mobile controls, no desktop-only settings).
3. Vanilla web components, no jQuery or frameworks, async load, initialize when the section enters the viewport.
4. Zero-code styling, zero-fear updating: all design tokens via CSS custom properties, custom code isolated from core files.
5. Fail-safe PDP mechanics: picker, URL params, gallery, unit price and sticky Add to Cart form one reactive loop. Out-of-stock options show unavailable without breaking variant switching.
6. Tasteful conversion over dropship clutter: no fake timers, spinning wheels or fake purchase pop-ups.
7. Native international readiness (unit price, tax inclusion, multi-market). Unit price per serving is directly relevant to consumables.

**Claims NOT to make until validated:** "only theme on the market," "saves $200/month in apps," any percentage statistics, store counts.

---

## 3. Research and evidence status

Three research documents were produced with an AI model. **Treat them as hypothesis generators, not data sources.**

**Plausible at pattern level [HYPOTHESIS]:**
- Merchants complain about app bloat and monthly app fees, theme updates overwriting custom code, mobile hero cropping and sticky-element clutter, and variant/sticky-ATC desync.
- Consumable DTC brands commonly run subscriptions, multi-packs and slide carts.
- Generic themes have no native containers for nutrition panels, sensory scales or subscription UI.

**[UNVERIFIED], do not cite:**
- All percentages (for example "94% of merchants"), store counts (for example 212,552), the "20-store audit" specifics, app pricing, theme review counts and prices, weighted scorecards, and every Reddit/community URL and verbatim quote. The precision is not producible from public browsing, and the pattern resembles generated statistics.

**Competitor themes named in the research (verify on the Theme Store [OPEN]):** Shapes (Switch Themes, described as closest functional competitor), Foodie, Fresh, Canopy, Taste, Crave, Impact, Prestige, Broadcast, Enterprise.

**Findings from web searches (agency blogs and forums; confirm in Shopify's own docs):**
- Horizon is Shopify's current default free theme with a block-first, nested-blocks architecture; Dawn is still maintained.
- Shopify's original Product Reviews app was discontinued on 2024-05-06.
- Shopify has a native product review metaobject. A free app (Cited) writes to it and renders via a Theme App Extension.
- Shop Channel offers native post-purchase review requests (Admin, Sales Channels, Shop) with limited display customization.
- Onyx Coffee Lab's PDP spec strip uses label/value rows: Quantity, Roasted In, Origin, Origin Type, Region, Producer, Variety, Altitude, Process.

---

## 4. Templates and page compositions (lofi complete for all five)

### PDP: four zones

| Zone | Components |
|---|---|
| 1. Identification and Sensory Expectation | Gallery, name/rating, **Product Profile** (Gauge or Benefit Chips), dietary/allergen/certification badge row, short description |
| 2. Economic Decision | **Multi-Pack Economics Selector**, One-time/Subscribe toggle with cadence options, sticky Add to Cart (mobile) |
| 3. Functional Transparency and Proof | **Facts panel**, ingredients, allergens, origin/sourcing, **Preparation/Usage** |
| 4. Trust and Continuation | Shipping info, FAQ accordion, trust/reassurance row, complementary products, plus Reviews section and Video/UGC section (added later) |

### Cart drawer
Header with count, tiered incentive progress bar, line item cards (image, name, variant label, cadence badge, quantity stepper, price, remove), order summary (subtotal, savings, shipping/taxes at checkout), "pair with your order" upsell tiles, checkout CTA.

### Home
Hero (dual desktop/mobile image treatment), badge ribbon, "Shop by category/goal" tile grid, featured product grid, social proof/press, subscription value-prop block, brand story teaser, email capture, footer accordion nav.

### Collection
Breadcrumb, header with count, Filter + Sort bar, active filter chips, product grid with Quick Add and inline pack selector, promotional banner insert, load more with progress, footer.

### Landing (campaign)
Minimal header (no nav), offer hero, benefit row, social proof, offer recap (pack tiles plus Add to Cart), repeated CTA, FAQ, minimal footer.

**Home vs Landing:** home is the default entry point for discovery and navigation. Landing serves one traffic source and one offer, strips navigation, and repeats a single CTA. Same component library, different composition and intent.

---

## 5. Abstraction method [DECIDED]

Every component has a **slot** (position, visual weight, interaction pattern: fixed) and a **content contract** (what fills it: variable, merchant-driven).

**Decision rule per component:**
- Varies in **vocabulary** (same shape, different words/numbers): one component, parameterized by metafields.
- Varies in **kind** (the information is not the same shape): a few named variants, chosen per product or product type.

**Only the PDP has kind-varying blocks.** Home, Cart, Collection and Landing are universal shells with vocabulary-varying labels.

### PDP kind-varying blocks and their variants

| Block | Variants | Rule |
|---|---|---|
| Product Profile | **Gauge** (measurable attributes only, 5-segment dial) vs **Benefit Chips** (marketing claims, mainly supplements) | Never use a gauge for subjective claims such as "Focus 4/5". It looks like measured data and undermines trust. |
| Facts panel | **At-a-Glance Stats** (icon + value + label) vs **Facts Table** (Nutrition Facts or Supplement Facts with rows, columns, %DV) | Three different information densities, not one shape. |
| Preparation/Usage | **Step Cards** (structured: icon + value + label, e.g. Brewing Guide) vs **Info List** with two variants: **Plain** (rich text, one repeated bullet icon) and **Titled Row** (icon + title + description per row, a real structured component) | Build further variants only when a real product forces it. |

**Chip semantics:** certification/dietary badges (Vegan, Organic, Third-Party Tested) are verifiable facts. Benefit chips are claims. Same visual family, but they must read as different things.

**Supplement compliance cue:** keep the standard FDA disclaimer near dosage instructions and make it visually subordinate to the instructions.

---

## 6. Component inventory

### Reused across pages (build first)
- **Product Card:** Home, Collection, Cart upsell, PDP complementary.
- **CTA Button:** everywhere (Primary and Secondary).
- **Trust/Icon Row:** PDP (twice), Home (twice), Landing (twice).
- **Accordion:** PDP FAQ, Landing FAQ, Home and Collection footer nav.
- **Pack/Economics Tile:** PDP (Full), Landing (Compact), Collection quick-add (Minimal). One component, three densities.

### Page-specific
- Line Item Card (Cart only; own component, not a Product Card variant).
- Tiered Incentive Progress Bar (Cart).
- Shop-by-Goal tile grid (Home).
- Sticky purchase bar (PDP mobile).
- Active filter chip (Collection; promote only if it reappears).
- Reviews section shell, Video/UGC section shell, curated testimonial carousel.

### Components already built in Figma via MCP (earlier token set)
| Component | Properties |
|---|---|
| Product Card | Product Name, Price, Show Badge, Badge Text; 1:1 image; auto-layout grid-friendly |
| Trust Icon Row | Slot for variable item count; Trust Icon Item with Icon (instance swap) and Label |
| CTA Button | Style variant (Primary/Secondary), Label; HUG or FILL width per instance |
| Accordion Row | Style variant (Collapsed/Expanded, real chevron rotation), Question, Answer |
| Pack/Economics Tile | Density (Full/Compact/Minimal) x Selected (No/Yes), Pack Label, Price, Per-Unit Price, Savings Text, Show Savings Badge |

**Status [OPEN]:** these were bound to an earlier token set. Andres lists "componentize" as still pending in his current file, so confirm whether to rebind them to the new Skin-mode variables or rebuild.

---

## 7. Native vs app boundary

**Build natively in the theme:** nutrition and supplement facts panels, sensory/functional profile blocks, dietary and allergen badges, multi-pack selector, unit price / price per serving, slide cart with tiers and inline upsells, CoA/lab-proof drawer, brewing/usage blocks, sourcing block, dietary filtering, sticky ATC with pack and cadence sync, age gate, perishable shipping notice, quick reorder.

**Design a shell, let an app own the data:** subscription UI (Shopify Subscriptions, Skio, Recharge, Smartrr), reviews display, back-in-stock capture (Klaviyo), Shopify Bundles container.

**Leave entirely to apps:** subscription billing, build-a-box engines, enterprise/algorithmic search, loyalty and referrals, post-purchase upsells, wholesale matrices.

**Do not build:** proprietary page builder, review collection backend, billing engine, fake urgency features.

### Reviews [DECIDED direction]
- Theme-only code cannot accept public submissions. Writing to Shopify's Admin API needs a privileged token that can never live in storefront code, so a serverless proxy would be required.
- Andres rejected hand-entered reviews as the primary path (not honest, poor UX).
- Direction: a **Reviews section shell** that renders Shopify's native review metaobject (populated by Shop Channel or an extension app such as Cited) **and** accepts `@app` blocks. Verify the metaobject details in Shopify docs **[UNVERIFIED]**.
- **[OPEN]:** whether to ship a separately labeled "editorial testimonials" block (press/expert quotes, clearly not verified reviews). The mocks already show a "Why people choose us" carousel with an "Expert" tag.

### Video / UGC [DECIDED]
- **Curated Showcase (native):** merchant uploads a video to Shopify Files (CDN) or links a URL, plus caption and credit. No API, no backend, no moderation needed.
- **Connected Feed (app):** `@app` block fed by an Instagram/TikTok/UGC connector.
- Open customer video upload is out of scope (needs a backend, moderation, consent and takedown handling).

### Section vs block
A **Section** is a page-level region the merchant places in the editor. A **Block** is a repeatable element inside a section. Support for apps is done with an `"type": "@app"` block slot in the section schema.

---

## 8. Visual system

### 8.1 Moodboard patterns (11 references: Graza, Ritual, Magic Spoon, Diaspora Spice Co., Heights, Fishwife, Three Spirit, Bellocq, Colonna, Four Sigmatic, Seed)
- Fully pill-shaped buttons are near-universal.
- Most brands commit to one bold saturated background color as identity.
- Editorial brands pair a large serif display with a clean sans body. Younger brands use heavy sans.
- Icon + short-label rows appear constantly (Trust/Icon Row is a real category convention).
- Small circular callout badges (for example "0g Sugar") and top-corner card badges (NEW/BESTSELLER).
- UGC video carousels and press-quote rows are common proof devices.
- Tonal variation within one palette (light and dark sections) creates rhythm, not unrelated accent hues.

### 8.2 Skins and Color Schemes [DECIDED]
- A **Skin** is a complete, self-consistent preset. The merchant picks one for the whole store. No per-product accent changes.
- **Skin 1 (editorial):** cream and brown, minimal two-color system, Literata + Inter. Reference product: coffee.
- **Skin 2 (bold):** black, coral, turquoise, white. Coral = labels and pills; turquoise = CTAs and section titles; black = nav, fixed components, text and the dark section; white = background and inverse text.
- Skins use Shopify's native **color scheme** structure: each scheme defines Background, Text, Solid button background and label, Outline button, Shadow. Sections pick a scheme instead of improvising colors.
- Rule: a Skin's accent/CTA color stays constant across its own light and dark schemes.
- **Andres's 4-role model for Skin 2:** main_color (turquoise), secondary_color (coral), Surface&Text (black), Background (white). A dark section inverts Surface and Background while main_color stays for titles and CTAs. **[OPEN]:** formalize as 4 roles plus an invert flag, or use the fuller 6-field scheme. **[OPEN]:** whether merchants may reassign any section to any scheme (leaning: sensible default per section, override allowed, matching Shopify convention).

### 8.3 Current Figma variables (32 variables, 5 collections, modes Skin 1 / Skin 2; 8 text styles; 1 effect style)

**Color tokens**

| Variable | Skin 1 | Skin 2 |
|---|---|---|
| Background/Main | #F6EBE0 | #FAFAFA |
| Text/Primary | #151C25 | #151C25 |
| Text/Mutted (typo) | #555F6D | #555F6D |
| Text/Dark | #FFFFFF | #FFFFFF |
| Accent/Primary | #A18263 | #C5452C |
| Accent/Secondary | #151C25 | #151C25 |
| Accent/Tertiary | #76777D | #76777D |
| Border/Card | #E0D8D2 | #E0D8D2 |
| Border/Divider | #C6C6CD @60% | #C6C6CD @60% |
| Surface/Gauge | #D2D2D2 | #D2D2D2 |
| Surface/Option | #EFEFEF @0% | #EFEFEF |
| Surface/Black | #000000 @40% | #000000 @40% |
| Surface/Search | #FFFFFF | #EFEFEF |
| Action/Primary | #151C25 | #00BC8E |
| Action/Secondary | #FFFFFF | #C5452C |

**Spacing:** space-xxs 4, space-xs 6, space-sm 8, space-md 12, space-lg 16, space-xl 20.
**Radius:** radius-xs 4, radius-sm 8, radius-md 16, radius-full 999, radius-panel-flat (alias sm), radius-panel-photo (alias md), radius-none 0.
**Stroke:** stroke-hairline 1, stroke-emphasis 2.
**Gauge:** gauge-diameter 46, gauge-ring-thickness 9.

**Text styles**

| Style | Skin 1 | Skin 2 |
|---|---|---|
| H2/Mobile | Literata Bold 24/27.5, -0.5 | Gasoek One Regular 24/28 |
| H4/Mobile | Inter Semi Bold 18/24 | Source Code Pro Bold 16/20 |
| Body/Mobile | Inter Regular 14/20 | Source Code Pro Regular 14/20 |
| Label/Mobile | Inter Regular 12/16, -0.5 | Source Code Pro Regular 14/16 |

Andres also mentioned using Inter for labels with numbers in Skin 2; it is not in the style table **[OPEN: reconcile]**.

**Effect style:** Shadow/Subtle, drop shadow #000000 @5%, X 0, Y 1, blur 2, spread 0.

### 8.4 Gauge spec (read from the file)
Five discrete arc segments (donut cutout, not a stroked circle), roughly 54 degrees each with about 16 degrees of gap, filled proportionally to a 1-5 score. Fill #A18263, track #D2D2D2, diameter 46 px, ring thickness about 9 px. Partial scores (for example 2.5) are not supported by the mechanic.

### 8.5 Icons
The first mock used icons from six libraries (famicons, mdi, material-symbols-light, griddy-icons, bitcoin-icons, heroicons). **Decision:** one library for the whole theme, Phosphor Regular (Lucide was the alternative). **[OPEN, deferred by Andres]:** import and connect the library, then replace icons manually. Known gaps: no exact kettle icon, no kitchen-scale icon.

### 8.6 Token cleanup still pending
- Typo `Text/Mutted`.
- `Accent/Secondary` is identical to `Text/Primary` in both skins.
- Skin 2 `Action/Secondary` is identical to `Accent/Primary`.
- `Surface/Option` is 0% opacity in Skin 1 but solid in Skin 2.
- `Text/Dark` holds white (it means "text on dark").
- Names become CSS variables, so fix them before the build.

### 8.7 Accessibility risk (my calculation, verify with a contrast checker)
- White text on turquoise #00BC8E is about 2.4:1 and fails WCAG AA. Black text on it passes comfortably.
- White text on brown #A18263 is about 3.6:1 and fails AA for small text (10 px "Save %" pills).
- White text on coral #C5452C is about 4.9:1 and passes AA.
- This matters more now that the theme is meant to be sold.

---

## 9. Draft content model (proposal, not yet decided; verify Shopify metafield/metaobject types)

| Block | Data needed | Likely source |
|---|---|---|
| Product Profile: Gauge | List of {label, value 1-5, max} | Product metafield (list of metaobject entries) |
| Product Profile: Benefit Chips | List of short claims | Product metafield (list of text) |
| Certification/dietary badges | List of badge entries (icon + label) | Metaobject entries referenced by product |
| Facts: At-a-Glance | List of {icon, value, label} | Metaobject entries |
| Facts: Table | Rows {item, amount, %DV}, serving size, servings per container, footnote; format = Nutrition or Supplement | Metaobject or JSON metafield |
| Ingredients / Allergens | Text | Product metafields |
| Origin / Sourcing | Spec-strip pairs {label, value}, story text, image | Product metafields |
| Steps (Step Cards) | List {icon, value, label} plus optional intro line | Metaobject entries |
| Info List | Plain: rich text. Titled Row: list {icon, title, description} | Rich text / metaobject entries |
| Pack tiers | Pack-size option on variants, units per variant (needed for per-unit price), savings computed | Variants plus a units metafield |
| Subscription | Selling plans from Shopify Subscriptions or an app | Theme renders a styled wrapper |
| Cart tiers | Thresholds and reward types | Theme settings |
| Reviews | Native review metaobject or `@app` block | Shopify / app |
| Video | Curated: list {file or URL, caption, credit}; Connected: `@app` block | Metaobject / app |
| Skins and schemes | Color scheme groups per Skin | Theme settings |

Coffee spec-strip pattern worth following: label/value rows above the fold (origin, elevation, process, notes), story in an accordion, brewing as icon or numbered steps, caffeine as one line (coffee rarely carries a full FDA panel).

---

## 10. Demo content (two reference products; fictional)

### Solstice Coffee Co., Ethiopia Guji, Washed (Skin 1)
- Rating 4.8 (342 reviews in spec; mock shows 128). Description: bright, floral washed coffee from one small-lot farm in the Guji Zone, notes of blueberry, jasmine, brown sugar.
- Gauge: Roast 2/5, Acidity 4/5, Body 3/5, Sweetness 4/5, Caffeine ~95 mg per 8 oz. Badges: Direct Trade, Organic, Single-Origin.
- Packs (12 oz bag): 1 bag $21; 3 bags $57 ($19/bag, save 10%); 6 bags $102 ($17/bag, save 19%). Subscribe & Save 15%; cadence every 2 / 4 / 6 weeks. Grind: whole bean, drip, espresso, French press.
- Facts (light): 10 g serving, 34 servings per bag, ~95 mg caffeine. Ingredients: 100% Arabica. Allergens: none; facility also processes tree nuts.
- Origin: Guji Zone, Refisa washing station, 1,950-2,100 masl, cooperative of 210 smallholders, fully washed, raised-bed dried 12-15 days, third year buying.
- Brewing: medium-coarse grind, 1:16 ratio (60 g per 1 L), 205 F, 3:00-3:30 brew.
- Shipping: roasted to order, ships within 48 h, free over $35. FAQ: storage, changing cadence, organic certification. Trust: Direct Trade, Certified Organic, Carbon-Neutral Shipping.
- Complementary: Organic Filter Papers (100 ct) $9, Ceramic Pour-Over Dripper $38, Digital Coffee Scale $32.
- Note: the mock used different prices ($20 / $38 / $49.50). The values above are the content reference.

### Vitality Labs, Daily Focus Complex (Skin 2, capsule supplement)
- Rating 4.6 (891 reviews in spec; mock shows 4.8 / 128). Description: clean-energy nootropic blend with L-theanine, Rhodiola rosea and B-complex vitamins.
- Benefit chips: Supports Focus, Clean Energy, No Jitters, Non-Habit Forming. Certification badges: Vegan, Non-GMO, Gluten-Free, Third-Party Tested.
- Packs: 30 caps $34 ($1.13/cap); 60 caps $62 ($1.03, save 9%); 90 caps $87 ($0.97, save 15%). Subscribe & Save 20%; cadence every 30 / 60 / 90 days.
- Supplement Facts (serving 2 capsules, 30 servings per 60-capsule bottle): B6 5 mg (294% DV), B12 100 mcg (4167% DV), L-theanine 200 mg, Rhodiola extract 300 mg, caffeine 40 mg (no DV established). Other ingredients: vegetable cellulose, rice flour, magnesium stearate. Allergens: facility processes tree nuts, soy, shellfish.
- Sourcing: cGMP facility in Colorado, batch-tested for heavy metals, microbes and potency by an independent lab; CoA per batch.
- Dosage (Info List, Titled Row): take 2 capsules daily with food, morning or early afternoon; max 4 per 24 h; consult a physician if pregnant, nursing or medicated. FDA disclaimer line included.
- Shipping: ships within 24 h, free over $40. Trust: Third-Party Tested, cGMP Certified, 90-day money-back guarantee.
- Note: the mock shows "Take 1 capsule daily" while the facts say a 2-capsule serving. Fix in demo content. Andres deliberately showed only two dosage rows in the mock to prove the pattern.
- Complementary (spec): Magnesium Glycinate, Omega-3, Daily Multivitamin. The mock still shows placeholder dripper cards.

**Image generation:** Gemini prompts were written for both product shots. Coffee: kraft stand-up pouch, dark green label, cream serif type, soft editorial lighting. Supplement: color-blocked paperboard tub (mustard on mustard with coral type and a small certification-icon band), in the style of the Health Lab reference.

---

## 11. Reference stores for PDP patterns
onyxcoffeelab.com (spec-row pattern), partnerscoffee.com, seycoffee.com (restrained editorial), vervecoffee.com, prodigalcoffee.com (brewing as recipe card), eightouncecoffee.com (multi-brand retailer, one template across many roasters).

---

## 12. Open decisions and known gaps

**Design gaps**
- [ ] Cart drawer hifi is missing (it is one of the three headline features).
- [ ] Everything is 375 px mobile. Desktop PDP and Collection (at minimum) are missing.
- [ ] Componentize PDP sections and base components (Button, Chip/Badge, Accordion, Product Card, Pack Tile, Trust Row, Section Header, email input and search field). Other form fields are not needed.
- [ ] Hifi for Collection, Home, and optionally Landing.
- [ ] Header, footer and navigation hifi.
- [ ] Finalize token cleanup (8.6) and the 4-role scheme model (8.2).
- [ ] Import the icon library and replace icons.

**Product decisions**
- [ ] Gourmet foods: reuse Nutrition Facts with empty fields (leaning) or a lighter variant.
- [ ] Recipe/Usage Card for gourmet foods: structured component or just an Info List.
- [ ] Editorial testimonials block vs verified reviews only.
- [ ] Whether merchants can reassign schemes per section.

**Build and business decisions**
- [ ] Base theme: Horizon (leaning) or Dawn. Check agent familiarity and, critically, the **license of the chosen base** before selling a derivative.
- [ ] Distribution channel (Shopify Theme Store, own site, marketplace) and its requirements **[UNVERIFIED, research]**.
- [ ] Pricing and licensing model. The AI research listed premium themes at roughly $320-$390 **[UNVERIFIED]**.
- [ ] Weekly hours available, to turn the roadmap into dates.
- [ ] Whether Antigravity can connect to Figma via MCP (not verified).

---

## 13. What changes under the "sellable" goal (my recommendations)

1. **Validate before claiming.** Replace the AI-generated evidence with your own: list real F&B and supplement themes on the Theme Store with prices and review excerpts, collect real merchant complaints with links, and talk to a few merchants if possible. No marketing claim until it is verified.
2. **Check licensing and requirements early.** Confirm the base theme license and the submission or listing requirements of the chosen sales channel before building on assumptions.
3. **Treat accessibility, performance and app compatibility as product requirements.** Fix contrast, measure Lighthouse on a real device, and test the subscription wrapper against real subscription apps and the review shell against real review extensions.
4. **Skins become presets.** A two-skin theme with scheme-based presets fits how merchants buy themes and is a selling point.
5. **Add merchant-facing deliverables:** documentation, demo stores (one per Skin or product type), sample content and metafield setup guide, changelog, update path, support policy.
6. **Keep the reputation goal honest.** Publishing the process (decisions, lessons) builds reputation even if sales are small. Revenue is upside.

---

## 14. Roadmap (draft, to be re-planned in Antigravity)

Estimates are my rough guesses; the Liquid build is the largest unknown. Earlier estimate for design plus build (milestones 1-3 below, without validation, productization or launch): about 80-115 hours.

| Milestone | Contents | Rough effort |
|---|---|---|
| **M0 Validation and product decisions** (new) | Theme Store scan, merchant evidence, base-theme license, channel requirements, pricing hypothesis, name | 8-15 h (guess) |
| **M1 Design system and remaining hifi** | Token cleanup, componentize, cart drawer, collection, home, desktop PDP and collection, optional landing | 20-27 h |
| **M2 One live PDP in Shopify** | Dev store, CLI, repo with `/docs`, agent rules, content model, build PDP, QA | 30-48 h |
| **M3 Rest of theme and productization** | Cart drawer, collection, home, settings and presets, docs, demo data, compatibility, accessibility | 20-30 h build, plus docs/QA unestimated |
| **M4 Launch** | Listing, pricing, support, theme landing page, launch content | unestimated |

**Suggested build order inside the PDP:** tokens and color schemes, atoms, Zone 2 (pack selector, subscribe wrapper, sticky ATC, because variant sync is the headline CRO claim), Zone 3 variants, Zone 1 profile, Zone 4 plus reviews and video.

**Definition of done for M2:** both reference products and both Skins work through theme settings, tested on a real phone, with a Lighthouse mobile result you can honestly quote.

---

## 15. Working conventions and lessons

**Prompting agents against Figma (what worked)**
- Inspect real node data instead of inferring from screenshots.
- Flag conflicts instead of resolving them silently; separate "verified" from "inferred."
- Test every component in at least two instances (and a non-default background where relevant).
- Use Variants for states. Do not use a Boolean plus overlay workaround.

**Figma Plugin API gotchas found**
- Call `resize()` before setting `layoutSizingHorizontal = "FILL"`, otherwise it resets to FIXED.
- Variable-bound paints can come back with `visible: false`.
- Variable alpha plus paint opacity double-applies; reset opacity when binding.
- `componentPropertyReferences` only supports characters, visible and mainComponent (no rotation, no visibility inversion).
- `arcData` is not variable-bindable.
- Composite typography is Text Styles, not Variables.
- Instance-swap properties need a real component target.
- A Slot is the right tool for a variable item count.

**Lofi prompt conventions**
- Mobile first, 375 px.
- Fixed content gets real or lorem text; vocabulary-varying content gets generic structured placeholders; kind-varying content gets a labeled void.
- When iterating, say "add", not "create."

**Working rules**
- Build a variant only when a real product forces it (no open-ended "and more").
- Keep claims separate from measured facts everywhere in the UI.
- Fix the accent per Skin; vary only through schemes.
- One decision at a time, written down.

**Proposed agent rules for the Shopify build (to be formalized in the repo)**
- Vanilla web components, no jQuery, tokens only (no raw hex in CSS), metafield names from the content model, custom code kept in its own layer.
- Never expose Admin API credentials to the storefront.
- Test each block with empty and maximum metafield data; run `shopify theme check` and Lighthouse after each block.
