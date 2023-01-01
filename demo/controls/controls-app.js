import { observable } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { } from '@kdsoft/lit-mvvm-components';
import checkboxStyles from './styles/kds-checkbox-styles.js';
import KdsTreeNodeModel from './kds-tree-node-model';
import KdsListModel from './kds-list-model.js';
import KdsDropdownModel from './kds-dropdown-model.js';
import KdsActiveItemModel from './kds-active-item-model.js';
import KdsDropdownChecklistConnector from './kds-dropdown-checklist-connector.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
// since tailwind classes are generated only as used, we cannot import them
// from a prebuilt library, but need to generate the ones we use locally
import tailwindStyles from './styles/tailwind-styles.js';
import './kds-carousel.js';
import './tab-container.js';
import './demo-tree-view.js';
import './demo-check-list.js';
import './kds-dropdown.js';

function getClosestTreeNode(path) {
  for (let indx = 0; indx < path.length; indx += 1) {
    const classList = path[indx].classList;
    if (classList && classList.contains('kds-node')) {
      return path[indx];
    }
  }
  return null;
}

function editNode(treeNode) {
  const nodeEditSlot = treeNode.querySelector('slot[name="content"]');
  let nodeEdit = null;
  for (const an of nodeEditSlot.assignedNodes()) {
    nodeEdit = an.querySelector('.node-edit');
    if (nodeEdit) break;
  }
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
    this.checklistModel = observable(new KdsListModel(
      [{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }, { id: 3, name: 'Gamma' }],
      [1],
      true,
      item => item.id
    ));

    this.dropDownModel = observable(new KdsDropdownModel());
    this.checklistConnector = new KdsDropdownChecklistConnector(
      () => this.renderRoot.getElementById('ddown'),
      () => this.renderRoot.getElementById('clist'),
      () => this.getChecklistText()
    );

    const tvGrandChildren = [];
    for (let indx = 0; indx < 15; indx += 1) {
      const grandChild = new KdsTreeNodeModel(`3-${indx}`, [], { type: 'gc', text: `Grand child blah blah ${indx}` });
      tvGrandChildren.push(grandChild);
    }
    const tvChildren = [];
    for (let indx = 0; indx < 5; indx += 1) {
      const gci = indx * 3;
      const grandChildren = tvGrandChildren.slice(gci, gci + 3);
      const child = new KdsTreeNodeModel(`2-${indx}`, grandChildren, { type: 'c', text: `Child blah blah ${indx}` });
      tvChildren.push(child);
    }
    this.tvRoot = observable(new KdsTreeNodeModel('0-0', tvChildren, { type: 'r', text: `Root Node` }));

    const menuChildren = [];
    const menuGrandChildren = [];
    menuChildren.push(new KdsTreeNodeModel(`edit`, [], { text: `Edit Node`, disabled: false }));
    menuGrandChildren.push(new KdsTreeNodeModel(`before`, [], { text: `Before`, disabled: false }));
    menuGrandChildren.push(new KdsTreeNodeModel(`after`, [], { text: `After`, disabled: false }));
    menuGrandChildren.push(new KdsTreeNodeModel(`inside`, [], { text: `Inside`, disabled: false }));
    menuChildren.push(new KdsTreeNodeModel(`add`, menuGrandChildren, { text: `Add Node`, disabled: false }));
    menuChildren.push(new KdsTreeNodeModel(`remove`, [], { text: `Remove Node`, disabled: false }));
    this.tvMenu = observable(new KdsTreeNodeModel('0-0', menuChildren, { text: `Node Menu` }));

    this.carouselModel = observable(new KdsActiveItemModel());
    this.switcherModel = observable(new KdsActiveItemModel());

    this.model = observable({
      dragDropEnabled: false,
    });

    this.carouselModel.items = this.model.sliderVertical ? verticalImageModels : horizontalImageModels;
    this.carouselModel.activeIndex = 0;
    this.switcherModel.items = this.model.sliderVertical ? verticalImageModels : horizontalImageModels;
    this.switcherModel.activeIndex = 0;

    this.newNodeId = 0;
  }

  searchTextChanged(e) {
    const searchText = e.currentTarget.value;
    const regex = new RegExp(searchText, 'i');
    // we always include selected items
    this.checklistModel.filter = item => this.checklistModel.isItemSelected(item) || regex.test(item.name);
  }

  getChecklistText() {
    let result = null;
    for (const selEntry of this.checklistModel.selectedEntries) {
      if (result) result += `, ${selEntry.item.name}`;
      else result = selEntry.item.name;
    }
    return result;
  }

  checkSelectedChanged(e) {
    this.model.checkedIsSelected = e.currentTarget.checked;
  }

  addCheckItem() {
    const items = this.checklistModel.items;
    const ix = items.length;
    items.push({ id: ix, name: `Item_${ix}` });
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
    if (!menuItem) return;

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
      case 'after':
        {
          const newNodeModel = new KdsTreeNodeModel(
            `n-${this.newNodeId += 1}`,
            [],
            { type: nodeModel.type, text: `New node ${this.newNodeId}` }
          );
          treeView.model.addNode(treeNode.id, menuItem.id, newNodeModel);
          // the scheduler must allow scheduling after all currently scheduled renderings are done,
          // in case of @nx-js/queue-util this means using priorities.LOW; otherwise use window.setTimeout()
          this.schedule(() => {
            const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kds-node`);
            if (newNode) editNode(newNode);
          });
          // window.setTimeout(() => {
          //   // a tree node can have siblings with the same id before and after (kdsoft-drop-target components)
          //   const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kds-node`);
          //   if (newNode) editNode(newNode);
          // }, 0);
        }
        break;
      case 'inside':
        {
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
          const newNodeModel = new KdsTreeNodeModel(
            `n-${this.newNodeId += 1}`,
            [],
            { type: nodeType, text: `New node ${this.newNodeId}` }
          );
          // the scheduler must allow scheduling after all currently scheduled renderings are done,
          // in case of @nx-js/queue-util this means using priorities.LOW; otherwise use window.setTimeout()
          this.schedule(() => {
            treeNode.ariaExpanded = true;
            const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kds-node`);
            if (newNode) editNode(newNode);
          });
          // window.setTimeout(() => {
          //   treeNode.ariaExpanded = true;
          //   const newNode = treeView.renderRoot.querySelector(`#${newNodeModel.id}.kds-node`);
          //   if (newNode) editNode(newNode);
          // }, 0);
          nodeModel.addNode(treeNode.id, menuItem.id, newNodeModel);
        }
        break;
      default:
        break;
    }
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

        #container > div {
          background-color: lightsteelblue;
          border: solid 1px;
          padding: 0.5em;
        }

        /* #region Checklist */

        #check-list {
          position: relative;
          width: 100%;
        }

        /* #rendegion Checklist */

        /* #region Dropdown Checklist */

        #drop-down {
          width: 100%;
        }

        #ddown {
          width: 100%;
        }

        #ddown::part(container) {
          border: 1px solid;
          padding: 2px;
        }

        #ddown::part(dropDownButton) {
          margin-top: auto;
          margin-bottom: auto;
          padding-top: 0.15em;
          padding-bottom: 0.15em;
          padding-left: 0.25em;
          padding-right: 0.25em;
          background-color: lightgray;
          border: 0;
        }

        #ddown::part(dropDownButton):hover {
          background-color: darkgray;
        }

        /* #rendegion Dropdown Checklist */

        /* #region Treeview */

        #tree-view {
          width: 100%;
        }

        /* #rendegion Treeview */

        /* #region Carousel */

        #carousel {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        #carousel kds-carousel {
          --itemHeight: 300px;
          --itemWidth: 600px;
          margin: auto;
        }

        #carousel kds-carousel img[slot] {
          max-width: unset;
        }

        /* #rendegion Carousel */

        /* #region Switcher */

        #switcher {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        #switcher tab-container {
          margin: auto;
          overflow-x: clip;
          overflow-y: visible;
        }

        #switcher tab-container.vertical {
          overflow-x: visible;
          overflow-y: clip;
        }

        #switcher .tab:hover {
          background-color: lightblue;
        }

        #switcher .tab.active {
          background-color: darkgrey;
          transform: scale(1.1) translate(0, -4%);
        }

        #switcher .tab.active.vertical {
          transform: scale(1.1) translate(-4%, 0);
        }

        /* #rendegion Switcher */
      `
    ];
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
    const verticalClass = model.vertical ? 'vertical' : '';
    return html`
      <button type="button" slot="tab_${index}"
        @click=${() => { model.activeIndex = index; }}
        class="tab px-2 py-1 bg-gray-300 ${activeClass} ${verticalClass}"
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
          <h1 class="flex font-bold text-xl mb-2 text-left">Plain Checklist
            <button class="ml-auto" @click=${e => this.addCheckItem(e)}>Add Item</button>
          </h1>
          <input id="searchbox"
            type="text"
            placeholder="search unselected entries"
            class="my-auto p-1 flex-grow"
            @input="${this.searchTextChanged}" />
          <demo-check-list class="border"
            .model=${this.checklistModel}
            checkboxes
            arrows
            allow-drag-drop>
          </demo-check-list>
        </div>

        <div id="drop-down">
          <h1 class="font-bold text-xl mb-2 text-left">Checklist in Dropdown</h1>
          <kds-dropdown id="ddown" .model=${this.dropDownModel}>
            <demo-check-list id="clist" class="border"
              .model=${this.checklistModel} 
              .connector=${this.checklistConnector}
              checkboxes
              allow-drag-drop>
            </demo-check-list>
            <span slot="dropDownButtonIcon" class="fa-solid fa-lg fa-caret-down"></span>
          </kds-dropdown>
        </div>

        <div id="tree-view">
          <h1 class="font-bold text-xl mb-2 text-left">Treeview
            <input type="checkbox" class="kds-checkbox align-text-bottom" @change=${this.tvDragDropChanged}/>
            with context menu${this.model.dragDropEnabled ? ' and with' : ', but without'} drag and drop
          </h1>
          <!-- invoke getContentTemplate as lambda, to force this component to be "this" in the method -->
          <demo-tree-view id="tv" class="py-0"
            ?allow-drag-drop=${this.model.dragDropEnabled}
            .model=${this.tvRoot}
          ></demo-tree-view>
        </div>

        <div id="carousel">
          ${this._getOrientationHeader(this.carouselModel.vertical, 'Carousel', this.sliderVerticalChanged)}
          <kds-carousel .model=${this.carouselModel}>
            ${this.carouselModel.items.map((item, index) => html`<img slot="item_${index}" src=${item.href}></img>`)}
          </kds-carousel>
        </div>

        <div id="switcher">
          ${this._getOrientationHeader(this.switcherModel.vertical, 'Tab Container', this.switcherVerticalChanged)}
          <tab-container .model=${this.switcherModel} class="${this.switcherModel.vertical ? 'vertical' : ''}">
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

    // it may be necessary to reconnect the drop down connector
    this.checklistConnector.reconnectDropdownSlot();
  }
}

window.customElements.define('controls-app', ControlsApp);
