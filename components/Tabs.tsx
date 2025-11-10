
import React from 'react';
import { AssessmentStageType } from '../types';

interface TabsProps {
  stages: AssessmentStageType[];
  activeStage: AssessmentStageType;
  onStageChange: (stage: AssessmentStageType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ stages, activeStage, onStageChange }) => {
  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-1 sm:space-x-4 px-4 sm:px-8" aria-label="Tabs">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => onStageChange(stage)}
            className={`
              ${
                activeStage === stage
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 focus:outline-none
            `}
          >
            {stage}
          </button>
        ))}
      </nav>
    </div>
  );
};
