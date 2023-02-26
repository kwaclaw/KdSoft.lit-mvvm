import { LitMvvmElement, html, css } from '@kdsoft/lit-mvvm';

function updateExpansion(element, doExpand) {
  // get the height of the element's inner content, regardless of its actual size
  const height = element.scrollHeight;
  const style = element.style;

  const oldHeight = style.height;
  style.height = doExpand ? '0px' : `${height}px`;

  // when expanding to the new height of '0px', then the 'transitionend' event would not be
  // triggered as there would not a change in height, so we run the code directly, no transiton needed
  if (doExpand && oldHeight === style.height) {
    style.height = null;
    style.transition = null;
    return;
  }

  // on the next frame (as soon as the previous style change has taken effect), explicitly set
  // the element's height to its current pixel height, so we aren't transitioning out of 'auto'
  requestAnimationFrame(() => {
    style.transition = 'var(--content-height-transition)';

    element.addEventListener('transitionend', function resetHeight() {
      element.removeEventListener('transitionend', resetHeight);
      style.height = null;
      style.transition = null;
    });

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to its content height
    requestAnimationFrame(() => {
      style.height = doExpand ? `${height}px` : '0px';
    });
  });
}

export default class KdsExpander extends LitMvvmElement {
  get ariaExpanded() { return this.hasAttribute('aria-expanded'); }
  set ariaExpanded(val) {
    if (val) this.setAttribute('aria-expanded', ''); else this.removeAttribute('aria-expanded');
  }

  // Observed attributes will trigger an attributeChangedCallback, which in turn will cause a re-render to be scheduled!
  static get observedAttributes() {
    return [...super.observedAttributes, 'aria-expanded'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'aria-expanded') {
      const expanded = newValue !== null;

      const children = this.renderRoot.getElementById('content-slot');
      if (children) {
        updateExpansion(children, expanded);
      }

      const evt = new CustomEvent('kds-expand', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { expanded }
      });
      this.dispatchEvent(evt);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  _expanderClicked() {
    this.ariaExpanded = !this.ariaExpanded;
  }

  /* eslint-disable indent, no-else-return */

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        #container {
          display: grid;
          grid-template-columns: max-content minmax(0, 1fr);
          padding: var(--content-padding, 5px);
        }

        #expander {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          cursor: pointer;
          width: var(--left-padding, 2rem);
        }

        #expander:focus {
          outline: none;
        }

        #content {
          overflow: hidden;
          height: 0;
          /* transition: var(--content-height-transition); */
        }

        :host([aria-expanded]) #content {
          height: 100%;
        }
      `,
    ];
  }

  render() {
    const result = html`
      <div id="container">
        <div id="expander" part="expander" tabindex="1" @click=${this._expanderClicked}>
          <slot name="expander">No expander content provided.</slot>
        </div>
        <div id="header" part="header" tabindex="2">
          <slot name="header">No header provided.</slot>
        </div>
        <div id="leftbar"></div>
        <div id="content" part="content" tabindex="3">
          <slot name="content">No content provided.</slot>
        </div>
      </div>
    `;
    return result;
  }
}

window.customElements.define('kds-expander', KdsExpander);
