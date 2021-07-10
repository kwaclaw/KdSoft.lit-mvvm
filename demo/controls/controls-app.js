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

    const menuChildren = [];
    const menuGrandChildren = [];
    menuGrandChildren.push(new KdSoftTreeNodeModel(`before`, [] , { text: `Before`, disabled: false }));
    menuGrandChildren.push(new KdSoftTreeNodeModel(`after`, [] , { text: `After`, disabled: false }));
    menuGrandChildren.push(new KdSoftTreeNodeModel(`inside`, [] , { text: `Inside`, disabled: false }));
    menuChildren.push(new KdSoftTreeNodeModel(`add`, menuGrandChildren, { text: `Add Node`, disabled: false }));
    menuChildren.push(new KdSoftTreeNodeModel(`remove`, [], { text: `Remove Node`, disabled: false }));
    this.tvMenu = observable(new KdSoftTreeNodeModel('0-0', menuChildren, { text: `Node Menu` }));

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

  tvDragDropChanged(e) {
    const checked = e.currentTarget.checked;
    this.model.dragDropEnabled = checked;
  }

  _getClosestTreeNode(path) {
    for (let indx = 0; indx < path.length; indx += 1) {
      const classList = path[indx].classList;
      if (classList && classList.contains('kdsoft-node'))
        return path[indx];
    }
    return null;
  }

  tvMenuItemClicked(e) {
    const menu = e.currentTarget;
    var menuItem = (menu.getNodeEntry(e) || {}).node;
    switch (menuItem.id) {
      case 'remove':
        // the menu is associated with the tree view as a whole, not an individual node
        const treeView = menu.actionTarget;
        const tn = this._getClosestTreeNode(menu.actionPath);
        treeView.model.removeNode(tn.id);
        console.log(`Removed node: ${tn.id}`);
        break;
      default:
        break;
    }
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

  _getChecklistItemTemplate(item) {
    return html`${item.name}`;
  }

  _getTreeViewContentTemplate(nodeModel) {
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

  _getMenuItemTemplate(item) {
    return html`<span>${item.text}</span>`;
  }

  render() {
    return html`
      <style>
        :host {
          display: inline-block;
        }
      </style>
      <kdsoft-context-menu id="tv-context"
        .model=${this.tvMenu}
        .getItemTemplate=${this._getMenuItemTemplate}
        @click=${this.tvMenuItemClicked}
      ></kdsoft-context-menu>
      <div id="container">
        <div id="check-list">
          <h1 class="font-bold text-xl mb-2 text-left">Plain Checklist</h1>
          <kdsoft-checklist
            id="just-clist"
            .model=${this.checklistModel}
            .getItemTemplate=${item => this._getChecklistItemTemplate(item)}
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
            with context menu${this.model.dragDropEnabled ? ' and with' : ', but without'} drag and drop
          </h1>
          <kdsoft-tree-view id="tv" class="py-0"
            ?allow-drag-drop=${this.model.dragDropEnabled}
            .model=${this.tvRoot}
            .getContentTemplate=${this._getTreeViewContentTemplate}>
          </kdsoft-tree-view>
        </div>
      </div>
    `;
  }

  // _bindTree(menu, selector, node) {
  //   menu.bind(node);
  //   const children = node.renderRoot.querySelectorAll(selector);
  //   children.forEach(child => this._bindTree(menu, selector, child));
  // }

  rendered() {
    const menu = this.renderRoot.getElementById('tv-context');
    const tv = this.renderRoot.getElementById('tv');
    // we don't need to bind each menu item (see _bindTree), as the event bubbles up
    menu.bind(tv);
  }
}

window.customElements.define('controls-app', ControlsApp);
