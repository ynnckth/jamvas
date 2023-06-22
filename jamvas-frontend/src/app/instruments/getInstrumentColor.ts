import { InstrumentId } from "./InstrumentId";

export const getInstrumentColor = (instrumentId: InstrumentId) => {
  switch (instrumentId) {
    case InstrumentId.DRUMS:
      return "var(--orange)";
    default:
      return "var(--gray)";
  }
};
