# Token Cleanup Decisions
Recommended defaults below — override any you disagree with, then hand this back to the next Figma MCP prompt to actually create the variables.

1. **Muted gray duplicate** (`#555F6D` vs `#565656`) → keep `#555F6D` only (already reused for the active gallery dot). Drop `#565656`.

2. **Two border-color systems** (warm `#E0D8D2` vs cool `rgba(198,198,205,…)`) → keep both, but name them as intentional tiers, not duplicates: `color-border-card` (warm, for cards/panels) and `color-border-divider` (cool, for section rules/dividers).

3. **Facts Panel inconsistency** → split into two components instead of one: `panel-flat` (8px radius, no border/fill — Nutrition Facts + Brewing Guide) and `panel-photo` (12px radius, photo background — Origin/Sourcing). They were never really the same component.

4. **Off-grid spacing** (3, 9, 13, 14, 17, 19, 21px) → snap all to the nearest clean step on the 4/8/12/16/20 scale. No judgment call needed, just cleanup.

5. **Fragmented 12px type scale** (5+ variants) → consolidate to 2: `type-label-sm` (12/16, no tracking — general labels) and `type-label-sm-tight` (12/14, −0.55 tracking — dense/eyebrow contexts). Remap every other 12px variant to whichever is closer.

6. **Multi-library icon set** (5 different libraries) → pick ONE consistent line-icon set for the whole theme (e.g. Phosphor or Lucide, regular weight, matched stroke). Re-source every icon currently in the file from that one library.

7. **Gauge diameter** (56.548px, odd number) → snap to 56px. Track/fill/stroke colors still need manual confirmation in Figma Dev Mode on node `52:1893` — this can't be decided from here, it has to be read.
