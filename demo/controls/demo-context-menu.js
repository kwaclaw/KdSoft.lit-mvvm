﻿import { repeat } from 'lit-html/directives/repeat.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import './kds-menu-item.js';

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

function setup(menu) {
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

export default class DemoContextMenu extends LitMvvmElement {
  constructor() {
    super();
    this._touchTimer = null;
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
      if (tgt.tagName === 'KDS-MENU-ITEM') {
        return this.model.getNodeEntry(tgt.model.id);
      }
    }
    return undefined;
  }

  bind(element) {
    const options = { capture: false, passive: false };
    element.addEventListener('contextmenu', this._contextMenuListener.bind(this), options);
    element.addEventListener('touchstart', this._touchStartListener.bind(this), options);
    element.addEventListener('touchend', this._touchEndListener.bind(this), options);
    element.addEventListener('touchcancel', this._touchCancelListener.bind(this), options);
    element.addEventListener('touchmove', this._touchMoveListener.bind(this), options);
  }

  static get styles() {
    return [
      css`
        :host {
            z-index: 100;
            position: fixed;
            display: none;
            outline: none;
        }
        
        nav {
          transition: 0.2s display ease-in;
          list-style: none;
        }

        nav:focus {
          outline: none;
        }

        kds-menu-item::part(menu) {
          min-width: 10em;
          box-shadow: 0 0.4em 0.5em 0.3em rgba(0, 0, 0, 0.2);
          padding: 0.3em;
          margin: 0;
          background-color: white;
          color: rgb(51, 51, 51);
          border: 1px solid rgb(200, 200, 200);
        }

        kds-menu-item::part(menu):hover {
          background: lightgrey; /*rgba(0, 0, 0, 0.3);*/
        }

        kds-menu-item::part(menu):focus {
          outline: none;
          background: rgba(0, 100, 255, 0.2);
        }

        kds-menu-item.submenu:hover::part(menu)::after {
          border-left-color: #fff;
        }

        /* triangle */
        kds-menu-item.submenu::part(menu)::after {
          content: "";
          position: absolute;
          right: 0.3em;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          border: 0.5em solid transparent;
          border-left-color: #808080;
        }

        /* trianghle off */
        kds-menu-item.submenu:hover::part(menu)::after {
          content: none;
        }

        kds-menu-item::part(child-menu) {
          list-style: none;
          padding-inline-start: 0;
          left: calc(100% - 1.6em);
        }

        /*
        .menu-separator {
          display: block;
          margin: 0.5em 0.7em;
          height: 1px;
          border-bottom: 1px solid #aaa;
          background-color: #fff;
        }
        */
      `
    ];
  }

  // We need to build the final tree structure here because we need to expose all slots,
  // including nested slots, at the same time so that we can style them together.
  createMenuItem(nodeModel, slot) {
    const tabIndex = this._tabIndex + 1;
    this._tabIndex = tabIndex;
    return html`
      <kds-menu-item slot=${slot} .model=${nodeModel} tabindex=${tabIndex}>
        <span slot="menu-item">${nodeModel.text}</span>
        ${repeat(
          nodeModel.children,
          childModel => childModel.id,
          (childModel, index) => this.createMenuItem(childModel, 'child-menu')
        )}
      </kds-menu-item>
    `;
  }

  render() {
    this._tabIndex = 0;
    return html`
      <nav id=${this.model.id}>
        ${repeat(
          this.model.children,
          childModel => childModel.id,
          (childModel, index) => this.createMenuItem(childModel, '')
        )}
      </nav>
    `;
  }
}

window.customElements.define('demo-context-menu', DemoContextMenu);
