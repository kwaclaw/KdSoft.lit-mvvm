import { observable } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';

// this import will also register web components in '@kdsoft/lit-mvvm-components'
import
{
  KdsActiveItemModel,
  KdsDropdownChecklistConnector,
  KdsDropdownModel,
  KdsListModel,
  KdsTreeNodeModel
} from '@kdsoft/lit-mvvm-components';
//import './styled-tree-view.js';
import './styled-check-list.js';

import checkboxStyles from './styles/kds-checkbox-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
// since tailwind classes are generated only as used, we cannot import them
// from a prebuilt library, but need to generate the ones we use locally (npm run build)
import tailwindStyles from './styles/tailwind-styles.js';

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
  const nodeEdit = treeNode.querySelector('span.node-content .node-edit');
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

const menuStyleSheet = css`
  kds-menu-item::part(menu) {
    min-width: 10em;
    box-shadow: 0 0.4em 0.5em 0.3em rgba(0, 0, 0, 0.2);
    padding: 0.3em;
    margin: 0;
    background-color: white;
    color: rgb(51, 51, 51);
    border: 1px solid rgb(200, 200, 200);
  }

  kds-menu-item:hover::part(menu) {
    background: lightgrey; /*rgba(0, 0, 0, 0.3);*/
  }

  kds-menu-item:focus-within::part(menu) {
    outline: solid 2px rgb(50, 150, 255);
  }

  /* triangle */
  kds-menu-item.submenu::part(menu)::after {
    content: "";
    position: absolute;
    right: 0.3em;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border: 0.5em solid transparent;
    border-left-color: #808080;
  }

  /* trianghle off */
  kds-menu-item.submenu:hover::part(menu)::after,
  kds-menu-item.submenu:focus-within::part(menu)::after {
    content: none;
  }

  kds-menu-item::part(child-menu) {
    list-style: none;
    padding-inline-start: 0;
    left: calc(100% - 1.6em);
  }
`.styleSheet;

const treeViewStyleSheet = css`
  .node-edit:focus {
    border-color: lightgrey;
  }

  .expander-grip {
    vertical-align: middle;
  }

  .expander-grip:hover {
    cursor: grab;
  }

  .expander-icon {
    vertical-align: middle;
  }

  .expander-icon i {
    transition: transform var(--trans-time) ease;
  }

  .expander-icon.rotated i {
    transform: rotate(90deg);
  }

  kds-tree-node::part(expander-content) {
    transition: height var(--trans-time) ease;
  }

  kds-tree-node.kds-droppable::part(expander) {
    outline: 2px solid lightblue;
    outline-offset: -2px;
  }

  kds-tree-node.kds-droppable-before::part(drop-before-target),
  kds-tree-node.kds-droppable-after::part(drop-after-target) {
    outline: 2px solid lightblue;
    outline-offset: -2px;
  }
`.styleSheet;

class ControlsApp extends LitMvvmElement {
  constructor() {
    super();
    // share this across components
    window._kd_soft.scheduler = new Queue(priorities.LOW);

    this.checklistModel = observable(new KdsListModel(
      [{ id: 1, name: 'Alpha' }, { id: 2, name: 'Beta' }, { id: 3, name: 'Gamma' }],
      [1],
      true,
      item => item.id
    ));

    this.dropDownModel = observable(new KdsDropdownModel());
    this.checklistConnector = new KdsDropdownChecklistConnector(
      () => this.renderRoot.getElementById('ddown'),
      () => this.renderRoot.getElementById('clist').list,
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
    menuGrandChildren.push(new KdsTreeNodeModel(`after`, [
      new KdsTreeNodeModel(`after-1`, [], { text: `After-1`, disabled: false }),
      new KdsTreeNodeModel(`after-2`, [], { text: `After-2`, disabled: false })
    ], { text: `After`, disabled: false }));
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

  //#region check list

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

  //#endregion check list

  //#region context menu

  _getMenuItemTemplate(itemModel) {
    return html`<span>${itemModel.text}</span>`;
  }

  _getMenuStyles() {
    return [menuStyleSheet];
  }

  //#endregion context menu

  //#region tree view

  _treeNodeEditLostFocus(e) {
    e.preventDefault();
    const seltext = e.currentTarget.nextElementSibling;
    seltext.removeAttribute('hidden');
    e.currentTarget.setAttribute('hidden', '');
  }

  _treeNodeEditTextChanged(e, nodeModel) {
    nodeModel.text = e.currentTarget.value;
  }

  // this needs to be bound to the controls-app instance because of the reference to
  // local eve3nt han dlers _treeNodeEditLostFocus and _treeNodeEditTextChanged
  _getTreeviewItemTemplate(nodeModel) {
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

    return html`
      <span slot="content" class="node-content">
        <input type="text" placeholder="node text"
          class="my-auto p-1 flex-grow node-edit"
          tabindex="1"
          @blur="${e => this._treeNodeEditLostFocus(e, nodeModel)}"
          @input="${e => this._treeNodeEditTextChanged(e, nodeModel)}"
          hidden />
        <span class=${cls}>${nodeModel.text}</span>
      </span>
      <span slot="expander-grip" class="expander-grip">
        <i class="fas fa-xs fa-ellipsis-v text-gray-400"></i>
      </span>
      <span slot="expander-icon" class="expander-icon ${nodeModel._expanded ? 'rotated' : ''}">
        <i class="fa-solid fa-lg fa-caret-right ${nodeModel.children.length ? 'text-blue-600' : 'text-blue-200'}"></i>
      </span>
    `;
  }

  _getTreeviewStyles() {
    return [
      tailwindStyles.styleSheet,
      fontAwesomeStyles.styleSheet,
      treeViewStyleSheet
    ];
  }

  tvDragDropChanged(e) {
    const checked = e.currentTarget.checked;
    this.model.dragDropEnabled = checked;
  }

  tvMenuItemClicked(e) {
    const menu = e.currentTarget;
    const treeView = menu.actionTarget;
    const treeNode = getClosestTreeNode(menu.actionPath);
    const nodeModelEntry = treeView.model.getNodeEntry(treeNode.model.id);
    const nodeModel = nodeModelEntry.node;

    const menuItem = (menu.getNodeEntry(e) || {}).node;
    if (!menuItem) return;

    switch (menuItem.id) {
      case 'edit':
        editNode(treeNode);
        break;
      case 'remove':
        // the menu is associated with the tree view as a whole, not an individual node
        treeView.model.removeNode(treeNode.model.id);
        console.log(`Removed node: ${treeNode.model.id}`);
        break;
      case 'before':
      case 'after':
        {
          const newNodeModel = new KdsTreeNodeModel(
            `n-${this.newNodeId += 1}`,
            [],
            { type: nodeModel.type, text: `New node ${this.newNodeId}` }
          );
          treeView.model.addNode(treeNode.model.id, menuItem.id, newNodeModel);
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
          nodeModel.addNode(treeNode.model.id, menuItem.id, newNodeModel);
        }
        break;
      default:
        break;
    }
  }

  //#endregion tree view

  //#region carousel and switcher

  _getOrientationHeader(vertical, changeHandler) {
    return html`
      <input type="checkbox" class="ml-auto mr-1 kdsoft-checkbox align-text-bottom"
        .checked=${vertical}
        @change=${changeHandler}>
        Orientation Vertical
      </input>
    `;
  }

  sliderVerticalChanged(e) {
    this.carouselModel.vertical = !this.carouselModel.vertical;
    this.carouselModel.items = this.carouselModel.vertical ? verticalImageModels : horizontalImageModels;
  }

  switcherVerticalChanged(e) {
    this.switcherModel.vertical = !this.switcherModel.vertical;
    this.switcherModel.items = this.switcherModel.vertical ? verticalImageModels : horizontalImageModels;
  }

  //#endregion carousel and switcher

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
          padding: 1px 0 1px 0;
          line-height: 1.5em;
        }

        #ddown::part(seltext) {
          padding-left: 5px;
          line-height: inherit;
        }

        #ddown::part(searchbox) {
          padding-left: 5px;
          line-height: inherit;
        }

        #ddown::part(dropDownButton) {
          background-color: lightgray;
          border: 0;
          margin: auto;
          line-height: inherit;
        }

        #ddown::part(dropDownButton):hover {
          background-color: darkgray;
        }

        #clist {
          background-color: lightsteelblue;
          width: 100%;
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

        #switcher kds-tab-container {
          margin: auto;
          overflow-x: clip;
          overflow-y: visible;
        }

        #switcher kds-tab-container.vertical {
          overflow-x: visible;
          overflow-y: clip;
        }

        #switcher .tab:hover {
          background-color: lightblue;
        }

        #switcher .tab.active {
          background-color: darkgrey;
          transform: scale(1.1) translate(0, var(--active-translate));
        }

        #switcher .tab.active.vertical {
          transform: scale(1.1) translate(var(--active-translate), 0);
        }

        /* #rendegion Switcher */
      `
    ];
  }

  render() {
    return html`
      <kds-context-menu id="tv-context" tabindex="-1"
        .model=${this.tvMenu}
        .getItemTemplate=${this._getMenuItemTemplate}
        .getStyles=${this._getMenuStyles}
        @click=${this.tvMenuItemClicked}
      ></kds-context-menu>

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
          <styled-check-list class="border"
            .model=${this.checklistModel}
            checkboxes
            arrows
            allow-drag-drop>
          </styled-check-list>
        </div>

        <div id="drop-down">
          <h1 class="font-bold text-xl mb-2 text-left">Checklist in Dropdown</h1>
          <kds-dropdown id="ddown"
            .model=${this.dropDownModel}
            .connector=${this.checklistConnector}
            searchbox
          >
            <styled-check-list id="clist" class="border border-t-0"
              .model=${this.checklistModel} 
              checkboxes
              allow-drag-drop>
            </styled-check-list>
            <span slot="dropDownButtonIcon" class="fa-solid fa-xl fa-caret-down"></span>
          </kds-dropdown>
        </div>

        <div id="tree-view">
          <h1 class="font-bold text-xl mb-2 text-left">Treeview
            <input type="checkbox" class="kds-checkbox align-text-bottom" @change=${this.tvDragDropChanged}/>
            with context menu${this.model.dragDropEnabled ? ' and with' : ', but without'} drag and drop
          </h1>
          <!-- invoke getContentTemplate as lambda, to force this component to be "this" in the method -->
          <kds-tree-view id="tv" class="py-0"
            .model=${this.tvRoot}
            .getItemTemplate=${this._getTreeviewItemTemplate.bind(this)}
            .getStyles=${this._getTreeviewStyles}
            ?allow-drag-drop=${this.model.dragDropEnabled}
          ></kds-tree-view>
        </div>

        <div id="carousel">
          <h1 class="flex font-bold text-xl mb-2 text-left items-center">Carousel
            ${this._getOrientationHeader(this.carouselModel.vertical, this.sliderVerticalChanged)}
          </h1>
          <kds-carousel .model=${this.carouselModel}>
            ${this.carouselModel.items.map((item, index) => html`<img slot="item_${index}" src=${item.href}></img>`)}
          </kds-carousel>
        </div>

        <div id="switcher">
          <h1 class="flex font-bold text-xl mb-2 text-left items-center">Tab Container
            <input type="checkbox" class="ml-auto mr-1 kdsoft-checkbox align-text-bottom"
              .checked=${this.switcherModel.reverse}
              @change=${() => {this.switcherModel.reverse = !this.switcherModel.reverse; }}>
              Position Reverse
            </input>
            ${this._getOrientationHeader(this.switcherModel.vertical, this.switcherVerticalChanged)}
          </h1>
          <kds-tab-container
            .model=${this.switcherModel}
            class="${this.switcherModel.vertical ? 'vertical' : ''}">
            <style>
              button {
                --active-translate: ${this.switcherModel.reverse ? '4%' : '-4%'};
              }
            </style>
            ${this.switcherModel.items.map((item, index) => {
              const activeClass = this.switcherModel.activeIndex === index ? 'active' : '';
              const verticalClass = this.switcherModel.vertical ? 'vertical' : '';
              return html`
                <button type="button" slot="tab_${index}"
                  @click=${() => { this.switcherModel.activeIndex = index; }}
                  class="tab px-2 py-1 bg-gray-300 ${activeClass} ${verticalClass}"
                >Image ${index}</button>
              `;
            })}
            <img slot="item" src=${this.switcherModel.activeItem.href}></img>
          </kds-tab-container>
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
