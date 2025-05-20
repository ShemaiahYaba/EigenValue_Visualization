// components/Graph3D.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { TransformedVectors } from "@/components/GraphingTools/TransformedVectors";

const Graph3D: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      style={{ height: "90vh", width: "100vw" }}
    >
      <div style={{ width: "90vw", height: "100%" }}>
        <Canvas camera={{ position: [7, 7, 7], fov: 50 }}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          {/* Grid and coordinate helper */}
          <gridHelper args={[10, 10, `blue`, `gray`]} />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["#ff0000", "#00ff00", "#0000ff"]}
              labelColor="white"
            />
          </GizmoHelper>

          {/* Transformed vectors */}
          <TransformedVectors />

          {/* User interaction */}
          <OrbitControls target={[0, 0, 0]} minDistance={2} maxDistance={20} />
        </Canvas>
      </div>
    </div>
  );
};

export default Graph3D;
