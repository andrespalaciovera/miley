/**
 * Miley Theme - <subscription-toggle> Custom Element
 * Spec: SDD v1.2.0 Section 10.1 & Section 12 (Defensive Edge-Cases)
 * Emitter: 'theme:subscription:change'
 */

class SubscriptionToggle extends HTMLElement {
  constructor() {
    super();
    this.productId = this.getAttribute('data-product-id');
    this.productData = null;
    this.isSubscription = false;
    this.selectedPlanId = null;
    this.currentVariant = null;

    this.onTabClick = this.onTabClick.bind(this);
    this.onFrequencyClick = this.onFrequencyClick.bind(this);
    this.onVariantChange = this.onVariantChange.bind(this);
  }

  connectedCallback() {
    this.productData = window.ThemeEvents?.getProductData(this.productId);

    // Defensive collapse (Agent Rule 6): If no selling plans exist, collapse cleanly
    if (!this.productData || !this.productData.sellingPlans || this.productData.sellingPlans.length === 0) {
      this.style.display = 'none';
      return;
    }

    // Set initial variant
    if (this.productData.variants && this.productData.selectedVariantId) {
      this.currentVariant = this.productData.variants.find(
        (v) => v.id === this.productData.selectedVariantId
      ) || this.productData.variants[0];
    }

    this.tabs = Array.from(this.querySelectorAll('.subscription-tab'));
    this.frequencyTiles = Array.from(this.querySelectorAll('.frequency-tile'));
    this.frequencySection = this.querySelector('.subscription-toggle__frequency-section');

    this.tabs.forEach((tab) => {
      tab.addEventListener('click', this.onTabClick);
    });

    this.frequencyTiles.forEach((tile) => {
      tile.addEventListener('click', this.onFrequencyClick);
    });

    // Default to the first frequency plan
    if (this.frequencyTiles.length > 0) {
      const activeTile = this.querySelector('.frequency-tile--selected') || this.frequencyTiles[0];
      this.selectedPlanId = Number(activeTile.getAttribute('data-plan-id')) || null;
    }

    // Subscribe to variant changes to update pricing calculations dynamically
    this.unsubscribe = window.ThemeEvents?.subscribe(
      'theme:variant:change',
      this.onVariantChange
    );
  }

  disconnectedCallback() {
    this.tabs.forEach((tab) => {
      tab.removeEventListener('click', this.onTabClick);
    });
    this.frequencyTiles.forEach((tile) => {
      tile.removeEventListener('click', this.onFrequencyClick);
    });
    if (typeof this.unsubscribe === 'function') {
      this.unsubscribe();
    }
  }

  onTabClick(event) {
    const tab = event.currentTarget;
    if (!tab) return;

    const mode = tab.getAttribute('data-mode');
    this.isSubscription = mode === 'subscribe';

    this.tabs.forEach((t) => {
      const isActive = t === tab;
      t.classList.toggle('subscription-tab--active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (this.frequencySection) {
      this.frequencySection.hidden = !this.isSubscription;
    }

    this.emitSubscriptionChange();
  }

  onFrequencyClick(event) {
    const tile = event.currentTarget;
    if (!tile) return;

    const planId = Number(tile.getAttribute('data-plan-id'));
    if (!planId) return;

    this.selectedPlanId = planId;

    this.frequencyTiles.forEach((t) => {
      const isSelected = t === tile;
      t.classList.toggle('frequency-tile--selected', isSelected);
      t.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });

    this.emitSubscriptionChange();
  }

  onVariantChange(event) {
    const detail = event.detail;
    if (!detail || Number(detail.productId) !== Number(this.productId)) return;

    if (this.productData && this.productData.variants) {
      this.currentVariant = this.productData.variants.find((v) => v.id === detail.variantId) || this.currentVariant;
    }

    if (this.isSubscription) {
      this.emitSubscriptionChange();
    }
  }

  emitSubscriptionChange() {
    let sellingPlanName = null;
    let discountPercent = 0;
    let calculatedPrice = this.currentVariant ? this.currentVariant.price : 0;

    if (this.isSubscription && this.currentVariant && this.selectedPlanId) {
      const allocation = (this.currentVariant.sellingPlanAllocations || []).find(
        (a) => Number(a.sellingPlanId) === Number(this.selectedPlanId)
      );

      if (allocation) {
        discountPercent = allocation.discountPercent || 0;
        calculatedPrice = allocation.price;
        sellingPlanName = allocation.name;
      } else {
        const planObj = (this.productData.sellingPlans || []).find(
          (p) => Number(p.id) === Number(this.selectedPlanId)
        );
        if (planObj) {
          sellingPlanName = planObj.name;
          discountPercent = planObj.discountPercent || 0;
          if (discountPercent > 0) {
            calculatedPrice = Math.round(this.currentVariant.price * (1 - discountPercent / 100));
          }
        }
      }
    }

    const detail = {
      isSubscription: this.isSubscription,
      sellingPlanId: this.isSubscription ? this.selectedPlanId : null,
      sellingPlanName: this.isSubscription ? sellingPlanName : null,
      discountPercent,
      calculatedPrice,
      formattedCalculatedPrice: window.Shopify.formatMoney(calculatedPrice),
    };

    window.ThemeEvents?.publish('theme:subscription:change', detail);
  }
}

if (!customElements.get('subscription-toggle')) {
  customElements.define('subscription-toggle', SubscriptionToggle);
}
