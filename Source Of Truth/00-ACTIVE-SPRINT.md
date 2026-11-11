# 🎯 00 ACTIVE SPRINT

**Sprint 1: Design Lock & Componentization**
**Dates:** October 8, 2026 – October 24, 2026
**Goal:** Clean all Figma tokens, componentize the UI, and assemble hi-fi screens for PDP, Cart, Collection, Home, and Landing.

*Rule: Just look at today's date. Do only the tasks listed. If you finish early, stop and rest. If it spills over, tell your AI PM to adjust the board.*

---

### Week 1: The Foundation & PDP
- [x] **Oct 08 (Thu - 1h): Token Cleanup**
  - Fix typo `Text/Mutted` and merge redundant gray tokens.
  - Snap all off-grid spacing (13px, 17px) to the 4/8/12/16 scale.
  - Snap Gauge diameter to exactly 46px.
- [x] **Oct 09 (Fri - 1h): Theme Stickersheet (Atoms & Molecules)**
  - Build `Button`: 2 states (`Primary` solid, `Secondary` outline). No hover/active states.
  - Build `Badge / Pill`: 1 auto-layout component (`Highlight` with Color/Secondary, `Neutral` with Border/Card).
  - Build `Input Field`: 1 generic placeholder box for newsletter & search.
  - Componentize `Trust Row`: Promote existing auto-layout to component (Ctrl+Alt+K).
  - Componentize `Accordion Row`: 1 clean row (title + chevron + bottom divider).
- [x] **Oct 10 (Sat - 3h): High-Value CRO Components & PDP Blocks**
  - Build `Product Card`: 1:1 image placeholder, badge slot, title, price.
  - Build `Pack / Economics Tile`: 2 variants (`Default` vs `Selected` with unit price & savings badge).
  - Lock `Product Profile`: Keep existing Gauge (Coffee) and Benefit Chips (Supplement).
  - Lock `Facts Panel`: `panel-flat` (Supplement/Nutrition table) and `panel-photo` (Origin).
- [x] **Oct 11 (Sun - 3h): Assemble the PDPs**
  - Assemble full mobile PDP for Skin 1 (Coffee, using Gauge & Brewing steps).
  - Assemble full mobile PDP for Skin 2 (Supplement, using Chips & Facts table).
  - Ensure flipping the Figma Skin mode restyles everything with zero manual overrides.

### Week 2: Cart, Collection & Home
- [x] **Oct 12 (Mon - 1h): Cart Drawer Components**
  - Build `Line Item Card` (qty stepper, remove button, cadence badge).
  - Build `Tiered Incentive Progress Bar`.
- [x] **Oct 13 (Tue - 1h): Assemble Cart Drawer**
  - Assemble full Cart Drawer hi-fi (header, line items, upsell tiles, summary, checkout CTA).
- [ ] **Oct 14 (Wed - 1h): Collection Page Components**
  - Build `Active Filter Chip`.
  - Adapt `Product Card` grid layout for Collection.
- [ ] **Oct 15 (Thu - 1h): Assemble Collection Page**
  - Assemble full mobile Collection hi-fi (Filters, sorting, product grid, load more).
- [ ] **Oct 16 (Fri - 1h): Homepage Components**
  - Build `Shop-by-goal` tile component.
- [ ] **Oct 17 (Sat - 3h): Assemble Homepage & Desktop Adaptions (Part 1)**
  - Assemble full mobile Homepage hi-fi.
  - Start desktop layout adaption for the PDP.
- [ ] **Oct 18 (Sun - 3h): Desktop Adaptions (Part 2)**
  - Complete desktop layout for Collection.
  - Complete desktop layout for Home.

### Week 3: Landing, Polish & Review
- [ ] **Oct 19 (Mon - 1h): Landing Page**
  - Assemble Landing Page template (minimal header, offer hero, repeated CTAs).
- [ ] **Oct 20 (Tue - 1h): System Review**
  - Review all components against Figma variables to ensure no raw hex codes snuck in.
- [ ] **Oct 21 (Wed - 1h): Iconography Pass**
  - Import Phosphor Regular icon library and replace all placeholder/mixed icons.
- [ ] **Oct 22 (Thu - 1h): Accessibility & Contrast Check**
  - Run contrast checks on Skin 1 and Skin 2 buttons and text.
- [ ] **Oct 23 (Fri - 1h): Overflow Buffer**
  - Catch-up day for any tasks that spilled over during the sprint.

### Sprint Closing
- [ ] **Oct 24 (Sat - 3h): Sprint Evaluation & Planning**
  - Review Milestone 1 completion.
  - Export final case study assets for the portfolio.
  - **Plan Sprint 2 (The Code Build) with Antigravity.**
