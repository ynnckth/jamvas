import { prependUrlFragmentIfNotDevelopment } from "../../../utils/prependUrlFragementIfNotDevelopment";

export type Sample = {
  name: string;
  key: string;
  urlPath: string;
};

export const samples: Sample[] = [
  {
    name: "kick",
    key: "C1",
    urlPath: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/808/BD2525.WAV"),
  },
  {
    name: "snare",
    key: "E1",
    urlPath: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/808/SD2510.WAV"),
  },
  {
    name: "clap",
    key: "F1",
    urlPath: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/808/CP.WAV"),
  },
  {
    name: "hihat_closed",
    key: "G1",
    urlPath: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/808/CH.WAV"),
  },
  {
    name: "hihat_open",
    key: "A1",
    urlPath: prependUrlFragmentIfNotDevelopment("/assets/sound_samples/808/OH25.WAV"),
  },
];
