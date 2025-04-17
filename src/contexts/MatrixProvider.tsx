// src/context/matrix/MatrixProvider.tsx
import React, { useState } from "react";
import { MatrixContext } from "./MatrixContext";

export type Vector3 = { x: number; y: number; z: number };

export const MatrixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matrix, setMatrix] = useState<number[][]>([
    [0, 0],
    [0, 0],
  ]);
  const [transformedMatrix, setTransformedMatrix] = useState<number[][] | null>(
    null
  );
  const [rotation, setRotation] = useState<Vector3>({ x: 0, y: 0, z: 0 });
  const [translation, setTranslation] = useState<Vector3>({ x: 0, y: 0, z: 0 });

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        setMatrix,
        transformedMatrix,
        setTransformedMatrix,
        rotation,
        setRotation,
        translation,
        setTranslation,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
