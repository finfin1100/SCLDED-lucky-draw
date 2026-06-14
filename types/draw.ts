export type DrawMode =
  | "random"
  | "wheel"
  | "boss"
  | "box"
  | "ladder";

export type DrawStatus = {
  displayName: string;
  winner: string[];
  isDrawing: boolean;
};