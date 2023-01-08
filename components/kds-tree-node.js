import { LitMvvmElement, html, nothing, BatchScheduler, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import './kds-expander.js';

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
    if (currentVal === val) {
      return;
    }

    if (currentVal) {
      currentVal.disconnect(this);
    }
    if (val) {
      _dragDrop.set(this, val);
      val.connect(this);
    } else {
      _dragDrop.delete(this);
    }

    // trigger re-render
    this.model.__changeCount += 1;
  }

  /* eslint-disable indent, no-else-return */

  connectedCallback() {
    super.connectedCallback();
    this.renderRoot.host.classList.add('kds-node');
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
        : html`<div part="drop-before-target" data-drop-mode="before"></div>`
      }
      <kds-expander part="expander" exportparts="content: expander-content, expander: expander-expander"
        class="${this.model.children.length ? 'has-children' : ''}"
        data-drop-mode="inside"
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
        ? html`<div part="drop-after-target" data-drop-mode="after"></div>`
        : nothing
      }
    `;
  }
}

window.customElements.define('kds-tree-node', KdsTreeNode);
