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

  const handleLeft = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleRight = () => {
    if (currentStep < maxSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-2 rounded shadow inline-block select-none flex flex-col items-center">
      <div className="flex items-center gap-2">
        <button
          onClick={handleLeft}
          disabled={currentStep === 0}
          className={`px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Previous iteration"
        >
          &#8592;
        </button>
        <input
          type="range"
          min={0}
          max={maxSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(Number(e.target.value))}
          className="w-64 mx-2"
        />
        <button
          onClick={handleRight}
          disabled={currentStep === maxSteps - 1}
          className={`px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label="Next iteration"
        >
          &#8594;
        </button>
      </div>
      <div className="text-sm text-center text-gray-700 dark:text-gray-300 mt-1">
        {label} {currentStep + 1} / {maxSteps}
      </div>
    </div>
  );
};

export default IterationSlider;
