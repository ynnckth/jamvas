import { Step, Track } from '../sequencer/sequencer-configuration';

export class TrackBuilder {
  private name: string;
  private steps: Step[] = [];

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withSteps(steps: Step[]): this {
    this.steps = steps;
    return this;
  }

  build(): Track {
    return {
      name: this.name,
      steps: this.steps,
    };
  }
}
