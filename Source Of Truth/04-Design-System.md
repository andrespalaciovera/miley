# 04 Design System

*Rules, tokens, and UI guidelines for the theme.*

## Color Roles & Skins (Semantic Token Architecture)
Based on Material 3 and Shopify Polaris standards, the theme abandons visual/marketing descriptors (like "Action" or the legacy `Accent/*` folder) in favor of strict functional roles across two axes:

1. **The Two-Axis Rule:**
   * **Brand & Conversion Voice (`Color/*`):** Roles that carry brand energy, conversion CTAs, or active selection weight across fills, strokes, and headlines.
   * **Structural UI (`Background/*`, `Surface/*`, `Text/*`, `Border/*`):** Property-scoped roles with dedicated contrast pairings.
2. **The 100% Pure Primitive Rule:**
   * Every single variable in `Color Tokens` (both Brand Roles and Structural Neutrals) points **1 hop directly to `Primitives`** so zero raw hex codes exist in the `Color Tokens` table.
3. **Zero Semantic Tangling:**
   * Semantic tokens never alias other Semantic tokens (e.g., `Text/Primary` must never alias `Color/Primary`). Every alias points **1 hop directly to `Primitives`** so merchant CTA customization cannot accidentally break body text or badge readability.

---

### 1. Primitive Tier (14 Pure Primitives — Brand & Structural Anchors)
Never applied directly to components.

| Primitive Token | Hex / Value | Role in Palette |
| :--- | :--- | :--- |
| `Primitive/coffee-black` | `#151C25` | Deep espresso charcoal (Skin 1 CTA, shared primary ink, Skin 2 dark contrast) |
| `Primitive/coffee-brown` | `#A18263` | Warm roast brown (Skin 1 Secondary fills, `Text/Accent`, & Inverted band) |
| `Primitive/green` | `#344435` | Forest slate (Skin 1 `Color/Tertiary` & `Border/Selected`) |
| `Primitive/supp-turquoise` | `#00BC8E` | Energetic clinical turquoise (Skin 2 `Color/Primary`) |
| `Primitive/supp-coral` | `#C5452C` | High-contrast coral (Skin 2 `Color/Secondary` & `Text/Accent`) |
| `Primitive/white` | `#FFFFFF` | Pure white anchor for containers and inverse/`On-*` text |
| `Primitive/coffee-cream` | `#F6EBE0` | Skin 1 warm parchment background & subtle neutral surface |
| `Primitive/neutral-off-white` | `#FAFAFA` | Skin 2 clean off-white canvas background |
| `Primitive/neutral-subtle` | `#EFEFEF` | Skin 2 soft light-gray fill for neutral chips inside white cards |
| `Primitive/neutral-track` | `#D2D2D2` | Empty progress bar & gauge track gray |
| `Primitive/neutral-border` | `#E0D8D2` | Default resting card, pack tile, & input border |
| `Primitive/neutral-muted` | `#555F6D` | Subdued secondary text gray |
| `Primitive/neutral-divider` | `#C6C6CD` (60%) | 60% translucent divider rule line |
| `Primitive/black-overlay` | `#000000` (40%) | 40% translucent black backdrop scrim |

---

### 2. Semantic Role Tier (19 Locked Color Variables)

#### `Color` (Brand & Action — Scopes: `ALL_FILLS`, `STROKE_COLOR`)
| Variable | Skin 1 (Coffee) | Skin 2 (Supplement) | Job / Description |
| :--- | :--- | :--- | :--- |
| **`Color/Primary`** | `Primitive/coffee-black` (`#151C25`) | `Primitive/supp-turquoise` (`#00BC8E`) | Primary brand conversion color (Add to Cart CTA background, inverted section H2). |
| **`Color/Secondary`** | `Primitive/coffee-brown` (`#A18263`) | `Primitive/supp-coral` (`#C5452C`) | Brand accent fill for savings pills, highlight chips, sticky ATC bar, accent header, gauge fills. |
| **`Color/Tertiary`** | `Primitive/green` (`#344435`) | `Primitive/coffee-black` (`#151C25`) | High-contrast brand tone for active selection states: status badges (`Standard`, `Popular`, `Selected`). |

#### `Background` & `Surface` (Canvas & Containers)
| Variable | Scopes | Skin 1 (Coffee) | Skin 2 (Supplement) | Job / Description |
| :--- | :--- | :--- | :--- | :--- |
| **`Background/Main`** | `FRAME_FILL` | `Primitive/coffee-cream` | `Primitive/neutral-off-white` | Root canvas background for pages and viewports. |
| **`Surface/Container`** | `FRAME_FILL`, `SHAPE_FILL` | `Primitive/white` | `Primitive/white` | Elevated card backgrounds, search inputs, and modal containers. |
| **`Surface/Subtle`** | `FRAME_FILL`, `SHAPE_FILL` | `Primitive/coffee-cream` | `Primitive/neutral-subtle` | Soft neutral fill for subtle chips (`Variant=Neutral`), table headers, and neutral tags inside white cards. |
| **`Surface/Track`** | `FRAME_FILL`, `SHAPE_FILL` | `Primitive/neutral-track` | `Primitive/neutral-track` | Neutral empty track for progress bars, gauges, and range sliders. |
| **`Surface/Overlay`** | `FRAME_FILL` | `Primitive/black-overlay` | `Primitive/black-overlay` | 40% black backdrop scrim for slide-out cart, drawers, popups, and video cards. |
| **`Surface/Inverted`** | `FRAME_FILL` | `Primitive/coffee-brown` | `Primitive/coffee-black` | High-contrast section surface (influencer/editorial bands, dark footers). Pairs with `Color/Primary` H2. |

#### `Text` (Typography & Vector Icons — Scopes: `TEXT_FILL`, `SHAPE_FILL`, `STROKE_COLOR`)
*Icons inherit text tokens (`currentColor` in CSS); no duplicate `Icon/*` variables.*

| Variable | Skin 1 (Coffee) | Skin 2 (Supplement) | WCAG AA Contrast | Job / Description |
| :--- | :--- | :--- | :--- | :--- |
| **`Text/Primary`** | `Primitive/coffee-black` | `Primitive/coffee-black` | 14.60:1 / 16.43:1 ✅ | Primary body copy, headings, prices, and default icons. |
| **`Text/Muted`** | `Primitive/neutral-muted` | `Primitive/neutral-muted` | 5.51:1 / 6.20:1 ✅ | Subdued text: timestamps, review counts, compare-at prices, placeholders. |
| **`Text/Accent`** | `Primitive/coffee-brown` | `Primitive/supp-coral` | 3.04:1 / 4.72:1 ✅ | Brand-highlighted text, interactive links, and emphasis callouts on light surfaces. |
| **`Text/Inverse`** | `Primitive/white` | `Primitive/white` | 10.37:1 / 17.15:1 ✅ | White text/icons over dark non-brand surfaces (`Surface/Overlay` scrims, Skin 2 `Surface/Inverted`). |
| **`Text/On-Primary`** | `Primitive/white` | `Primitive/coffee-black` | 17.15:1 / 7.01:1 ✅ | Text and icon color strictly on top of `Color/Primary` surfaces (Primary CTA buttons). |
| **`Text/On-Secondary`** | `Primitive/coffee-black` | `Primitive/white` | 4.81:1 / 4.93:1 ✅ | Text and icon color strictly on top of `Color/Secondary` surfaces (Highlighted badges, Sticky ATC bar, Accent header). |
| **`Text/On-Tertiary`** | `Primitive/white` | `Primitive/white` | 10.37:1 / 17.15:1 ✅ | Text and icon color strictly on top of `Color/Tertiary` surfaces (`Selected` badges like `Popular` / `Save 10%` and `Selected` Filter Chips). |

#### `Border` (Strokes — Scope: `STROKE_COLOR`)
| Variable | Skin 1 (Coffee) | Skin 2 (Supplement) | Job / Description |
| :--- | :--- | :--- | :--- |
| **`Border/Default`** | `Primitive/neutral-border` | `Primitive/neutral-border` | Default resting stroke for structural containers: unselected pack tiles, product cards, form inputs, and panels. |
| **`Border/Selected`** | `Primitive/green` (`#344435`) | `Primitive/coffee-black` (`#151C25`) | High-emphasis stroke (8.83:1 / 16.43:1) for active states: selected pack tiles, chosen options, and `:focus-visible`. |
| **`Border/Divider`** | `Primitive/neutral-divider` | `Primitive/neutral-divider` | Subtle 60% opacity rule line strictly for separating list rows, cart line items, and accordion sections. |

*(System alert states `--color-error: #D72C0D` and `--color-success: #008060` live strictly as static CSS utility variables per Polaris standards—never themed per skin).*

---

## Typography
Consolidated type scales to reduce bloat.
- **Skin 1:** Literata (Headings) + Inter (Body & Labels)
- **Skin 2:** Gasoek One (H2 Display) + Source Code Pro (H4 & Body) + Inter (Labels)

## Spacing & Geometry
- **Grid / Scale:** Clean 4/8/12/16/20/24px steps (`6px` allowed for compact micro-gaps via `space-xs`). No off-grid spacing (no 13px or 17px).
- **Radius:** `radius-xs` (4px), `radius-sm` (8px) for panels/cards, `radius-sm-md` (12px), `radius-md` (16px) for photos, `radius-lg` (32px), `radius-full` (999px) for pills/buttons.
- **Gauge:** Exact `46px` diameter (`gauge-diameter`) with `9px` ring thickness.
- **Icons:** Phosphor (Regular weight) is the single source of truth for the theme's line icons.

## Component Architecture
Components are abstracted by **Slot** (where it lives) and **Content Contract** (what fills it).
- **Vocabulary Variance:** Parameterized by Metafields (Same shape, different words/numbers. e.g. Pack Economics Tile).
- **Kind Variance:** Named variants chosen per product (Information is a different shape entirely. e.g., Gauge vs. Benefit Chips).
