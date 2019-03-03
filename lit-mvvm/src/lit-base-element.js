import { html, render, TemplateResult } from 'lit-html';
//import { CSSResult, unsafeCSS, css } from './css-tag';

/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
// eslint-disable-next-line no-unused-vars
window.JSCompiler_renameProperty = (prop, _obj) => prop;

/**
 * Minimal implementation of Array.prototype.flat
 * @param arr the array to flatten
 * @param result the accumlated result
 */
function arrayFlat(styles, result = []) {
  for (let i = 0, length = styles.length; i < length; i += 1) {
    const value = styles[i];
    if (Array.isArray(value)) {
      arrayFlat(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
}

/** Deeply flattens styles array. Uses native flat if available. */
const flattenStyles = styles => (styles.flat ? styles.flat(Infinity) : arrayFlat(styles));

export default class LitBaseElement extends HTMLElement {
  // piggy back on this to run finalize(), also requires a defined attributeChangedCallback() 
  static get observedAttributes() {
    this.finalize();
    return [];
  }

  /** @nocollapse */
  static finalize() {
    // eslint-disable-next-line no-prototype-builtins
    if (this.hasOwnProperty(window.JSCompiler_renameProperty('finalized', this)) && this.finalized) {
      return;
    }
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);
    if (typeof superCtor.finalize === 'function') {
      superCtor.finalize();
    }
    this.finalized = true;

    // Prepare styling that is stamped at first render time. Styling is built from user provided `styles`
    // or is inherited from the superclass.
    // eslint-disable-next-line no-prototype-builtins
    this._styles = this.hasOwnProperty(window.JSCompiler_renameProperty('styles', this))
      ? this._getUniqueStyles()
      : this._styles || [];
  }

  /** @nocollapse */
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

  /**
   * Returns the node into which the element should render and by default creates and returns an open shadowRoot.
   * Implement to customize where the element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   * @returns {Element|DocumentFragment} Returns a node into which to render.
   */
  createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  /**
     * Applies styling to the element shadowRoot using the `static get styles` property.
     * Styling will apply using `shadowRoot.adoptedStyleSheets` where available and will fallback otherwise.
     * When Shadow DOM is polyfilled, ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the end of the `shadowRoot` to
     * [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
  adoptStyles() {
    const styles = this.constructor._styles;
    if (styles.length === 0) {
      return;
    }
    this.renderRoot.adoptedStyleSheets = styles.map(s => s.styleSheet);
  }

  // this handler must be defined to trigger the call to get observedAttributes() !!!
  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
  }

  render() {
    return html``;
  }

  shouldRender() {
    return true;
  }

  _doRender() {
    if (this.shouldRender()) {
      const templateResult = this.render();
      if (templateResult instanceof TemplateResult) {
        render(templateResult, this.shadowRoot, { scopeName: this.localName, eventContext: this });
      }

      if (!this._firstRendered) {
        this._firstRendered = true;
        this.firstRendered();
      }

      this.rendered();
    }
  }

  connectedCallback() {
    this._firstRendered = false;
    this._doRender();
  }

  disconnectedCallback() {
    //
  }

  firstRendered() { }

  rendered() { }
}
