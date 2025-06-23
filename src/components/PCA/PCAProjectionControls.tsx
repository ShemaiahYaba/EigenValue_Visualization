import React from "react";

const PCAProjectionControls: React.FC<{
  maxPCs: number;
  selectedPCs: number;
  onChange: (n: number) => void;
}> = ({ maxPCs, selectedPCs, onChange }) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <label htmlFor="pc-slider" className="font-medium">Number of principal components:</label>
      <input
        id="pc-slider"
        type="range"
        min={1}
        max={maxPCs}
        value={selectedPCs}
        onChange={e => onChange(Number(e.target.value))}
        className="w-40"
      />
      <span className="font-mono">{selectedPCs}</span>
    </div>
  );
};

export default PCAProjectionControls; 