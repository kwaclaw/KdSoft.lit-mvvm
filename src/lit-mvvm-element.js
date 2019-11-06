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
    const oldModel = _model.get(this);
    _model.set(this, value);
    if (oldModel !== value) {
      // need to re-initialize rendering for a new model, old observers are now useless
      this._initialRender();
    }
  }

  get scheduler() {
    return _scheduler.get(this);
  }
  set scheduler(value) {
    if (value) _scheduler.set(this, value);
    else _scheduler.set(this, r => r());
  }

  constructor() {
    super();
    _scheduler.set(this, r => r());
  }

  // Setting up observer of view model changes.
  // NOTE: the observer will not get re-triggered until the observed properties are read!!!
  //       that is, until the "get" traps of the proxy are used!!!
  // NOTE: the observer code will need to run synchronously, so that the observer
  //       can detect which properties were used at the end of the call!
  _setupObserver() {
    if (this._observer) {
      unobserve(this._observer);
    }

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
        scheduler: this.scheduler,
        /* debugger: console.log */
      }
    );
  }

  _initialRender() {
    this._setupObserver();
    // Triggering the initial call to this._doRender(), thus reading observable properties for the first time.
    // NOTE: this is also necessary because the observer will not get re-triggered until the observed
    //       properties are read!!!, that is, until the "get" traps of the proxy are used!!!
    super._initialRender();
  }

  // we call super._doRender() through the observer, thus observing property access
  _doRender() {
    this._observer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    this._doRender();
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  disconnectedCallback() {
    unobserve(this._observer);
  }

  // we don't call render() when the model is undefined
  shouldRender() {
    return !!this.model;
  }

  // schedule an operation, useful when performing it after layout has happened;
  // typically called from an override of rendered()
  schedule(callback) {
    if (typeof this.scheduler === 'function') {
      this.scheduler(callback);
    } else if (typeof this.scheduler === 'object') {
      this.scheduler.add(callback);
    } else {
      callback();
    }
  }
}
