/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import { render as litRender } from 'lit-html';
import { supportsAdoptingStyleSheets, unsafeCSS } from './css-tag.js';

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
// eslint-disable-next-line no-unused-vars
window.JSCompiler_renameProperty = (prop, _obj) => prop;

/**
 * Sentinel value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};

export default class LitBaseElement extends HTMLElement {
  // only called if there is an attributeChangedCallback() defined;
  // we piggy back on this getter to run finalize() to ensure finalize() is run
  static get observedAttributes() {
    return [];
  }

  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles() {
    return this.styles;
  }

  /** @nocollapse */
  static _getUniqueStyles() {
    // Only gather styles once per class
    if (Object.prototype.hasOwnProperty.call(this, window.JSCompiler_renameProperty('_styles', this))) {
      return;
    }

    // Take care not to call `this.getStyles()` multiple times since this
    // generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any
    // shared styles will generate new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable
    // stylesheets.
    const userStyles = this.getStyles();
    if (Array.isArray(userStyles)) {
      // De-duplicate styles preserving the _last_ instance in the set.
      // This is a performance optimization to avoid duplicated styles that can
      // occur especially when composing via subclassing.
      // The last item is kept to try to preserve the cascade order with the
      // assumption that it's most important that last added styles override
      // previous styles.
      const addStyles = (stylesToAdd, styleSet) => stylesToAdd.reduceRight(
        // Note: On IE set.add() does not return the set
        // Note: grouping expression returns last value: '(set.add(styles), set)' returns 'set'
        (set, style) => (Array.isArray(style) ? addStyles(style, set) : (set.add(style), set)),
        styleSet
      );
      // Array.from does not work on Set in IE, otherwise return
      // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
      const set = addStyles(userStyles, new Set());
      const styles = [];
      set.forEach(v => styles.unshift(v));
      this._styles = styles;
    } else {
      this._styles = userStyles === undefined ? [] : [userStyles];
    }

    // Ensure that there are no invalid CSSStyleSheet instances here. They are
    // invalid in two conditions.
    // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
    //     this is impossible to check except via .replaceSync or use
    // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
    //     false)
    this._styles = this._styles.map(s => {
      if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
        // Flatten the cssText from the passed constructible stylesheet (or
        // undetectable non-constructible stylesheet). The user might have
        // expected to update their stylesheets over time, but the alternative
        // is a crash.
        const cssText = Array.prototype.slice.call(s.cssRules)
          .reduce((css, rule) => css + rule.cssText, '');
        return unsafeCSS(cssText);
      }
      return s;
    });
  }

  constructor() {
    super();
    this.initialize();
  }

  /**
   * Performs element initialization. By default this calls `createRenderRoot` to create
   * the element `renderRoot` node and captures any pre-set values for registered properties.
   */
  initialize() {
    this.constructor._getUniqueStyles();
    this.renderRoot = this.createRenderRoot();
    // Note, if renderRoot is not a shadowRoot, styles would/could apply to the element's getRootNode().
    // While this could be done, we're choosing not to support this now since it would require different
    // logic around de-duping.
    if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
      this.adoptStyles();
    }
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  /**
   * Applies styling to the element shadowRoot using the `static get styles` property.
   * Styling will apply using `shadowRoot.adoptedStyleSheets` where available and will fallback
   * otherwise. When Shadow DOM is available but `adoptedStyleSheets` is not, styles are
   * appended to the end of the `shadowRoot` to [mimic spec behavior]
   * (https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
   */
  adoptStyles() {
    const styles = this.constructor._styles;
    if (styles.length === 0) {
      return;
    }

    if (supportsAdoptingStyleSheets) {
      this.renderRoot.adoptedStyleSheets = styles.map(s => (s instanceof CSSStyleSheet ? s : s.styleSheet));
    } else {
      // This must be done after rendering so the actual style insertion is done in `update`.
      this._needsShimAdoptedStyleSheets = true;
    }
  }

  /**
   * Calls `render` to render DOM via lit-html.
   * This is what should be called by 'observable' implementations.
   */
  _doRender() {
    if (this.shouldRender()) {
      if (!this._firstRendered) {
        this.beforeFirstRender();
      }

      const templateResult = this.render();
      if (templateResult !== renderNotImplemented) {
        litRender(templateResult, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this,
        });
      }

      // When native Shadow DOM is used but adoptedStyles are not supported,
      // insert styling after rendering to ensure adoptedStyles have highest priority.
      if (this._needsShimAdoptedStyleSheets) {
        this._needsShimAdoptedStyleSheets = false;
        this.constructor._styles.forEach(s => {
          const style = document.createElement('style');
          style.textContent = s.cssText;
          this.renderRoot.appendChild(style);
        });
      }

      if (!this._firstRendered) {
        this._firstRendered = true;
        this.firstRendered();
      }

      this.rendered();
    }
  }

  _initialRender() {
    this._firstRendered = false;
    this._doRender();
  }

  // this handler must be defined to trigger the necessary call to get observedAttributes() !!!
  attributeChangedCallback(name, oldval, newval) {
    //
  }

  connectedCallback() {
    this._initialRender();
  }

  disconnectedCallback() {
    //
  }

  shouldRender() {
    return true;
  }

  beforeFirstRender() { }

  render() {
    return renderNotImplemented;
  }

  firstRendered() { }

  rendered() { }
}
