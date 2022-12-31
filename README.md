Based on lit-element. An alternative that replaces observable properties with an observable
and shareable view model. It also separates out render scheduling to be pluggable.

Package available from https://www.npmjs.com/package/@kdsoft/lit-mvvm.

There are two demo projects in the GitHub repository, they work best from VS Code (for instructions, see their README files).

An example for a simple check list that would be used like
 `<my-checklist .model=${myModel} show-checkboxes></my-checklist>` where myModel needs to be an instance of `MyChecklistModel` (see the controls-demo for details):

```javascript
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';

class MyCheckList extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    this.getItemTemplate = item => html`${item}`;
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

  _checkboxClicked(e) {
    e.preventDefault();
    // want to keep dropped list open for multiple selections
    if (this.model.multiSelect) {
      e.stopPropagation();
      const itemDiv = e.currentTarget.closest('.list-item');
      this.model.selectIndex(itemDiv.dataset.itemIndex, e.currentTarget.checked);
    }
  }

  _itemClicked(e) {
    const itemDiv = e.currentTarget.closest('.list-item');
    if (this.model.multiSelect) {
      this.model.toggleSelectedIndex(itemDiv.dataset.itemIndex);
    } else { // on single select we don't toggle a clicked item
      this.model.selectIndex(itemDiv.dataset.itemIndex, true);
    }
  }

  _checkBoxTemplate(model, item) {
    const chkid = `item-chk-${model.getItemId(item)}`;
    return html`
      <input type="checkbox" id=${chkid}
        tabindex="-1"
        class="my-checkbox"
        @click=${this._checkboxClicked}
        .checked=${model.isItemSelected(item)}
        ?disabled=${item.disabled} />
    `;
  }

  _itemTemplate(item, indx, showCheckboxes) {
    const disabledString = item.disabled ? 'disabled' : '';
    const tabindex = indx === 0 ? '0' : '-1';
    return html`
      <li data-item-index="${indx}"
        tabindex="${tabindex}"
        class="list-item ${disabledString}"
        @click=${this._itemClicked}>
        <div>
          ${showCheckboxes ? this._checkBoxTemplate(this.model, item, indx) : nothing}
          ${this.getItemTemplate(item)}
        </div>
      </li>
    `;
  }

  // model may still be undefined
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  shouldRender() {
    return !!this.model;
  }

  // only called when model is defined, due to the shouldRender() override
  beforeFirstRender() {
    //
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
        :host {
          display: inline-block;
        }
        #container {
          position: relative;
          width: 100%;
          display: flex;
        }
        #item-list {
          display: inline-block;
          list-style: none;
          -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
          padding: 0 5px;
          box-sizing: border-box;
          max-height: var(--max-scroll-height, 300px);
          min-width: 100%;
        }
        .list-item {
          position: relative;
          padding: 2px 0;
        }
        .list-item:hover {
          background-color: lightblue;
        }
        .list-item > div {
          display: flex;
          width: 100%;
        }
      `,
    ];
  }

  render() {
    return html`
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