class KdSoftActiveItemModel {
  constructor(items, activeIndex) {
    this.items = items || [];
    this.activeIndex = activeIndex;
  }

  _checkActiveIndex(value) {
    if (value >= this.items.length) {
      return this.items.length - 1;
    }
    if (value < 0) {
      return this.items.length ? 0 : -1;
    }
    return value;
  }

  get activeIndex() { return this._checkActiveIndex(this._activeIndex); }

  set activeIndex(value) {
    this._activeIndex = this._checkActiveIndex(value);
  }

  get activeItem() { return this.items[this.activeIndex]; }

  incrementActiveIndex() {
    this.activeIndex += 1;
  }

  decrementActiveIndex() {
    this.activeIndex -= 1;
  }
}

export default KdSoftActiveItemModel;
