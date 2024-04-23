type Type = "player_state_change";
export interface EventsName {
  playing: (type: Type, data?: any) => any;
  stopped: () => any;
  paused: (type: Type, data?: any) => any;
}
