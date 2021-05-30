import { raw } from '@nx-js/observer-util/dist/es.es6.js';

function iterateSelectedItems(items, selectedItems) {
  let current;

  return {
    [Symbol.iterator]() {
      current = 0;
      return this;
    },

    next() {
      while (current >= 0 && current < items.length) {
        const item = items[current];
        const index = current;
        current += 1;
        if (selectedItems.has(raw(item))) {
          return { done: false, value: { item, index } };
        }
        continue;
      }
      return { done: true };
    },
  };
}

// selected items are always included
function iterateFilter(items, selectedItems, filter) {
  let current;

  return {
    [Symbol.iterator]() {
      current = 0;
      return this;
    },

    next() {
      while (current >= 0 && current < items.length) {
        const item = items[current];
        const index = current;
        current += 1;
        if (selectedItems.has(raw(item)) || (!filter || filter(item))) {
          return { done: false, value: { item, index } };
        }
        continue;
      }
      return { done: true };
    },
  };
}

const _multiSelect = new WeakMap();

class KdSoftChecklistModel {
  constructor(
    items = [],
    selectedIndexes = [],
    multiSelect = true,
    getItemId = item => item.id
  ) {
    if (!multiSelect && (selectedIndexes || []).length > 1) {
      throw new Error('Must not select multiple items');
    }

    this.items = items;
    this.filter = null;
    const selItems = (selectedIndexes || []).map(i => raw(items[i]));
    this._selectedItems = new WeakSet(selItems);

    // so that we can use this in the property getters/setters
    _multiSelect.set(this, multiSelect);

    this.getItemId = getItemId;
  }

  get multiSelect() {
    // need to use raw() as the initial assignment was done using the raw instance
    return _multiSelect.get(raw(this));
  }

  get selectedEntries() { return iterateSelectedItems(this.items, this._selectedItems); }

  get firstSelectedEntry() {
    return this.selectedEntries[Symbol.iterator]().next().value;
  }

  get selectedIndexes() {
    return Array.from(this.selectedEntries, entry => entry.index);
  }

  get selectedItems() {
    return Array.from(this.selectedEntries, entry => entry.item);
  }

  get filteredItems() { return iterateFilter(this.items, this._selectedItems, this.filter); }

  selectIndex(index, select) {
    if (this.multiSelect) {
      if (select) this._selectedItems.add(raw(this.items[index]));
      else this._selectedItems.delete(raw(this.items[index]));
    } else if (select) {
      this._selectedItems = new WeakSet([raw(this.items[index])]);
    } else {
      this._selectedItems = new WeakSet();
    }
  }

  selectId(id, select) {
    let selItem = null;
    for (let indx = 0; indx < this.items.length; indx += 1) {
      const tempItem = this.items[indx];
      if (this.getItemId(tempItem) === id) {
        selItem = tempItem;
        break;
      }
    }
    if (selItem === null) return;

    if (this.multiSelect) {
      if (select) this._selectedItems.add(raw(selItem));
      else this._selectedItems.delete(raw(selItem));
    } else if (select) {
      this._selectedItems = new WeakSet([raw(selItem)]);
    } else {
      this._selectedItems = new WeakSet();
    }
  }

  selectIds(ids, select) {
    if (!this.multiSelect && (ids || []).length > 1) {
      throw new Error('Must not select multiple items');
    }

    const selItems = [];
    for (let indx = 0; indx < this.items.length; indx += 1) {
      const tempItem = raw(this.items[indx]);
      for (const id of ids) {
        if (this.getItemId(tempItem) === id) {
          selItems.push(tempItem);
          break;
        }
      }
    }

    for (let indx = 0; indx < selItems.length; indx += 1) {
      const selItem = raw(selItems[indx]);
      if (this.multiSelect) {
        if (select) this._selectedItems.add(selItem);
        else this._selectedItems.delete(selItem);
      } else if (select) {
        this._selectedItems = new WeakSet([selItem]);
      } else {
        this._selectedItems = new WeakSet();
      }
    }
  }

  toggleIndex(index) {
    const rawItem = raw(this.items[index]);
    const isSelected = this._selectedItems.has(rawItem);
    if (this.multiSelect) {
      if (isSelected) this._selectedItems.delete(rawItem);
      else this._selectedItems.add(rawItem);
    } else if (isSelected) {
      this._selectedItems = new WeakSet();
    } else {
      this._selectedItems = new WeakSet(rawItem);
    }
  }

  isItemSelected(item) {
    return this._selectedItems.has(raw(item));
  }

  /* NOTE
     It looks like the basic assumption is that when you make an array observable you don't need
     to make each element observable because once you access the element like this: items[indx] then
     the element will be wrapped with a proxy and become observable, and changes to the properties
     of that wrapped element will trigger reactions.

     If some elements are already observable, then it may happen that on assignment to the array
     the proxy will be stripped! as it is not necessary. This also means, however, that one should not
     keep references to proxies around if they get dynamically re-created.
  */

  // expects numbers
  moveItem(from, to) {
    if (from === to) return;

    const items = this.items;

    // this algorithm keeps the array length constant
    const itemToMove = items[from];
    if (to > from) {
      items.copyWithin(from, from + 1, to + 1);
    } else if (to < from) {
      items.copyWithin(to + 1, to, from);
    }
    items[to] = itemToMove;
  }

  unselectAll() {
    this._selectedItems = new WeakSet();
  }
}

export default KdSoftChecklistModel;
