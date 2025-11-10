
import React, { useState, useCallback } from 'react';
import { generateAssessment } from '../services/geminiService';
import { AssessmentStageType } from '../types';
import { JsonViewer } from './JsonViewer';
import { LoadingIcon } from './icons/LoadingIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PLACEHOLDER_DATA } from '../constants';

interface AssessmentStageWrapperProps {
  stage: AssessmentStageType;
}

export const AssessmentStageWrapper: React.FC<AssessmentStageWrapperProps> = ({ stage }) => {
  const [userInput, setUserInput] = useState<string>(PLACEHOLDER_DATA[stage]);
  const [apiOutput, setApiOutput] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setApiOutput(null);
    try {
      const result = await generateAssessment(stage, userInput);
      setApiOutput(result);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [stage, userInput]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Input Data</h2>
        <p className="text-sm text-gray-400 mb-4">
          Provide the necessary data for the <span className="font-semibold text-indigo-300">{stage}</span>.
          The data below is a sample, you can edit it.
        </p>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={`Enter data for ${stage}...`}
          className="w-full h-96 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm font-mono"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-indigo-500/50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
              Generate Assessment
            </>
          )}
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-200 mb-2">AI Generated Output</h2>
        <p className="text-sm text-gray-400 mb-4">
          The structured JSON output from the Gemini model will appear here.
        </p>
        <div className="w-full h-96 bg-gray-900 border border-gray-700 rounded-lg overflow-auto relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
              <LoadingIcon className="h-8 w-8 animate-spin text-indigo-400" />
            </div>
          )}
          {error && (
            <div className="p-4 text-red-400">
              <h3 className="font-bold">Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {apiOutput && <JsonViewer data={apiOutput} />}
           {!isLoading && !error && !apiOutput && (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Output will be displayed here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
