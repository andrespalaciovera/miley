# Prompt for Claude + Figma MCP — Fix Accordion + Build Pack/Economics Tile

## Part A — Fix Accordion's background-dependent chevron workaround

Convert the Accordion Row's `Expanded` Boolean property to a `Style` Variant property with two states: `Collapsed` and `Expanded`. Use true rotation on the chevron for each variant state instead of the background-masking overlay — this removes the dependency on `color-background-base` so the component works correctly on any background.

Keep `Question` and `Answer` as TEXT properties as before. Re-verify Answer visibility still works correctly tied to the Style variant (shown only in Expanded).

Test on at least one instance placed against a different background fill (not `color-background-base`) to confirm the fix actually resolves the original issue, not just that it still works on the original background.

## Part B — Build Pack/Economics Tile

Reference the existing pack-option tiles in the PDP frame (1-Pack/3-Pack/6-Pack with per-unit price and savings badge) for the base style.

This component needs to support **3 display densities**, per the cross-page component inventory:
- **Full** (PDP): pack label, price, per-unit price, savings badge, selected/unselected state
- **Compact** (Landing offer recap): condensed version, likely just price + savings, less internal padding
- **Minimal-trigger** (Collection quick-add): just enough to trigger an expand/select action, not a full tile

Build as a component with a `Density` Variant property (`Full` / `Compact` / `Minimal`) and these TEXT/BOOLEAN properties: `Pack Label`, `Price`, `Per-Unit Price`, `Savings Text`, `Show Savings Badge` (BOOLEAN), `Selected` (use a proper Variant for this too, given what you learned building Accordion — not a Boolean-plus-overlay workaround).

Test at least one instance per density (3 total) to confirm each renders correctly and that switching the Density variant doesn't break the others.

Report: token reuse, any new tokens needed, and whether all 3 densities are genuinely ready to instance, or if any needs further resolution.
