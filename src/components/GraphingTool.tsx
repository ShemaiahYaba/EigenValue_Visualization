import React, { useState, useRef } from "react";
import CoordinateHUD from "@/components/CodrinateHUD";
import OriginMarker from "@/components/OriginMarker";
import AxisArrows from "@/components/AxisArrows";
import GridLines from "@/components/GridLines";

const GraphPaper: React.FC<{ width?: number; height?: number }> = ({
  width = 800,
  height = 600,
}) => {
  const [unit, setUnit] = useState(40); // pixels per unit
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // panning offset in pixels
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
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

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width={width}
        height={height}
        style={{ background: "#fff", cursor: dragging ? "grabbing" : "grab" }}
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

        {/* Coordinate HUD */}
        <CoordinateHUD
          mouse={mouse}
          unit={unit}
          offset={offset}
          width={width}
          height={height}
        />
      </svg>

      {/* Reset button */}
      <button
        onClick={handleReset}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "5px",
          cursor: "pointer",
        }}
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
