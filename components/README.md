Web components suitable for building UI controls that are based on @kdsoft/lit-mvvm.

Refer to the demo/controls project in the GitHub repository, it works best from VS Code (for instructions, see its README file).

Example for building a simple tab container:
```javascript
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import '@kdsoft/lit-mvvm-components';

class TabContainer extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.LOW);
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
        
        kdsoft-nav-container {
          padding: 0;
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
      <kdsoft-nav-container .model=${sm} orientation="${sm.vertical ? 'vertical' : 'horizontal'}">
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
```

And here is how it could be used:
```javascript
. . .
    <tab-container .model=${this.tabModel}>
      <!-- fill tab slots -->
      ${this.tabModel.items.map((item, index) => html`
        <button type="button" slot="tab_${index}"
          @click=${() => { this.tabModel.activeIndex = index; }}
          class="tab px-2 py-1 bg-gray-300 ${this.tabModel.activeIndex === index ? 'active' : ''}"
        >Image ${index}</button>
      `)}
      <!-- fill active item slot -->
      <img slot="item" src=${this.tabModel.activeItem.href}></img>
    </tab-container>
. . .
```