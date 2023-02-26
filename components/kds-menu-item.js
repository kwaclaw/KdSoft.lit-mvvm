/* eslint-disable indent */
import { LitMvvmElement, html, css, nothing } from '@kdsoft/lit-mvvm';

export default class KdsMenuItem extends LitMvvmElement {
  static get styles() {
    return [
      css`
        :host {
          /* do not set a position value, it will create issues with the z-order */
          outline: none;
          display: list-item;
        }

        .menu-option {
          /* do not set a position value, it will create issues with the z-order */
          cursor: pointer;
        }

        .menu-options {
          display: none;
          position: absolute;
          top: 0;
        }

        :host(.submenu:hover) .menu-options {
          display: unset;
        }

        :host(.submenu:focus-within) .menu-options {
          display: unset;
        }

        :host(.submenu:focus) .menu-options {
          display: unset;
        }
      `
    ];
  }

  render() {
    const hasChildren = this.model.children && this.model.children.length;
    const host = this.renderRoot.host;
    if (hasChildren) host.classList.add('submenu'); else host.classList.remove('submenu');
    return html`
      <div part="menu" class="menu-option">
        <div part="menu-item">
          <slot name="menu-item"><span>${this.model.text}</span></slot>
        </div>
        ${hasChildren
          ? html`
            <ul part="child-menu" class="menu-options">
              <slot name="child-menu"></slot>
            </ul>`
          : nothing
        }
      </div>
    `;
  }
}

window.customElements.define('kds-menu-item', KdsMenuItem);
