import { Instrument } from "./Instrument";

export const getInstrumentColor = (instrument: Instrument) => {
  switch (instrument) {
    case Instrument.DRUMS:
      return "var(--purple)";
    default:
      return "var(--gray)";
  }
};
