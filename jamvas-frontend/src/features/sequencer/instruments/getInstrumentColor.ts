import { Instrument } from "./Instrument";

export const getInstrumentColor = (instrument: Instrument) => {
  switch (instrument) {
    case Instrument.DRUMS:
      return "var(--orange)";
    default:
      return "var(--gray)";
  }
};
