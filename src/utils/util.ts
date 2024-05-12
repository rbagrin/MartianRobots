import { Orientation } from "../types/types";

export const LeftOrientationSwitch: Record<Orientation, Orientation> = {
  [Orientation.N]: Orientation.W,
  [Orientation.W]: Orientation.S,
  [Orientation.S]: Orientation.E,
  [Orientation.E]: Orientation.N,
};

export const RightOrientationSwitch: Record<Orientation, Orientation> = {
  [Orientation.N]: Orientation.E,
  [Orientation.E]: Orientation.S,
  [Orientation.S]: Orientation.W,
  [Orientation.W]: Orientation.N,
};

export function getKeyOfScent(x: number, y: number): string {
  return `${x}|${y}`;
}
