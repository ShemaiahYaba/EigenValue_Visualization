import React, { useState, useRef } from "react";
import CoordinateHUD from "@/components/GraphingTools/GraphPage/CoordinateHUD";
import OriginMarker from "@/components/GraphingTools/GraphPage/OriginMarker";
import AxisArrows from "@/components/GraphingTools/GraphPage/AxisArrows";
import GridLines from "@/components/GraphingTools/GraphPage/GridLines";
import MatrixResults from "@/components/GraphingTools/MatrixResult";
import { useMatrix } from "@/hooks/useMatrix";

const GraphPaper: React.FC<{ width?: number; height?: number }> = ({
  width = 800,
  height = 500,
}) => {
  const [unit, setUnit] = useState(10); // Default unit size
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { transformedMatrix } = useMatrix();

  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  // Define a minimum unit size
  const MIN_UNIT_SIZE = 0.01; // Reasonable lower limit for zooming

  // Handling the zoom on mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 1.1; // Zoom factor for scaling

    // Adjust the unit based on scroll direction (zoom in or out)
    const newUnit = e.deltaY < 0 ? unit * zoomFactor : unit / zoomFactor;

    // Clamp the unit to prevent zooming too far
    const clampedUnit = Math.max(MIN_UNIT_SIZE, newUnit);

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

    // Set the new unit and offset
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
    setUnit(40); // Reset to default unit size
    setOffset({ x: 0, y: 0 }); // Reset offset to origin
  };

  const visualizeTransformedPoints = () => {
    if (!transformedMatrix) return [];
    const points = [];
    for (const row of transformedMatrix) {
      const x = row[0] * unit + offset.x;
      const y = -row[1] * unit + offset.y;
      points.push({ x, y });
    }
    return points;
  };

  return (
    <div className="relative inline-block">
      <svg
        width={width}
        height={height}
        className={`bg-white ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
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
            <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
          </marker>
        </defs>

        <GridLines width={width} height={height} unit={unit} offset={offset} />
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
            x1={offset.x}
            y1={offset.y}
            x2={point.x}
            y2={point.y}
            stroke="blue"
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

      <MatrixResults matrixData={transformedMatrix} errorMessage={null} />

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
  );
};

export default GraphPaper;
