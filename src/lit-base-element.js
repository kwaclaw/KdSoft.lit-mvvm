/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import { html, render, TemplateResult } from 'lit-html';

const supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
// eslint-disable-next-line no-unused-vars
window.JSCompiler_renameProperty = (prop, _obj) => prop;

function arrayFlat(styles, result = []) {
  for (let i = 0, { length } = styles; i < length; i += 1) {
    const value = styles[i];
    if (Array.isArray(value)) {
      arrayFlat(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

const flattenStyles = styles => (styles.flat ? styles.flat(Infinity) : arrayFlat(styles));

export default class LitBaseElement extends HTMLElement {
  // only called if there is an attributeChangedCallback() defined;
  // we piggy back on this getter to run finalize() to ensure finalize() is run
  static get observedAttributes() {
    this.finalize();
    return [];
  }

  static finalize() {
    // Prepare styling that is stamped at first render time.
    // Styling is built from user provided `styles` or is inherited from the superclass.
    // eslint-disable-next-line no-prototype-builtins
    this._styles = this.hasOwnProperty(window.JSCompiler_renameProperty('styles', this))
      ? this._getUniqueStyles()
      : this._styles || [];
  }

  static _getUniqueStyles() {
    // Take care not to call `this.styles` multiple times since this generates new CSSResults each time.
    // TODO(sorvell): Since we do not cache CSSResults by input, any shared styles will generate
    // new stylesheet objects, which is wasteful.
    // This should be addressed when a browser ships constructable stylesheets.
    const userStyles = this.styles;
    const styles = [];
    if (Array.isArray(userStyles)) {
      const flatStyles = flattenStyles(userStyles);
      // As a performance optimization to avoid duplicated styling that can occur especially when composing
      // via subclassing, de-duplicate styles preserving the last item in the list. The last item is kept to
      // try to preserve cascade order with the assumption that it's most important that last added styles
      // override previous styles.
      const styleSet = flatStyles.reduceRight((set, s) => {
        set.add(s);
        // on IE set.add does not return the set.
        return set;
      }, new Set());
      // Array.from does not work on Set in IE
      styleSet.forEach(v => styles.unshift(v));
    } else if (userStyles) {
      styles.push(userStyles);
    }
    return styles;
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
      this.renderRoot.adoptedStyleSheets = styles.map(s => s.styleSheet);
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
      const templateResult = this.render();
      if (templateResult instanceof TemplateResult) {
        render(templateResult, this.shadowRoot, {
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

  render() {
    return html``;
  }

  firstRendered() {}

  rendered() {}
}
