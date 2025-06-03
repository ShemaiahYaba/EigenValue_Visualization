import React, { useState, useRef } from "react";
import CoordinateHUD from "@/components/GraphingTools/GraphPage/CoordinateHUD";
import OriginMarker from "@/components/GraphingTools/GraphPage/OriginMarker";
import AxisArrows from "@/components/GraphingTools/GraphPage/AxisArrows";
import GridLines from "@/components/GraphingTools/GraphPage/GridLines";

import { useMatrix } from "@/hooks/useMatrix";

const Graph2D: React.FC<{ width?: number; height?: number }> = ({
  width = 800,
  height = 400,
}) => {
  const [unit, setUnit] = useState(100); // Default unit size
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { transformedMatrix } = useMatrix();

  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  // Define minimum and maximum unit sizes
  const MIN_UNIT_SIZE = 0.01;
  const MAX_UNIT_SIZE = 5000000; // Set this to your preferred maximum zoom-out

  // Handling the zoom on mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 1.05;

    // Calculate the intended new unit
    const newUnit = e.deltaY < 0 ? unit * zoomFactor : unit / zoomFactor;

    // Prevent zooming in past minimum
    if (newUnit < MIN_UNIT_SIZE && e.deltaY > 0) return;
    // Prevent zooming out past maximum
    if (newUnit > MAX_UNIT_SIZE && e.deltaY < 0) return;

    // Clamp the unit to the allowed range
    const clampedUnit = Math.max(
      MIN_UNIT_SIZE,
      Math.min(MAX_UNIT_SIZE, newUnit)
    );

    // Get the mouse position relative to the graph container
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate the graph coordinates of the mouse position
    const graphX = (mouseX - offset.x - width / 2) / unit;
    const graphY = (mouseY - offset.y - height / 2) / -unit;

    // Calculate the new offset so that the zoom happens around the mouse cursor
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
    setUnit(100); // Reset to default unit size
    setOffset({ x: 0, y: 0 }); // Reset offset to origin
  };

  const center = {
    x: width / 2 + offset.x,
    y: height / 2 + offset.y,
  };

  const visualizeTransformedPoints = () => {
    if (!transformedMatrix) return [];
    const points = [];
    for (const row of transformedMatrix) {
      const x = row[0] * unit + center.x;
      const y = -row[1] * unit + center.y;
      points.push({ x, y });
    }
    return points;
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-200 dark:bg-gray-900"
      style={{ height: "90vh", width: "100vw" }}
    >
      <div style={{ width: "80vw", height: "100%" }}>
        <div className="relative inline-block select-none w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            className={`bg-white ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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

            {visualizeTransformedPoints().map((point, index) => (
              <line
                key={index}
                x1={center.x}
                y1={center.y}
                x2={point.x}
                y2={point.y}
                stroke="#e11d48"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
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
            className="absolute top-2 left-2 bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer shadow-sm hover:bg-gray-50 flex items-center justify-center"
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
