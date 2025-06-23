// services/matrixServices.ts

const BASE_URL = "https://mlab-uezm.onrender.com"; // Or your actual deployed backend URL

/**
 * Initializes a square matrix of given size, preserving old values if provided.
 */
export const initializeMatrix = (
  prevMatrix: number[][],
  size: number
): number[][] => {
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => prevMatrix?.[row]?.[col] ?? 0)
  );
};

/**
 * Sends a matrix, rotation, and translation to the /transform endpoint.
 */
export const sendMatrixTransform = async (
  matrix: number[][],
  rotation: Record<string, number>,
  translation: Record<string, number>,
  onSuccess: (transformed: number[][]) => void,
  onError?: (error: Error | unknown) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/transform`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matrix, rotation, translation }),
    });

    if (!response.ok) throw new Error("Failed to send matrix");

    const data = await response.json();
    onSuccess(data.transformed);
  } catch (error) {
    onError?.(error);
  }
};

/**
 * Applies the Power Method to estimate the dominant eigenvalue/eigenvector.
 */
export const runPowerMethod = async (
  matrix: number[][],
  onSuccess: (result: {
    vectors: number[][];
    eigenvalues: number[];
    true_max_eigenvalue: number;
  }) => void,
  onError: () => void,
  max_iter: number = 20,
  tol: number = 1e-8,
  initial_vector?: number[]
) => {
  try {
    const body: any = {
      matrix,
      max_iter,
      tol,
    };
    if (initial_vector) {
      body.initial_vector = initial_vector;
    }
    const response = await fetch(
      "https://mlab-uezm.onrender.com/power-method",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    onSuccess(data);
  } catch {
    onError();
  }
};

/**
 * Performs PCA (Principal Component Analysis) on the given dataset.
 */
export const runPCA = async (
  matrix: number[][],
  onSuccess: (result: {
    principal_components: number[][];
    explained_variance: number[];
    explained_variance_ratio: number[];
    projected_data: number[][];
  }) => void,
  onError?: (error: Error | unknown) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/pca`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matrix }),
    });

    if (!response.ok) throw new Error("PCA failed");

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError?.(error);
  }
};