export const MIN_MATRIX_SIZE = 2;
export const MAX_MATRIX_SIZE = 4;

export const DEFAULT_MATRIX_SIZE = 2;

export const MATRIX_SIZE_OPTIONS = Array.from(
  { length: MAX_MATRIX_SIZE - MIN_MATRIX_SIZE + 1 },
  (_, i) => MIN_MATRIX_SIZE + i
);

export type Matrix = (number | string)[][];

export const createEmptyMatrix = (size: number): Matrix => {
  return Array(size).fill(null).map(() => Array(size).fill(''));
};
