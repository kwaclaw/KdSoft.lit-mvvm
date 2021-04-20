
import { CSSResultGroup, CSSResultFlatArray } from '@lit/reactive-element/css-tag';
export * from '@lit/reactive-element/css-tag.js';

declare const finalized = 'finalized';
export declare type Initializer = (element: ReactiveElement) => void;

export declare class LitBaseElement extends HTMLElement {
  static addInitializer(initializer: Initializer): void;
  static _initializers?: Initializer[];

  protected static [finalized]: boolean;

  /**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 */
  static elementStyles?: CSSResultFlatArray;

  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the [[`css`]] tag function or via constructible stylesheets.
   */
  static styles?: CSSResultGroup;

  /**
   * Returns a list of attributes whose changes are observed.
   */
  static get observedAttributes(): string[];

  /**
 * Sets up element styling, and ensures any superclasses are also finalized. Returns true if
 * the element was finalized.
 */
  protected static finalize(): boolean;

  /**
   * Options used when calling `attachShadow`. Set this property to customize
   * the options for the shadowRoot; for example, to create a closed
   * shadowRoot: `{mode: 'closed'}`.
   *
   * Note, these options are used in `createRenderRoot`. If this method
   * is customized, options should be respected if possible.
   * @nocollapse
   */
  static shadowRootOptions: ShadowRootInit;

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
   */
  protected static finalizeStyles(styles?: CSSResultGroup): CSSResultFlatArray;

  /**
   * Node or ShadowRoot into which element DOM should be rendered. Defaults
   * to an open shadowRoot.
   */
  readonly renderRoot: HTMLElement | ShadowRoot;

  constructor();

  /**
   * Returns the node into which the element should render and by default
   * creates and returns an open shadowRoot. Implement to customize where the
   * element's DOM is rendered. For example, to render into the element's
   * childNodes, return `this`.
   *
   * @return Returns a node into which to render.
   */
  protected createRenderRoot(): Element | ShadowRoot;

  /**
   * On first connection, creates the element's renderRoot, sets up
   * element styling, and enables updating.
   */
  connectedCallback(): void;

  /**
   * Allows for `super.disconnectedCallback()` in extensions while
   * reserving the possibility of making non-breaking feature additions
   * when disconnecting at some point in the future.
   */
  disconnectedCallback(): void;

  // this handler must be defined to trigger the necessary call to get observedAttributes() !!!
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;

  protected _doRender(): void;
  protected render(): unknown;
  protected shouldRender(): boolean;
  protected beforeFirstRender(): void;
  protected firstRendered(): void;
  protected rendered(): void;
}

export declare class LitMvvmElement<Observable extends object> extends LitBaseElement {
  protected _observer: Function;

  model: Observable;
  scheduler: any;

  schedule(callback: () => void): void;
}

export declare class BatchScheduler {
  constructor(interval: number);

  protected _runReactions(): number;
  protected readonly reactions: Set<Function>;

  readonly interval: number;
  readonly lastRendered: number;

  add(reaction: Function): void;
  delete(reaction: Function): boolean;
}
