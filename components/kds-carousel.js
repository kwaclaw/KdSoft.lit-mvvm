import { html, css, nothing } from '@kdsoft/lit-mvvm';
import KdsNavLayout from './kds-nav-layout.js';

export default class KdsCarousel extends KdsNavLayout {
  _scrollToActiveItem(itemsControl, activeIndex) {
    if (this.vertical) {
      const scrollPoint = itemsControl.clientHeight * activeIndex;
      itemsControl.scroll({ top: scrollPoint, behavior: 'smooth' });
    } else {
      const scrollPoint = itemsControl.clientWidth * activeIndex;
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
      ...super.styles,
      css`
        :host {
          height: var(--height);
          width: var(--width);
        }

        #container > div {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 3rem;
          padding: 0;
          /* opacity:0.3; */
        } 

        #container.vertical > div {
          flex-direction: column;
          width: 100%;
          height: 3rem;
        } 

        #container .angle {
          position: relative;
          display: flex;
          height: 100%;
          width: 100%;
          padding: 0.3rem;
        }

        #container .angle > svg {
          display: none;
          fill: gray;
          fill-opacity: 0.3;
          stroke-width: 2;
          stroke: white;
          width: 100%;
          height: 50%;
          margin: auto;
        }

        #container.vertical .angle > svg {
          width: 50%;
          height: 100%;
        } 

        #container > div:hover svg {
          display: unset;
        }
        
        #container div.end-item {
          display:none;
        }
      `,
    ];
  }

  /* eslint-disable indent */

  get header() {
    const cm = this.model;
    const indx = cm.activeIndex;
    const firstAngleClass = indx <= 0 ? 'end-item' : '';
    return this.vertical
      ? html`
        <div class="angle ${firstAngleClass}">
          <svg @click=${this.carouselClickDown}>
            <use href="#angle-top"></use>
          </svg>
        </div>`
      : nothing;
  }

  get left() {
    const cm = this.model;
    const indx = cm.activeIndex;
    const firstAngleClass = indx <= 0 ? 'end-item' : '';
    return this.vertical
      ? nothing
      : html`
        <div class="angle ${firstAngleClass}">
          <svg @click=${this.carouselClickDown}>
            <use href="#angle-left"></use>
          </svg>
        </div>`;
  }

  get footer() {
    const cm = this.model;
    const len = cm.items.length || 0;
    const indx = cm.activeIndex;
    const lastAngleClass = indx >= (len - 1) ? 'end-item' : '';
    return this.vertical
      ? html`
        <div class="angle ${lastAngleClass}">
          <svg @click=${this.carouselClickUp}>
            <use href="#angle-bottom"></use>
          </svg>
        </div>`
      : nothing;
  }

  get right() {
    const cm = this.model;
    const len = cm.items.length || 0;
    const indx = cm.activeIndex;
    const lastAngleClass = indx >= (len - 1) ? 'end-item' : '';
    return this.vertical
      ? nothing
      : html`
        <div class="angle ${lastAngleClass}">
          <svg @click=${this.carouselClickUp}>
            <use href="#angle-right"></use>
          </svg>
        </div>`;
  }

  render() {
    return html`
      <style>
        :host {
          --height: ${this.vertical ? 'var(--itemWidth, 600px)' : 'var(--itemHeight, 300px)'};
          --width: ${this.vertical ? 'var(--itemHeight, 300px)' : 'var(--itemWidth, 600px)'};
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
      ${super.render()}
    `;
  }

  rendered() {
    // reading observable properties here will still register them for the next render()
    const activeIndex = this.model.activeIndex;

    window.setTimeout(() => {
      const itemsControl = this.renderRoot.getElementById('items');
      if (itemsControl) {
        this._scrollToActiveItem(itemsControl, activeIndex);
      }
    }, 5);

    // this.schedule(() => {
    //   const itemsControl = this.renderRoot.getElementById('items');
    //   if (itemsControl) {
    //     this._scrollToActiveItem(itemsControl, activeIndex);
    //   }
    // });

    // requestAnimationFrame(() => {
    //   const itemsControl = this.renderRoot.getElementById('items');
    //   if (itemsControl) {
    //     this._scrollToActiveItem(itemsControl, activeIndex);
    //   }
    // });

    // seems that setTimout with at least 5ms is more reliable when the debugger is running;
    // looks like one of the reasons is that it does not use the microtask queue
  }
}

window.customElements.define('kds-carousel', KdsCarousel);
