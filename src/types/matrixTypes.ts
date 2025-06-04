// types/matrixTypes.ts (or define locally)
export interface MatrixSubmissionPayload {
  matrix: number[][];
  rotation?: { x: number; y: number; z: number };
  translation?: { x: number; y: number; z: number };
}
