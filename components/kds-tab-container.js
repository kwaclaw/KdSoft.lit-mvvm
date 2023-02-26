import { html, nothing, css } from '@kdsoft/lit-mvvm';
import KdsNavLayout from './kds-nav-layout.js';

export default class KdsTabContainer extends KdsNavLayout {
  get reverse() { return this.hasAttribute('reverse'); }
  set reverse(val) {
    if (val) this.setAttribute('reverse', '');
    else this.removeAttribute('reverse');
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'reverse'];
  }

  shouldRender() {
    return true;
  }

  static get styles() {
    return [
      ...super.styles,
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

  get header() {
    return this.vertical
      ? nothing
      : (this.reverse ? nothing : html`<slot class="horizontal-tabs" name="tabs"></slot>`);
  }

  get left() {
    return this.vertical
      ? (this.reverse ? nothing : html`<slot class="vertical-tabs" name="tabs"></slot>`)
      : nothing;
  }

  get footer() {
    return this.vertical
      ? nothing
      : (this.reverse ? html`<slot class="horizontal-tabs" name="tabs"></slot>` : nothing);
  }

  get right() {
    return this.vertical
      ? (this.reverse ? html`<slot class="vertical-tabs" name="tabs"></slot>` : nothing)
      : nothing;
  }
}

window.customElements.define('kds-tab-container', KdsTabContainer);
