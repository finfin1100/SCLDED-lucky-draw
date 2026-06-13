export type DrawMode =
  | "random"
  | "wheel"
  | "boss"
  | "box";

export type DrawStatus = {
  displayName: string;
  winner: string[];
  isDrawing: boolean;
};