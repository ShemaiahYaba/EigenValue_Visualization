// GraphPage.tsx
import React, { useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMatrix } from "@/hooks/useMatrix";

const Grid: React.FC = () => {
  return <gridHelper args={[100, 100, "#aaa", "#ccc"]} />;
};

const Axes: React.FC = () => {
  return <axesHelper args={[10]} />;
};

const OriginMarker: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
};

const TransformedVectors: React.FC<{ unit: number }> = ({ unit }) => {
  const { transformedMatrix } = useMatrix();

  if (!transformedMatrix) return null;

  return (
    <>
      {transformedMatrix.map((row: number[], index: number) => {
        const vec = new THREE.Vector3(row[0] * unit, row[1] * unit, 0);
        const dir = vec.clone().normalize();
        const length = vec.length();

        return (
          <arrowHelper
            key={index}
            args={[dir, new THREE.Vector3(0, 0, 0), length, 0xe11d48]}
          />
        );
      })}
    </>
  );
};

const CoordinateHUD: React.FC = () => {
  const { camera, mouse, size } = useThree();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useFrame(() => {
    const x = (mouse.x * size.width) / 2 / camera.zoom;
    const y = (-mouse.y * size.height) / 2 / camera.zoom;
    setCoords({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  });

  return (
    <Html
      position={[0, 0, 0]}
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      <div className="bg-white px-2 py-1 border rounded shadow text-xs">
        X: {coords.x}, Y: {coords.y}
      </div>
    </Html>
  );
};

const GraphScene: React.FC = () => {
  const [unit] = useState(1);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Grid />
      <Axes />
      <OriginMarker />
      <TransformedVectors unit={unit} />
      <CoordinateHUD />
      <OrbitControls enableRotate={false} />
    </>
  );
};

const GraphPage: React.FC = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }}>
        <GraphScene />
      </Canvas>
    </div>
  );
};

export default GraphPage;
