
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <svg className="w-10 h-10 text-primary-600 dark:text-primary-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Enterprise Standards Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
