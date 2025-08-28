
import React, { useState } from 'react';
import { GeneratedDocument } from '../types';
import DocumentViewer from './DocumentViewer';

interface ResultsDisplayProps {
  documents: GeneratedDocument[];
  error: string | null;
  onStartOver: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ documents, error, onStartOver }) => {
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-3xl font-bold text-red-500">Generation Failed</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">{error}</p>
        <button
          onClick={onStartOver}
          className="mt-8 px-6 py-2 bg-primary-600 text-white font-bold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!documents || documents.length === 0) {
     return (
        <div className="text-center p-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">No Documents Generated</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">The AI did not return any documents. This might be a temporary issue.</p>
            <button
                onClick={onStartOver}
                className="mt-8 px-6 py-2 bg-primary-600 text-white font-bold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200"
            >
                Start Over
            </button>
        </div>
    );
  }

  const activeDocument = documents[activeDocIndex];

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">3. Your Generated Standards</h2>
            <button
                onClick={onStartOver}
                className="px-6 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            >
                Start Over
            </button>
        </div>
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 px-4 mb-6 md:mb-0">
          <nav className="sticky top-24">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Documents</h3>
            <ul className="space-y-1">
              {documents.map((doc, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveDocIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                      index === activeDocIndex
                        ? 'bg-primary-100 text-primary-700 font-bold dark:bg-primary-900/50 dark:text-primary-300'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    {doc.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 px-4">
          <DocumentViewer document={activeDocument} />
        </main>
      </div>
    </div>
  );
};

export default ResultsDisplay;
