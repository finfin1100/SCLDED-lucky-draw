export type DrawMode = "random" | "wheel";

export type DrawStatus = {
  displayName: string;
  winner: string[];
  isDrawing: boolean;
};