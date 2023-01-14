function getDropElement(path) {
  let dropElement = null;
  for (let indx = 0; indx < path.length; indx += 1) {
    const pathElement = path[indx];
    if (pathElement.dataset?.dropMode) {
      dropElement = pathElement;
      break;
    }
  }
  return dropElement;
}

function clearDropClasses(element) {
  element.classList.remove('kds-droppable');
  element.classList.remove('kds-droppable-before');
  element.classList.remove('kds-droppable-after');
}

function dragStart(e) {
  e.stopPropagation(); // dont want the same event further up
  // only text data, no objects!
  e.dataTransfer.setData('text/plain', this._getItemId(e.currentTarget));
  e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
  e.stopPropagation(); // dont want the same event further up
  const dropElement = getDropElement(e.composedPath());
  if (dropElement) {
    e.preventDefault();
  }
}

// this happens also for the parent element when leaving a child element;
// we need to maintain a drag enter counter for the item, as the drag enter/leave event happens when
// a child node is being moved over and we know only that we left the parent element when the counter reaches 0.
function dragEnter(e) {
  e.stopPropagation(); // dont want the same event further up
  const dragEnterCount = e.currentTarget._kdsDragEnterCount || 0;
  if (dragEnterCount <= 0) {
    e.currentTarget._kdsDragEnterCount = 1;
  } else {
    e.currentTarget._kdsDragEnterCount = dragEnterCount + 1;
  }

  const dropElement = getDropElement(e.composedPath());
  if (dropElement) {
    e.preventDefault();

    e.dataTransfer.dropEffect = 'move';

    const element = e.currentTarget;
    element._kdsDropMode = dropElement.dataset.dropMode;
    switch (dropElement.dataset.dropMode) {
      case 'before':
        element.classList.remove('kds-droppable');
        element.classList.remove('kds-droppable-after');
        element.classList.add('kds-droppable-before');
        break;
      case 'after':
        element.classList.remove('kds-droppable');
        element.classList.remove('kds-droppable-before');
        element.classList.add('kds-droppable-after');
        break;
      default:
        element.classList.remove('kds-droppable-before');
        element.classList.remove('kds-droppable-after');
        element.classList.add('kds-droppable');
        break;
    }

    console.log('Enter: ', element);
  }
}

function checkLeave(element) {
  const dragEnterCount = element._kdsDragEnterCount;
  // ignore if there was no prior dragenter event
  if (dragEnterCount < 0) {
    return false;
  }

  const newDragEnterCount = dragEnterCount - 1;
  if (newDragEnterCount < 1) {
    console.log('Leave: ', element);
    element._kdsDragEnterCount = 0;
    return true;
  }
  element._kdsDragEnterCount = newDragEnterCount;
  return false;
}

// this happens also for the parent element when entering a child element
function dragLeave(e) {
  e.stopPropagation(); // dont want the same event further up
  if (checkLeave(e.currentTarget)) {
    clearDropClasses(e.currentTarget);
  }
}

// this is only called when there is no drop event
function dragEnd(e) {
  clearDropClasses(e.currentTarget);
}

function drop(e) {
  e.stopPropagation(); // dont want the same event further up
  e.preventDefault();

  e.currentTarget._kdsDragEnterCount = 0;
  clearDropClasses(e.currentTarget);

  const fromData = e.dataTransfer.getData('text/plain');
  const toData = this._getItemId(e.currentTarget);
  const dropMode = e.currentTarget._kdsDropMode;

  const evt = new CustomEvent('kds-drop', {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { fromId: fromData, toId: toData, dropMode }
  });
  e.currentTarget.dispatchEvent(evt);
}

// Handles drag/drop events wqhen connected to an element.
// Drop targets (see dragover) must be descendants of the connected element and must have a non-empty data-drop-mode attribute.
// Depending on the data-drop-mode value, one of the CSS classes kds-droppable, kds-droppable-before
//   or kds-droppable-after is set on the connected element on dragenter, for dynamic styling on the connected element.
// On drop, a custom event 'kds-drop' is dispatched on the connected element.
class KdsDragDropProvider {
  constructor(getItemId) {
    this._getItemId = getItemId;

    this._dragStart = dragStart.bind(this);
    this._dragEnter = dragEnter.bind(this);
    this._dragOver = dragOver.bind(this);
    this._dragLeave = dragLeave.bind(this);
    this._dragEnd = dragEnd.bind(this);
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
    h.addEventListener('dragend', this._dragEnd);
    h.addEventListener('drop', this._drop);
    h._kdsDragEnterCount = -1;
  }

  disconnect(element) {
    if (!element) return;

    const h = element;
    h.removeEventListener('dragstart', this._dragStart);
    h.removeEventListener('dragenter', this._dragEnter);
    h.removeEventListener('dragover', this._dragOver);
    h.removeEventListener('dragleave', this._dragLeave);
    h.removeEventListener('dragend', this._dragEnd);
    h.removeEventListener('drop', this._drop);
  }
}

export default KdsDragDropProvider;
