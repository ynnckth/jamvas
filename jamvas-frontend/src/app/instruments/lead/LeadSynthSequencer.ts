import { Filter, PolySynth, Reverb, Synth } from "tone";
import SequencerInstrument from "../SequencerInstrument";
import { InstrumentId } from "../InstrumentId";

class LeadSynthSequencer extends SequencerInstrument {
  private readonly synthesizer: PolySynth;
  private readonly lowPassFilter: Filter;

  constructor(id: InstrumentId) {
    super(id);
    this.lowPassFilter = new Filter(800, "lowpass", -96).toDestination();
    const reverb = new Reverb(3).toDestination();

    this.synthesizer = new PolySynth(Synth, {
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 2,
      },
      volume: -12,
    })
      .connect(reverb)
      .connect(this.lowPassFilter);
  }

  play(note: string, scheduledTime: number): void {
    this.synthesizer.triggerAttackRelease(note, "16n", scheduledTime);
  }
}
export default LeadSynthSequencer;
