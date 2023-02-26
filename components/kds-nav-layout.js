import { LitMvvmElement, html, css, nothing, BatchScheduler } from '@kdsoft/lit-mvvm';

export default class KdsNavLayout extends LitMvvmElement {
  get vertical() { return this.hasAttribute('vertical'); }
  set vertical(val) {
    if (val) this.setAttribute('vertical', '');
    else this.removeAttribute('vertical');
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'vertical'];
  }

  slotChange(e) {
    //
  }

  /* eslint-disable indent, no-else-return */

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }   
             
        #container {
          position: relative;
          height: 100%;
          display: grid;
          grid-template-columns: auto auto auto;
          grid-template-rows: auto;
          grid-template-areas:
            "topleft    top    topright"
            "left       main   right"
            "bottomleft bottom bottomright";
        }

        .items-horizontal {
          grid-area: main-start / left-start / main-end / right-end;

          flex-direction: row;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: inline mandatory;
          height: 100%;
        }

        .item-horizontal {
          flex-direction: row;
          display: flex;
          align-items: center;
          justify-content: center;
          /* min-width: 100%; */
          scroll-snap-align: center center;
        }

        .header {
          grid-area: top-start / topleft-start / top-end / topright-end;
        }

        .footer {
          grid-area: bottom-start / bottomleft-start / bottom-end / bottomright-end;
        }

        .left {
          grid-area: left;
          z-index: 2;
        }
        
        .right {
          grid-area: right;
          z-index: 2;
        }

        .items-vertical {
          grid-area: top-start / main-start / bottom-end / main-end;

          flex-direction: column;
          display: flex;
          flex-wrap: nowrap;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: inline mandatory;
          width: 100%;
        }

        .item-vertical {
          flex-direction: column;
          display: flex;
          align-items: center;
          justify-content: center;
          /* min-height: 100%; */
          scroll-snap-align: center center;
        }

        .left-bar {
          grid-area: topleft-start / left-start / bottomleft-end / left-end;
        }

        .right-bar {
          grid-area: topright-start / right-start / bottomright-end / right-end;
        }

        .top {
          grid-area: top;
          z-index: 2;
        }
        
        .bottom {
          grid-area: bottom;
          z-index: 2;
        }
      `,
    ];
  }

  beforeFirstRender() {
    //
  }

  get header() { return nothing; }
  get left() { return nothing; }
  get main() { return nothing; }
  get right() { return nothing; }
  get footer() { return nothing; }

  render() {
    if (this.vertical) {
      return html`
        <div id="container" class="vertical" @keydown=${this._itemsKeyDown}>
          <div class="left-bar">
            <slot name="left-bar">${this.left}</slot>
          </div>
          <div class="top">
            <slot name="top">${this.header}</slot>
          </div>
          <ul id="items" class="items-vertical">
            <slot @slotchange=${e => this.slotChange(e)}>${this.main}</slot>
          </ul>
          <div class="bottom">
            <slot name="bottom">${this.footer}</slot>
          </div>
          <div class="right-bar">
            <slot name="right-bar">${this.right}</slot>
          </div>
        </div>
      `;
    } else {
      return html`
        <div id="container" @keydown=${this._itemsKeyDown}>
          <div class="header">
            <slot name="header">${this.header}</slot>
          </div>
          <div class="left">
            <slot name="left">${this.left}</slot>
          </div>
          <ul id="items" class="items-horizontal">
            <slot @slotchange=${e => this.slotChange(e)}>${this.main}</slot>
          </ul>
          <div class="right">
            <slot name="right">${this.right}</slot>
          </div>
          <div class="footer">
            <slot name="footer">${this.footer}</slot>
          </div>
        </div>
      `;
    }
  }
}

window.customElements.define('kds-nav-layout', KdsNavLayout);
