import { html, nothing } from 'lit';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { observe } from '@nx-js/observer-util/dist/es.es6.js';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

class KdSoftSlider extends LitMvvmElement {
  constructor() {
    super();
    this.scheduler = new Queue(priorities.HIGH);
    //this.scheduler = new BatchScheduler(300);
    this.getItemTemplate = (item, index) => html`${item}`;
  }

  _scrollToActiveItem(itemsControl, activeIndex) {
    const scrollPoint = (itemsControl.clientWidth * activeIndex);
    itemsControl.scroll({ left: scrollPoint, behavior: 'smooth' });
  }

  _itemsKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        this.model.incrementActiveIndex();
        break;
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        this.model.decrementActiveIndex();
        break;
      }
      default:
        // ignore, let bubble up
        return;
    }
    e.preventDefault();
  }

  _indicatorClick(e) {
    const itemIndex = e.target.closest('li').dataset.index;
    this.model.activeIndex = Number(itemIndex);
  }

  /* eslint-disable indent, no-else-return */

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      tailwindStyles,
      checkboxStyles,
      fontAwesomeStyles,
      css`
        :host {
          display: block;
        }

        #container {
          position: relative;
          height: 100%;
          display: grid;
          grid-template-columns: auto auto auto;
          grid-template-rows: auto;
          grid-template-areas:
            "header header header"
            "left main right"
            "footer footer footer";
        }

        .carousel {
          flex: 1 1 auto;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: inline mandatory;
        }

        .carousel-item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 100%;
          scroll-snap-align: center center;
        }

        #items {
          grid-area: main-start / left-start / main-end / right-end;
          background-color: lightgray;
        }

        #header {
          grid-area: header;
        }

        #footer {
          grid-area: footer;
        }

        #left {
          grid-area: left;
          z-index: 2;
        }
        
        #right {
          grid-area: right;
          z-index: 2;
        }
      `,
    ];
  }

  beforeFirstRender() {
    // we need to observe this.model.activeIndex separately because it is not used in rendering
    this._activeObserver = observe(() => {
      const activeIndex = this.model.activeIndex;
      const itemsControl = this.renderRoot.getElementById('items');
      if (itemsControl) {
        this._scrollToActiveItem(itemsControl, activeIndex);
      }
    });
  }

  render() {
    const result = html`
      <div id="container" @keydown=${this._itemsKeyDown}>
        <div id="header">
          <slot name="header"></slot>
        </div>
        <div id="left">
          <slot name="left"><span>&lt;</span></slot>
        </div>
        <ul id="items" class="carousel" tabindex="0">
          ${this.model.items.map((item, itemIndex) => html`
              <li class="carousel-item" tabindex="0" data-index="${itemIndex}">
                ${this.getItemTemplate(item, itemIndex)}
              </li>
            `
          )}
        </ul>
        <div id="right">
          <slot name="right"><span>&gt;</span></slot>
        </div>
        <div id="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
    return result;
  }
}

window.customElements.define('kdsoft-slider', KdSoftSlider);
