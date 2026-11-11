# Prompt for Claude + Figma MCP — Build CTA Button + Accordion

Continuing on the same file, using the now-finalized token set. Build both as real Figma components, same rigor as Product Card and Trust/Icon Row (component properties, multi-instance testing, flag any gaps rather than guessing).

## Component 1 — CTA Button

Reference the existing "Add to Cart" button in the PDP frame for the base style (fill, radius, text style, padding).

Build as a component with:
- `Label` (TEXT property) — so it can read "Add to Cart," "Checkout," "Shop Now," "Load More," etc. across different pages
- `Style` variant property with at least two states: `Primary` (solid dark fill — matches existing Add to Cart) and `Secondary` (outline/lighter — check if an existing secondary button style already exists anywhere in the frame, e.g. the pack-tile selection state or toggle tabs, and reuse that treatment rather than inventing a new one)
- Confirm sizing: does it need a fixed height with `FILL`-width behavior (full-width mobile buttons, as used for Add to Cart and Checkout), or should width hug content (as likely needed for something like "Load More")? Build both behaviors as options if the API allows, or note which single behavior you defaulted to and why.

Test at least 2 instances: one full-width Primary (e.g. "Add to Cart"), one hug-width Secondary (e.g. "Load More"), to confirm both configurations render correctly.

## Component 2 — Accordion

Reference the existing FAQ rows in the PDP frame.

Build as a component with:
- `Question` (TEXT property)
- `Expanded` (BOOLEAN property) — controls chevron rotation/direction at minimum; note whether the Plugin API lets you also show/hide an `Answer` text block tied to this same boolean, or if that needs to stay a separate manual step
- `Answer` (TEXT property, shown only when expanded, if the above is feasible)

Test with at least 2 instances: one collapsed, one expanded, to confirm the chevron and any answer-visibility logic actually work — not just visually plausible.

Report back per component: what token reuse happened, what (if anything) required a new token or a judgment call, and whether each is ready to instance across Home/Collection/Cart/Landing as-is.
