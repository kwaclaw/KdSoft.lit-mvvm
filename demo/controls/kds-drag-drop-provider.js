function dragStart(e) {
  e.stopPropagation();
  // only text data, no objects!
  e.dataTransfer.setData('text/plain', this._getItemId(e.currentTarget));
  e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
  e.preventDefault();
}

// need to maintain a drag enter counter for the item, as the drag enter/leave event happen when a child
// node is being moved over and we know only that we left the parent element when the counter reaches 0.
function dragEnter(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';

  const dragEnterCount = e.currentTarget._kdsDragEnterCount || 0;
  if (dragEnterCount <= 0) {
    e.currentTarget._kdsDragEnterCount = 1;
    e.currentTarget.classList.add('kds-droppable');
  } else {
    e.currentTarget._kdsDragEnterCount = dragEnterCount + 1;
  }
}

function dragLeave(e) {
  e.stopPropagation();
  e.preventDefault();

  const dragEnterCount = e.currentTarget._kdsDragEnterCount || 0;
  e.currentTarget._kdsDragEnterCount = dragEnterCount - 1;

  if (e.currentTarget._kdsDragEnterCount <= 0) {
    e.currentTarget.classList.remove('kds-droppable');
  }
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const item = e.currentTarget;
  item._kdsDragEnterCount = 0;
  item.classList.remove('kds-droppable');

  const fromData = e.dataTransfer.getData('text/plain');
  const toData = this._getItemId(item);

  const evt = new CustomEvent('kds-drop', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { fromId: fromData, toId: toData, dropMode: item.dataset.dropMode }
  });
  item.dispatchEvent(evt);
}

class KdsDragDropProvider {
  constructor(getItemId) {
    this._getItemId = getItemId;

    this._dragStart = dragStart.bind(this);
    this._dragEnter = dragEnter.bind(this);
    this._dragOver = dragOver.bind(this);
    this._dragLeave = dragLeave.bind(this);
    this._drop = drop.bind(this);
  }

  connect(element) {
    if (!element) return;
    this.disconnect(element);

    const h = element;
    h.addEventListener('dragstart', this._dragStart);
    h.addEventListener('dragenter', this._dragEnter);
    h.addEventListener('dragover', this._dragOver);
    h.addEventListener('dragleave', this._dragLeave);
    h.addEventListener('drop', this._drop);
  }

  disconnect(element) {
    if (!element) return;

    const h = element;
    h.removeEventListener('dragstart', this._dragStart);
    h.removeEventListener('dragenter', this._dragEnter);
    h.removeEventListener('dragover', this._dragOver);
    h.removeEventListener('dragleave', this._dragLeave);
    h.removeEventListener('drop', this._drop);
  }
}

export default KdsDragDropProvider;
