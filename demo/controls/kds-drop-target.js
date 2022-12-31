import KdsDragDropProvider from './kds-drag-drop-provider.js';

export default class KdsDropTarget extends HTMLDivElement {
  constructor() {
    super();
    this.dragdrop = new KdsDragDropProvider(item => item.id);
    this.dragdrop.connect(this);
  }
}

window.customElements.define('kds-drop-target', KdsDropTarget, { extends: 'div' });
