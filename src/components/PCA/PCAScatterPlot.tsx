import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const WIDTH = 350;
const HEIGHT = 320;
const PADDING = 40;
const POINT_RADIUS = 5;
const COLORS = ["#FFD600", "#FF1744", "#00C853", "#8e24aa"];

function getMinMax(arr: number[][], dim: number) {
  const vals = arr.map((row) => row[dim]);
  return [Math.min(...vals), Math.max(...vals)];
}

const PCAScatterPlot: React.FC<{ data: number[][]; pcaResult: any; selectedPCs: number }> = ({ pcaResult }) => {
  if (!pcaResult || !pcaResult.projected_data) {
    return <div className="text-center text-gray-500">[Scatter plot visualization]</div>;
  }
  const points: number[][] = pcaResult.projected_data;
  const pcs = pcaResult.principal_components;

  // 3D if at least 3 PCs, else 2D
  if (points[0]?.length >= 3) {
    // 3D scatter plot using react-three-fiber
    return (
      <div style={{ width: WIDTH, height: HEIGHT }} className="bg-white rounded-lg shadow">
        <Canvas camera={{ position: [6, 6, 6], fov: 60 }} style={{ width: WIDTH, height: HEIGHT }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          {/* Points */}
          {points.map((pt, i) => (
            <mesh key={i} position={pt.slice(0, 3)}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#1976d2" opacity={0.85} transparent />
            </mesh>
          ))}
          {/* PC arrows */}
          {pcs && pcs[0] && pcs[1] && pcs[2] && (
            Array.from({ length: Math.min(4, pcs[0].length) }).map((_, i) => {
              const dir = new THREE.Vector3(pcs[0][i], pcs[1][i], pcs[2][i]).normalize();
              return (
                <arrowHelper
                  key={i}
                  args={[dir, new THREE.Vector3(0, 0, 0), 2.5, COLORS[i]]}
                />
              );
            })
          )}
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

  // 2D fallback
  const xRange = getMinMax(points, 0);
  const yRange = getMinMax(points, 1);
  const xScale = (x: number) =>
    PADDING + ((x - xRange[0]) / (xRange[1] - xRange[0] || 1)) * (WIDTH - 2 * PADDING);
  const yScale = (y: number) =>
    HEIGHT - PADDING - ((y - yRange[0]) / (yRange[1] - yRange[0] || 1)) * (HEIGHT - 2 * PADDING);
  const arrowLength = 60;
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;

  return (
    <svg width={WIDTH} height={HEIGHT} className="bg-white rounded-lg shadow">
      {/* Axes */}
      <line x1={PADDING} y1={centerY} x2={WIDTH - PADDING} y2={centerY} stroke="#bbb" strokeWidth={1} />
      <line x1={centerX} y1={PADDING} x2={centerX} y2={HEIGHT - PADDING} stroke="#bbb" strokeWidth={1} />
      {/* Points */}
      {points.map((pt, i) => (
        <circle
          key={i}
          cx={xScale(pt[0])}
          cy={yScale(pt[1])}
          r={POINT_RADIUS}
          fill="#1976d2"
          opacity={0.8}
        />
      ))}
      {/* PC1 and PC2 arrows */}
      {pcs && pcs[0] && pcs[1] && (
        <>
          {/* PC1 (yellow) */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + pcs[0][0] * arrowLength}
            y2={centerY - pcs[1][0] * arrowLength}
            stroke={COLORS[0]}
            strokeWidth={3}
            markerEnd="url(#arrowhead1)"
          />
          {/* PC2 (red) */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX + pcs[0][1] * arrowLength}
            y2={centerY - pcs[1][1] * arrowLength}
            stroke={COLORS[1]}
            strokeWidth={3}
            markerEnd="url(#arrowhead2)"
          />
          {/* Arrowheads */}
          <defs>
            <marker id="arrowhead1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
              <polygon points="0,0 8,4 0,8" fill={COLORS[0]} />
            </marker>
            <marker id="arrowhead2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
              <polygon points="0,0 8,4 0,8" fill={COLORS[1]} />
            </marker>
          </defs>
        </>
      )}
    </svg>
  );
};

export default PCAScatterPlot; 