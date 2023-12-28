import { SequencerConfiguration } from "../types/SequencerConfiguration";
import { InstrumentId } from "../domain/instruments/InstrumentId";
import { get, put } from "./apiUtils";

export const baseUrl = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/sequencer`;

export const fetchSequencerConfiguration = async (): Promise<SequencerConfiguration> => {
  return await get<SequencerConfiguration>(baseUrl);
};

export const updateSequencerInstrumentGrid = async (
  instrumentId: InstrumentId,
  trackIndex: number,
  stepIndex: number,
  newValue: boolean
): Promise<SequencerConfiguration> => {
  return await put<SequencerConfiguration>(`${baseUrl}/grid`, {
    instrumentId,
    trackIndex,
    stepIndex,
    newValue,
  });
};

export const updateBpm = async (newBpm: number): Promise<SequencerConfiguration> => {
  return await put<SequencerConfiguration>(`${baseUrl}/bpm`, { bpm: newBpm });
};
