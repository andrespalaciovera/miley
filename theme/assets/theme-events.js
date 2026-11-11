/**
 * Miley Theme - Global Event Bus & Core Utilities
 * Standard: Decoupled Custom DOM Events, Currency Invariant, 0 DOM Thrashing
 */

(function () {
  'use strict';

  // --- 1. Global Event Bus (Pub/Sub API) ---
  window.ThemeEvents = {
    /**
     * Dispatches a strongly-typed custom event on the document.
     * @param {string} eventName
     * @param {Record<string, any>} detail
     */
    publish: function (eventName, detail) {
      const event = new CustomEvent(eventName, {
        detail: detail || {},
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(event);
    },

    /**
     * Subscribes to a custom event on the document.
     * @param {string} eventName
     * @param {(event: CustomEvent) => void} handler
     * @returns {() => void} Unsubscribe function
     */
    subscribe: function (eventName, handler) {
      document.addEventListener(eventName, handler);
      return function () {
        document.removeEventListener(eventName, handler);
      };
    },
  };

  // --- 2. Shopify Namespace & Money Formatter ---
  window.Shopify = window.Shopify || {};

  /**
   * Formats integer cents into local currency string.
   * Format templates support:
   *  - {{amount}} (e.g. 26.00)
   *  - {{amount_no_decimals}} (e.g. 26)
   *  - {{amount_with_comma_separator}} (e.g. 26,00)
   *  - {{amount_no_decimals_with_comma_separator}} (e.g. 26)
   *
   * @param {number|string} cents
   * @param {string} [format]
   * @returns {string}
   */
  window.Shopify.formatMoney = function (cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    cents = Number(cents);
    if (isNaN(cents)) {
      return '';
    }

    let value = '';
    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    const formatString = format || window.theme?.moneyFormat || window.Shopify?.money_format || '${{amount}}';

    function defaultOption(opt, def) {
      return typeof opt === 'undefined' ? def : opt;
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = defaultOption(precision, 2);
      thousands = defaultOption(thousands, ',');
      decimal = defaultOption(decimal, '.');

      if (isNaN(number) || number == null) {
        return '0';
      }

      number = (number / 100.0).toFixed(precision);
      const parts = number.split('.');
      const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      const centsPart = parts[1] ? decimal + parts[1] : '';

      return dollars + centsPart;
    }

    switch (formatString.match(placeholderRegex)?.[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      default:
        value = formatWithDelimiters(cents, 2);
    }

    return formatString.replace(placeholderRegex, value);
  };

  /**
   * Computes and formats price per serving or unit.
   * Returns empty string if servings count is missing or <= 0 (Agent Rule 6).
   *
   * @param {number} cents
   * @param {number|null} servings
   * @returns {string}
   */
  window.Shopify.formatServingPrice = function (cents, servings) {
    if (!servings || isNaN(servings) || servings <= 0 || !cents || isNaN(cents)) {
      return '';
    }
    const perServingCents = Math.round(cents / servings);
    return window.Shopify.formatMoney(perServingCents);
  };

  // --- 3. Product Data Island Parser & Cache ---
  const productDataCache = new Map();

  /**
   * Retrieves parsed ProductData JSON from island element with memoization.
   * @param {number|string} productId
   * @returns {Record<string, any>|null}
   */
  window.ThemeEvents.getProductData = function (productId) {
    if (!productId) return null;
    const key = String(productId);
    if (productDataCache.has(key)) {
      return productDataCache.get(key);
    }

    const scriptEl = document.getElementById(`ProductData-${key}`);
    if (!scriptEl) return null;

    try {
      const data = JSON.parse(scriptEl.textContent || '{}');
      productDataCache.set(key, data);
      return data;
    } catch (err) {
      console.error(`[Miley Theme] Failed to parse ProductData island for product ${key}:`, err);
      return null;
    }
  };
})();
