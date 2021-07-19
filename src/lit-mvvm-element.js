/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */

import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import { render as litRender, noChange } from 'lit/html.js';
import { LitBaseElement } from './lit-base-element';

const _model = new WeakMap();
const _scheduler = new WeakMap();

export class LitMvvmElement extends LitBaseElement {
  get model() { return _model.get(this); }
  set model(value) {
    const oldModel = this.model;
    _model.set(this, value);
    // need to re-initialize rendering for a new model when we are already connected;
    // old observers are now useless, and connectedCallback might not get called anymore
    if (oldModel !== value && this.isConnected && this.renderRoot) {
      this.schedule(this._initialRender.bind(this));
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
    this.renderOptions = { host: this };
    this.__childPart = undefined;
    _scheduler.set(this, r => r());
  }

  createRenderRoot() {
    const rr = super.createRenderRoot();
    const rb = this.renderOptions.renderBefore;
    if (rb === null || rb === undefined) {
      this.renderOptions.renderBefore = rr.firstChild;
    }
    return rr;
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
        // We observe a model property called "__changeCount" that may or may not be present
        // on the model. This allows the model to trigger a reaction (and a call to render())
        // even when a regular observer would not work.
        // Example: certain updates to arrays or complex object trees are best done on the
        //    raw objects, which would not trigger observed reactions, so at the end of the
        //    modifications one can call "this.__changeCount++;" from within the model
        //    and thus trigger a call to "render()".
        const changeCount = this.model ? this.model.__changeCount : -1;
        // super._render() reads the relevant view model properties synchronously.
        super._render();
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
    // Triggering the initial call to this._render(), thus reading observable properties for the first time.
    // NOTE: this is also necessary because the observer will not get re-triggered until the observed
    //       properties are read!!!, that is, until the "get" traps of the proxy are used!!!
    super._initialRender();
  }

  // this is how lit-html gets involved
  _finalRender() {
    const value = this.render();
    this.__childPart = litRender(value, this.renderRoot, this.renderOptions);
  }

  // we call super._render() through the observer, thus observing property access
  _render() {
    this._observer();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (this._observer) this.schedule();
  }

  connectedCallback() {
    super.connectedCallback();
    const cp = this.__childPart;
    if (cp !== null && cp !== undefined) {
      cp.setConnected(true);
    }
    this.schedule(this._initialRender.bind(this));
  }

  disconnectedCallback() {
    unobserve(this._observer);
    super.disconnectedCallback();
    const cp = this.__childPart;
    if (cp !== null && cp !== undefined) {
      cp.setConnected(false);
    }
  }

  shouldRender() {
    return true;
  }

  // override in derived class
  render() {
    return noChange;
  }

  // schedule an operation, useful when performing it after layout has happened;
  // typically called from an override of rendered()
  schedule(callback) {
    if (!callback) {
      callback = this._render.bind(this);
    }

    if (typeof this.scheduler === 'function') {
      this.scheduler(callback);
    } else if (typeof this.scheduler === 'object') {
      this.scheduler.add(callback);
    } else {
      setTimeout(callback, 0);
    }
  }
}

LitMvvmElement.finalized = true;
