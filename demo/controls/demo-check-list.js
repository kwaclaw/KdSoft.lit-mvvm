import { repeat } from 'lit-html/directives/repeat.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
// since tailwind classes are generated only as used, we cannot import them
// from a prebuilt library, but need to generate the ones we use locally
import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kds-checkbox-styles.js';
//import '@kdsoft/lit-mvvm-components';
import KdsDragDropProvider from './kds-drag-drop-provider.js';
import './kds-list.js';
import './kds-list-item.js';

const arrowBase = { 'fa-solid': true, 'fa-lg': true, 'text-gray-500': true };

const arrowClassList = {
  upArrow: { ...arrowBase, 'fa-caret-up': true, 'pt-3': true },
  downArrow: { ...arrowBase, 'fa-caret-down': true },
};

function getListItemId(item) {
  return Number(item._kdsIndex);
}

export default class DemoCheckList extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
  }

  get allowDragDrop() { return this.hasAttribute('allow-drag-drop'); }
  set allowDragDrop(val) {
    if (val) this.setAttribute('allow-drag-drop', '');
    else this.removeAttribute('allow-drag-drop');
  }

  get checkboxes() { return this.hasAttribute('checkboxes'); }
  set checkboxes(val) {
    if (val) this.setAttribute('checkboxes', '');
    else this.removeAttribute('checkboxes');
  }

  get arrows() { return this.hasAttribute('arrows'); }
  set arrows(val) {
    if (val) this.setAttribute('arrows', '');
    else this.removeAttribute('arrows');
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'allow-drag-drop', 'checkboxes', 'arrows'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'allow-drag-drop') {
      if (newValue === '' && !this._dragDrop) this._dragDrop = new KdsDragDropProvider(getListItemId);
      else this._dragDrop = null;
    }
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  shouldRender() {
    return !!this.model;
  }

  initView() {
    const list = this.renderRoot.querySelector('kds-list');
    if (list) list.initView();
  }

  /* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/ */
  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      checkboxStyles,
      css`
        :host {
          display: block;
        }

        kds-list::part(ul) {
          list-style: none;
          padding: 3px;
        }

        .kds-droppable {
          outline: 2px solid darkgray;
        }

        kds-list-item {
          padding: 2px;
        }

        kds-list-item[selected] {
          background-color: lightgray
        }

        kds-list-item:hover {
          background-color: lightblue;
        }

        kds-list-item:focus {
          outline: 1px grey solid;
        }

        /* #region styling default checkbox */

        kds-list-item::part(checkbox) {
          width: 1.2rem;
          height: 1.2rem;
          -webkit-appearance: none;
          appearance: none;
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          -webkit-user-select: none;
          user-select: none;
          padding: 0.15rem 0.3rem;
          border: 1px solid #c8c8c8;
          border-radius: 0.2rem;
          cursor: pointer;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='-64 -64 640 640' style='enable-background:new 0 0 512 512;fill: %23179bd7' xml:space='preserve'%3e%3cpath d='M448,71.9c-17.3-13.4-41.5-9.3-54.1,9.1L214,344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8 c-15.6,15.5-16.4,41.6-1.7,58.1c0,0,120.4,133.6,137.7,147c17.3,13.4,41.5,9.3,54.1-9.1l206.3-301.7 C469.2,110.9,465.3,85.2,448,71.9z'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-size: 0;
          background-color: #fff;
          background-position: 50% 50%;
          transition: .3s ease;

          margin-top: auto;
          margin-bottom: auto;
        }
        
        kds-list-item::part(checkbox):active {
          background-color: #ddd;
        }
        
        kds-list-item::part(checkbox):focus {
          box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
        }
        
        /* this is not working, why? 
        kds-list-item::part(checkbox):checked {
          background-size: cover;
        }
        */

        kds-list-item[selected]::part(checkbox) {
          background-size: cover;
        }

        kds-list-item::part(checkbox):disabled {
          border: 1px solid gray;
          background-color: lightgray;
        }

        /* #endregion styling checkbox */
      `,
    ];
  }

  render() {
    return html`
      <kds-list .model=${this.model}>
        ${repeat(this.model.filteredItems,
          entry => this.model.getItemId(entry.item),
          entry => html`<kds-list-item tabindex="0"
            .model=${entry.item}
            .dragDropProvider=${this._dragDrop}
            ?checkbox=${this.checkboxes}
            ?arrows=${this.arrows}
            ?up=${!entry.isFirst}
            ?down=${!entry.isLast}
            ?selected=${this.model.isItemSelected(entry.item)}
          >
            <span slot="up-arrow" class=${classMap(arrowClassList.upArrow)}></span>
            <span slot="down-arrow" class=${classMap(arrowClassList.downArrow)}></span>
            <span slot="item" class="my-auto">${entry.item.name}</span>              
          </kds-list-item>`
        )}
      </kds-list>
    `;
  }
}

window.customElements.define('demo-check-list', DemoCheckList);
