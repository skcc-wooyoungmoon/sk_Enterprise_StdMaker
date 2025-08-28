
import React, { useState } from 'react';
import { TechSelection, TechCategory } from '../types';
import { TECHNOLOGIES } from '../constants';
import TechCard from './TechCard';

interface TechStackSelectorProps {
  initialSelection: TechSelection;
  onNext: (selection: TechSelection) => void;
  nextStep: () => void;
}

const TechStackSelector: React.FC<TechStackSelectorProps> = ({ initialSelection, onNext, nextStep }) => {
  const [selection, setSelection] = useState<TechSelection>(initialSelection);

  const handleSelect = (category: TechCategory, techName: string) => {
    setSelection(prev => {
      const currentCategorySelection = prev[category] || [];
      const isSelected = currentCategorySelection.includes(techName);
      
      return {
        ...prev,
        [category]: isSelected 
          ? currentCategorySelection.filter(t => t !== techName) 
          : [...currentCategorySelection, techName]
      };
    });
  };
  
  const handleNext = () => {
    onNext(selection);
    nextStep();
  };

  const isNextDisabled = Object.values(selection).every(arr => arr.length === 0);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">1. Select Your Technology Stack</h2>
      <p className="mt-2 text-center text-slate-600 dark:text-slate-400">Choose the tools and frameworks that power your enterprise applications.</p>
      
      <div className="mt-8 space-y-8">
        {Object.entries(TECHNOLOGIES).map(([category, techs]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-2 border-b-2 border-primary-200 dark:border-primary-800">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {techs.map(tech => (
                <TechCard 
                  key={tech.name}
                  technology={tech}
                  isSelected={(selection[category as TechCategory] || []).includes(tech.name)}
                  onSelect={() => handleSelect(category as TechCategory, tech.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleNext}
          disabled={isNextDisabled}
          className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg shadow-md hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Next: Configure Settings &rarr;
        </button>
      </div>
    </div>
  );
};

export default TechStackSelector;
