import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import KdSoftDragDropProvider from './kdsoft-drag-drop-provider.js';

import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

const arrowBase = { far: true, 'fa-lg': true, 'text-gray-500': true, 'align-text-bottom': true };

const classList = {
  upArrowVisible: { ...arrowBase, 'fa-caret-square-up': true },
  upArrowHidden: { ...arrowBase, 'fa-caret-square-up': true, invisible: true },
  downArrowVisible: { ...arrowBase, 'fa-caret-square-down': true },
  downArrowHidden: { ...arrowBase, 'fa-caret-square-down': true, invisible: true },
};

function getListItemIndex(item) {
  return Number(item.dataset.itemIndex);
}

// and: https://web.dev/more-capable-form-controls/

class KdSoftChecklist extends LitMvvmElement {
  // turns this into a form-associated custom element:
  // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example
  // and: https://web.dev/more-capable-form-controls/
  static get formAssociated() { return true; }

  constructor() {
    super();
    this._internals = this.attachInternals ? this.attachInternals() : null;
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
    this.getItemTemplate = item => html`${item}`;
    this._dragdropChanged = true;

    this._onNodeMove = e => {
      const fromIndex = Number(e.detail.fromId);
      const toIndex = Number(e.detail.toId);
      this.model.moveItem(fromIndex, toIndex);

      // setting the focus on the dropped item should be done when when the data-item-index
      // attributes are set, so we schedule it at the end of the next render cycle
      this.scheduler.add(() => {
        const dropped = this.renderRoot.querySelector(`[data-item-index="${toIndex}"]`);
        if (dropped) dropped.focus();
      });
    };
  }

  get showCheckboxes() { return this.hasAttribute('show-checkboxes'); }
  set showCheckboxes(val) {
    if (val) this.setAttribute('show-checkboxes', '');
    else this.removeAttribute('show-checkboxes');
  }

  get arrows() { return this.hasAttribute('arrows'); }
  set arrows(val) {
    if (val) this.setAttribute('arrows', '');
    else this.removeAttribute('arrows');
  }

  get allowDragDrop() { return this.hasAttribute('allow-drag-drop'); }
  set allowDragDrop(val) {
    if (val) this.setAttribute('allow-drag-drop', '');
    else this.removeAttribute('allow-drag-drop');
  }

  // The following properties and methods aren't strictly required,  but native form controls provide them.
  // Providing them helps ensure consistency with native controls.
  get form() { return this.internals_.form; }
  get name() { return this.getAttribute('name'); }
  get type() { return this.localName; }
  get validity() { return this.internals_.validity; }
  get validationMessage() { return this.internals_.validationMessage; }
  get willValidate() { return this.internals_.willValidate; }

  checkValidity() { return this.internals_.checkValidity(); }
  reportValidity() { return this.internals_.reportValidity(); }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'show-checkboxes', 'arrows', 'allow-drag-drop'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'allow-drag-drop') {
      this._dragdropChanged = true;
    }
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  //#region click and key events

  _checkboxClicked(e) {
    e.preventDefault();
    // want to keep dropped list open for multiple selections
    if (this.model.multiSelect) {
      e.stopPropagation();
      const itemDiv = e.currentTarget.closest('.list-item');
      this.model.selectIndex(getListItemIndex(itemDiv), e.currentTarget.checked);
    }
  }

  _itemClicked(e) {
    const itemDiv = e.currentTarget.closest('.list-item');
    if (this.model.multiSelect) {
      this.model.toggleIndex(getListItemIndex(itemDiv));
    } else { // on single select we don't toggle a clicked item
      this.model.selectIndex(getListItemIndex(itemDiv), true);
    }
  }

  _upClick(e) {
    const itemDiv = e.currentTarget.closest('.list-item');
    const itemIndex = getListItemIndex(itemDiv);
    this.model.moveItem(itemIndex, itemIndex - 1);
  }

  _downClick(e) {
    const itemDiv = e.currentTarget.closest('.list-item');
    const itemIndex = getListItemIndex(itemDiv);
    this.model.moveItem(itemIndex, itemIndex + 1);
  }

  _itemListKeydown(e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        const nextSib = e.target.closest('li').nextElementSibling;
        if (nextSib) nextSib.focus();
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        const prevSib = e.target.closest('li').previousElementSibling;
        if (prevSib) prevSib.focus();
        break;
      }
      case 'Enter': {
        const itemNode = e.target.closest('[data-item-index]');
        this.model.selectIndex(getListItemIndex(itemNode), true);
        break;
      }
      case ' ': {
        const itemNode = e.target.closest('[data-item-index]');
        const checkbox = itemNode.querySelector('input[type="checkbox"]');
        this.model.selectIndex(getListItemIndex(itemNode), !checkbox.checked);
        break;
      }
      default:
        // ignore, let bubble up
        return;
    }
    e.preventDefault();
  }

  //#endregion

  // NOTE: the checked status of a checkbox may not be properly rendered when the checked attribute is set,
  //       because that applies to inital rendering only. However, setting the checked property works!
  _checkBoxTemplate(model, item) {
    const chkid = `item-chk-${model.getItemId(item)}`;
    return html`
      <input type="checkbox" id=${chkid}
        tabindex="-1"
        class="kdsoft-checkbox mr-2 my-auto"
        @click=${this._checkboxClicked}
        .checked=${model.isItemSelected(item)}
        ?disabled=${item.disabled} />
    `;
  }

  /* eslint-disable indent, no-else-return */

  _itemTemplate(item, indx, showCheckboxes, hasArrows) {
    const tabindex = indx === 0 ? '0' : '-1';
    const upArrowClasses = indx === 0 ? classList.upArrowHidden : classList.upArrowVisible;
    const downArrowClasses = indx >= (this.model.items.length - 1) ? classList.downArrowHidden : classList.downArrowVisible;
    const selectedClass = this.model.isItemSelected(item) ? 'item-selected' : '';
    const disabledClass = item.disabled ? 'disabled' : '';

    const listItemContent = html`
      <div part="item" class="w-full inline-flex items-baseline">
        ${hasArrows
          ? html`
              <span class="leading-none cursor-pointer my-auto mr-1" @click=${this._upClick}><i class=${classMap(upArrowClasses)}></i></span>
              <span class="leading-none cursor-pointer my-auto mr-2" @click=${this._downClick}><i class=${classMap(downArrowClasses)}></i></span>
            `
          : nothing
        }
        ${showCheckboxes ? this._checkBoxTemplate(this.model, item, indx) : nothing}
        ${this.getItemTemplate(item)}
      </div>
    `;

    return html`
      <li data-item-index="${indx}"
          tabindex="${tabindex}"
          class="list-item whitespace-nowrap ${selectedClass} ${disabledClass}"
          @click=${this._itemClicked}
      >
        ${listItemContent}
      </li>
    `;
  }

  // scrolls to first selected item
  initView() {
    if (!this.model) return;

    let firstSelEntry = null;
    for (const selEntry of this.model.selectedEntries) {
      firstSelEntry = selEntry;
      break;
    }
    if (firstSelEntry) {
      const firstSelected = this.renderRoot.querySelector(`.list-item[data-item-index="${firstSelEntry.index}"]`);
      //firstSelected.scrollIntoView(true); --  does not work in ShadowDom
      const op = firstSelected.offsetParent;
      if (op) op.scrollTop = firstSelected.offsetTop;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('kdsoft-node-move', this._onNodeMove);
  }

  disconnectedCallback() {
    this.removeEventListener('kdsoft-node-move', this._onNodeMove);
    if (this._selectObserver) unobserve(this._selectObserver);
    super.disconnectedCallback();
  }

  shouldRender() {
    return !!this.model;
  }

  // first time model is defined for certain
  beforeFirstRender() {
    this._selectObserver = observe(() => {
      const n = this.name;
      const entries = new FormData();
      for (const entry of this.model.selectedEntries) {
        entries.append(n, entry.item.value);
      }
      if (this._internals) this._internals.setFormValue(entries);
    });
  }

  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      checkboxStyles,
      css`
        :host {
          display: block;
        }
        #container {
          position: relative;
          width: 100%;
          display: flex;
        }
        #item-list {
          display: inline-block;
          -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
          padding-top: 5px;
          padding-bottom: 5px;
          box-sizing: border-box;
          max-height: var(--max-scroll-height, 300px);
          min-width: 100%;
        }
        .list-item {
          position: relative;
          padding-top: 2px;
          padding-bottom: 2px;
          padding-left: 5px;
          padding-right: 5px;
          outline: none;
        }
        .list-item:hover {
          background-color: lightblue;
        }
        .droppable {
          outline: 2px solid darkgray;
        }
      `,
    ];
  }

  _getItemSelectedClass(showCheckboxes) {
    if (showCheckboxes) {
      return css``;
    } else {
      return css`
        .item-selected {
          background-color: lightgray;
        }
      `;
    }
  }

  // using the repeat directive
  render() {
    const showCheckboxes = this.showCheckboxes;
    const hasArrows = this.arrows;

    const result = html`
      <style>
        ${this._getItemSelectedClass(showCheckboxes)}
      </style>
      <div id="container">
        <ul id="item-list"
          class="bg-white border-solid border border-gray-400 overflow-y-auto"
          @keydown=${this._itemListKeydown}
        >
          ${repeat(this.model.filteredItems,
            entry => this.model.getItemId(entry.item),
            entry => this._itemTemplate(entry.item, entry.index, showCheckboxes, hasArrows)
          )}
        </ul>
      </div>
    `;
    return result;
  }

  rendered() {
    if (!this._dragdropChanged) return;
    this._dragdropChanged = false;

    const listItems = this.renderRoot.querySelectorAll('li.list-item');
    if (this.allowDragDrop) {
      for (const li of listItems) {
        li.setAttribute('draggable', true);
        if (!li._dragdrop) {
          li._dragdrop = new KdSoftDragDropProvider(getListItemIndex).connect(li);
        }
      }
    } else {
      for (const li of listItems) {
        li.removeAttribute('draggable');
        if (li._dragdrop) {
          li._dragdrop.disconnect();
          li._dragdrop = null;
        }
      }
    }
  }
}

window.customElements.define('kdsoft-checklist', KdSoftChecklist);
