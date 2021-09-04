import { observable } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from '@kdsoft/lit-mvvm-components/styles/tailwind-styles.js';
import checkboxStyles from '@kdsoft/lit-mvvm-components/styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from '@kdsoft/lit-mvvm-components/styles/fontawesome/css/all-styles.js';
import './item-carousel.js';
import './tab-container.js';

import {
  KdSoftDropdownModel,
  KdSoftChecklistModel,
  KdSoftDropdownChecklistConnector,
  KdSoftTreeNodeModel,
  KdSoftActiveItemModel,
} from '@kdsoft/lit-mvvm-components';

function getClosestTreeNode(path) {
  for (let indx = 0; indx < path.length; indx += 1) {
    const classList = path[indx].classList;
    if (classList && classList.contains('kdsoft-node')) {
      return path[indx];
    }
  }
  return null;
}

function editNode(treeNode) {
  const nodeEdit = treeNode.querySelector('.node-edit');
  if (nodeEdit) {
    nodeEdit.removeAttribute('hidden');
    nodeEdit.nextElementSibling.setAttribute('hidden', '');
    nodeEdit.value = nodeEdit.nextElementSibling.textContent;
    nodeEdit.focus();
    return true;
  }
  return false;
}

const horizontalImageModels = [
  { href: 'images/82-600x300.jpg' },
  { href: 'images/98-600x300.jpg' },
  { href: 'images/329-600x300.jpg' },
  { href: 'images/384-600x300.jpg' },
  { href: 'images/521-600x300.jpg' }
];

const verticalImageModels = [
  { href: 'images/29-300x600.jpg' },
  { href: 'images/841-300x600.jpg' },
  { href: 'images/789-300x600.jpg' },
  { href: 'images/933-300x600.jpg' },
  { href: 'images/424-300x600.jpg' }
];

class ControlsApp extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.LOW);
    this.checklistModel = observable(new KdSoftChecklistModel(
      [
        { id: 1, name: 'Alpha' },
        { id: 2, name: 'Beta' },
        { id: 3, name: 'Gamma' },
        { id: 4, name: 'Delta' },
        { id: 5, name: 'Epsilon' }
      ],
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
      const child = new KdSoftTreeNodeModel(`2-${indx}`, grandChildren, { type: 'c', text: `Child blah blah ${indx}` });
      tvChildren.push(child);
    }
    this.tvRoot = observable(new KdSoftTreeNodeModel('0-0', tvChildren, { type: 'r', text: `Root Node` }));

    const menuChildren = [];
    const menuGrandChildren = [];
    menuChildren.push(new KdSoftTreeNodeModel(`edit`, [], { text: `Edit Node`, disabled: false }));
    menuGrandChildren.push(new KdSoftTreeNodeModel(`before`, [], { text: `Before`, disabled: false }));
    menuGrandChildren.push(new KdSoftTreeNodeModel(`after`, [], { text: `After`, disabled: false }));
    menuGrandChildren.push(new KdSoftTreeNodeModel(`inside`, [], { text: `Inside`, disabled: false }));
    menuChildren.push(new KdSoftTreeNodeModel(`add`, menuGrandChildren, { text: `Add Node`, disabled: false }));
    menuChildren.push(new KdSoftTreeNodeModel(`remove`, [], { text: `Remove Node`, disabled: false }));
    this.tvMenu = observable(new KdSoftTreeNodeModel('0-0', menuChildren, { text: `Node Menu` }));

    this.carouselModel = observable(new KdSoftActiveItemModel());
    this.switcherModel = observable(new KdSoftActiveItemModel());

    this.model = observable({
      dragDropEnabled: false,
    });
    this.carouselModel.items = this.model.sliderVertical ? verticalImageModels : horizontalImageModels;
    this.carouselModel.activeIndex = 0;
    this.switcherModel.items = this.model.sliderVertical ? verticalImageModels : horizontalImageModels;
    this.switcherModel.activeIndex = 0;

    this.newNodeId = 0;
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

  tvMenuItemClicked(e) {
    const menu = e.currentTarget;
    const treeView = menu.actionTarget;
    const treeNode = getClosestTreeNode(menu.actionPath);
    const nodeModelEntry = treeView.model.getNodeEntry(treeNode.id);
    const nodeModel = nodeModelEntry.node;

    const menuItem = (menu.getNodeEntry(e) || {}).node;
    switch (menuItem.id) {
      case 'edit':
        editNode(treeNode);
        break;
      case 'remove':
        // the menu is associated with the tree view as a whole, not an individual node
        treeView.model.removeNode(treeNode.id);
        console.log(`Removed node: ${treeNode.id}`);
        break;
      case 'before':
      case 'after': {
        const newNodeModel = new KdSoftTreeNodeModel(
          `n-${this.newNodeId += 1}`,
          [],
          { type: nodeModel.type, text: `New node ${this.newNodeId}` }
        );
        treeView.model.addNode(treeNode.id, menuItem.id, newNodeModel);
        // the scheduler must allow scheduling after all currently scheduled renderings are done,
        // in case of @nx-js/queue-util this means using priorities.LOW; otherwise use window.setTimeout()
        this.schedule(() => {
          const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kdsoft-node`);
          if (newNode) editNode(newNode);
        });
        // window.setTimeout(() => {
        //   // a tree node can have siblings with the same id before and after (kdsoft-drop-target components)
        //   const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kdsoft-node`);
        //   if (newNode) editNode(newNode);
        // }, 0);
      }
        break;
      case 'inside': {
        let nodeType = 'ggc';
        switch (nodeModel.type) {
          case 'r':
            nodeType = 'c';
            break;
          case 'c':
            nodeType = 'gc';
            break;
          default:
            break;
        }
        const newNodeModel = new KdSoftTreeNodeModel(
          `n-${this.newNodeId += 1}`,
          [],
          { type: nodeType, text: `New node ${this.newNodeId}` }
        );
        // the scheduler must allow scheduling after all currently scheduled renderings are done,
        // in case of @nx-js/queue-util this means using priorities.LOW; otherwise use window.setTimeout()
        this.schedule(() => {
          treeNode.ariaExpanded = true;
          const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kdsoft-node`);
          if (newNode) editNode(newNode);
        });
        // window.setTimeout(() => {
        //   treeNode.ariaExpanded = true;
        //   const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kdsoft-node`);
        //   if (newNode) editNode(newNode);
        // }, 0);
        nodeModel.addNode(treeNode.id, menuItem.id, newNodeModel);
      }
        break;
      default:
        break;
    }
  }

  nodeEditLostFocus(e) {
    e.preventDefault();
    const seltext = e.currentTarget.nextElementSibling;
    seltext.removeAttribute('hidden');
    e.currentTarget.setAttribute('hidden', '');
  }

  nodeEditTextChanged(e, nodeModel) {
    nodeModel.text = e.currentTarget.value;
  }

  sliderVerticalChanged(e) {
    this.carouselModel.vertical = !this.carouselModel.vertical;
    this.carouselModel.items = this.carouselModel.vertical ? verticalImageModels : horizontalImageModels;
  }

  switcherVerticalChanged(e) {
    this.switcherModel.vertical = !this.switcherModel.vertical;
    this.switcherModel.items = this.switcherModel.vertical ? verticalImageModels : horizontalImageModels;
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

  static get styles() {
    return [
      tailwindStyles,
      checkboxStyles,
      fontAwesomeStyles,
      css`
        :host {
          display: block;
        }

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
          height: calc(100vh - 96px);
          width: 100%;
          overflow-y: scroll;
          background-color: lightblue;
        }

        #container>div {
          background-color: lightsteelblue;
          border: solid 1px;
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

        #tree-view {
          width: 100%;
        }

        .node-edit:focus {
          border-color: lightgrey;
        }

        #slider {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        #slider item-carousel {
          --itemHeight: 300px;
          --itemWidth: 600px;
          margin: auto;
        }

        #slider item-carousel img[slot] {
          max-width: unset;
        }

        #switcher {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        #switcher tab-container {
          margin: auto;
        }

        #switcher .tab:hover {
          background-color: lightblue;
        }

        #switcher .tab.active {
          background-color: gray;
        }
      `
    ];
  }

  _getChecklistItemTemplate(item) {
    return html`${item.name}`;
  }

  // caller must make sure that "this" refers to this object, and not the tree view
  _getTreeViewContentTemplate(nodeModel) {
    let cls = '';
    switch (nodeModel.type) {
      case 'gc':
        cls += 'text-red-600';
        break;
      case 'c':
        cls += 'text-blue-600';
        break;
      case 'r':
        cls += 'text-black-600';
        break;
      default:
        break;
    }
    return html`<span class="node-content">
      <input type="text" placeholder="node text"
          class="my-auto p-1 flex-grow node-edit"
          tabindex="1"
          @blur="${e => this.nodeEditLostFocus(e, nodeModel)}"
          @input="${e => this.nodeEditTextChanged(e, nodeModel)}"
          hidden />
          <span class=${cls}>${nodeModel.text}</span>
    </span>`;
  }

  _getMenuItemTemplate(item) {
    return html`<span>${item.text}</span>`;
  }

  _getOrientationHeader(vertical, caption, changeHandler) {
    return html`
      <h1 class="flex font-bold text-xl mb-2 text-left items-center">${caption}
        <input type="checkbox" class="ml-auto mr-1 kdsoft-checkbox align-text-bottom"
          .checked=${vertical}
          @change=${changeHandler}>
          Orientation Vertical
        </input>
      </h1>
    `;
  }

  // Note: we also need to copy in our custom CSS in a style element,
  //       we can only assume that the component has tailwind styles
  _getTabTemplate (model, item, index) {
    const activeClass = model.activeIndex === index ? 'active' : '';
    return html`
      <button type="button" slot="tab_${index}"
        @click=${() => { model.activeIndex = index; }}
        class="tab px-2 py-1 bg-gray-300 ${activeClass}"
      >Image ${index}</button>
    `;
  }

  render() {
    return html`
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
          <!-- invoke getContentTemplate as lambda, to force this component to be "this" in the method -->
          <kdsoft-tree-view id="tv" class="py-0"
            ?allow-drag-drop=${this.model.dragDropEnabled}
            .model=${this.tvRoot}
            .getContentTemplate=${nodeModel => this._getTreeViewContentTemplate(nodeModel)}>
          </kdsoft-tree-view>
        </div>

        <div id="slider">
          ${this._getOrientationHeader(this.carouselModel.vertical, 'Carousel', this.sliderVerticalChanged)}
          <item-carousel .model=${this.carouselModel}>
            ${this.carouselModel.items.map((item, index) => html`<img slot="item_${index}" src=${item.href}></img>`)}
          </item-carousel>
        </div>

        <div id="switcher">
          ${this._getOrientationHeader(this.switcherModel.vertical, 'Tab Container', this.switcherVerticalChanged)}
          <tab-container .model=${this.switcherModel}>
            ${this.switcherModel.items.map((item, index) => this._getTabTemplate(this.switcherModel, item, index))}
            <img slot="item" src=${this.switcherModel.activeItem.href}></img>
          </tab-container>
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
