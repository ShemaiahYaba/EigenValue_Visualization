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
  const [unit, setUnit] = useState(40);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { transformedMatrix } = useMatrix();

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
    setUnit(40);
    setOffset({ x: 0, y: 0 });
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

        {visualizeTransformedPoints().map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={5} fill="blue" />
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
