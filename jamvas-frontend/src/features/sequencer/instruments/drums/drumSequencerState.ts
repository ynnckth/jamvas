import { Instrument } from "../Instrument";
import { SequencerInstrument } from "../../types/sequencerInstrument";
import { createEmptySteps } from "../../createEmptySteps";
import { samples } from "./samples";

export const drumSequencerState: SequencerInstrument = {
  id: Instrument.DRUMS,
  name: "Rhythm",
  tracks: samples.map((sample) => ({
    name: sample.name,
    steps: createEmptySteps(),
  })),
};
