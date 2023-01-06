/* eslint-disable indent */
import { LitMvvmElement, html, css, nothing } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { textChangeRangeIsUnchanged } from 'typescript';

function executeActive(renderRoot, options) {
  let activeOption = null;
  for (let i = 0; i < options.length; i += 1) {
    if (options[i] === renderRoot.activeElement) {
      activeOption = options[i];
    }
  }

  if (activeOption) {
    activeOption.click();
  }
}

function getActiveIndex(renderRoot, options) {
  let result = null;
  for (let i = 0; i < options.length; i += 1) {
    if (options[i] === renderRoot.activeElement) {
      result = i;
      break;
    }
  }

  return result;
}

function moveNext(menu, options) {
  let fi = getActiveIndex(menu.renderRoot, options);
  fi = fi || 0;

  const parent = options[fi].parentNode;
  let next = null;
  for (let i = fi + 1; i < options.length; i += 1) {
    const node = options[i];
    if (node.parentNode === parent) {
      next = node;
      break;
    }
  }
  if (next == null) {
    for (let i = 0; i < fi; i += 1) {
      const node = options[i];
      if (node.parentNode === parent) {
        next = node;
        break;
      }
    }
  }

  next.focus();
}

function movePrevious(menu, options) {
  let fi = getActiveIndex(menu.renderRoot, options);
  fi = fi || options.length - 1;

  const parent = options[fi].parentNode;
  let previous = null;
  for (let i = fi - 1; i >= 0; i -= 1) {
    const node = options[i];
    if (node.parentNode === parent) {
      previous = node;
      break;
    }
  }
  if (previous == null) {
    for (let i = options.length - 1; i > fi; i -= 1) {
      const node = options[i];
      if (node.parentNode === parent) {
        previous = node;
        break;
      }
    }
  }

  previous.focus();
}

function moveRight(menu, options) {
  const fi = getActiveIndex(menu.renderRoot, options);
  if (fi == null) return;

  const subitem = options[fi].querySelector('.menu-option');
  if (subitem) subitem.focus();
}

function moveLeft(menu, options) {
  const fi = getActiveIndex(menu.renderRoot, options);
  if (fi == null) return;

  const parentOption = options[fi].parentElement.closest('.submenu');
  if (parentOption) parentOption.focus();
}

function keyUp(e) {
    const options = this.renderRoot.querySelectorAll('.menu-option');
    switch (e.code) {
      case 'Enter':
        executeActive(this.renderRoot, options);
        break;
      case 'ArrowLeft':
        moveLeft(this, options);
        break;
      case 'ArrowUp':
        movePrevious(this, options);
        break;
      case 'ArrowRight':
        moveRight(this, options);
        break;
      case 'ArrowDown':
        moveNext(this, options);
        break;
      default:
        break;
    }
}

export default class KdsMenuItem extends LitMvvmElement {
  constructor() {
    super();
    this._keyUp = keyUp.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.querySelector('span').addEventListener('keyup', this._keyUp);
  }

  disconnectedCallback() {
    this.renderRoot.querySelector('span').removeEventListener('keyup');
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      css`
        :host {
          /* do not set a position value, it will create issues with the z-order */
          outline: none;
          display: list-item;
        }

        .menu-option {
          /* do not set a position value, it will create issues with the z-order */
          cursor: pointer;
        }

        .menu-options {
          display: none;
          position: absolute;
          top: 0;
        }

        :host(.submenu:hover) .menu-options {
          display: unset;
        }

        :host(.submenu:focus-within) .menu-options {
          display: unset;
        }

        :host(.submenu:focus) .menu-options {
          display: unset;
        }
      `
    ];
  }

  render() {
    const hasChildren = this.model.children && this.model.children.length;
    const host = this.renderRoot.host;
    if (hasChildren) host.classList.add('submenu'); else host.classList.remove('submenu');
    return html`
      <div part="menu" class="menu-option">
        <div part="menu-item">
          <slot name="menu-item"><span>${this.model.text}</span></slot>
        </div>
        ${hasChildren
          ? html`
            <ul part="child-menu" class="menu-options">
              <slot name="child-menu"></slot>
            </ul>`
          : nothing
        }
      </div>
    `;
  }
}

window.customElements.define('kds-menu-item', KdsMenuItem);
