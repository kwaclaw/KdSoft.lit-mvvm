Based on lit-element. An alternative that replaces observable properties with an observable
and shareable view model. It also separates out render scheduling to be pluggable.

Package available from https://www.npmjs.com/package/@kdsoft/lit-mvvm.

There is a fork of the pwa starter kit at https://github.com/kwaclaw/pwa-starter-kit.
The template-mvvm-lit-plain branch (based on template-no-redux) is using lit-mvvm.

An example for a simple check list that would be used like
 `<my-checklist .model=${myModel} show-checkboxes></my-checklist>`:

```javascript
import { html } from '../lib/lit-html.js';
import { repeat } from '../lib/lit-html/directives/repeat.js';
import { LitMvvmElement } from '../lib/@kdsoft/lit-mvvm.js';
import { observe, unobserve } from '../lib/@nx-js/observer-util.js';
import { Queue, priorities } from '../lib/@nx-js/queue-util.js';

class MyCheckList extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
  }

  get showCheckboxes() { return this.hasAttribute('show-checkboxes'); }
  set showCheckboxes(val) {
    if (val) this.setAttribute('show-checkboxes', '');
    else this.removeAttribute('show-checkboxes');
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn 
  // will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'show-checkboxes'];
  }

  // model may still be undefined
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    if (this._selectObserver) unobserve(this._selectObserver);
    super.disconnectedCallback();
  }

  // first time model is defined for certain, here we can safely
  // define observers for our model (i.e. track property changes)
  firstRendered() {
    this._selectObserver = observe(() => {
      for (const entry of this.model.selectedEntries) {
        console.log(`Selected: ${entry.item.name}`);
      }
    });
  }

  rendered() {
    //
  }

  _itemClicked(e) {
    const itemDiv = e.currentTarget.closest('.list-item');
    this.model.selectIndex(itemDiv.dataset.itemIndex, true);
  }

  _checkBoxTemplate(model, item) {
    const chkid = `item-chk-${model.getItemId(item)}`;
    return html`
      <input type="checkbox" id=${chkid} tabindex="-1" class="my-checkbox"
             @click=${this._itemClicked} .checked=${model.isItemSelected(item)} />
      <label for=${chkid}><span>${model.getItemText(item)}</span></label>
    `;
  }

  _itemTemplate(item, indx, showCheckboxes) {
    const disabledString = item.disabled ? 'disabled' : '';
    const tabindex = indx === 0 ? '0' : '-1';
    const itemText = this.model.getItemText(item);
    return html`
      <li data-item-index="${indx}" tabindex="${tabindex}"
          class="list-item ${disabledString}" title=${itemText}>
        <a>
          ${showCheckboxes
            ? this.checkBoxTemplate(this.model, item, indx)
            : html`<span @click=${this._itemClicked}>${itemText}</span>`
          }
        </a>
      </li>
    `;
  }

  render() {
    return html`
      <link rel="stylesheet" type="text/css" href='../css/my-styles.css' />
      <style>
        :host {
          display: inline-block;
        }
        #container {
          display: flex;
        }
        #item-list {
          display: inline-block;
          padding: 5px;
          box-sizing: border-box;
          max-height: var(--max-scroll-height, 300px);
          min-width: 100%;
        }
      </style>
      <div id="container">
        <ul id="item-list">
          ${repeat(this.model.filteredItems,
            entry => this.model.getItemId(entry.item),
            entry => this._itemTemplate(entry.item, entry.index, this.showCheckboxes)
          )}
        </ul>
      </div>
    `;
  }
}

window.customElements.define('my-checklist', MyCheckList);
```