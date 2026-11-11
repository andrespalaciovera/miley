/**
 * Miley Theme - <pack-selector> Custom Element
 * Spec: SDD v1.2.0 Section 10.1 & Section 12 (Defensive Edge-Cases)
 * Emitter: 'theme:variant:change'
 */

class PackSelector extends HTMLElement {
  constructor() {
    super();
    this.productId = this.getAttribute('data-product-id');
    this.productData = null;
    this.tiles = [];
    this.onTileClick = this.onTileClick.bind(this);
    this.onExternalVariantChange = this.onExternalVariantChange.bind(this);
  }

  connectedCallback() {
    this.productData = window.ThemeEvents?.getProductData(this.productId);

    // Defensive collapse (Agent Rule 6): If single variant, collapse cleanly
    if (this.productData && this.productData.variants && this.productData.variants.length <= 1) {
      this.style.display = 'none';
      return;
    }

    this.tiles = Array.from(this.querySelectorAll('.pack-tile'));
    this.tiles.forEach((tile) => {
      tile.addEventListener('click', this.onTileClick);
    });

    // Listen to external variant changes (from Sticky ATC or other controls)
    this.unsubscribe = window.ThemeEvents?.subscribe(
      'theme:variant:change',
      this.onExternalVariantChange
    );
  }

  disconnectedCallback() {
    this.tiles.forEach((tile) => {
      tile.removeEventListener('click', this.onTileClick);
    });
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  }

  /**
   * Handles user click on a pack tile
   * @param {MouseEvent} event
   */
  onTileClick(event) {
    const tile = event.currentTarget;
    if (!tile) return;

    const variantId = Number(tile.getAttribute('data-variant-id'));
    if (!variantId) return;

    this.selectVariant(variantId, true);
  }

  /**
   * Selects a variant tile and emits 'theme:variant:change'
   * @param {number} variantId
   * @param {boolean} emitEvent
   */
  selectVariant(variantId, emitEvent = true) {
    let matchedVariant = null;

    if (this.productData && this.productData.variants) {
      matchedVariant = this.productData.variants.find((v) => v.id === variantId);
    }

    // Update tile selection state
    this.tiles.forEach((tile) => {
      const isSelected = Number(tile.getAttribute('data-variant-id')) === variantId;
      tile.classList.toggle('pack-tile--selected', isSelected);
      tile.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    if (emitEvent && matchedVariant) {
      const priceCents = matchedVariant.price;
      const compareAtCents = matchedVariant.compareAtPrice;
      const servings = matchedVariant.unitServings || this.productData?.unitServingsDefault;

      const detail = {
        productId: Number(this.productId),
        variantId: matchedVariant.id,
        title: matchedVariant.title,
        price: priceCents,
        compareAtPrice: compareAtCents,
        formattedPrice: window.Shopify.formatMoney(priceCents),
        formattedCompareAtPrice: compareAtCents ? window.Shopify.formatMoney(compareAtCents) : null,
        unitPrice: servings ? window.Shopify.formatServingPrice(priceCents, servings) : null,
        unitServings: servings || null,
        savingsPercentage: matchedVariant.savingsPercentage || null,
        available: matchedVariant.available,
        featuredImageId: matchedVariant.featuredMediaId || null,
        sellingPlanAllocations: matchedVariant.sellingPlanAllocations || [],
      };

      window.ThemeEvents?.publish('theme:variant:change', detail);
    }
  }

  /**
   * Synchronizes active tile if variant was changed externally
   * @param {CustomEvent} event
   */
  onExternalVariantChange(event) {
    const detail = event.detail;
    if (!detail || Number(detail.productId) !== Number(this.productId)) return;
    if (detail.variantId) {
      this.selectVariant(Number(detail.variantId), false);
    }
  }
}

if (!customElements.get('pack-selector')) {
  customElements.define('pack-selector', PackSelector);
}
