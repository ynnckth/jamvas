import { start, Transport } from "tone";

export const initializeAudio = async () => {
  await start();
};

export const rampBpmTo = (bpm: number): void => {
  Transport.bpm.rampTo(bpm, 1);
};
