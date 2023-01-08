class KdsDropdownConnector {
  constructor(getDropdown) {
    this.getDropdown = getDropdown;
  }

  // override this
  connectDropdownSlot() {
    //
  }

  // override this
  disconnectDropdownSlot() {
    //
  }

  reconnectDropdownSlot() {
    this.disconnectDropdownSlot();
    this.connectDropdownSlot();
  }
}

export default KdsDropdownConnector;
