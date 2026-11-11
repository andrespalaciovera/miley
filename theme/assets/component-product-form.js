/**
 * Miley Theme - <product-form-controller> Custom Element
 * Syncs the native Shopify product form with Event Bus ('theme:variant:change', 'theme:subscription:change')
 */

class ProductFormController extends HTMLElement {
  constructor() {
    super();
    this.onVariantChange = this.onVariantChange.bind(this);
    this.onSubscriptionChange = this.onSubscriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  connectedCallback() {
    this.form = this.querySelector('form');
    this.idInput = this.querySelector('[name="id"]');
    this.planInput = this.querySelector('[name="selling_plan"]');
    this.priceDisplay = this.querySelector('[data-product-price]');
    this.submitBtn = this.querySelector('[type="submit"]') || this.querySelector('[data-primary-atc]');

    if (this.form) {
      this.form.addEventListener('submit', this.onSubmit);
    }

    this.unsubVariant = window.ThemeEvents?.subscribe(
      'theme:variant:change',
      this.onVariantChange
    );
    this.unsubSub = window.ThemeEvents?.subscribe(
      'theme:subscription:change',
      this.onSubscriptionChange
    );
  }

  disconnectedCallback() {
    if (this.form) {
      this.form.removeEventListener('submit', this.onSubmit);
    }
    if (typeof this.unsubVariant === 'function') {
      this.unsubVariant();
    }
    if (typeof this.unsubSub === 'function') {
      this.unsubSub();
    }
  }

  onVariantChange(event) {
    const detail = event.detail;
    if (!detail) return;

    if (this.idInput) {
      this.idInput.value = detail.variantId;
    }
    if (this.priceDisplay) {
      this.priceDisplay.textContent = detail.formattedPrice;
    }
    if (this.submitBtn) {
      this.submitBtn.disabled = !detail.available;
      const atcLabel = this.submitBtn.getAttribute('data-label-atc') || 'Add to cart';
      const soldOutLabel = this.submitBtn.getAttribute('data-label-sold-out') || 'Sold out';
      if (this.submitBtn.tagName === 'INPUT') {
        this.submitBtn.value = detail.available ? atcLabel : soldOutLabel;
      } else {
        this.submitBtn.textContent = detail.available ? atcLabel : soldOutLabel;
      }
    }
  }

  onSubscriptionChange(event) {
    const detail = event.detail;
    if (!detail) return;

    if (this.planInput) {
      this.planInput.value = detail.isSubscription && detail.sellingPlanId ? detail.sellingPlanId : '';
    }
    if (detail.isSubscription && this.priceDisplay) {
      this.priceDisplay.textContent = detail.formattedCalculatedPrice;
    }
  }

  async onSubmit(event) {
    // If AJAX cart drawer is active, handle submission via Fetch
    event.preventDefault();
    const formData = new FormData(this.form);

    if (this.submitBtn) {
      this.submitBtn.disabled = true;
    }

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Cart add failed: ${response.statusText}`);
      }

      const cartRes = await fetch('/cart.js');
      const cartData = await cartRes.json();

      window.ThemeEvents?.publish('theme:cart:updated', {
        cart: cartData,
        itemCount: cartData.item_count,
        totalPrice: cartData.total_price,
        formattedTotalPrice: window.Shopify.formatMoney(cartData.total_price),
      });

      window.ThemeEvents?.publish('theme:cart:open', { source: 'product-form' });
    } catch (err) {
      console.error('[Miley Theme] Failed to submit product form:', err);
      // Fallback: submit natively
      this.form.submit();
    } finally {
      if (this.submitBtn) {
        this.submitBtn.disabled = false;
      }
    }
  }
}

if (!customElements.get('product-form-controller')) {
  customElements.define('product-form-controller', ProductFormController);
}
