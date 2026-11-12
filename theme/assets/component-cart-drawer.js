/**
 * Miley Theme - <cart-drawer> Custom Element
 * Spec: SDD v1.2.0 Section 10.1 & Cart Gamification Engine
 * Handles AJAX line item mutation, tiered milestone progress, and accessibility
 */

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.freeShippingCents = Number(this.getAttribute('data-shipping-threshold') || 35) * 100;
    this.freeGiftCents = Number(this.getAttribute('data-gift-threshold') || 60) * 100;
    this.giftName = this.getAttribute('data-gift-name') || 'Free Sample Bag';

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onCartUpdated = this.onCartUpdated.bind(this);
  }

  connectedCallback() {
    this.scrim = this.querySelector('.cart-drawer__scrim');
    this.closeBtn = this.querySelector('.cart-drawer__close-btn');
    this.bodyEl = this.querySelector('.cart-drawer__body');
    this.subtotalEl = this.querySelector('[data-cart-subtotal]');
    this.messageEl = this.querySelector('[data-gamification-message]');
    this.barEl = this.querySelector('[data-gamification-bar]');
    this.badgeTier1 = this.querySelector('[data-milestone-tier-1]');
    this.badgeTier2 = this.querySelector('[data-milestone-tier-2]');

    if (this.scrim) this.scrim.addEventListener('click', this.close);
    if (this.closeBtn) this.closeBtn.addEventListener('click', this.close);

    // Event bus subscriptions
    this.unsubOpen = window.ThemeEvents?.subscribe('theme:cart:open', this.open);
    this.unsubClose = window.ThemeEvents?.subscribe('theme:cart:close', this.close);
    this.unsubUpdate = window.ThemeEvents?.subscribe('theme:cart:updated', this.onCartUpdated);

    // Global cart triggers
    document.querySelectorAll('[data-cart-trigger]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Delegate quantity changes & removal
    if (this.bodyEl) {
      this.bodyEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cart-action]');
        if (!btn) return;

        const action = btn.getAttribute('data-cart-action');
        const lineKey = btn.getAttribute('data-line-key');
        const currentQty = Number(btn.getAttribute('data-current-qty') || 1);

        if (action === 'increment') {
          this.updateQuantity(lineKey, currentQty + 1);
        } else if (action === 'decrement') {
          this.updateQuantity(lineKey, Math.max(0, currentQty - 1));
        } else if (action === 'remove') {
          this.updateQuantity(lineKey, 0);
        }
      });
    }
  }

  disconnectedCallback() {
    if (this.scrim) this.scrim.removeEventListener('click', this.close);
    if (this.closeBtn) this.closeBtn.removeEventListener('click', this.close);
    if (typeof this.unsubOpen === 'function') this.unsubOpen();
    if (typeof this.unsubClose === 'function') this.unsubClose();
    if (typeof this.unsubUpdate === 'function') this.unsubUpdate();
    document.removeEventListener('keydown', this.onKeyDown);
  }

  open() {
    this.isOpen = true;
    this.classList.add('is-open');
    document.documentElement.classList.add('overflow-hidden');
    document.addEventListener('keydown', this.onKeyDown);
  }

  close() {
    this.isOpen = false;
    this.classList.remove('is-open');
    document.documentElement.classList.remove('overflow-hidden');
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e) {
    if (e.key === 'Escape' && this.isOpen) {
      this.close();
    }
  }

  async updateQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ id: key, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Cart update failed: ${response.statusText}`);
      }

      const cartData = await response.json();
      window.ThemeEvents?.publish('theme:cart:updated', {
        cart: cartData,
        itemCount: cartData.item_count,
        totalPrice: cartData.total_price,
        formattedTotalPrice: window.Shopify.formatMoney(cartData.total_price),
      });
    } catch (err) {
      console.error('[Miley Theme] Failed to update cart item:', err);
    }
  }

  onCartUpdated(event) {
    const detail = event.detail;
    if (!detail || !detail.cart) return;

    const cart = detail.cart;

    // Update Subtotal
    if (this.subtotalEl) {
      this.subtotalEl.textContent = window.Shopify.formatMoney(cart.total_price);
    }

    // Update Header Counter Badge
    document.querySelectorAll('[data-cart-count]').forEach((badge) => {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? '' : 'none';
    });

    // Update Milestone Gamification
    this.updateMilestones(cart.total_price);

    // Re-render Line Items
    this.renderLineItems(cart.items);
  }

  updateMilestones(totalCents) {
    const maxThreshold = this.freeGiftCents;
    const progressPct = Math.min(100, Math.round((totalCents / maxThreshold) * 100));

    if (this.barEl) {
      this.barEl.style.width = `${progressPct}%`;
    }

    const tier1Reached = totalCents >= this.freeShippingCents;
    const tier2Reached = totalCents >= this.freeGiftCents;

    if (this.badgeTier1) {
      this.badgeTier1.classList.toggle('milestone-badge--achieved', tier1Reached);
    }
    if (this.badgeTier2) {
      this.badgeTier2.classList.toggle('milestone-badge--achieved', tier2Reached);
    }

    if (this.messageEl) {
      if (!tier1Reached) {
        const remaining = this.freeShippingCents - totalCents;
        this.messageEl.textContent = `You're only ${window.Shopify.formatMoney(remaining)} away from Free Shipping!`;
      } else if (!tier2Reached) {
        const remaining = this.freeGiftCents - totalCents;
        this.messageEl.textContent = `🎉 Free Shipping unlocked! Add ${window.Shopify.formatMoney(remaining)} for ${this.giftName}!`;
      } else {
        this.messageEl.textContent = `🎉 All milestones unlocked! Free Shipping & ${this.giftName} included!`;
      }
    }
  }

  renderLineItems(items) {
    if (!this.bodyEl) return;

    if (!items || items.length === 0) {
      this.bodyEl.innerHTML = `
        <div class="cart-drawer__empty">
          <p>Your cart is empty.</p>
        </div>
      `;
      return;
    }

    const html = items.map((item) => {
      const formattedPrice = window.Shopify.formatMoney(item.final_line_price);
      const planBadge = item.selling_plan_allocation
        ? `<span class="cart-item__plan-badge">${item.selling_plan_allocation.selling_plan.name}</span>`
        : '';
      const variantTitle = item.variant_title ? `<span class="cart-item__variant">${item.variant_title}</span>` : '';
      const imgTag = item.image
        ? `<img src="${item.image}" alt="${item.title}" width="64" height="64" loading="lazy">`
        : '';

      return `
        <div class="cart-item" data-line-key="${item.key}">
          <div class="cart-item__media">${imgTag}</div>
          <div class="cart-item__details">
            <div class="cart-item__top-row">
              <a href="${item.url}" class="cart-item__title">${item.product_title}</a>
              <span class="cart-item__price">${formattedPrice}</span>
            </div>
            ${variantTitle}
            ${planBadge}
            <div class="cart-item__actions">
              <div class="cart-item__stepper">
                <button type="button" class="cart-item__stepper-btn" data-cart-action="decrement" data-line-key="${item.key}" data-current-qty="${item.quantity}">−</button>
                <span class="cart-item__stepper-val">${item.quantity}</span>
                <button type="button" class="cart-item__stepper-btn" data-cart-action="increment" data-line-key="${item.key}" data-current-qty="${item.quantity}">+</button>
              </div>
              <button type="button" class="cart-item__remove-btn" data-cart-action="remove" data-line-key="${item.key}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    this.bodyEl.innerHTML = html;
  }
}

if (!customElements.get('cart-drawer')) {
  customElements.define('cart-drawer', CartDrawer);
}
