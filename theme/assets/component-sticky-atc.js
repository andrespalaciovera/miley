/**
 * Miley Theme - <sticky-add-to-cart> Custom Element
 * Spec: SDD v1.2.0 Section 10.1 & Zone 2
 * Emits: 'theme:cart:add', 'theme:cart:updated', 'theme:cart:open'
 */

class StickyAddToCart extends HTMLElement {
  constructor() {
    super();
    this.productId = this.getAttribute('data-product-id');
    this.variantId = Number(this.getAttribute('data-initial-variant-id'));
    this.sellingPlanId = null;
    this.sellingPlanName = null;
    this.currentPrice = Number(this.getAttribute('data-initial-price'));
    this.observer = null;

    this.onVariantChange = this.onVariantChange.bind(this);
    this.onSubscriptionChange = this.onSubscriptionChange.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onAddToCartClick = this.onAddToCartClick.bind(this);
  }

  connectedCallback() {
    this.titleEl = this.querySelector('[data-sticky-title]');
    this.priceEl = this.querySelector('[data-sticky-price]');
    this.imgEl = this.querySelector('[data-sticky-image]');
    this.editBtn = this.querySelector('[data-sticky-edit]');
    this.atcBtn = this.querySelector('[data-sticky-atc-btn]');

    if (this.editBtn) {
      this.editBtn.addEventListener('click', this.onEditClick);
    }
    if (this.atcBtn) {
      this.atcBtn.addEventListener('click', this.onAddToCartClick);
    }

    // Subscribe to Event Bus
    this.unsubscribeVariant = window.ThemeEvents?.subscribe(
      'theme:variant:change',
      this.onVariantChange
    );
    this.unsubscribeSub = window.ThemeEvents?.subscribe(
      'theme:subscription:change',
      this.onSubscriptionChange
    );

    // Setup IntersectionObserver on primary ATC
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.editBtn) {
      this.editBtn.removeEventListener('click', this.onEditClick);
    }
    if (this.atcBtn) {
      this.atcBtn.removeEventListener('click', this.onAddToCartClick);
    }
    if (typeof this.unsubscribeVariant === 'function') {
      this.unsubscribeVariant();
    }
    if (typeof this.unsubscribeSub === 'function') {
      this.unsubscribeSub();
    }
  }

  setupIntersectionObserver() {
    const primaryAtc = document.querySelector('[data-primary-atc]') || document.querySelector('form[action*="/cart/add"] [type="submit"]');
    if (!primaryAtc) {
      // If no primary ATC found on page, keep bar visible
      this.classList.add('sticky-atc--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When primary ATC is in viewport, hide sticky bar. When scrolled past, show it.
          if (entry.isIntersecting) {
            this.classList.remove('sticky-atc--visible');
          } else {
            // Only show if scrolled past the element (boundingClientRect.top < 0)
            if (entry.boundingClientRect.top < 0) {
              this.classList.add('sticky-atc--visible');
            } else {
              this.classList.remove('sticky-atc--visible');
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    this.observer.observe(primaryAtc);
  }

  onVariantChange(event) {
    const detail = event.detail;
    if (!detail || Number(detail.productId) !== Number(this.productId)) return;

    this.variantId = detail.variantId;
    this.currentPrice = detail.price;

    this.updateDisplay(detail.title, detail.formattedPrice);

    if (this.atcBtn) {
      this.atcBtn.disabled = !detail.available;
      this.atcBtn.textContent = detail.available
        ? (this.atcBtn.getAttribute('data-label-atc') || 'Add to cart')
        : (this.atcBtn.getAttribute('data-label-sold-out') || 'Sold out');
    }
  }

  onSubscriptionChange(event) {
    const detail = event.detail;
    if (!detail) return;

    if (detail.isSubscription) {
      this.sellingPlanId = detail.sellingPlanId;
      this.sellingPlanName = detail.sellingPlanName;
      this.currentPrice = detail.calculatedPrice;
      if (this.priceEl) {
        this.priceEl.textContent = detail.formattedCalculatedPrice;
      }
    } else {
      this.sellingPlanId = null;
      this.sellingPlanName = null;
      if (this.priceEl) {
        this.priceEl.textContent = window.Shopify.formatMoney(this.currentPrice);
      }
    }
  }

  updateDisplay(title, formattedPrice) {
    if (this.titleEl && title) {
      let fullTitle = title;
      if (this.sellingPlanName) {
        fullTitle += ` • ${this.sellingPlanName}`;
      }
      this.titleEl.textContent = fullTitle;
    }
    if (this.priceEl && formattedPrice) {
      this.priceEl.textContent = formattedPrice;
    }
  }

  onEditClick(event) {
    event.preventDefault();
    const target = document.querySelector('pack-selector') || document.querySelector('[data-primary-atc]');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async onAddToCartClick() {
    if (!this.variantId) return;

    if (this.atcBtn) {
      this.atcBtn.disabled = true;
    }

    const payload = {
      id: this.variantId,
      quantity: 1,
    };

    if (this.sellingPlanId) {
      payload.selling_plan = this.sellingPlanId;
    }

    // Publish theme:cart:add event
    window.ThemeEvents?.publish('theme:cart:add', {
      variantId: this.variantId,
      quantity: 1,
      sellingPlanId: this.sellingPlanId,
      properties: {},
    });

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Cart add failed: ${response.statusText}`);
      }

      // Fetch fresh cart state
      const cartRes = await fetch('/cart.js');
      const cartData = await cartRes.json();

      // Emit theme:cart:updated
      window.ThemeEvents?.publish('theme:cart:updated', {
        cart: cartData,
        itemCount: cartData.item_count,
        totalPrice: cartData.total_price,
        formattedTotalPrice: window.Shopify.formatMoney(cartData.total_price),
      });

      // Emit theme:cart:open to reveal drawer
      window.ThemeEvents?.publish('theme:cart:open', { source: 'sticky-atc' });
    } catch (err) {
      console.error('[Miley Theme] Failed to add item to cart:', err);
    } finally {
      if (this.atcBtn) {
        this.atcBtn.disabled = false;
      }
    }
  }
}

if (!customElements.get('sticky-add-to-cart')) {
  customElements.define('sticky-add-to-cart', StickyAddToCart);
}
