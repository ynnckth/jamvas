import { Seconds } from "tone/build/esm/core/type/Units";

interface Playable {
  play(trackName: string, scheduledTime: Seconds): void;
}
export default Playable;
