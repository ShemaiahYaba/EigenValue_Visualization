// components/TransformedVectors.tsx
import React from "react";
import { useMatrix } from "@/hooks/useMatrix";
import { Vector3 } from "three";
import { ArrowHelper } from "three";

export const TransformedVectors: React.FC = () => {
  const { transformedMatrix } = useMatrix();

  if (!transformedMatrix || !Array.isArray(transformedMatrix)) return null;

  return (
    <>
      {transformedMatrix.map((row, index) => {
        const [x, y, z = 0] = row;
        const dir = new Vector3(x, y, z).normalize();
        const origin = new Vector3(0, 0, 0);
        const length = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        const color = 0xe11d48; // rose-600
        const arrowHelper = new ArrowHelper(dir, origin, length, color);
        return <primitive key={index} object={arrowHelper} />;
      })}
    </>
  );
};
