import { LitMvvmElement, html, nothing, BatchScheduler, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import './kds-expander.js';
import './kds-drop-target.js';

const _dragDrop = new WeakMap();

export default class KdsTreeNode extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(0);
  }

  get dragDropProvider() { return _dragDrop.get(this); }
  set dragDropProvider(val) {
    const currentVal = _dragDrop.get(this);
    if (currentVal) {
      currentVal.disconnect(this);
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
    return [...super.observedAttributes, 'allow-drag-drop'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  /* eslint-disable indent, no-else-return */

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.host.dataset.dropMode = 'inside';
    const dragDrop = this.dragDropProvider;
    if (dragDrop) {
      dragDrop.connect(this);
    }
  }

  disconnectedCallback() {
    const dragDrop = this.dragDropProvider;
    if (dragDrop) {
      dragDrop.disconnect(this);
    }
    super.disconnectedCallback();
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

        [data-drop-mode].kds-droppable {
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
    const draggable = this.dragDropProvider ? 'true' : 'false';
    this.renderRoot.host.setAttribute('draggable', draggable);

    const isRoot = !(this.model.parent != null);
    const siblings = isRoot ? [] : this.model.parent.children; // should never be empty
    const isLast = this.model.id === siblings[siblings.length - 1]?.id;
    return html`
      ${isRoot || !this.dragDropProvider
        ? nothing
        : html`<div is="kds-drop-target" data-drop-id=${this.model.id} data-drop-mode="before"></div>`
      }
      <kds-expander
        id=${this.model.id}
        class="${this.model.children.length ? 'kds-node has-children' : 'kds-node'}"
      >
        <div slot="expander">
          ${this.dragDropProvider ? html`<slot name="expander-grip"></slot>` : nothing}
          <slot name="expander-icon"></slot>
        </div>
        <div slot="header">
          <slot name="content"></slot>
        </div>
        <div slot="content">
          <slot name="children"></slot>
        </div>
      </kds-expander>
      ${isLast && !isRoot && this.dragDropProvider
        ? html`<div is="kds-drop-target" data-drop-id=${this.model.id} data-drop-mode="after"></div>`
        : nothing
      }
    `;
  }
}

window.customElements.define('kds-tree-node', KdsTreeNode);
