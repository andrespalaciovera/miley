# 05 Agent Rules

*Copy/paste these instructions when prompting Antigravity, Claude, or Gemini to write code.*

## Development Rules
1. **Vanilla Web Components Only:** Do not use jQuery, React, or heavy JS frameworks. 
2. **CSS Custom Properties:** All styling must be driven by tokens/CSS variables. Absolutely no raw hex codes (`#FFFFFF`) or hardcoded pixel spacing values in the CSS files.
3. **Async Loading:** Initialize Javascript only when a section enters the viewport to guarantee perfect Lighthouse scores.
4. **Data Sourcing:** Use metafield names strictly from the Content Model (`03-Content-Model.md`). Do not guess metafield namespaces.
5. **Security:** Never expose Admin API credentials to the storefront.
6. **Testing Standard:** Test each block with *empty* and *maximum* metafield data.
7. **Base Theme (Theme Store Compliance):** The build MUST scaffold from **`Shopify/skeleton-theme`** (or 100% original code)—never forked from `Dawn` or `Horizon` (prohibited by Shopify Theme Store submission rules). Rely on modern **Theme Blocks** (`blocks/` and nested `{% content_for 'blocks' %}`) rather than monolithic sections, and ensure `@app` block compatibility where required.
