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
    // One can also set the global window._kd_soft.scheduler and leave this.scheduler unassigned,
    // a shared scheduler allows us to have more control over render scheduling compared to
    // each control having an independent scheduler.
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

## Styling component externally 
There are several ways of styling a component from the outside

1. Use <slot> elements. 
   * The slotted components are already styled when assigned to the slot.
   * That styling is based on where these components are placed in the light DOM.

2. Use ::part() selectors.
   * A Shadow Dom node can be identified with a "part" attribute and referenced from the outside using a ::part() selector.
   * There are limitations: children of the part cannot be selected/styled that way, only the part itself.
   * Nested parts need to be exported explicitly using the "exportedparts" attribute.

3. Inject a stylesheet into the component
   * A stylesheet can be added like this
   `this.renderRoot.adoptedStyleSheets = [...this.renderRoot.adoptedStyleSheets, newStyleSheet];`

4. Note: <slot> vs callbacks
   * In a hierarchical structure like a tree view it is hard to syntactically add slotted components especially when the tree view is dynamically constructed based on a recursive hierarchical model.
     * One can either delay construction of the structure to the point where slots are filled. See `demo-context-menu.js` in the `demo/controls` directory.
     * Or one can use a callback function to inject a template instead of populating a slot. See `stylable-context-menu.js` in the `demo/controls` directory. In this case it is advised to also inject the associated style sheets.