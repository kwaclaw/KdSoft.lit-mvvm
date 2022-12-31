import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from './styles/tailwind-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

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
      <kds-nav-container .model=${sm} class="p-0" orientation="${sm.vertical ? 'vertical' : 'horizontal'}">
        <div slot="${tabSlot}" class="${tabClass}">
          ${sm.items.map((item, itemIndex) => html`<slot name="tab_${itemIndex}"></slot>`)}
        </div>
        <!-- forwarding first item slot from grand-child to parent -->
        <slot name="item" slot="item_0"></slot>
      </kds-nav-container>
    `;
  }
}

window.customElements.define('tab-container', TabContainer);
