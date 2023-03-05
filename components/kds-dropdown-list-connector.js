import { observe, unobserve } from '@nx-js/observer-util/dist/es.es6.js';
import KdsDropdownConnector from './kds-dropdown-connector.js';

function _getSelectedText(clm) {
  let result = null;
  for (const selEntry of clm.selectedEntries) {
    if (result === null) result = selEntry.item.name;
    else result += `, ${selEntry.item.name}`;
  }
  return result;
}

function onItemSelected(e) {
  if (!this._multiSelect) {
    const dropdown = this.getDropdown();
    dropdown.model.dropped = false;
  }
}

class KdsDropdownListConnector extends KdsDropdownConnector {
  constructor(getDropdown, getListControl, getSelectedText) {
    super(getDropdown);
    this.getListControl = getListControl;
    this.getSelectedText = getSelectedText || _getSelectedText;
    this._onItemSelected = onItemSelected.bind(this);
  }

  // override
  connectDropdownSlot() {
    super.connectDropdownSlot();

    const dropdown = this.getDropdown();

    const listControl = this.getListControl();
    listControl.addEventListener('kds-item-click', this._onItemSelected);
    listControl.addEventListener('kds-item-check-click', this._onItemSelected);

    const multiSelectObserver = observe(() => {
      this._multiSelect = listControl.model.multiSelect;
    });

    // react to selection changes in checklist
    const selectObserver = observe(() => {
      const selectedText = this.getSelectedText(listControl.model);
      dropdown.model.selectedText = selectedText;
    });

    // react to search text changes in dropdown
    const searchObserver = observe(() => {
      const regex = new RegExp(dropdown.model.searchText, 'i');
      listControl.model.filter = item => listControl.model.isItemSelected(item) || regex.test(item.name);
    });

    // react to dropping down event
    const droppedObserver = observe(() => {
      if (dropdown.model.dropped) {
        // queue this at the end of updates to be rendered correctly
        listControl.schedule(() => listControl.initView());
      }
    });

    this._listObservers = [multiSelectObserver, selectObserver, searchObserver, droppedObserver];
  }

  // override
  disconnectDropdownSlot() {
    if (this._listObservers) {
      this._listObservers.forEach(o => unobserve(o));
      this._listObservers = [];
    }

    const listControl = this.getListControl();
    listControl.removeEventListener('kds-item-click', this._onItemSelected);
    listControl.removeEventListener('kds-item-check-click', this._onItemSelected);

    super.disconnectDropdownSlot();
  }
}

export default KdsDropdownListConnector;
