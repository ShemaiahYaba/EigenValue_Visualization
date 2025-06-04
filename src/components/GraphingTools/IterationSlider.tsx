import React from "react";

interface IterationSliderProps {
  maxSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
  label?: string;
}

const IterationSlider: React.FC<IterationSliderProps> = ({
  maxSteps,
  currentStep,
  onStepChange,
  label = "Step",
}) => {
  if (maxSteps <= 1) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow inline-block select-none">
      <input
        type="range"
        min={0}
        max={maxSteps - 1}
        value={currentStep}
        onChange={(e) => onStepChange(Number(e.target.value))}
        className="w-64"
      />
      <div className="text-sm text-center text-gray-700 dark:text-gray-300 mt-1">
        {label} {currentStep + 1} / {maxSteps}
      </div>
    </div>
  );
};

export default IterationSlider;
