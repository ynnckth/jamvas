import { SequencerConfiguration } from "../features/sequencer/types/SequencerConfiguration";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/sequencer`;

export const fetchSequencerConfiguration = async (): Promise<SequencerConfiguration> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};
