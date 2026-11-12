/**
 * Miley Theme - 60 FPS Micro-Animation Scrubber
 * Inspired by Onyx Coffee Lab Architecture
 * Driven strictly by requestAnimationFrame, zero DOM thrashing, GPU-accelerated transforms
 */

(function () {
  'use strict';

  let ticking = false;
  const scrubElements = [];

  function initScrubber() {
    const elements = document.querySelectorAll('[data-scrub]');
    elements.forEach((el) => {
      scrubElements.push(el);
    });

    if (scrubElements.length > 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      updateProgress();
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  function updateProgress() {
    const windowHeight = window.innerHeight;

    for (let i = 0; i < scrubElements.length; i++) {
      const el = scrubElements[i];
      const rect = el.getBoundingClientRect();

      // Check if element is in viewport margin
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const currentProgress = (windowHeight - rect.top) / totalDistance;
        const clamped = Math.max(0, Math.min(1, currentProgress));

        el.style.setProperty('--scroll-progress', clamped.toFixed(4));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrubber);
  } else {
    initScrubber();
  }
})();
