import { AppleBridge } from "apple-bridge";

export function createAppleBridge() {
  const appleBridge = new AppleBridge({ music: true });
  return appleBridge;
}
