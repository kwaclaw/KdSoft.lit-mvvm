import { repeat } from 'lit-html/directives/repeat.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { KdsDragDropProvider } from '@kdsoft/lit-mvvm-components';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
import tailwindStyles from './styles/tailwind-styles.js';

export default class StyledTreeView extends LitMvvmElement {
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
    const treeNode = e.path.find(el => el.nodeName === 'KDS-TREE-NODE');
    if (treeNode) {
      treeNode.model._expanded = e.detail.expanded;
    }
  }

  nodeEditLostFocus(e) {
    e.preventDefault();
    const seltext = e.currentTarget.nextElementSibling;
    seltext.removeAttribute('hidden');
    e.currentTarget.setAttribute('hidden', '');
  }

  nodeEditTextChanged(e, nodeModel) {
    nodeModel.text = e.currentTarget.value;
  }

  /* https://philipwalton.com/articles/what-no-one-told-you-about-z-index/ */
  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      css`
        :host {
          --trans-time: 300ms;
        }

        .node-edit:focus {
          border-color: lightgrey;
        }

        .expander-grip {
          vertical-align: middle;
        }

        .expander-grip:hover {
          cursor: grab;
        }

        .expander-icon {
          vertical-align: middle;
        }

        .expander-icon i {
          transition: transform var(--trans-time) ease;
        }

        .expander-icon.rotated i {
          transform: rotate(90deg);
        }

        kds-tree-node::part(expander-content) {
          transition: height var(--trans-time) ease;
        }

        kds-tree-node.kds-droppable::part(expander) {
          outline: 2px solid lightblue;
          outline-offset: -2px;
        }

        kds-tree-node.kds-droppable-before::part(drop-before-target),
        kds-tree-node.kds-droppable-after::part(drop-after-target) {
          outline: 2px solid lightblue;
          outline-offset: -2px;
        }

      `,
    ];
  }

  // We need to build the final tree structure here because we need to expose all slots,
  // including nested slots, at the same time so that we can style them together.
  createTreeView(nodeModel) {
    let cls = '';
    switch (nodeModel.type) {
      case 'gc':
        cls += 'text-red-600';
        break;
      case 'c':
        cls += 'text-blue-600';
        break;
      case 'r':
        cls += 'text-black-600';
        break;
      default:
        break;
    }

    return html`
      <kds-tree-node
        .model=${nodeModel}
        .dragDropProvider=${this._dragDrop}
        @kds-expand=${e => this.expand(e)}
      >
        <span slot="content" class="node-content">
          <input type="text" placeholder="node text"
            class="my-auto p-1 flex-grow node-edit"
            tabindex="1"
            @blur="${e => this.nodeEditLostFocus(e, nodeModel)}"
            @input="${e => this.nodeEditTextChanged(e, nodeModel)}"
            hidden />
          <span class=${cls}>${nodeModel.text}</span>
        </span>

        <div slot="children">
          ${repeat(
            nodeModel.children,
            childModel => childModel.id,
            (childModel, index) => this.createTreeView(childModel),
            false
          )}
        </div>

        <span slot="expander-grip" class="expander-grip">
          <i class="fas fa-xs fa-ellipsis-v text-gray-400"></i>
        </span>
        <span slot="expander-icon" class="expander-icon ${nodeModel._expanded ? 'rotated' : ''}">
          <i class="fa-solid fa-lg fa-caret-right ${nodeModel.children.length ? 'text-blue-600' : 'text-blue-200'}"></i>
        </span>
      </kds-tree-node>
    `;
  }

  render() {
    return this.createTreeView(this.model);
  }
}

window.customElements.define('styled-tree-view', StyledTreeView);
