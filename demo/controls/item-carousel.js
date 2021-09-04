import { Queue, priorities } from '@nx-js/queue-util/dist/es.es6.js';
import { html } from 'lit';
import { LitMvvmElement, css } from '@kdsoft/lit-mvvm';
import tailwindStyles from '@kdsoft/lit-mvvm-components/styles/tailwind-styles.js';
import fontAwesomeStyles from '@kdsoft/lit-mvvm-components/styles/fontawesome/css/all-styles.js';
import '@kdsoft/lit-mvvm-components';

class ItemCarousel extends LitMvvmElement {
  constructor() {
    super();
    // LOW priority means proper queueing for scroll actions
    this.scheduler = new Queue(priorities.LOW);
    //this.scheduler = new BatchScheduler(300);
  }

  carouselClickDown(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.decrementActiveIndex();
  }

  carouselClickUp(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.incrementActiveIndex();
  }

  shouldRender() {
    return !!this.model;
  }

  static get styles() {
    return [
      tailwindStyles,
      fontAwesomeStyles,
      css`
        :host {
          display: block;
        }

        .carousel {
          height: var(--height);
          width: var(--width);
        }

        .carousel > div[slot] {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 3rem;
          padding: 0.3rem;
          /* opacity:0.3; */
        } 

        .carousel > div[slot] > svg {
          display: none;
          fill: gray;
          fill-opacity: 0.3;
          stroke-width: 2;
          stroke: white;
          width: 100%;
          height: 50%;
        } 

        .carousel > div[slot].vertical {
          flex-direction: column;
          width: 100%;
          height: 3rem;
        } 

        .carousel > div[slot].vertical > svg {
          width: 50%;
          height: 100%;
        } 

        .carousel > div[slot]:hover > svg {
          display: unset;
        }
        
        .carousel > div[slot].end-item {
          display:none;
        }
      `,
    ];
  }

  _getHorizontalAngles(firstAngleClass, lastAngleClass) {
    return html`
      <div slot="left" class="${firstAngleClass}">
        <svg @click=${this.carouselClickDown}>
          <use href="#angle-left"></use>
        </svg>
      </div>
      <div slot="right" class="${lastAngleClass}">
        <svg @click=${this.carouselClickUp}>
          <use href="#angle-right"></use>
        </svg>
      </div>`;
  }

  _getVerticalAngles(firstAngleClass, lastAngleClass) {
    return html`
      <div slot="top" class="vertical ${firstAngleClass}">
        <svg @click=${this.carouselClickDown}>
          <use href="#angle-top"></use>
        </svg>
      </div>
      <div slot="bottom" class="vertical ${lastAngleClass}">
        <svg @click=${this.carouselClickUp}>
          <use href="#angle-bottom"></use>
        </svg>
      </div>`;
  }

  /* eslint-disable indent */

  render() {
    const cm = this.model;
    const len = cm.items.length || 0;
    const indx = cm.activeIndex;
    const firstAngleClass = indx <= 0 ? 'end-item' : '';
    const lastAngleClass = indx >= (len - 1) ? 'end-item' : '';

    return html`
      <style>
        :host {
          --height: ${cm.vertical ? 'var(--itemWidth, 600px)' : 'var(--itemHeight, 300px)'};
          --width: ${cm.vertical ? 'var(--itemHeight, 300px)' : 'var(--itemWidth, 600px)'};
        }
      </style>
      <svg style="display:none" version="1.1"
        <defs>
          <symbol id="angle-left"
            viewBox="0 0 69.773 122.88"
            preserveAspectRatio="none"
            enable-background="new 0 0 69.773 122.88"
            xml:space="preserve">
            <g>
              <polygon points="69.773,0 49.771,0 0,61.44 49.771,122.88 69.773,122.88 20,61.44 69.773,0"/>
            </g>
          </symbol>
          <symbol id="angle-right"
            viewBox="0 0 69.773 122.88"
            preserveAspectRatio="none"
            enable-background="new 0 0 69.773 122.88"
            xml:space="preserve">
            <g>
              <polygon points="0,0 20,0 69.773,61.44 20,122.88 0,122.88 49.772,61.44 0,0"/>
            </g>
          </symbol>
          <symbol id="angle-top"
            viewBox="0 0 122.88 69.773"
            preserveAspectRatio="none"
            enable-background="new 0 0 122.88 69.773"
            xml:space="preserve">
            <g>
              <polygon points="122.88,69.773 122.88,49.772 61.44,0 0,49.772 0,69.773 61.44,20 122.88,69.773"/>
            </g>
          </symbol>
          <symbol id="angle-bottom"
            viewBox="0 0 122.88 69.773"
            preserveAspectRatio="none"
            enable-background="new 0 0 122.88 69.773"
            xml:space="preserve">
            <g>
              <polygon points="122.88,0 122.88,20 61.44,69.773 0,20 0,0 61.44,49.772 122.88,0"/>
            </g>
          </symbol>
        </defs>
      </svg>

      <kdsoft-nav-container class="carousel p-0"
        orientation=${cm.vertical ? 'vertical' : 'horizontal'}
        .model=${cm}
      >
        ${cm.vertical
          ? this._getVerticalAngles(firstAngleClass, lastAngleClass)
          : this._getHorizontalAngles(firstAngleClass, lastAngleClass)
        }
        <!-- forwarding slots from grand-child to parent -->
        ${cm.items.map((item, itemIndex) => html`<slot name="item_${itemIndex}" slot="item_${itemIndex}"></slot>`)}
      </kdsoft-nav-container>
    `;
  }
}

window.customElements.define('item-carousel', ItemCarousel);
