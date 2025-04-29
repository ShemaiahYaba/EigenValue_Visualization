import React from "react";

const OriginMarker: React.FC<{
  width: number;
  height: number;
  offset: { x: number; y: number };
  unit: number;
}> = ({ width, height, offset }) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;

  return <circle cx={centerX} cy={centerY} r={5} fill="red" />;
};

export default OriginMarker;
