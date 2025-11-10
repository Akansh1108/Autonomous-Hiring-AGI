
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { AssessmentStageWrapper } from './components/AssessmentStageWrapper';
import { AssessmentStageType } from './types';

const App: React.FC = () => {
  const [activeStage, setActiveStage] = useState<AssessmentStageType>(AssessmentStageType.TECHNICAL);

  const stages = [
    AssessmentStageType.TECHNICAL,
    AssessmentStageType.BEHAVIORAL,
    AssessmentStageType.SYNTHESIS,
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <Tabs stages={stages} activeStage={activeStage} onStageChange={setActiveStage} />
          <div className="p-4 sm:p-6 md:p-8">
            <AssessmentStageWrapper stage={activeStage} key={activeStage} />
          </div>
        </div>
        <footer className="text-center text-gray-500 mt-8 text-sm">
          <p>Powered by Gemini API. Built for modern hiring teams.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
