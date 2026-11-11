# Prompt for Claude + Figma MCP — Resolve Remaining Items + Build Product Card

Continuing on the same file/frame. Resolve these first, then move to building the first real component.

## Part A — Resolve remaining token gaps

1. **10px button radius** (the three "Add for $9" complementary-product buttons, nodes `105:61`, `105:68`, `105:74`): snap to the existing `radius-sm` (8px) token. Rebind those corners.

2. **Two pure-black text nodes** ("$38" pack price, "Auto-renews, cancel anytime"): rebind both to `color-text-primary` (`#151C25`) — these were very likely an authoring slip, not an intentional pure-black.

3. **Leftover 12px type variants:** promote two of the four to real text styles, since they repeat across multiple contexts:
   - `type-label-eyebrow` (12/14, −0.066 tracking) — used on Shipping info, FAQ, "You may also like", complementary card titles
   - `type-label-facts` (12/20, −0.55 tracking) — used on Facts-panel field labels (Per serving, Ratio, etc.)

   Leave the other two (tab-label 12/18, cadence-note 12/16.5) as bespoke, un-tokenized overrides — each appears in only one context, so tokenizing adds no real reuse value.

## Part B — Icon re-sourcing list

Compile a full list of every icon currently in the frame, organized by current source library (famicons, mdi, material-symbols-light, griddy-icons, bitcoin-icons, plus the unlabeled vectors), with its usage context (e.g. "Facts — cup icon, famicons:cafe-outline, used in Nutrition Facts panel"). For each, note the closest equivalent icon name in **Phosphor (Regular weight)**. Don't attempt to auto-replace anything — this is a manual re-import list for Andres to execute himself.

## Part C — Build Product Card as the first real component

Using the now-finalized token set (colors, spacing, radius, text styles):

Build a Product Card component with:
- Image (top, consistent aspect ratio — check what ratio is already used across the PDP gallery/thumbnails and complementary-product tiles, and reuse it rather than inventing a new one)
- Product name (use the appropriate text style from the locked type scale)
- Price (reuse `type-price-card` if it fits, or the closest existing price token)
- Optional badge slot (top-left corner overlay — e.g. "NEW" / "BESTSELLER" — using existing badge styling conventions already established for "POPULAR"/"Save X%" pills)

Create it as a proper Figma component (not just a static frame) with clear layer naming, so it can be instanced across Home, Collection, Cart, and Landing without rebuilding it each time. Confirm auto-layout is set up so the card resizes/reflows sensibly in a grid.

Report back: what token conflicts (if any) came up while building this that weren't in the existing set, and whether the component is ready to instance, or needs anything resolved first.
