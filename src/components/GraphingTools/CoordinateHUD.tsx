import React from "react";

interface Props {
  mouse: { x: number; y: number };
  unit: number;
  offset: { x: number; y: number };
  width: number;
  height: number;
}

const CoordinateHUD: React.FC<Props> = ({
  mouse,
  unit,
  offset,
  width,
  height,
}) => {
  const centerX = width / 2 + offset.x;
  const centerY = height / 2 + offset.y;
  const x = ((mouse.x - centerX) / unit).toFixed(2);
  const y = (-(mouse.y - centerY) / unit).toFixed(2);

  return (
    <div className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded px-2 py-1 text-xs">
      ({x}, {y})
    </div>
  );
};

export default CoordinateHUD;
