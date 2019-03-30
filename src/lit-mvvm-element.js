/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
import { observe, unobserve } from '@nx-js/observer-util';

import LitBaseElement from './lit-base-element';

const _model = new WeakMap();
const _scheduler = new WeakMap();

export default class LitMvvmElement extends LitBaseElement {
  get model() {
    return _model.get(this);
  }
  set model(value) {
    _model.set(this, value);
  }

  get scheduler() {
    return _scheduler.get(this);
  }
  set scheduler(value) {
    _scheduler.set(this, value);
  }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // NOTE: the observer code will need to run synchronously, so that the observer
  //       can detect which properties were used at the end of the call!
  connectedCallback() {
    this._observer = observe(
      () => {
        // super._doRender() reads the relevant view model properties synchronously.
        super._doRender();
      },
      {
        // We dont' want to run the observer right away (to start the observation process),
        // as it is run as part of rendering anyway.
        // Note: the observed model/properties must be defined at the time of first render.
        lazy: true,
        scheduler: this.scheduler ? this.scheduler : r => r(),
        /* debugger: console.log */
      }
    );

    // Triggering the initial call to this._doRender(), thus reading observable properties for the first time.
    // NOTE: this is also necessary because the observer will not get re-triggered until the observed
    //       properties are read!!!, that is, until the "get" traps of the proxy are used!!!
    super.connectedCallback();
  }

  // our super._doRender() is wrapped by the observer, thus observing property access
  _doRender() {
    this._observer();
  }

  disconnectedCallback() {
    unobserve(this._observer);
  }
}
