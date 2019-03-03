import { observable } from '@nx-js/observer-util';

export class DotModel {
  constructor(x?: number, y?: number, size?: number) {
    this.x = x;
    this.y = y;
    this.size = size;

    return observable(this);
  }

  x?: number;

  y?: number;

  size?: number;

  hover: boolean = false;

  enter() {
    this.hover = true;
  }

  leave() {
    this.hover = false;
  }
}
