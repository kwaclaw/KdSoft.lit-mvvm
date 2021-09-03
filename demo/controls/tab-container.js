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
    this.getItemTemplate = (item, index) => html`${item}`;
    this.getTabTemplate = (model, item, index) => html`
        <button type="button"
          @click=${() => { model.activeIndex = index; }}
          class="px-2 py-1 bg-gray-300"
        >Image ${index}</button>
      `;
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

  _getHorizontalTabs(sm) {
    return html`
      <div slot="header" class="horizontal-tabs">
        ${sm.items.map((item, itemIndex) => this.getTabTemplate(sm, item, itemIndex))}
      </div>
    `;
  }

  _getVerticalTabs(sm) {
    return html`
      <div slot="left-bar"  class="vertical-tabs">
        ${sm.items.map((item, itemIndex) => this.getTabTemplate(sm, item, itemIndex))}
      </div>
    `;
  }

  render() {
    const sm = this.model;
    return html`
      <style>
      </style>
      <div class="flex flex-nowrap ${sm.vertical ? 'flex-row' : 'flex-col'}">
        <kdsoft-nav-container class="p-0"
          orientation=${sm.vertical ? 'vertical' : 'horizontal'}
          .model=${sm}
        >
          ${sm.vertical
            ? this._getVerticalTabs(sm)
            : this._getHorizontalTabs(sm)
          }
          ${this.getItemTemplate(sm.activeItem, sm.activeIndex)}
        </kdsoft-nav-container>
      </div>
    `;
  }
}

window.customElements.define('tab-container', TabContainer);
