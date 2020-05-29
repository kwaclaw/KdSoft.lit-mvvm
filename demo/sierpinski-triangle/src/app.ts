
import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import { Queue, priorities } from '@nx-js/queue-util';
import { LitMvvmElement, css, BatchScheduler } from '../../../lit-mvvm';

import { AppModel } from './app-model';

import './triangle';

const containerStyle = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
};

class AnimationScheduler {
  constructor(render: () => void) {
    this.render = render;
    this.elapsed = 0;
    this.renderCount = 0;
  }

  private rafID?: number;
  private render: () => void;
  private startTime: number;

  elapsed: number;
  renderCount: number;

  start() {
    this.startTime = performance.now();
    const update = () => {
      this.elapsed = performance.now() - this.startTime;
      this.renderCount += 1;
      this.render();
      this.rafID = requestAnimationFrame(update);
    }
    this.rafID = requestAnimationFrame(update);
  }

  stop() {
    cancelAnimationFrame(this.rafID!);
  }
}

class NodeBatchScheduler extends BatchScheduler {
  constructor(interval: number) {
    super(interval);
    this.renderCount = 0;
    this.renderRequestCount = 0;
  }

  renderCount: number;
  renderRequestCount: number;

  _runReactions(): number {
    const count = super._runReactions();
    this.renderCount += 1;
    this.renderRequestCount = count;
    return count;
  }
}

export class TriangleApplication extends LitMvvmElement<AppModel> {
  constructor() {
    super();

    // for animation we dont need to observe a view model, we just render periodically
    this.animationScheduler = new AnimationScheduler(() => this._doRender());

    // here we batch up render requests for child nodes to run at most every 100 milliseconds;
    // highest frequency depends on mimimum delay for window.setTimeout()
    this.nodeScheduler = new NodeBatchScheduler(100);

    // here we are using a low priority queue to schedule rendering
    //this.nodeScheduler = new Queue(priorities.LOW);

    // this will trigger a render() call, if we are already connected
    this.model = new AppModel(1000);
}

  private animationScheduler: AnimationScheduler;
  private nodeScheduler: Object;

  connectedCallback() {
    super.connectedCallback();
    this.model.start();
    this.animationScheduler.start();
  }

  disconnectedCallback() {
    this.animationScheduler.stop();
    this.model.stop();
    super.disconnectedCallback();
  }

  static get styles() {
    return [
      css`
        #container {
          position: absolute;
          transform-origin: 0 0;
          left: 50%;
          top: 50%;
          width: 10px;
          height: 10px;
          background: #eee;
        }
      `,
    ];
  }

  render() {
    let elapsed = this.animationScheduler.elapsed;
    let triangleModel = this.model.triangleModel;

    //return html`<div><span>Animation render events per second: 444</span></div>`;

    const t = (elapsed! / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    const transform = 'scaleX(' + (scale / 2.1) + ') scaleY(0.7) translateZ(0.1px)';
    const style = styleMap({ transform });

    const animationsPerSecond = this.animationScheduler.renderCount * 1000 / elapsed;
    let rendersPerSecond: any = 'not implemented';
    let renderRequestsPerEvent: any = 'not implemented';
    if (this.nodeScheduler['renderCount'] != null) {
      rendersPerSecond = (this.nodeScheduler['renderCount'] * 1000 / elapsed).toFixed(2);
      renderRequestsPerEvent = this.nodeScheduler['renderRequestCount'];
    }

    return html`<div><span>Animation render events per second: ${animationsPerSecond.toFixed(2)}</span></div>
<div><span>Node render events per second: ${rendersPerSecond}</span></div>
<div><span>Node render requests per event: ${renderRequestsPerEvent}</span></div>
<div id="container" style="${style}">
  <div>
    <s-triangle .model="${triangleModel}" .scheduler="${this.nodeScheduler}"></s-triangle>
  </div>
</div>`;
  }
}

window.customElements.define('triangle-application', TriangleApplication);
