
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} Enterprise Standards Generator. All Rights Reserved.</p>
        <p>Powered by AI, designed for architects.</p>
      </div>
    </footer>
  );
};

export default Footer;
