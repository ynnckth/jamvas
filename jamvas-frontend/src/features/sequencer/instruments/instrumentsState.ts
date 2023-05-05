import { Instrument } from "./Instrument";
import { SequencerInstrument } from "../types/sequencerInstrument";
import { createEmptySteps } from "../createEmptySteps";
import { samples } from "./drums/samples";
import { dorianScale, getScaleForOctave } from "../melody/getScale";

export const drumSequencerState: SequencerInstrument = {
  id: Instrument.DRUMS,
  name: "Rhythm",
  tracks: samples.map((sample) => ({
    name: sample.name,
    steps: createEmptySteps(),
  })),
};

export const leadSynthSequencerState: SequencerInstrument = {
  id: Instrument.LEAD,
  name: "Lead",
  tracks: [...getScaleForOctave(dorianScale, 4), ...getScaleForOctave(dorianScale, 5)].map((note) => ({
    name: note,
    steps: createEmptySteps(),
  })),
};
