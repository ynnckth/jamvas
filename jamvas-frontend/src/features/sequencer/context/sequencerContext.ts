import { createContext } from "react";
import Sequencer from "../sequencer";
import DrumSequencer from "../instruments/drums/drumSequencer";
import { Instrument } from "../instruments/Instrument";

interface SequencerContextType {
  sequencer: Sequencer;
}

const SequencerContext = createContext<SequencerContextType>({
  sequencer: new Sequencer([new DrumSequencer(Instrument.DRUMS)]),
});
export default SequencerContext;
