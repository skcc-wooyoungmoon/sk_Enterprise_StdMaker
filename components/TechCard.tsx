
import React from 'react';
import { Technology } from '../types';

interface TechCardProps {
  technology: Technology;
  isSelected: boolean;
  onSelect: () => void;
}

const TechCard: React.FC<TechCardProps> = ({ technology, isSelected, onSelect }) => {
  const colorClasses = {
    border: `border-${technology.color}-500`,
    ring: `ring-${technology.color}-300`,
    bg: `bg-${technology.color}-50 dark:bg-${technology.color}-900/20`,
    text: `text-${technology.color}-800 dark:text-${technology.color}-200`,
  }

  // Tailwind's JIT compiler needs full class names, so we can't fully construct them dynamically.
  // We'll use a switch or map for full class names if needed, but for now this is a limitation.
  // The provided colors in constants.tsx should work with this simple concatenation.
  // A better approach in a real app would be to define these color variants in tailwind.config.js.

  const selectedClasses = isSelected
    ? `border-${technology.color}-500 dark:border-${technology.color}-400 ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-${technology.color}-400 bg-${technology.color}-50 dark:bg-slate-700/50`
    : 'border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-700/50';

  return (
    <div
      onClick={onSelect}
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center shadow-sm ${selectedClasses}`}
    >
      <div className="mb-2">{technology.logo}</div>
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{technology.name}</span>
    </div>
  );
};

export default TechCard;
