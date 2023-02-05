import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm';

export default class KdsTabContainer extends LitMvvmElement {
  get vertical() { return this.hasAttribute('vertical'); }
  set vertical(val) {
    if (val) this.setAttribute('vertical', '');
    else this.removeAttribute('vertical');
  }

  get reverse() { return this.hasAttribute('reverse'); }
  set reverse(val) {
    if (val) this.setAttribute('reverse', '');
    else this.removeAttribute('reverse');
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'vertical', 'reverse'];
  }

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .horizontal-tabs {
          display: flex;
        }

        .vertical-tabs {
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }

  render() {
    const sm = this.model;
    const tabSlot = this.vertical
      ? (this.reverse ? 'right-bar' : 'left-bar')
      : (this.reverse ? 'footer' : 'header');
    const tabClass = this.vertical ? 'vertical-tabs' : 'horizontal-tabs';
    return html`
      <kds-nav-container part="container" .model=${sm} ?vertical=${this.vertical}>
        <div slot="${tabSlot}" class="${tabClass}">
          ${sm.items.map((item, itemIndex) => html`<slot name="tab_${itemIndex}"></slot>`)}
        </div>
        <!-- forwarding first item slot from grand-child to parent -->
        <slot name="item" slot="item_0"></slot>
      </kds-nav-container>
    `;
  }
}

window.customElements.define('kds-tab-container', KdsTabContainer);
