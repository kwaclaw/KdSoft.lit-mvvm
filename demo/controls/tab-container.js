import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from '@kdsoft/lit-mvvm-components/styles/tailwind-styles.js';
import fontAwesomeStyles from '@kdsoft/lit-mvvm-components/styles/fontawesome/css/all-styles.js';
import '@kdsoft/lit-mvvm-components';

class TabContainer extends LitMvvmElement {
  constructor() {
    super();
    // LOW priority means proper queueing for scroll actions
    this.scheduler = new Queue(priorities.LOW);
    //this.scheduler = new BatchScheduler(300);
  }

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
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
      <kdsoft-nav-container .model=${sm} class="p-0" orientation="${sm.vertical ? 'vertical' : 'horizontal'}">
        <div slot="${tabSlot}" class="${tabClass}">
          ${sm.items.map((item, itemIndex) => html`<slot name="tab_${itemIndex}"></slot>`)}
        </div>
        <!-- forwarding first item slot from grand-child to parent -->
        <slot name="item" slot="item_0"></slot>
      </kdsoft-nav-container>
    `;
  }
}

window.customElements.define('tab-container', TabContainer);
