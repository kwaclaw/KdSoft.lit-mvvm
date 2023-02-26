import { html, css } from '@kdsoft/lit-mvvm/lit-mvvm.js';
import { KdsContextMenu } from '@kdsoft/lit-mvvm-components';
import sharedStyles from './shared-styles.js';

export default class DemoTreeViewMenu extends KdsContextMenu {
  static get styles() {
    return [
      ...super.styles,
      ...sharedStyles,
      css`
        kds-menu-item::part(menu) {
          min-width: 10em;
          box-shadow: 0 0.4em 0.5em 0.3em rgba(0, 0, 0, 0.2);
          padding: 0.3em;
          margin: 0;
          background-color: white;
          color: rgb(51, 51, 51);
          border: 1px solid rgb(200, 200, 200);
        }
      
        kds-menu-item:hover::part(menu) {
          background: lightgrey; /*rgba(0, 0, 0, 0.3);*/
        }
      
        kds-menu-item:focus-within::part(menu) {
          outline: solid 2px rgb(50, 150, 255);
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
        kds-menu-item.submenu:hover::part(menu)::after,
        kds-menu-item.submenu:focus-within::part(menu)::after {
          content: none;
        }
      
        kds-menu-item::part(child-menu) {
          list-style: none;
          padding-inline-start: 0;
          left: calc(100% - 1.6em);
        }
      `,
    ];
  }

  renderMenuItem(nodeModel) {
    return html`<span>${nodeModel.text}</span>`;
  }
}

window.customElements.define('demo-tree-view-menu', DemoTreeViewMenu);
