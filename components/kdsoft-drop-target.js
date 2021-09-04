import KdSoftDragDropProvider from './kdsoft-drag-drop-provider.js';

export default class KdSoftDropTarget extends HTMLDivElement {
  constructor() {
    super();
    this.dragdrop = new KdSoftDragDropProvider(item => item.id);
    this.dragdrop.connect(this);
  }
}

window.customElements.define('kdsoft-drop-target', KdSoftDropTarget, { extends: 'div' });
