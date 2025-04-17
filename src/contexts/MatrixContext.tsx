// src/context/matrix/MatrixContext.tsx
import { createContext } from "react";

export type Vector3 = { x: number; y: number; z: number };

export interface MatrixContextType {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
  transformedMatrix: number[][] | null;
  setTransformedMatrix: React.Dispatch<React.SetStateAction<number[][] | null>>;
  rotation: Vector3;
  setRotation: React.Dispatch<React.SetStateAction<Vector3>>;
  translation: Vector3;
  setTranslation: React.Dispatch<React.SetStateAction<Vector3>>;
}

export const MatrixContext = createContext<MatrixContextType | undefined>(
  undefined
);
