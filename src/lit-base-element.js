/* eslint-disable no-restricted-syntax */
/* eslint-disable no-void */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import { render as litRender } from 'lit/html.js';
import { getCompatibleStyle, adoptStyles } from '@lit/reactive-element/css-tag.js';

/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';

/**
 * Sentinel value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};

export default class LitBaseElement extends HTMLElement {
  constructor() {
    super();
    this._initialize();
  }

  /** @nocollapse */
  static addInitializer(initializer) {
    const _a = this._initializers;
    if (_a === null || _a === void 0) this._initializers = [];
    this._initializers.push(initializer);
  }

  // only called if there is an attributeChangedCallback() defined;
  static get observedAttributes() {
    // note: piggy backing on this to ensure we're finalized.
    this.finalize();
    return [];
  }

  /**
 * Creates property accessors for registered properties, sets up element
 * styling, and ensures any superclasses are also finalized. Returns true if
 * the element was finalized.
 * @nocollapse
 */
  static finalize() {
    if (Object.prototype.hasOwnProperty.call(this, finalized)) {
      return false;
    }
    this[finalized] = true;
    // finalize any superclasses
    const superCtor = Object.getPrototypeOf(this);
    superCtor.finalize();
    this.elementStyles = this.finalizeStyles(this.styles);
    return true;
  }

  /**
   * Takes the styles the user supplied via the `static styles` property and
   * returns the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * Styles are deduplicated preserving the _last_ instance in the list. This
   * is a performance optimization to avoid duplicated styles that can occur
   * especially when composing via subclassing. The last item is kept to try
   * to preserve the cascade order with the assumption that it's most important
   * that last added styles override previous styles.
   *
   * @nocollapse
   */
  static finalizeStyles(styles) {
    const elementStyles = [];
    if (Array.isArray(styles)) {
      // Dedupe the flattened array in reverse order to preserve the last items.
      // TODO(sorvell): casting to Array<unknown> works around TS error that
      // appears to come from trying to flatten a type CSSResultArray.
      const set = new Set(styles.flat(Infinity).reverse());
      // Then preserve original order by adding the set items in reverse order.
      for (const s of set) {
        elementStyles.unshift(getCompatibleStyle(s));
      }
    } else if (styles !== undefined) {
      elementStyles.push(getCompatibleStyle(styles));
    }
    return elementStyles;
  }

  /**
 * Internal only override point for customizing work done when elements are constructed.
 *
 * @internal
 */
  _initialize() {
    const _a = this.constructor._initializers;
    if (_a !== null && _a !== void 0) _a.forEach(i => i(this));
  }

  /**
   * Returns the node into which the element should render and by default creates and returns an open shadowRoot.
   * Implement to customize where the element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   */
  createRenderRoot() {
    const _a = this.shadowRoot;
    const renderRoot = _a !== null && _a !== void 0 ? _a : this.attachShadow(this.constructor.shadowRootOptions);
    adoptStyles(renderRoot, this.constructor.elementStyles);
    return renderRoot;
  }

  // this handler must be defined to trigger the necessary call to get observedAttributes() !!!
  attributeChangedCallback(name, oldval, newval) {
    //
  }

  /**
   * On first connection, creates the element's renderRoot, sets up element styling, and enables updating.
   */
  connectedCallback() {
    // create renderRoot before first update.
    if (this.renderRoot === undefined) {
      this.renderRoot = this.createRenderRoot();
    }

    // schedule rendering in the derived class
    // this._initialRender();
  }

  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */
  disconnectedCallback() {
    //
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

/**
 * Marks class as having finished creating properties.
 */
LitBaseElement[finalized] = true;
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 */
LitBaseElement.shadowRootOptions = { mode: 'open' };
