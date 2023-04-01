import { TOTAL_NO_STEPS } from "./constants";
import { Step } from "./types/step";

export const createEmptySteps = (): Step[] => {
  const steps: Step[] = [];
  for (let i = 0; i < TOTAL_NO_STEPS; i++) {
    steps.push({ isOn: false });
  }
  return steps;
};
