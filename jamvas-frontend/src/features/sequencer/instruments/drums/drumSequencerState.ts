import { Instrument } from "../Instrument";
import { SequencerInstrument } from "../../types/sequencerInstrument";

export const drumSequencerState: SequencerInstrument = {
  id: Instrument.DRUMS,
  name: "Drums",
  grid: [
    {
      name: "kick",
      steps: [
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
      ],
    },
    {
      name: "snare",
      steps: [
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
      ],
    },
    {
      name: "hihat_closed",
      steps: [
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
        { isOn: false },
      ],
    },
  ],
};
