import React, { useState, useRef } from "react";
import CoordinateHUD from "@/components/GraphingTools/GraphPage/CoordinateHUD";
import OriginMarker from "@/components/GraphingTools/GraphPage/OriginMarker";
import AxisArrows from "@/components/GraphingTools/GraphPage/AxisArrows";
import GridLines from "@/components/GraphingTools/GraphPage/GridLines";
import MatrixResults from "@/components/GraphingTools/MatrixResult"; // New component for displaying results

const GraphPaper: React.FC<{ width?: number; height?: number }> = ({
  width = 800,
  height = 500,
}) => {
  const [unit, setUnit] = useState(40); // pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // panning offset in pixels
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [transformedMatrix, setTransformedMatrix] = useState<number[][] | null>(
    null
  ); // New state for transformed matrix
  const [error, setError] = useState<string | null>(null); // For error messages

  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  const xRange = [-width / 2, width / 2];
  const yRange = [-height / 2, height / 2];

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIntensity = 1.1;
    const newUnit = e.deltaY < 0 ? unit * zoomIntensity : unit / zoomIntensity;
    setUnit(Math.max(10, Math.min(200, newUnit)));
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
    setUnit(40); // Reset zoom level
    setOffset({ x: 0, y: 0 }); // Reset panning
  };

  const fetchTransformedMatrix = async () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]; // Example input matrix
    const rotation = { x: 45 }; // Example rotation (in degrees)
    const translation = { x: 10, y: 5 }; // Example translation

    try {
      const response = await fetch("https://mlab-uezm.onrender.com/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matrix, rotation, translation }),
      });

      if (!response.ok) {
        throw new Error("Transformation failed");
      }

      const data = await response.json();
      setTransformedMatrix(data.transformed);
      setError(null); // Clear any previous error
    } catch {
      console.error("Error fetching transformed matrix:", error);
      setError("Failed to transform matrix. Please try again.");
      setTransformedMatrix(null); // Clear any previous results
    }
  };

  // Visualize the points (from transformed matrix) on the grid
  const visualizeTransformedPoints = () => {
    if (!transformedMatrix) return [];
    const points = [];
    for (const row of transformedMatrix) {
      const x = row[0] * unit + offset.x;
      const y = -row[1] * unit + offset.y; // Flip Y-axis to match canvas coordinates
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
        {/* Grid and other components */}
        <GridLines
          width={width}
          height={height}
          unit={unit}
          offset={offset}
          xRange={xRange}
          yRange={yRange}
        />
        <OriginMarker
          width={width}
          height={height}
          offset={offset}
          unit={unit}
        />
        <AxisArrows width={width} height={height} offset={offset} />

        {/* Visualize transformed points */}
        {visualizeTransformedPoints().map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={5} fill="blue" />
        ))}

        {/* Coordinate HUD */}
        <CoordinateHUD
          mouse={mouse}
          unit={unit}
          offset={offset}
          width={width}
          height={height}
        />
      </svg>

      {/* Matrix transformation button */}
      <button
        onClick={fetchTransformedMatrix}
        className="absolute top-2 left-12 bg-white border border-gray-300 rounded px-2 py-1 cursor-pointer shadow-sm hover:bg-gray-50"
        title="Create Visualization"
      >
        Create Visualization
      </button>

      {/* Display transformation results */}
      <MatrixResults matrixData={transformedMatrix} errorMessage={error} />

      {/* Reset button */}
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
