# Prompt for Claude + Figma MCP — Part 2, 3, 4 Continuation

Here are the 7 decisions (plus 1 new item from your Part 1 findings) to unblock Part 2. Proceed with Parts 3 and 4 using exactly these:

1. Merge `#555F6D` into the only muted-gray token; drop `#565656`.
2. Keep both border families as intentional tiers: `color-border-card` (`#E0D8D2`) and `color-border-divider` (`rgba(198,198,205,…)`).
3. Split "Facts Panel" into two components: `panel-flat` (8px radius, no border — Nutrition Facts + Brewing Guide) and `panel-photo` (12px radius, photo background — Origin/Sourcing).
4. Snap all off-grid spacing (3, 9, 13, 14, 17, 19, 21px) to the nearest clean 4/8/12/16/20 step.
5. Consolidate the 12px type scale to 2 tokens: `type-label-sm` (12/16, no tracking) and `type-label-sm-tight` (12/14, −0.55 tracking).
6. Pick ONE icon library for the whole theme — use Phosphor, Regular weight — and note every icon that needs re-sourcing from it (don't attempt to auto-replace icons; just list what needs manual re-import).
7. Gauge true diameter is 46.171px — snap to 46px. Ring thickness ~9.234px → snap to 9px.
8. Gauge track color `#D2D2D2` doesn't match any existing token — keep it as its own `color-gauge-track` token rather than forcing a reuse.

**Part 3 — Create Figma variables:**
Test write access first with a single small mutation (e.g. create one color variable) before attempting the full set. Report explicitly whether it succeeds or fails.
- If write access is confirmed: create a variable collection using the resolved tokens above (colors, type styles, spacing, radius). Use the token names already established in the audit (e.g. `color-text-muted`, `space-sm`, `radius-sm`) unless a decision above renames one.
- If write access fails or isn't available: output the complete, final variable spec (name + value + usage) as a markdown table instead, ready for manual creation.

**Part 4 — Apply variables to existing instances:**
Only attempt this if Part 3's write access succeeded.
- Rebind every layer currently using a raw/hardcoded value to its matching new variable, across the whole PDP frame.
- Report per-layer results: which were successfully rebound, which failed, and why (e.g. locked layer, component instance override, detached style).
- Do not guess or force a rebind where the match is ambiguous — flag it and skip instead.

Be explicit throughout about what you verified directly vs. inferred. If anything in the 8 decisions above conflicts with something you find in the file that wasn't previously surfaced, stop and flag it rather than resolving it silently.
