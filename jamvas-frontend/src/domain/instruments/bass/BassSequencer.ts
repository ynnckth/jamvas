import { Sampler } from "tone";
import Playable from "../Playable";
import { Seconds } from "tone/build/esm/core/type/Units";
import { prependUrlFragmentIfNotDevelopment } from "../../../utils/prependUrlFragementIfNotDevelopment";

class BassSequencer implements Playable {
  private sampler: Sampler;

  constructor() {
    this.sampler = new Sampler({
      urls: {
        C2: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/bass_synth/glidesynth1.ogg"),
      },
    }).toDestination();
  }

  play(trackName: string, scheduledTime: Seconds): void {
    this.sampler.triggerAttackRelease(trackName, 0.1, scheduledTime, 0.4);
  }
}
export default BassSequencer;
