import { Sequence, Transport } from "tone";
import { Observable, Subject } from "rxjs";
import { TOTAL_NO_STEPS } from "./constants";
import SequencerInstrument from "./instruments/sequencerInstrument";
import { Seconds } from "tone/build/esm/core/type/Units";

// TODO: replace with hook that can access redux store!
class Sequencer {
  private $currentStep: Subject<number> = new Subject();
  private sequence: Sequence;

  constructor(private _instruments: SequencerInstrument[]) {
    this.sequence = new Sequence(
      (time, currentStep) => {
        this.$currentStep.next(currentStep);
        this.playAllTracksAtCurrentStep(currentStep, time);
      },
      Array.from(Array(TOTAL_NO_STEPS).keys()),
      "16n"
    );
  }

  playAllTracksAtCurrentStep(currentStep: number, time: Seconds) {
    this._instruments.forEach((instrument) => {
      instrument.getTracks().forEach((track) => {
        if (track.steps[currentStep].isOn) {
          instrument.play(track.name, time);
        }
      });
    });
  }

  start() {
    Transport.start();
    this.sequence.start();
  }

  stop() {
    Transport.stop();
    this.sequence.stop();
  }

  onStepChanged(): Observable<number> {
    return this.$currentStep.asObservable();
  }

  get instruments(): SequencerInstrument[] {
    return this._instruments;
  }
}

export default Sequencer;
