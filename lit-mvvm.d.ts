
import { TemplateResult } from 'lit-html';

export declare class LitBaseElement extends HTMLElement {
  protected _doRender(): void;

  render(): TemplateResult;
  shouldRender(): boolean;
  connectedCallback(): void;
  disconnectedCallback(): void;
  firstRendered(): void;
  rendered(): void;
}

export declare class LitMvvmElement<Observable extends object> extends LitBaseElement {
  protected _observer: Function;

  model: Observable;
  scheduler: any;
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

