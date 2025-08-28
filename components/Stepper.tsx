
import React from 'react';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Select Tech Stack' },
  { id: 2, name: 'Configure Settings' },
  { id: 3, name: 'Generate & View' },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="p-6 border-b border-slate-200 dark:border-slate-700">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
            {step.id < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-primary-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-primary-600 rounded-full">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute top-10 w-max text-center text-xs text-slate-600 dark:text-slate-300">{step.name}</span>
                </div>
              </>
            ) : step.id === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-white dark:bg-slate-700 border-2 border-primary-600 rounded-full">
                  <span className="h-2.5 w-2.5 bg-primary-600 rounded-full" aria-hidden="true" />
                   <span className="absolute top-10 w-max text-center text-xs font-semibold text-primary-600 dark:text-primary-300">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200 dark:bg-slate-600" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 rounded-full">
                   <span className="absolute top-10 w-max text-center text-xs text-slate-500 dark:text-slate-400">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Stepper;
