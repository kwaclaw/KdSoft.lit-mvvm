import { LitMvvmElement, html, nothing, css } from '@kdsoft/lit-mvvm';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';

//#region click and key events

function itemClick(e) {
  const evt = new CustomEvent('kds-item-click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { item: this }
  });
  this.dispatchEvent(evt);
}

function checkboxClick(e) {
  //e.preventDefault();
  e.stopPropagation();
  const evt = new CustomEvent('kds-item-check-click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { item: this }
  });
  this.dispatchEvent(evt);
}

function upClick(e) {
  e.stopPropagation();
  const evt = new CustomEvent('kds-item-up-click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { item: this }
  });
  this.dispatchEvent(evt);
}

function downClick(e) {
  e.stopPropagation();
  const evt = new CustomEvent('kds-item-down-click', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { item: this }
  });
  this.dispatchEvent(evt);
}

//#endregion

const _dragDrop = new WeakMap();

//TODO maybe we need to pass in the getItemId() function for the drag-drop events
export default class KdsListItem extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
    this._itemClick = itemClick.bind(this);
    this._checkboxClick = checkboxClick.bind(this);
    this._upClick = upClick.bind(this);
    this._downClick = downClick.bind(this);
  }

  get checkbox() { return this.hasAttribute('checkbox'); }
  set checkbox(val) {
    if (val) this.setAttribute('checkbox', '');
    else this.removeAttribute('checkbox');
  }

  get selected() { return this.hasAttribute('selected'); }
  set selected(val) {
    if (val) this.setAttribute('selected', '');
    else this.removeAttribute('selected');
  }

  get arrows() { return this.hasAttribute('arrows'); }
  set arrows(val) {
    if (val) this.setAttribute('arrows', '');
    else this.removeAttribute('arrows');
  }

  get up() { return this.hasAttribute('up'); }
  set up(val) {
    if (val) this.setAttribute('up', '');
    else this.removeAttribute('up');
  }

  get down() { return this.hasAttribute('down'); }
  set down(val) {
    if (val) this.setAttribute('down', '');
    else this.removeAttribute('down');
  }

  get dragDropProvider() { return _dragDrop.get(this); }
  set dragDropProvider(val) {
    const currentVal = _dragDrop.get(this);
    if (currentVal) {
      currentVal.disconnect();
    }
    if (val) {
      _dragDrop.set(this, val);
      val.connect(this);
    } else {
      _dragDrop.delete(this);
    }
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      'checkbox',
      'selected',
      'arrows',
      'up',
      'down'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /* eslint-disable indent, no-else-return */

  // scrolls to first selected item
  connectedCallback() {
    super.connectedCallback();
    const dragDrop = this.dragDropProvider;
    if (dragDrop) {
      dragDrop.connect(this);
    }
  }

  disconnectedCallback() {
    const dragDrop = this.dragDropProvider;
    if (dragDrop) {
      dragDrop.disconnect();
    }
    super.disconnectedCallback();
  }

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        :host > li {
          position: relative;
          white-space: nowrap;
        }

        :host > li > div {
          display: inline-flex;
          width: 100%;
          align-items: baseline;
        }

        .up-arrow, .down-arrow {
          line-height: 1;
          cursor: pointer;
          margin-top: auto;
          margin-bottom: auto;
        }

        .up-arrow {
          margin-right: 0.25rem;
        }

        .down-arrow {
          margin-right: 0.5rem;
        }
      `,
    ];
  }

  render() {
    const draggable = this.dragDropProvider ? 'true' : 'false';
    const upVisible = this.up ? 'visible' : 'hidden';
    const downVisible = this.down ? 'visible' : 'hidden';

    const result = html`
      <li part="li"
          draggable=${draggable}
          @click=${this._itemClick}
      >
        <div part="item">
          ${this.arrows
            ? html`
                <span class="up-arrow" style="visibility: ${upVisible}" @click=${this._upClick}>
                  <slot name="up-arrow"></slot>
                </span>
                <span class="down-arrow" style="visibility: ${downVisible}" @click=${this._downClick}>
                  <slot name="down-arrow"></slot>
                </span>
              `
            : nothing
          }
          ${this.checkbox
            // NOTE: the checked status of a checkbox may not be properly rendered when the checked attribute is set,
            //       because that applies to inital rendering only. However, setting the checked property works!
            ? html`<slot name="check-box">
                <input type="checkbox" part="checkbox"
                  tabindex="-1" 
                  @click=${this._checkboxClick}
                  .checked=${this.selected}
                  ?disabled=${this.model.disabled} />
              </slot>`
            : nothing
          }
          <slot name="item"></slot>
        </div>
      </li>
    `;
    return result;
  }
}

window.customElements.define('kds-list-item', KdsListItem);
