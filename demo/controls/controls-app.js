import { observable } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from '@kdsoft/lit-mvvm-components/styles/tailwind-styles.js';
import checkboxStyles from '@kdsoft/lit-mvvm-components/styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from '@kdsoft/lit-mvvm-components/styles/fontawesome/css/all-styles.js';

import '@kdsoft/lit-mvvm-components';
import {
  KdSoftDropdownModel,
  KdSoftChecklistModel,
  KdSoftDropdownChecklistConnector,
  KdSoftTreeNodeModel
} from '@kdsoft/lit-mvvm-components';

class ControlsApp extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    this.checklistModel = observable(new KdSoftChecklistModel(
      [{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }, { id: 3, name: 'Gamma' }, { id: 4, name: 'Delta' }, { id: 5, name: 'Epsilon' }],
      [1],
      true,
      item => item.name
    ));

    this.dropDownModel = observable(new KdSoftDropdownModel());
    this.checklistConnector = new KdSoftDropdownChecklistConnector(
      () => this.renderRoot.getElementById('ddown'),
      () => this.renderRoot.getElementById('clist'),
      () => this.getChecklistText()
    );

    const tvGrandChildren = [];
    for (let indx = 0; indx < 15; indx += 1) {
      const grandChild = new KdSoftTreeNodeModel(`3-${indx}`, [], { type: 'gc', text: `Grand child blah blah ${indx}` });
      tvGrandChildren.push(grandChild);
    }
    const tvChildren = [];
    for (let indx = 0; indx < 5; indx += 1) {
      const gci = indx * 3;
      const grandChildren = tvGrandChildren.slice(gci, gci + 3);
      const child = new KdSoftTreeNodeModel(`2-${indx}`, grandChildren , { type: 'c', text: `Child blah blah ${indx}` });
      tvChildren.push(child);
    }
    this.tvRoot = observable(new KdSoftTreeNodeModel('0-0', tvChildren, { type: 'r', text: `Root Node` }));

    this.model = observable({
      dragDropEnabled: false
    })
  }

  getChecklistText() {
    let result = null;
    for (const selEntry of this.checklistModel.selectedEntries) {
      if (result) result += `, ${selEntry.item.name}`;
      else result = selEntry.item.name;
    }
    return result;
  }

  getChecklistItemTemplate(item) {
    return html`${item.name}`;
  }

  getTreeViewContentTemplate(nodeModel) {
    let cls = '';
    switch (nodeModel.type) {
      case 'gc':
        cls = 'text-red-600';
        break;
      case 'c':
        cls = 'text-blue-600';
        break;
      case 'r':
        cls = 'text-black-600';
        break;
      default:
        break;
    }
    return html`<span class=${cls}>${nodeModel.text}</span>`;
  }

  tvDragDropChanged(e) {
    const checked = e.currentTarget.checked;
    this.model.dragDropEnabled = checked;
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
      tailwindStyles,
      checkboxStyles,
      fontAwesomeStyles,
      css`
        kdsoft-dropdown {
          min-width: 200px;
          width: auto;
        }

        kdsoft-checklist {
          min-width: 200px;
          width: auto;
        }

        #container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1em;
          justify-items: center;
        }
        #container>div {
          background-color: lightsalmon;
          padding: 0.5em;
        }
        #check-list {
          position: relative;
          width: 100%;
        }
        #check-list > p {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 2em;
        }
        #check-list > p:hover {
          overflow: initial;
          text-overflow: initial;
        }
        #drop-down {
          width: 100%;
        }
        #ddown {
          width: 100%;
        }
      `
    ];
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <div id="container">
        <div id="check-list">
          <h1 class="font-bold text-xl mb-2 text-left">Plain Checklist</h1>
          <kdsoft-checklist
            id="just-clist"
            .model=${this.checklistModel}
            .getItemTemplate=${item => this.getChecklistItemTemplate(item)}
            allow-drag-drop show-checkboxes></kdsoft-checklist>
        </div>
        <div id="drop-down">
          <h1 class="font-bold text-xl mb-2 text-left">Checklist in Dropdown</h1>
          <kdsoft-dropdown id="ddown" class="py-0"
            .model=${this.dropDownModel} .connector=${this.checklistConnector}>
            <kdsoft-checklist
              id="clist"
              class="text-black"
              .model=${this.checklistModel}
              .getItemTemplate=${item => html`${item.name}`}>
            </kdsoft-checklist>
          </kdsoft-dropdown>
        </div>
        <div id="tree-view">
          <h1 class="font-bold text-xl mb-2 text-left">Treeview
            <input type="checkbox" class="kdsoft-checkbox align-text-bottom" @change=${this.tvDragDropChanged}/>
            ${this.model.dragDropEnabled ? 'with' : 'without'} drag and drop
          </h1>
          <kdsoft-tree-view id="tv" class="py-0"
            ?allow-drag-drop=${this.model.dragDropEnabled}
            .model=${this.tvRoot}
            .getContentTemplate=${this.getTreeViewContentTemplate}>
          </kdsoft-tree-view>
        </div>
      </div>
    `;
  }
}

window.customElements.define('controls-app', ControlsApp);
