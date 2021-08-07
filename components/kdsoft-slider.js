import { html, nothing } from 'lit';
import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from './styles/tailwind-styles.js';
import checkboxStyles from './styles/kdsoft-checkbox-styles.js';
import fontAwesomeStyles from './styles/fontawesome/css/all-styles.js';

const orientationClasses = {
  horizontal: {
    items: 'items-horizontal',
    header: 'header',
    footer: 'footer',
    left: 'left',
    right: 'right',
    container: 'container-horizontal',
    carousel: 'carousel-horizontal',
    'carousel-item': 'carousel-item-horizontal'
  },
  vertical: {
    items: 'items-vertical',
    header: 'left-bar',
    footer: 'right-bar',
    left: 'top',
    right: 'bottom',
    container: 'container-vertical',
    carousel: 'carousel-vertical',
    'carousel-item': 'carousel-item-vertical'
  }
};

class KdSoftSlider extends LitMvvmElement {
  constructor() {
    super();
    // LOW priority means proper queueing for scroll actions
    this.scheduler = new Queue(priorities.LOW);
    //this.scheduler = new BatchScheduler(300);
    this.getItemTemplate = (item, index) => html`${item}`;
  }

  get orientation() { return this.getAttribute('orientation') || 'horizontal'; }
  set orientation(val) {
    if (val === 'horizontal' || val === 'vertical') this.setAttribute('orientation', val);
    else this.removeAttribute('orientation');
  }

  static get observedAttributes() {
    return [...super.observedAttributes, 'orientation'];
  }

  _scrollToActiveItem(itemsControl, activeIndex) {
    if (this.orientation === 'vertical') {
      const scrollPoint = (itemsControl.clientHeight * activeIndex);
      itemsControl.scroll({ top: scrollPoint, behavior: 'smooth' });
    } else {
      const scrollPoint = (itemsControl.clientWidth * activeIndex);
      itemsControl.scroll({ left: scrollPoint, behavior: 'smooth' });
    }
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
            "topleft    top   topright"
            "left       main   right"
            "bottomleft bottom bottomright";
        }

        .container-horizontal {
          height: 100%;
        }

        .container-vertical {
          width: 100%;
        }

        .carousel-horizontal {
          flex-direction: row;
          flex: 1 1 auto;
          display: flex;
          flex-wrap: nowrap;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: inline mandatory;
        }

        .carousel-vertical {
          flex-direction: column;
          flex: 1 1 auto;
          display: flex;
          flex-wrap: nowrap;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: inline mandatory;
        }

        .carousel-item-horizontal {
          flex-direction: row;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 100%;
          scroll-snap-align: center center;
        }

        .carousel-item-vertical {
          flex-direction: column;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          scroll-snap-align: center center;
        }

        .items-horizontal {
          grid-area: main-start / left-start / main-end / right-end;
          background-color: lightgray;
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
          background-color: lightgray;
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

  render() {
    const classes = this.orientation === 'vertical' ? orientationClasses.vertical : orientationClasses.horizontal;
    return html`
      <div id="container" class="${classes.container}" @keydown=${this._itemsKeyDown}>
        <div class="${classes.header}">
          <slot name="${classes.header}"></slot>
        </div>
        <div class="${classes.left}">
          <slot name="${classes.left}"></slot>
        </div>
        <ul id="items" class="${classes.items} ${classes.carousel}" tabindex="0">
          ${this.model.items.map((item, itemIndex) => html`
              <li class="${classes['carousel-item']}" tabindex="0" data-index="${itemIndex}">
                ${this.getItemTemplate(item, itemIndex)}
              </li>
            `
          )}
        </ul>
        <div class="${classes.right}">
          <slot name="${classes.right}"></slot>
        </div>
        <div class="${classes.footer}">
          <slot name="${classes.footer}"></slot>
        </div>
      </div>
    `;
  }

  rendered() {
    // reading observable properties here will still register them for the next render()
    const activeIndex = this.model.activeIndex;
    this.schedule(() => {
      const itemsControl = this.renderRoot.getElementById('items');
      if (itemsControl) {
        this._scrollToActiveItem(itemsControl, activeIndex);
      }
    });
  }
}

window.customElements.define('kdsoft-slider', KdSoftSlider);
