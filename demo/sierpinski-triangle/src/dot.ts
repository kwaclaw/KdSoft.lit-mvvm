import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { LitMvvmElement, css } from '../../../lit-mvvm.js';

import { DotModel } from './dot-model';

export class Dot extends LitMvvmElement<DotModel> {
  constructor() {
    super();
  }

  static get styles() {
    return [
      css`
        :host {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }

        div {
          position: absolute;
          background: #61dafb;
          font: normal 15px sans-serif;
          text-align: center;
          cursor: pointer;
        }

        div:hover {
          background: #ff0;
        }
      `
    ];
  }

  render() {
    let m = this.model;
    let { x, y, size, hover } = m;
    const s = size! * 1.3;
    const style = styleMap({
      width: s + 'px',
      height: s + 'px',
      left: (x) + 'px',
      top: (y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px'
    });

    const slowDown = false;
    if (slowDown) {
      const e = performance.now() + 0.8;
      while (performance.now() < e) {
        // Artificially long execution time.
      }
    }

    return html`
      <div style="${style}" @mouseover="${() => m.enter()}" @mouseout="${() => m.leave()}">
        ${hover ? '*' : ''}<slot></slot>${hover ? '*' : ''}
      </div>
    `;
  }
}

window.customElements.define('s-dot', Dot);
