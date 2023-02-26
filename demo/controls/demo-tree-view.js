import { html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { KdsTreeView } from '@kdsoft/lit-mvvm-components';
import sharedStyles from './shared-styles.js';

export default class DemoTreeView extends KdsTreeView {
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
      ...super.styles,
      ...sharedStyles,
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

  renderNode(nodeModel) {
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
      <span slot="content" class="node-content">
        <input type="text" placeholder="node text"
          class="my-auto p-1 flex-grow node-edit"
          tabindex="1"
          @blur="${e => this.nodeEditLostFocus(e, nodeModel)}"
          @input="${e => this.nodeEditTextChanged(e, nodeModel)}"
          hidden />
        <span class=${cls}>${nodeModel.text}</span>
      </span>
      <span slot="expander-grip" class="expander-grip">
        <i class="fas fa-xs fa-ellipsis-v text-gray-400"></i>
      </span>
      <span slot="expander-icon" class="expander-icon ${nodeModel._expanded ? 'rotated' : ''}">
        <i class="fa-solid fa-lg fa-caret-right ${nodeModel.children.length ? 'text-blue-600' : 'text-blue-200'}"></i>
      </span>
    `;
  }
}

window.customElements.define('demo-tree-view', DemoTreeView);
