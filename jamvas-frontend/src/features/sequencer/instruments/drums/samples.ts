export type Sample = {
  name: string;
  key: string;
  urlPath: string;
};

export const samples: Sample[] = [
  {
    name: "kick",
    key: "C1",
    urlPath: "/assets/sound_samples/po12/kick.wav",
  },
  {
    name: "snare",
    key: "E1",
    urlPath: "/assets/sound_samples/po12/snare.wav",
  },
  {
    name: "clap1",
    key: "F1",
    urlPath: "/assets/sound_samples/po12/clap1.wav",
  },
  {
    name: "clap2",
    key: "F#1",
    urlPath: "/assets/sound_samples/po12/clap2.wav",
  },
  {
    name: "hihat_closed",
    key: "G1",
    urlPath: "/assets/sound_samples/po12/hh_closed.wav",
  },
  {
    name: "hihat_open",
    key: "A1",
    urlPath: "/assets/sound_samples/po12/hh_open.wav",
  },
];
