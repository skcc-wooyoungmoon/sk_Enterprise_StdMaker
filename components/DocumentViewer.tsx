import React, { useEffect, useRef, useState } from 'react';
import { GeneratedDocument } from '../types';

// Declare global variables from CDN scripts to satisfy TypeScript
declare global {
  interface Window {
    marked: any;
    hljs: any;
    jspdf: any;
    html2canvas: any;
  }
}

// FIX: Renamed the 'document' prop to 'doc' to avoid conflict with the global 'document' object.
const DocumentViewer: React.FC<{ document: GeneratedDocument | null }> = ({ document: doc }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (contentRef.current && doc) {
      contentRef.current.innerHTML = window.marked.parse(doc.content);
      
      const codeBlocks = contentRef.current.querySelectorAll('pre');
      codeBlocks.forEach((pre) => {
        const code = pre.querySelector('code');
        if (code) {
          window.hljs.highlightElement(code);
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'relative';

        const copyButton = document.createElement('button');
        copyButton.innerText = 'Copy';
        copyButton.className = 'absolute top-2 right-2 px-2 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors';
        copyButton.onclick = () => {
          if (code) {
            navigator.clipboard.writeText(code.innerText);
            copyButton.innerText = 'Copied!';
            setTimeout(() => { copyButton.innerText = 'Copy' }, 2000);
          }
        };

        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
        wrapper.appendChild(copyButton);
      });
    }
  }, [doc]);

  const downloadMarkdown = () => {
    if (!doc) return;
    const blob = new Blob([doc.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/ /g, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    if (!contentRef.current || !doc) return;
    setIsDownloading(true);
    try {
        const { jsPDF } = window.jspdf;
        const canvas = await window.html2canvas(contentRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${doc.title.replace(/ /g, '_')}.pdf`);
    } catch(e) {
        console.error("Error generating PDF", e);
    } finally {
        setIsDownloading(false);
    }
  };

  if (!doc) {
    return <div className="p-4 text-center text-slate-500">Select a document to view its content.</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-inner border border-slate-200 dark:border-slate-700">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="text-2xl font-bold">{doc.title}</h3>
        <div className="flex space-x-2">
          <button onClick={downloadMarkdown} className="px-3 py-1 text-sm font-semibold bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors">
            Download MD
          </button>
          <button onClick={downloadPDF} disabled={isDownloading} className="px-3 py-1 text-sm font-semibold bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-400 transition-colors">
            {isDownloading ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
      <div
        ref={contentRef}
        className="p-6 prose prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-800 prose-pre:text-slate-200 dark:prose-pre:bg-slate-900"
      >
        {/* Content is rendered here by useEffect */}
      </div>
    </div>
  );
};

export default DocumentViewer;
