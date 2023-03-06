import { LitMvvmElement, html, nothing, css } from '@kdsoft/lit-mvvm';

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
  get searchbox() { return this.hasAttribute('searchbox'); }
  set searchbox(val) {
    if (val) this.setAttribute('searchbox', '');
    else this.removeAttribute('searchbox');
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'searchbox'];
  }

  _hostLostFocus(e) {
    // we use this flag to handle intermediate lost focus events when clicking
    // the dropdown button that should not close the dropdown up
    if (this._controlActive) return;
    this.model.dropped = false;
  }

  _seltextFocused(e) {
    e.preventDefault();
    if (this.searchbox) {
      const seltext = e.currentTarget;
      const searchbox = e.currentTarget.nextElementSibling;

      // because of this, seltext will not receive the click and mouseup events
      seltext.setAttribute('hidden', '');
      searchbox.removeAttribute('hidden');
      searchbox.focus();
    } else {
      this.model.dropped = true;
    }
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

  _dropdownButtonDown(e) {
    this._controlActive = true;
  }

  _dropdownButtonUp(e) {
    this._controlActive = false;
    // in case the button does not become focused focused because the slot contains a non-focusable node
    e.currentTarget.focus();
    this.model.dropped = !this.model.dropped;
  }

  _dropdownButtonCancel(e) {
    this._controlActive = false;
  }

  _dropDownFocused(e) {
    // prevent the _hostLostFocus() event from closing up the drop down
    this.model.dropped = true;
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

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.host.addEventListener('focusout', this._hostLostFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // necessary?
    this.renderRoot.host.removeEventListener('focusout', this._hostLostFocus);
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

      #mainslot::slotted(*) {
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

      /* empty span should have a non-zero height */
      #seltext::before {
        content: '\u200b'; /* unicode zero width space character */
      }
      
      #searchbox {
        margin-top: auto;
        margin-bottom: auto;
        flex-grow: 1;
      }
    `
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
        ${this.searchbox
          ? html`
            <input id="searchbox" part="searchbox"
              type="text"
              tabindex="1"
              placeholder="search unselected entries"
              @focus="${this._searchboxFocused}"
              @blur="${this._searchboxLostFocus}"
              @input="${this._searchTextChanged}"
              hidden />
            `
          : nothing
        }
        <button id="dropDownButton" part="dropDownButton"
          type="button"
          tabindex="3"
          @pointerdown="${this._dropdownButtonDown}"
          @pointerup="${this._dropdownButtonUp}"
          @pointercancel="${this._dropdownButtonCancel}"
        >
          <slot name="dropDownButtonIcon">
            <span>V</span>
          </slot>
        </button>
      </div>
      <div id="dropdown"
        @focusin="${this._dropDownFocused}"
        ?hidden=${!this.model.dropped}
      >
        <slot id="mainslot" tabindex="2" @keydown=${this._slotKeydown}>No dropdown content provided.</slot>
      </div>
    `;
    return result;
  }
}

window.customElements.define('kds-dropdown', KdsDropdown);
