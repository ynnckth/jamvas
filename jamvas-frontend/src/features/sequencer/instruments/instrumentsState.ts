import { InstrumentId } from "./InstrumentId";
import { SequencerInstrument } from "../types/sequencerInstrument";
import { createEmptySteps } from "../createEmptySteps";
import { samples } from "./drums/samples";
import { dorianScale, getScaleForOctave } from "../melody/getScale";

export const drumSequencerState: SequencerInstrument = {
  id: InstrumentId.DRUMS,
  name: "Rhythm",
  tracks: samples.map((sample) => ({
    name: sample.name,
    steps: createEmptySteps(),
  })),
};

export const leadSynthSequencerState: SequencerInstrument = {
  id: InstrumentId.LEAD,
  name: "Lead",
  tracks: [...getScaleForOctave(dorianScale, 4), ...getScaleForOctave(dorianScale, 5)].map((note) => ({
    name: note,
    steps: createEmptySteps(),
  })),
};
