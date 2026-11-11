# Prompt for Claude + Figma MCP — Resolve Product Card Gaps + Build Trust/Icon Row

## Part A — Close the two Product Card gaps

1. Create `color-image-placeholder` (flat neutral gray, distinct from any existing text/border token) and apply it to Product Card's image fill.
2. Create a new text style `type-label-card-name` for primary grid contexts — slightly larger and heavier than `type-label-eyebrow` (try 13-14px, Medium weight, tighter tracking similar to the eyebrow style). Apply it to Product Card's "Product Name" property instead of `type-label-eyebrow`. Keep `type-label-eyebrow` as-is for its existing uses (Shipping info, FAQ, complementary-card titles, etc.) — don't touch those.

Test one instance after this change to confirm the card still reads correctly at the new type size.

## Part B — Build Trust/Icon Row component

This is the second-most-reused component in the file (appears on PDP twice — badge row + trust signals — and will repeat on Home and Landing). Using the icon re-sourcing list from the previous pass (Phosphor Regular equivalents):

Build a Trust/Icon Row component with:
- A horizontal auto-layout row, evenly spaced (reuse whatever gap token the existing PDP badge rows already use)
- Each item: icon (from the Phosphor set) + short label beneath it, matching the existing trust-badge layout convention already in the PDP frame
- Make icon and label both component properties (ICON as a swappable instance-swap property if your Plugin API access supports it, otherwise TEXT for the label at minimum) so the row can hold a variable number of items across different pages (3 on PDP, possibly a different count on Home/Landing)

Report whether Figma's instance-swap property type is usable here via the Plugin API, or if icon swapping needs to stay a manual per-instance task. Test with at least two different item counts (e.g. 3-item and 4-item row) to confirm the auto-layout spacing holds up, same rigor as Product Card's two-instance test.
