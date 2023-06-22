import { InstrumentId } from '../../../domain/instrument-id';

export interface UpdateInstrumentGridRequest {
  instrumentId: InstrumentId;
  trackIndex: number;
  stepIndex: number;
  newValue: boolean;
}
