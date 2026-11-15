/**
 * Miley Theme - <product-gallery> Custom Element
 * Handles thumbnail switching, indicator dots, and keyboard navigation cleanly.
 */

class ProductGallery extends HTMLElement {
  constructor() {
    super();
    this.onThumbClick = this.onThumbClick.bind(this);
  }

  connectedCallback() {
    this.heroImg = this.querySelector('.product-gallery__hero-img');
    this.thumbs = Array.from(this.querySelectorAll('.product-gallery__thumb'));
    this.dots = Array.from(this.querySelectorAll('.gallery-dot'));

    this.thumbs.forEach((thumb, index) => {
      thumb.dataset.index = String(index);
      thumb.addEventListener('click', this.onThumbClick);
    });
  }

  disconnectedCallback() {
    this.thumbs.forEach((thumb) => {
      thumb.removeEventListener('click', this.onThumbClick);
    });
  }

  onThumbClick(event) {
    const btn = event.currentTarget;
    if (!btn) return;

    const index = Number(btn.dataset.index || 0);
    const fullSrc = btn.dataset.fullSrc;
    const fullSrcset = btn.dataset.fullSrcset;
    const alt = btn.dataset.alt;

    this.thumbs.forEach((t, i) => {
      const isActive = i === index;
      t.classList.toggle('product-gallery__thumb--active', isActive);
      t.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('gallery-dot--active', i === index);
    });

    if (this.heroImg && fullSrc) {
      this.heroImg.src = fullSrc;
      if (fullSrcset) {
        this.heroImg.srcset = fullSrcset;
      } else {
        this.heroImg.removeAttribute('srcset');
      }
      if (alt) {
        this.heroImg.alt = alt;
      }
    }
  }
}

if (!customElements.get('product-gallery')) {
  customElements.define('product-gallery', ProductGallery);
}
