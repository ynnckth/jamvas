import { Sampler } from "tone";
import Playable from "../Playable";
import { samples } from "./samples";
import { Seconds } from "tone/build/esm/core/type/Units";

class DrumSequencer implements Playable {
  private sampler: Sampler;

  constructor() {
    this.sampler = new Sampler({
      urls: {
        ...samples.reduce((samplesDict: any, sample) => ((samplesDict[sample.key] = sample.urlPath), samplesDict), {}),
      },
    }).toDestination();
  }

  play(trackName: string, scheduledTime: Seconds): void {
    const sampleToPlay = samples.find((sample) => sample.name === trackName)!;
    this.sampler.triggerAttack(sampleToPlay.key, scheduledTime, 0.4);
  }
}
export default DrumSequencer;
