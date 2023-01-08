import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm';
import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';

//#region click and key events

// the slotted elements are supposed to be instances of <kds-list-item>;
// we assign the _kdsIndex property for easier handling of list-related events
function slotChange(e) {
  const listItems = e.currentTarget.assignedElements();
  for (let indx = 0; indx < listItems.length; indx += 1) {
    listItems[indx]._kdsIndex = indx;
  }
}

function onItemDrop(e) {
  const fromIndex = Number(e.detail.fromId);
  const toIndex = Number(e.detail.toId);
  this.model.moveItem(fromIndex, toIndex);

  // setting the focus on the dropped item should be done when when the data-item-index
  // attributes are set, so we schedule it at the end of the next render cycle
  this.schedule(() => {
    const slot = this.renderRoot.querySelector('slot');
    const listItems = slot.assignedElements();
    const dropped = listItems[toIndex];
    if (dropped) dropped.focus();
  });
}

function onItemClick(e) {
  this.model.toggleSelectedIndex(e.detail.item._kdsIndex);
}

// do we want to have a checkbox click mean the same as an item click?
function onItemCheckClick(e) {
  this.model.toggleSelectedIndex(e.detail.item._kdsIndex);
}

function onItemUpClick(e) {
  const itemIndex = e.detail.item._kdsIndex;
  this.model.moveItem(itemIndex, itemIndex - 1);
}

function onItemDownClick(e) {
  const itemIndex = e.detail.item._kdsIndex;
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
      const itemNode = e.target;
      this.model.selectIndex(itemNode._kdsIndex, true);
      break;
    }
    case ' ': {
      const itemNode = e.target;
      this.model.toggleSelectedIndex(itemNode._kdsIndex);
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
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
    //this.getItemTemplate = item => html`${item}`;

    // use fixed reference to be able to add *and* remove as event listener
    this._onItemDrop = onItemDrop.bind(this);
    this._onItemClick = onItemClick.bind(this);
    this._onItemCheckClick = onItemCheckClick.bind(this);
    this._onItemUpClick = onItemUpClick.bind(this);
    this._onItemDownClick = onItemDownClick.bind(this);
    this._onItemListKeydown = onItemListKeydown.bind(this);
    this._slotChange = slotChange.bind(this);
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
      const slot = this.renderRoot.querySelector('slot');
      const listItems = slot.assignedElements();
      const firstSelected = listItems[firstSelEntry.index];
      if (firstSelected) firstSelected.scrollIntoView(true);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('kds-drop', this._onItemDrop);
    this.addEventListener('kds-item-click', this._onItemClick);
    this.addEventListener('kds-item-check-click', this._onItemCheckClick);
    this.addEventListener('kds-item-up-click', this._onItemUpClick);
    this.addEventListener('kds-item-down-click', this._onItemDownClick);
  }

  disconnectedCallback() {
    this.removeEventListener('kds-drop', this._onItemDrop);
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
          margin-top: 0;
          margin-bottom: 0;
          box-sizing: border-box;
          max-height: var(--max-scroll-height, 300px);
          min-width: 100%;
          overflow-y: auto;
        }
      `,
    ];
  }

  render() {
    const result = html`
      <div id="container">
        <ul id="item-list"
          part="ul"
          @keydown=${this._onItemListKeydown}
        >
          <slot @slotchange=${this._slotChange}></slot>
        </ul>
      </div>
    `;
    return result;
  }
}

window.customElements.define('kds-list', KdsList);
