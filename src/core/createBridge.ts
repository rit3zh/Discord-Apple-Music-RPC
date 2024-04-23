import ITunes from "itunes-bridge";

export function createBridge() {
  const appleBridge = ITunes.emitter;
  return appleBridge;
}
