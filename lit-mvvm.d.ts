
import { CSSResult } from './src/css-tag.js';

export declare type CSSResultOrNative = CSSResult | CSSStyleSheet;
export interface CSSResultArray extends Array<CSSResultOrNative | CSSResultArray> { }

export declare class LitBaseElement extends HTMLElement {
 /**
 * Array of styles to apply to the element. The styles should be defined
 * using the [[`css`]] tag function or via constructible stylesheets.
 */
  static styles?: CSSResultOrNative | CSSResultArray;

  /**
   * Return the array of styles to apply to the element.
   * Override this method to integrate into a style management system.
   *
   * @nocollapse
   */
  static getStyles(): CSSResultOrNative | CSSResultArray | undefined;

  protected _doRender(): void;

  connectedCallback(): void;
  disconnectedCallback(): void;

  readonly renderRoot: Element | DocumentFragment;

  protected initialize(): void;
  protected createRenderRoot(): Element | ShadowRoot;
  protected adoptStyles(): void;

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

export * from './src/css-tag.js';
