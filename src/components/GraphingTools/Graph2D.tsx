import React, { useState, useRef } from "react";
import CoordinateHUD from "@/components/GraphingTools/GraphPage/CoordinateHUD";
import OriginMarker from "@/components/GraphingTools/GraphPage/OriginMarker";
import AxisArrows from "@/components/GraphingTools/GraphPage/AxisArrows";
import GridLines from "@/components/GraphingTools/GraphPage/GridLines";

interface Point {
  x: number;
  y: number;
}

type GraphMode = "vector" | "eigenvalue";

interface Graph2DProps {
  width?: number;
  height?: number;
  vectors?: number[][];
  eigenvalues?: number[];
  mode: GraphMode;
  currentStep: number; // <-- Now required
  trueEigenvalues?: number[];
}

const Graph2D: React.FC<Graph2DProps> = ({
  width = 800,
  height = 400,
  vectors,
  eigenvalues,
  mode,
  currentStep,
  trueEigenvalues,
}) => {
  const [unit, setUnit] = useState(100);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  const MIN_UNIT_SIZE = 0.01;
  const MAX_UNIT_SIZE = 5_000_000;

  const getPointsToDraw = (): Point[] => {
    const centerX = width / 2; // + offset.x if you have panning
    const centerY = height / 2; // + offset.y if you have panning

    if (mode === "vector" && vectors?.length) {
      return vectors.slice(0, currentStep + 1).map(([x, y]) => ({
        x: x * unit + centerX,
        y: -y * unit + centerY,
      }));
    }

    if (mode === "eigenvalue" && eigenvalues?.length) {
      return eigenvalues.slice(0, currentStep + 1).map((val, i) => ({
        x: i * unit + centerX,
        y: -val * unit + centerY,
      }));
    }

    return [];
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 1.05;
    const newUnit = e.deltaY < 0 ? unit * zoomFactor : unit / zoomFactor;

    if (newUnit < MIN_UNIT_SIZE && e.deltaY > 0) return;
    if (newUnit > MAX_UNIT_SIZE && e.deltaY < 0) return;

    const clampedUnit = Math.max(
      MIN_UNIT_SIZE,
      Math.min(MAX_UNIT_SIZE, newUnit)
    );

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const graphX = (mouseX - offset.x - width / 2) / unit;
    const graphY = (mouseY - offset.y - height / 2) / -unit;

    const newOffset = {
      x: mouseX - graphX * clampedUnit - width / 2,
      y: mouseY + graphY * clampedUnit - height / 2,
    };

    setUnit(clampedUnit);
    setOffset(newOffset);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = offset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setOffset({
        x: offsetStart.current.x + dx,
        y: offsetStart.current.y + dy,
      });
    }
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setDragging(false);
  const handleMouseLeave = () => setDragging(false);
  const handleReset = () => {
    setUnit(100);
    setOffset({ x: 0, y: 0 });
  };

  const center = {
    x: width / 2 + offset.x,
    y: height / 2 + offset.y,
  };

  const points = getPointsToDraw();

  return (
    <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-900 w-full h-full max-h-[90vh] overflow-hidden">
      <div className="w-full h-full max-w-5xl max-h-[80vh]">
        <div className="relative select-none w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            className={`${
              dragging ? "cursor-grabbing" : "cursor-grab"
            } bg-white dark:bg-gray-900`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="red" />
              </marker>
            </defs>

            <GridLines
              width={width}
              height={height}
              unit={unit}
              offset={offset}
            />
            <OriginMarker
              width={width}
              height={height}
              offset={offset}
              unit={unit}
            />
            <AxisArrows width={width} height={height} offset={offset} />

            {mode === "vector" &&
              points.map((point, i) => (
                <line
                  key={i}
                  x1={center.x}
                  y1={center.y}
                  x2={point.x}
                  y2={point.y}
                  stroke="#e11d48"
                  strokeWidth={2}
                  markerEnd="url(#arrowhead)"
                />
              ))}

            {mode === "eigenvalue" &&
              trueEigenvalues?.map((val, i) => (
                <line
                  key={`true-${i}`}
                  x1={0}
                  y1={-val * unit + center.y}
                  x2={width}
                  y2={-val * unit + center.y}
                  stroke="red "
                  strokeDasharray="5,5"
                  strokeWidth={1}
                />
              ))}

            <CoordinateHUD
              mouse={mouse}
              unit={unit}
              offset={offset}
              width={width}
              height={height}
            />
          </svg>

          <button
            onClick={handleReset}
            className="absolute top-2 left-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded px-2 py-1 cursor-pointer shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"
            title="Reset View"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Graph2D;
