import { observable } from '@nx-js/observer-util/dist/es.es6.js';
import { DotModel } from "./dot-model";

const targetSize = 25;

export class TriangleModel {
  constructor(sharedModel: { seconds: number }, x?: number, y?: number, size?: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.sharedModel = sharedModel;

    if (size <= targetSize) {
      let s = targetSize;
      this.dot = new DotModel(x - (s / 2), y - (s / 2), s);
    } else {
      let s = size / 2;
      this.middle = new TriangleModel(sharedModel, x, y - (s / 2), s);
      this.left = new TriangleModel(sharedModel, x - s, y + (s / 2), s);
      this.right = new TriangleModel(sharedModel, x + s, y + (s / 2), s);
    }
    return observable(this);
  }

  x?: number;

  y?: number;

  size?: number;

  sharedModel: { seconds: number };

  dot: DotModel;
  middle: TriangleModel;
  left: TriangleModel;
  right: TriangleModel;
}
