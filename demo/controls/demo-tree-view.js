import { repeat } from 'lit-html/directives/repeat.js';
import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import './kds-tree-node.js';
// since tailwind classes are generated only as used, we cannot import them
// from a prebuilt library, but need to generate the ones we use locally
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';
import tailwindStyles from './styles/tailwind-styles.js';

export default class DemoTreeView extends LitMvvmElement {
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

  shouldRender() {
    return !!this.model;
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
        .node-edit:focus {
          border-color: lightgrey;
        }

        .expander-grip:hover {
          cursor: grab;
        }
      `,
    ];
  }

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
        ?allow-drag-drop=${this.allowDragDrop}
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

        <span slot="expander-grip" class="expander-grip fas fa-xs fa-ellipsis-v text-gray-400"></span>
        <span slot="expander-icon" class="expander-icon fa-solid fa-lg fa-caret-right
          ${nodeModel.children.length ? 'text-blue-600' : 'text-blue-200'}"></span>
      </kds-tree-node>
    `;
  }

  render() {
    return this.createTreeView(this.model);
  }
}

window.customElements.define('demo-tree-view', DemoTreeView);
