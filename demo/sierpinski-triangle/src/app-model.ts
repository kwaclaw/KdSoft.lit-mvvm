import { observable } from '@nx-js/observer-util';
import { TriangleModel } from './triangle-model';

export class AppModel {
  private intervalID?: number;

  constructor(initialSize: number) {
    this.sharedModel = observable({ seconds: 0 });
    this.triangleModel = new TriangleModel(this.sharedModel, 0, 0, initialSize);

    return observable(this);
  }

  sharedModel: { seconds: number };
  triangleModel: TriangleModel;

  start() {
    this.intervalID = window.setInterval(() => {
      this.sharedModel.seconds = this.sharedModel.seconds % 10 + 1;
    }, 1000);
  }

  stop() {
    window.clearInterval(this.intervalID);
  }
}
