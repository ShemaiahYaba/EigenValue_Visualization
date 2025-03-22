import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { ArrowHelper, Vector3 } from "three";

const EigenVectorVisualization = ({
  eigenvectors,
}: {
  eigenvectors: number[][];
}) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {eigenvectors.map((vec, index) => {
        const dir = new Vector3(vec[0], vec[1], vec.length > 2 ? vec[2] : 0)
          .clone()
          .normalize();
        const arrowRef = useRef<ArrowHelper | null>(null);

        return (
          <primitive
            key={index}
            object={
              new ArrowHelper(
                dir, // Direction
                new Vector3(0, 0, 0), // Origin
                2, // Length
                0x00000 // Color
              )
            }
            ref={arrowRef}
          />
        );
      })}
    </Canvas>
  );
};

export default EigenVectorVisualization;
