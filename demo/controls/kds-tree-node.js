import { LitMvvmElement, html, nothing, BatchScheduler, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import './kds-expander.js';
import './kds-drop-target.js';
import KdsDragDropProvider from './kds-drag-drop-provider.js';

export default class KdsTreeNode extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
  }

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
    this.addEventListener('kds-node-move', this._moveNode);
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kds-node-move', this._moveNode);
  }

  shouldRender() {
    return !!this.model;
  }

  /* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/ */
  static get styles() {
    return [
      css`
        .expander-icon {
          transition: transform var(--trans-time, 300ms) ease;
        }

        kds-expander[aria-expanded].has-children>[slot="expander"]>.expander-icon {
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
  render() {
    const draggable = this.allowDragDrop ? 'true' : 'false';
    const isRoot = !(this.model.parent != null);
    const siblings = isRoot ? [] : this.model.parent.children; // should never be empty
    const isLast = this.model.id === siblings[siblings.length - 1]?.id;
    return html`
      ${isRoot || !this.allowDragDrop
        ? nothing
        : html`<div is="kds-drop-target" id=${this.model.id} data-drop-mode="before"></div>`
      }
      <kds-expander
        id=${this.model.id}
        class="${this.model.children.length ? 'kds-node has-children' : 'kds-node'}"
        draggable=${draggable}
        data-drop-mode="inside"
      >
        <div slot="expander">
          ${this.allowDragDrop ? html`<slot name="expander-grip"></slot>` : nothing}
          <slot name="expander-icon"></slot>
        </div>
        <div slot="header">
          <slot name="content"></slot>
        </div>
        <div slot="content">
          <slot name="children"></slot>
        </div>
      </kds-expander>
      ${isLast && !isRoot && this.allowDragDrop
        ? html`<div is="kds-drop-target" id=${this.model.id} data-drop-mode="after"></div>`
        : nothing
      }
    `;
  }

  rendered() {
    // DOM nodes may have been added/replaced so we need to refresh drag-drop providers
    const draggables = this.renderRoot.querySelectorAll('kds-expander');
    if (this.allowDragDrop) {
      for (const dr of draggables) {
        if (!dr._dragdrop) {
          dr._dragdrop = new KdsDragDropProvider(item => item.id).connect(dr);
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

window.customElements.define('kds-tree-node', KdsTreeNode);
