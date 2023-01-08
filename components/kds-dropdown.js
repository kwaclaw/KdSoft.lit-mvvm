import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';

function isChildOf(parent, child) {
  if (!child) {
    return false;
  }

  while (child.parentNode !== parent) {
    child = child.parentNode;
    if (child == null) {
      return false;
    }
  }
  return true;
}

export default class KdsDropdown extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
  }

  get connector() { return this._connector; }
  set connector(value) { this._connector = value; }

  _hostLostFocus(e) {
    if (e.currentTarget === e.relatedTarget || isChildOf(e.currentTarget, e.relatedTarget)) {
      return;
    }
    this.model.dropped = false;
  }

  _hostFocused(e) {
    this.model.dropped = true;
  }

  _seltextFocused(e) {
    e.preventDefault();
    const seltext = e.currentTarget;
    const searchbox = e.currentTarget.nextElementSibling;

    // because of this, seltext will not receive the click and mouseup events
    seltext.setAttribute('hidden', '');
    searchbox.removeAttribute('hidden');
    searchbox.focus();
  }

  _seltextLostFocus(e) {
    e.preventDefault();
  }

  _searchboxFocused(e) {
    e.preventDefault();
    this.model.dropped = true;
  }

  _searchboxLostFocus(e) {
    e.preventDefault();
    const seltext = e.currentTarget.previousElementSibling;
    seltext.removeAttribute('hidden');
    e.currentTarget.setAttribute('hidden', '');
  }

  _searchTextChanged(e) {
    this.model.searchText = e.currentTarget.value;
  }

  _dropdownButtonFocused(e) {
    // need to exclude this button from the host's focus handler, because its click handler
    // performs the drop-down toggle function which would be in conflict
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  _dropdownButtonClicked(e) {
    this.model.dropped = !this.model.dropped;
  }

  _slotKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.model.dropped = false;
      const btn = this.renderRoot.getElementById('dropDownButton');
      btn.focus();
    }
  }

  /* eslint-disable indent, no-else-return */

  disconnectedCallback() {
    super.disconnectedCallback();
    // necessary?
    //this.shadowRoot.host.removeEventListener('focusout', this._hostLostFocus);
    //this.shadowRoot.host.removeEventListener('focusin', this._hostFocused);
    if (this.connector) this.connector.disconnectDropdownSlot();
  }

  beforeFirstRender() {
    super.beforeFirstRender();
    if (this.connector) this.connector.connectDropdownSlot();
    this.shadowRoot.host.addEventListener('focusout', this._hostLostFocus);
    this.shadowRoot.host.addEventListener('focusin', this._hostFocused);
  }

  static get styles() {
    return [
      css`
        :host {
          display: inline-block;
          line-height: 1.25em;
        }

        #container {
          display: flex;
          align-items: baseline;
          justify-items: flex-end;
        }

        #dropdown {
          position: relative;
          z-index: 50;
          /* height: 0; */
        }

        #dropdown > slot {
          position: absolute;
          left: 0;
          top: 0;
        }

        #seltext {
          pointer-events: auto;
          margin-top: auto;
          margin-bottom: auto;
          flex-grow: 1;
          white-space: nowrap;
          overflow-x: hidden;
        }

        #searchbox {
          margin-top: auto;
          margin-bottom: auto;
          flex-grow: 1;
        }
      `,
    ];
  }

  render() {
    const selText = this.model.selectedText;
    const result = html`
      <div id="container" part="container">
        <span id="seltext" part="seltext"
          tabindex="1"
          title="${selText}"
          @focus="${this._seltextFocused}"
          @blur="${this._seltextLostFocus}"
        >
          ${selText}
        </span>
        <input id="searchbox" part="searchbox"
          type="text"
          tabindex="1"
          placeholder="search unselected entries"
          @focus="${this._searchboxFocused}"
          @blur="${this._searchboxLostFocus}"
          @input="${this._searchTextChanged}"
          hidden />
        <button id="dropDownButton" part="dropDownButton"
          type="button"
          tabindex="3"
          @focusin="${this._dropdownButtonFocused}"
          @click="${this._dropdownButtonClicked}"
        >
          <slot name="dropDownButtonIcon">
            <span>V</span>
          </slot>
        </button>
      </div>
      <div id="dropdown" ?hidden=${!this.model.dropped}>
        <slot tabindex="2" @keydown=${this._slotKeydown}>No dropdown content provided.</slot>
      </div>
    `;
    return result;
  }
}

window.customElements.define('kds-dropdown', KdsDropdown);
