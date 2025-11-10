
import React from 'react';
import { BotIcon } from './icons/BotIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BotIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-xl font-bold tracking-tight text-gray-100">
              Autonomous Hiring AGI
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
