/**
 * Taken from: https://learningmusic.ableton.com/notes-and-scales/play-with-notes-and-scales.html
 */

export const phrygianScale = ["C", "Db", "Eb", "F", "G", "Ab", "Bb"];
export const dorianScale = ["C", "D", "Eb", "F", "G", "A", "Bb"];

export const getScaleForOctave = (notes: string[], octave: number): string[] => {
  return notes.map((note) => `${note}${octave}`);
};
