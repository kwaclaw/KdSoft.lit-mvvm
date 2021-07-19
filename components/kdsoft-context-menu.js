import { html, nothing } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';

import tailwindStyles from './styles/tailwind-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

function showContextMenu(menu, target, path, pageX, pageY) {
  menu.actionTarget = target;
  menu.actionPath = path;

  // need to render it before using menu.clientWidth/Height
  menu.style.display = 'block';

  // need to correct mouse coordinates when inside of bootstrap modal dialog
  const modal = menu.closest('.modal-dialog');
  if (modal) {
    pageX -= modal.offsetLeft;
    pageY -= modal.offsetTop;
  }

  const right = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const menuWidth = menu.clientWidth || 130; // clientWidth does not always work, so we also use width set in CSS
  const deltaRight = pageX + menuWidth - right + 5;

  const bottom = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const menuHeight = menu.clientHeight || 200; // clientHeight does not always work, so we also use height set in CSS
  const deltaBottom = pageY + menuHeight - bottom + 5;

  const left = deltaRight > 0 ? pageX - deltaRight : pageX;
  const top = deltaBottom > 0 ? pageY - deltaBottom : pageY;

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;

  menu.dispatchEvent(new CustomEvent('before-context-menu-show',
    { bubbles: true, composed: true, detail: { pageX, pageY } }));

  menu.focus();
}

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

function setup(menu) {
  menu.tabIndex = 0;

  menu.addEventListener('keyup', (e) => {
    const options = menu.renderRoot.querySelectorAll('.menu-option');
    switch (e.code) {
      case 'Enter':
        executeActive(menu.renderRoot, options);
        break;
      case 'ArrowLeft':
        moveLeft(menu, options);
        break;
      case 'ArrowUp':
        movePrevious(menu, options);
        break;
      case 'ArrowRight':
        moveRight(menu, options);
        break;
      case 'ArrowDown':
        moveNext(menu, options);
        break;
      default:
        break;
    }
  });

  window.addEventListener('mouseup', () => {
    menu.style.display = 'none';
  }, true);

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      menu.style.display = 'none';
    }
  }, true);

  window.addEventListener('contextmenu', (e) => {
    menu.style.display = 'none';
  }, true);
}

export default class KdSoftContextMenu extends LitMvvmElement {
  constructor() {
    super();
    this._touchTimer = null;
    this.getItemTemplate = item => html`${item}`;
    setup(this);
  }

  _contextMenuListener(e) {
    // default menu when Ctrl key pressed
    if (e.ctrlKey) {
      return true;
    }

    e.preventDefault();
    e.stopPropagation();
    showContextMenu(this, e.currentTarget, e.composedPath(), e.pageX, e.pageY);
    return false;
  }

  _resetTouch() {
    window.clearTimeout(this._touchTimer);
    this._touchTimer = null;
  }

  _touchStartListener(e) {
    //e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const path = e.composedPath();

    const targetTouch = e.targetTouches[0];
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;

    if (this._touchTimer) {
      window.clearTimeout(this._touchTimer);
    }
    this._touchTimer = window.setTimeout(() => {
      this._touchTimer = null;
      showContextMenu(this, target, path, pageX, pageY);
    }, 700);
  }

  // turn short touch into mouse click
  _touchEndListener(e) {
    if (this._touchTimer) {
      //e.preventDefault();

      this._resetTouch();
      const endTouch = e.changedTouches[0];
      const mevt = new MouseEvent('click', {
        screenX: endTouch.screenX,
        screenY: endTouch.screenY,
        clientX: endTouch.clientX,
        clientY: endTouch.clientY
      });

      endTouch.target.dispatchEvent(mevt);
    }
  }

  _touchCancelListener(e) {
    if (this._touchTimer) {
      //e.preventDefault();
      this._resetTouch();
    }
  }

  _touchMoveListener(e) {
    // check if we moved outside of the starting target element
    if (this._touchTimer) {
      const movedTouch = e.changedTouches[0];
      const movedTarget = document.elementFromPoint(movedTouch.pageX, movedTouch.pageY);
      const originalTarget = e.currentTarget;
      if (movedTarget === originalTarget || originalTarget.contains(movedTarget)) {
        return;
      }
      this._resetTouch();
    }
  }

  // returns node entry = { node, parent, nodeIndex }
  getNodeEntry(mouseEvent) {
    for (const tgt of mouseEvent.composedPath()) {
      if (tgt.tagName === 'LI' && tgt.classList.contains('menu-option')) {
        return this.model.getNodeEntry(tgt.id);
      }
    }
    return undefined;
  }

  bind(element) {
    element.addEventListener('contextmenu', this._contextMenuListener.bind(this), false);
    element.addEventListener('touchstart', this._touchStartListener.bind(this), false);
    element.addEventListener('touchend', this._touchEndListener.bind(this), false);
    element.addEventListener('touchcancel', this._touchCancelListener.bind(this), false);
    element.addEventListener('touchmove', this._touchMoveListener.bind(this), false);
  }

  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      css`
        :host {
            z-index: 100;
            position: fixed;
            display: none;
            outline: none;
        }
        
        .simple-context-menu {
            transition: 0.2s display ease-in;
        }

        .simple-context-menu:focus {
            outline: none;
        }

        .simple-context-menu .menu-options {
            width: auto;
            min-width: 10em;
            height: auto;
            box-shadow: 0 0.4em 0.5em 0.3em rgba(0, 0, 0, 0.2);
            list-style: none;
            padding: 0.3em;
            margin: 0;
            background-color: white;
            color: rgb(51, 51, 51);
            margin-bottom: 0;
            border: 1px solid rgb(200, 200, 200);
        }

        .simple-context-menu .menu-option {
            padding: 0;
            cursor: pointer;
        }

        .simple-context-menu .menu-option:hover {
            background: rgba(0, 0, 0, 0.2);
        }

        .simple-context-menu .menu-option:focus {
            outline: none;
            background: rgba(0, 100, 255, 0.2);
        }

        .simple-context-menu .menu-separator {
            display: block;
            margin: 0.5em 0.7em;
            height: 1px;
            border-bottom: 1px solid #aaa;
            background-color: #fff;
        }

        .simple-context-menu .menu-option.submenu {
            position: relative;
        }

        .simple-context-menu .menu-option.submenu .menu-options {
            display: none;
            position: absolute;
            top: 0;
            left: calc(100% - 0.6em);
        }

        .simple-context-menu .menu-option.submenu:hover > .menu-options {
            display: block;
        }

        .simple-context-menu .menu-option.submenu:focus-within > .menu-options {
            display: block;
        }

        .simple-context-menu .menu-option.submenu:focus > .menu-options {
            display: block;
        }

        /* triangle */
        .simple-context-menu .menu-option.submenu::after {
            content: "";
            position: absolute;
            right: 0.3em;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            border: 0.5em solid transparent;
            border-left-color: #808080;
        }

        .simple-context-menu .menu-option.submenu:hover::after {
            border-left-color: #fff;
        }
      `
    ];
  }

  createMenu(nodeModel, isRoot, tabIndex) {
    if (isRoot && nodeModel.children && nodeModel.children.length) {
      return html`
        <ul class="menu-options">
          ${repeat(
              nodeModel.children,
              childModel => childModel.id,
              (childModel, index) => this.createMenu(childModel, false, tabIndex)
          )}
        </ul>
      `;
    }
    if (isRoot) {
      return nothing;
    }
    const hasChildren = nodeModel.children && nodeModel.children.length;
    tabIndex += 1;
    return html`
      <li id=${nodeModel.id} class="menu-option ${hasChildren ? 'submenu' : ''}" tabindex=${tabIndex}>
        ${this.getItemTemplate(nodeModel)}
        ${!hasChildren
          ? nothing
          : html`
            <ul class="menu-options">
              ${repeat(
                nodeModel.children,
                childModel => childModel.id,
                (childModel, index) => this.createMenu(childModel, false, tabIndex)
              )}
            </ul>
            `
        }
      </li>
    `;
  }

  render() {
    return html`
      <nav id=${this.model.id} class="simple-context-menu ${this.model.children.length ? 'has-children' : ''}">
        ${this.createMenu(this.model, true, 0)}
      </nav>
    `;
  }
}

window.customElements.define('kdsoft-context-menu', KdSoftContextMenu);

