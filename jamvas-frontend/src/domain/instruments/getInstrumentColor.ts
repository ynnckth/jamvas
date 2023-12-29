import { InstrumentId } from "./InstrumentId";

export const getInstrumentColor = (instrumentId: InstrumentId) => {
  switch (instrumentId) {
    case InstrumentId.DRUMS:
      return "var(--orange)";
    case InstrumentId.BASS:
      return "var(--green)";
    default:
      return "var(--gray)";
  }
};
