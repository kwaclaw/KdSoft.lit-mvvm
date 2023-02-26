import { repeat } from 'lit-html/directives/repeat.js';
import { LitMvvmElement, html, css, nothing } from '@kdsoft/lit-mvvm';
import KdsDragDropProvider from './kds-drag-drop-provider.js';

export default class KdsTreeView extends LitMvvmElement {
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
    if (name === 'allow-drag-drop') {
      if (newValue === '' && !this._dragDrop) this._dragDrop = new KdsDragDropProvider(item => item.model.id);
      else this._dragDrop = null;
    }
    // trigger re-render
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  connectedCallback() {
    this.addEventListener('kds-drop', this.moveNode);
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('kds-drop', this.moveNode);
  }

  shouldRender() {
    return !!this.model;
  }

  moveNode(e) {
    this.model.moveNode(e.detail.fromId, e.detail.toId, e.detail.dropMode);
  }

  expand(e) {
    if (e.target.tagName === 'KDS-TREE-NODE') {
      e.target.model._expanded = e.detail.expanded;
    }
  }

  /* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/ */
  static get styles() {
    return [
      css`
        :host {
          --trans-time: 300ms;
        }

        .expander-grip:hover {
          cursor: grab;
        }

        .expander-icon i {
          transition: transform var(--trans-time) ease;
        }

        .expander-icon.rotated i {
          transform: rotate(90deg);
        }
      `,
    ];
  }

  renderNode(nodeModel) {
    return nothing;
  }

  // We need to build the final tree structure here because we need to expose all slots,
  // including nested slots, at the same time so that we can style them together.
  createTreeView(nodeModel) {
    return html`
      <kds-tree-node
        .model=${nodeModel}
        .dragDropProvider=${this._dragDrop}
        @kds-expand=${e => this.expand(e)}
      >
        ${this.renderNode(nodeModel)}
        <div slot="children">
          ${repeat(
            nodeModel.children,
            childModel => childModel.id,
            (childModel, index) => this.createTreeView(childModel),
            false
          )}
        </div>
      </kds-tree-node>
    `;
  }

  render() {
    return this.createTreeView(this.model);
  }
}

window.customElements.define('kds-tree-view', KdsTreeView);
