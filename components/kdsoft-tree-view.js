import { html, nothing } from 'lit/html.js';
import { repeat } from 'lit/directives/repeat.js';
import { LitMvvmElement, BatchScheduler, css } from '@kdsoft/lit-mvvm';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import './kdsoft-expander.js';
import './kdsoft-drop-target.js';
import KdSoftDragDropProvider from './kdsoft-drag-drop-provider.js';

import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

class KdSoftTreeView extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
    this.getContentTemplate = nodeModel => html`${nodeModel}`;
  }

  get getContentTemplate() { return this._getContentTemplate; }
  set getContentTemplate(value) { this._getContentTemplate = value; }

  get allowDragDrop() { return this.hasAttribute('allow-drag-drop'); }
  set allowDragDrop(val) {
    if (val) this.setAttribute('allow-drag-drop', '');
    else this.removeAttribute('allow-drag-drop');
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'allow-drag-drop'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  _moveNode(e) {
    const eventNode = e.composedPath()[0];
    const dropMode = eventNode.dataset.dropMode;
    this.model.moveNode(e.detail.fromId, e.detail.toId, dropMode);
  }

  /* eslint-disable indent, no-else-return */

  connectedCallback() {
    this.addEventListener('kdsoft-node-move', this._moveNode);
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kdsoft-node-move', this._moveNode);
  }

  shouldRender() {
    return !!this.model;
  }

  /* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/ */
  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      checkboxStyles,
      css`
        .expander-icon {
          transition: transform var(--trans-time, 300ms) ease;
        }

        kdsoft-expander[aria-expanded].has-children>[slot="expander"]>.expander-icon {
          transform: rotate(90deg);
        }

        .expander-grip:hover {
          cursor: grab;
        }

        [data-drop-mode].droppable {
          outline: 2px solid lightblue;
          outline-offset: -2px;
        }

        div[data-drop-mode] {
          height: 1em;
          margin: -0.5em 0 -0.5em 0;
          padding: 0;
          position: relative;
          z-index: 10;
        }
      `,
    ];
  }

  // the kdsoft-drop-target components have the same id as the tree node!
  createTreeView(nodeModel, isLast, isRoot) {
    const draggable = this.allowDragDrop ? 'true' : 'false';
    return html`
      ${isRoot || !this.allowDragDrop
        ? nothing
        : html`<div is="kdsoft-drop-target" id=${nodeModel.id} data-drop-mode="before"></div>`
      }
      <kdsoft-expander
        id=${nodeModel.id}
        class="${nodeModel.children.length ? 'kdsoft-node has-children' : 'kdsoft-node'}"
        draggable=${draggable}
        data-drop-mode="inside"
      >
        <div slot="expander">
          ${this.allowDragDrop ? html`<i class="expander-grip fas fa-xs fa-ellipsis-v text-gray-400"></i>` : nothing}
          <i class="expander-icon fas fa-lg fa-caret-right ${nodeModel.children.length ? 'text-blue-600' : 'text-blue-200'}"></i>
        </div>
        <div slot="header">${this._getContentTemplate(nodeModel)}</div>
        <div slot="content">
          ${repeat(
            nodeModel.children,
            childModel => childModel.id,
            (childModel, index) => this.createTreeView(childModel, index === nodeModel.children.length - 1), false)
          }
        </div>
      </kdsoft-expander>
      ${isLast && !isRoot && this.allowDragDrop
        ? html`<div is="kdsoft-drop-target" id=${nodeModel.id} data-drop-mode="after"></div>`
        : nothing
      }
    `;
  }

  render() {
    return html`
      ${this.createTreeView(this.model, true, true)}
    `;
  }

  rendered() {
    // DOM nodes may have been added/replaced so we need to refresh drag-drop providers
    const draggables = this.renderRoot.querySelectorAll('kdsoft-expander');
    if (this.allowDragDrop) {
      for (const dr of draggables) {
        if (!dr._dragdrop) {
          dr._dragdrop = new KdSoftDragDropProvider(item => item.id).connect(dr);
        }
      }
    } else {
      for (const dr of draggables) {
        if (dr._dragdrop) {
          dr._dragdrop.disconnect();
          dr._dragdrop = null;
        }
      }
    }
  }
}

window.customElements.define('kdsoft-tree-view', KdSoftTreeView);
