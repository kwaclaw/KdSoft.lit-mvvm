/* eslint-disable no-useless-constructor */
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm';

export default class KdsTabContainer extends LitMvvmElement {
  constructor() {
    super();
    // LOW priority means proper queueing for scroll actions
    // this.scheduler = new Queue(priorities.LOW);
    // this.scheduler = new BatchScheduler(300);
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
    const tabSlot = sm.vertical ? 'left-bar' : 'header';
    const tabClass = sm.vertical ? 'vertical-tabs' : 'horizontal-tabs';
    return html`
      <kds-nav-container part="container" .model=${sm} orientation="${sm.vertical ? 'vertical' : 'horizontal'}">
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
