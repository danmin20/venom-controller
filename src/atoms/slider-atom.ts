import { atom } from "recoil";
export const speedState = atom({
  key: "speedState",
  default: 13,
});

export const spikeState = atom({
  key: "spikeState",
  default: 0.6,
});

export const processState = atom({
  key: "processState",
  default: 1,
});
