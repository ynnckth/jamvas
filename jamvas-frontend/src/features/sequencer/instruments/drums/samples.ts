export type Sample = {
  id: string;
  key: string;
  urlPath: string;
};

export const samples: Sample[] = [
  {
    id: "kick",
    key: "C1",
    urlPath: "/assets/sound_samples/po12/kick.wav",
  },
  {
    id: "snare",
    key: "E1",
    urlPath: "/assets/sound_samples/po12/snare.wav",
  },
  {
    id: "clap1",
    key: "F1",
    urlPath: "/assets/sound_samples/po12/clap1.wav",
  },
  {
    id: "clap2",
    key: "F#1",
    urlPath: "/assets/sound_samples/po12/clap2.wav",
  },
  {
    id: "hihat_closed",
    key: "G1",
    urlPath: "/assets/sound_samples/po12/hh_closed.wav",
  },
  {
    id: "hihat_open",
    key: "A1",
    urlPath: "/assets/sound_samples/po12/hh_open.wav",
  },
];
