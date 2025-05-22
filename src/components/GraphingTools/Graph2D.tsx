import React, { useState, useRef, useEffect } from "react";
import CoordinateHUD from "@/components/GraphingTools/GraphPage/CoordinateHUD";
import OriginMarker from "@/components/GraphingTools/GraphPage/OriginMarker";
import AxisArrows from "@/components/GraphingTools/GraphPage/AxisArrows";
import GridLines from "@/components/GraphingTools/GraphPage/GridLines";

import { useMatrix } from "@/hooks/useMatrix";

const ANIMATION_DURATION = 300; // ms

const Graph2D: React.FC<{ width?: number; height?: number }> = ({
  width = 900,
  height = 450,
}) => {
  const [unit, setUnit] = useState(10);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { matrix, transformedMatrix } = useMatrix();

  // Ref to track animation frame ID so we can cancel if needed
  const animationFrameRef = useRef<number | null>(null);
  // Timestamp when animation started
  const animationStartRef = useRef<number | null>(null);

  // Interpolated points state: these are what we draw animated
  const [animatedPoints, setAnimatedPoints] = useState<
    { x: number; y: number }[]
  >([]);

  // Calculate original points from `matrix` (input matrix vectors)
  const originalPoints = React.useMemo(() => {
    if (!matrix) return [];
    // Assume 2D vectors: x = row[0], y = row[1]
    return matrix.map((row) => ({ x: row[0], y: row[1] }));
  }, [matrix]);

  // Calculate target points from transformedMatrix
  const targetPoints = React.useMemo(() => {
    if (!transformedMatrix) return [];
    return transformedMatrix.map((row) => ({ x: row[0], y: row[1] }));
  }, [transformedMatrix]);

  // Linear interpolation helper
  const lerp = (start: number, end: number, t: number) =>
    start + (end - start) * t;

  // Animate vectors when either originalPoints or targetPoints change
  useEffect(() => {
    if (originalPoints.length === 0 || targetPoints.length === 0) {
      setAnimatedPoints([]);
      return;
    }

    // Cancel previous animation if any
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationStartRef.current = null;

    const animate = (timestamp: number) => {
      if (!animationStartRef.current) animationStartRef.current = timestamp;
      const elapsed = timestamp - animationStartRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Interpolate each point from original to target by progress
      const interpolated = originalPoints.map((orig, i) => {
        const target = targetPoints[i];
        return {
          x: lerp(orig.x, target.x, progress),
          y: lerp(orig.y, target.y, progress),
        };
      });

      setAnimatedPoints(interpolated);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount or re-run
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [originalPoints, targetPoints]);

  // The rest of your pan and zoom handlers here (unchanged)...
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef(offset);

  const MIN_UNIT_SIZE = 0.01;

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const zoomFactor = 1.05;
    const newUnit = e.deltaY < 0 ? unit * zoomFactor : unit / zoomFactor;
    const clampedUnit = Math.max(MIN_UNIT_SIZE, newUnit);

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
    setUnit(40);
    setOffset({ x: 0, y: 0 });
  };

  const center = {
    x: width / 2 + offset.x,
    y: height / 2 + offset.y,
  };

  // Render animated vectors
  const renderVectors = () => {
    return animatedPoints.map((point, index) => {
      const x = point.x * unit + center.x;
      const y = -point.y * unit + center.y;

      return (
        <line
          key={index}
          x1={center.x}
          y1={center.y}
          x2={x}
          y2={y}
          stroke="#e11d48"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-200 dark:bg-gray-900"
      style={{ height: "90vh", width: "100vw" }}
    >
      <div style={{ width: "100vw", height: "100%" }}>
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

            {renderVectors()}

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
