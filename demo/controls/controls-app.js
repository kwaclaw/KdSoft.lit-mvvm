import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit-html';
import { LitMvvmElement, css } from '../../lit-mvvm.js';

import './my-checklist.js';
import MyChecklistModel from './my-checklist-model';

class ControlsApp extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    this.checklistModel = new MyChecklistModel(
      [{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }, { id: 3, name: 'Gamma' }, { id: 4, name: 'Delta' }, { id: 4, name: 'Epsilon' }],
      [1],
      item => item.name
    );
  }

  getChecklistItemTemplate(item) {
    return html`${item.name}`;
  }

  // model may still be undefined
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    //if (this._selectObserver) unobserve(this._selectObserver);
    super.disconnectedCallback();
  }

  // only called when model is defined, due to the shouldRender() override
  beforeFirstRender() {
    // this._selectObserver = observe(() => {
    //   const entries = Array.from(this.checklistModel.selectedEntries, entry => {
    //     console.log(entry.item.name);
    //     return entry.item.name;
    //   });
    //   this._selectedItemsText = entries.join(', ');
    // });
  }

  firstRendered() {
    //
  }

  rendered() {
    //
  }

  static get styles() {
    return [
      css`
        #container {
          display: block;
        }
        #check-list {
          position: relative;
          width: 30ch;
        }
        #check-list > p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        #check-list > p:hover {
          overflow: initial;
          text-overflow: initial;
        }
        my-checklist {
          width: 100%;
          border: 1px solid grey;
          display: block;
        }
      `
    ];
  }

  render() {
    const entries = Array.from(this.checklistModel.selectedEntries, entry => entry.item.name);
    const selectedItemsText = entries.join(', ') || '<none>';
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <div id="container">
        <div id="check-list">
          <p>
            <label for="selected-items">Selected:</label>
            <span id="selected-items">${selectedItemsText}</span>
          </p>
          <my-checklist
          .model=${this.checklistModel}
          .getItemTemplate=${item => this.getChecklistItemTemplate(item)}
          show-checkboxes></my-checklist>
        </div>
      </div>
    `;
  }
}

window.customElements.define('controls-app', ControlsApp);
