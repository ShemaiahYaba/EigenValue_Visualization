// components/Graph3D.tsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls";
import { TransformedVectors } from "@/components/GraphingTools/TransformedVectors";

// Create a component to handle the auto-rotation
const AutoRotate: React.FC = () => {
  const { gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isIdle, setIsIdle] = useState(true);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => setIsIdle(true), 3000);
    };

    const element = gl.domElement;

    element.addEventListener("pointerdown", handleActivity);
    element.addEventListener("pointermove", handleActivity);
    element.addEventListener("wheel", handleActivity);

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      element.removeEventListener("pointerdown", handleActivity);
      element.removeEventListener("pointermove", handleActivity);
      element.removeEventListener("wheel", handleActivity);
    };
  }, [gl]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isIdle;
    }
  }, [isIdle]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0, 0]}
      minDistance={2}
      maxDistance={40}
      autoRotateSpeed={1}
    />
  );
};

const Graph3D: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      style={{ height: "90vh", width: "100vw" }}
    >
      <div style={{ width: "80vw", height: "100%" }}>
        <Canvas camera={{ position: [8, 8, 8], fov: 60 }}>
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />

          <gridHelper args={[50, 20, "blue", "gray"]} />
          <GizmoHelper alignment="top-right" margin={[160, 80]}>
            <GizmoViewport
              axisColors={["#ff0000", "#00ff00", "#0000ff"]}
              labelColor="white"
            />
          </GizmoHelper>

          {/* Transformed vectors */}
          <TransformedVectors />

          {/* User interaction with auto-rotation */}
          <AutoRotate />
        </Canvas>
      </div>
    </div>
  );
};

export default Graph3D;
