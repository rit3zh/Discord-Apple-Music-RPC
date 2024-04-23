declare module "itunes-bridge" {
  type Type = "player_state_change" | "new_track";

  export interface TrackData {
    name: string;
    artist: string;
    album: string;
    mediaKind: string;
    duration: number;
    elapsedTime: number;
    remainingTime: number;
    genre: number;
    releaseYear: number;
    id: number;
    playerState: string;
  }
  export interface EventsName {
    playing: (type: Type, data?: TrackData) => any;
    stopped: () => any;
    paused: (type: Type, data?: TrackData) => any;
  }

  import { TypedEmitter } from "tiny-typed-emitter";
  const emitter = new TypedEmitter<EventsName>();
  export default {
    emitter,
  };
}
