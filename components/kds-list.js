import { repeat } from 'lit-html/directives/repeat.js';
import { LitMvvmElement, html, css, nothing } from '@kdsoft/lit-mvvm';
import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';

/* Assumptions: the model is an instance of KdsListModel, 
   but the model's item type is opaque, requiring only that
   getItemElementByIndex(index) and getItemIndexFromElement(element)
   are overridden appropriately.
 */

//#region click and key events

function onItemClick(e) {
  const itemIndex = this.getItemIndexFromElement(e.detail.item);
  if (this.model.multiSelect) {
    this.model.toggleSelectedIndex(itemIndex);
  } else {
    this.model.selectIndex(itemIndex, true);
  }
}

// do we want to have a checkbox click mean the same as an item click?
function onItemCheckClick(e) {
  const itemIndex = this.getItemIndexFromElement(e.detail.item);
  this.model.toggleSelectedIndex(itemIndex);
}

function onItemUpClick(e) {
  const itemIndex = this.getItemIndexFromElement(e.detail.item);
  this.model.moveItem(itemIndex, itemIndex - 1);
}

function onItemDownClick(e) {
  const itemIndex = this.getItemIndexFromElement(e.detail.item);
  this.model.moveItem(itemIndex, itemIndex + 1);
}

//TODO update to new logic
function onItemListKeydown(e) {
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight': {
      const nextSib = e.target.nextElementSibling;
      if (nextSib) nextSib.focus();
      break;
    }
    case 'ArrowUp':
    case 'ArrowLeft': {
      const prevSib = e.target.previousElementSibling;
      if (prevSib) prevSib.focus();
      break;
    }
    case 'Enter': {
      const itemIndex = this.getItemIndexFromElement(e.target);
      this.model.selectIndex(itemIndex, true);
      break;
    }
    case ' ': {
      const itemIndex = this.getItemIndexFromElement(e.target);
      this.model.toggleSelectedIndex(itemIndex);
      break;
    }
    default:
      // ignore, let bubble up
      return;
  }
  e.preventDefault();
}

//#endregion

export default class KdsList extends LitMvvmElement {
  // turns this into a form-associated custom element:
  // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-face-example
  // and: https://web.dev/more-capable-form-controls/
  static get formAssociated() { return true; }

  constructor() {
    super();
    this._internals = this.attachInternals ? this.attachInternals() : null;

    // use fixed reference to be able to add *and* remove as event listener
    this._onItemClick = onItemClick.bind(this);
    this._onItemCheckClick = onItemCheckClick.bind(this);
    this._onItemUpClick = onItemUpClick.bind(this);
    this._onItemDownClick = onItemDownClick.bind(this);
    this._onItemListKeydown = onItemListKeydown.bind(this);
  }

  // override to return the DOM element for the item's index
  getItemElementByIndex(index) {
    return null;
  }

  // override to return the item's index from the item's DOM element
  getItemIndexFromElement(element) {
    return 0;
  }

  // The following properties and methods aren't strictly required,  but native form controls provide them.
  // Providing them helps ensure consistency with native controls.
  get form() { return this._internals.form; }
  get name() { return this.getAttribute('name'); }
  get type() { return this.localName; }
  get validity() { return this._internals.validity; }
  get validationMessage() { return this._internals.validationMessage; }
  get willValidate() { return this._internals.willValidate; }

  checkValidity() { return this._internals.checkValidity(); }
  reportValidity() { return this._internals.reportValidity(); }

  /* eslint-disable indent, no-else-return */

  // scrolls to first selected item
  initView() {
    if (!this.model) return;

    const firstSelEntry = this.model.firstSelectedEntry;
    if (firstSelEntry) {
      const firstSelected = this.getItemElementByIndex(firstSelEntry.index);
      if (firstSelected) firstSelected.scrollIntoView(true);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('kds-item-click', this._onItemClick);
    this.addEventListener('kds-item-check-click', this._onItemCheckClick);
    this.addEventListener('kds-item-up-click', this._onItemUpClick);
    this.addEventListener('kds-item-down-click', this._onItemDownClick);
  }

  disconnectedCallback() {
    this.removeEventListener('kds-item-click', this._onItemClick);
    this.removeEventListener('kds-item-check-click', this._onItemCheckClick);
    this.removeEventListener('kds-item-up-click', this._onItemUpClick);
    this.removeEventListener('kds-item-down-click', this._onItemDownClick);
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
      css`
        :host {
          display: block;
        }

        #item-list {
          -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
          padding-top: 5px;
          padding-bottom: 5px;
          margin-top: 0;
          margin-bottom: 0;
          box-sizing: border-box;
          max-height: var(--max-scroll-height, 300px);
          overflow-y: auto;
        }
      `,
    ];
  }

  renderItem(entry) {
    return nothing;
  }

  render() {
    const result = html`
      <ul id="item-list"
        part="ul"
        @keydown=${this._onItemListKeydown}
      >
        ${repeat(this.model.filteredItems,
          entry => this.model.getItemId(entry.item),
          entry => this.renderItem(entry)
        )}
      </ul>
    `;
    return result;
  }
}

window.customElements.define('kds-list', KdsList);
