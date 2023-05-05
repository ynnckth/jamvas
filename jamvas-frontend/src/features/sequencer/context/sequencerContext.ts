import { createContext } from "react";
import Sequencer from "../sequencer";
import DrumSequencer from "../instruments/drums/drumSequencer";
import { Instrument } from "../instruments/Instrument";
import LeadSynthSequencer from "../instruments/lead/leadSynthSequencer";

interface SequencerContextType {
  sequencer: Sequencer;
}

const SequencerContext = createContext<SequencerContextType>({
  sequencer: new Sequencer([new DrumSequencer(Instrument.DRUMS), new LeadSynthSequencer(Instrument.LEAD)]),
});
export default SequencerContext;
