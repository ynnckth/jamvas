import { SequencerConfiguration } from "../features/sequencer/types/SequencerConfiguration";
import { InstrumentId } from "../features/sequencer/instruments/InstrumentId";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/sequencer`;

export const fetchSequencerConfiguration = async (): Promise<SequencerConfiguration> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};

export const updateSequencerInstrumentGrid = async (
  instrumentId: InstrumentId,
  trackIndex: number,
  stepIndex: number,
  newValue: boolean
): Promise<SequencerConfiguration> => {
  const response = await fetch(`${baseUrl}/grid`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instrumentId,
      trackIndex,
      stepIndex,
      newValue,
    }),
  });
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to update sequencer grid");
  }
  return await response.json();
};
