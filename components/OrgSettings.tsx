import React, { useState } from 'react';
import { OrgSettings, UploadedFile } from '../types';

// FIX: Add webkitdirectory and directory to React's HTMLAttributes for input elements.
// This is to support directory selection which is a non-standard feature.
declare module 'react' {
  interface InputHTMLAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

interface OrgSettingsProps {
  initialSettings: OrgSettings;
  initialFiles: UploadedFile[];
  setOrgSettings: (settings: OrgSettings) => void;
  setUploadedFiles: (files: UploadedFile[]) => void;
  onBack: () => void;
  onGenerate: () => void;
}

const complianceOptions = ["GDPR", "HIPAA", "SOX", "PCI-DSS"];

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};


const OrgSettingsComponent: React.FC<OrgSettingsProps> = ({ 
    initialSettings, 
    initialFiles, 
    setOrgSettings, 
    setUploadedFiles,
    onBack, 
    onGenerate 
}) => {
  const [settings, setLocalSettings] = useState<OrgSettings>(initialSettings);
  const [files, setLocalFiles] = useState<File[]>([]);
  
  const handleSettingsChange = (field: keyof OrgSettings, value: any) => {
    const newSettings = { ...settings, [field]: value };
    setLocalSettings(newSettings);
    setOrgSettings(newSettings);
  };

  const handleComplianceChange = (option: string) => {
    const currentNeeds = settings.complianceNeeds;
    const newNeeds = currentNeeds.includes(option)
      ? currentNeeds.filter(item => item !== option)
      : [...currentNeeds, option];
    handleSettingsChange('complianceNeeds', newNeeds);
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileList = Array.from(event.target.files);
      setLocalFiles(fileList);
      
      const uploadedFilePromises = fileList.map(async (file) => ({
          name: file.name,
          // The File type doesn't have webkitRelativePath, so we cast to any
          path: (file as any).webkitRelativePath || file.name,
          type: file.type,
          content: await fileToBase64(file),
      }));

      const uploadedFiles = await Promise.all(uploadedFilePromises);
      setUploadedFiles(uploadedFiles);
    }
  };


  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">2. Configure Organizational Settings</h2>
      <p className="mt-2 text-center text-slate-600 dark:text-slate-400">Provide context to tailor the standards to your team's specific needs.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Left Column */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
          <div>
            <label htmlFor="teamSize" className="block text-lg font-medium text-slate-700 dark:text-slate-300">Team Size: <span className="font-bold text-primary-600 dark:text-primary-400">{settings.teamSize}</span></label>
            <input
              id="teamSize"
              type="range"
              min="1"
              max="1000"
              value={settings.teamSize}
              onChange={(e) => handleSettingsChange('teamSize', parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mt-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Project Complexity</h3>
            <div className="mt-2 flex space-x-4">
              {(['Low', 'Medium', 'High'] as const).map(level => (
                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="complexity"
                    value={level}
                    checked={settings.projectComplexity === level}
                    onChange={() => handleSettingsChange('projectComplexity', level)}
                    className="form-radio h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{level}</span>
                </label>
              ))}
            </div>
          </div>
          
           <div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Output Language</h3>
            <div className="mt-2 flex space-x-4">
              {(['English', 'Korean'] as const).map(lang => (
                <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value={lang}
                    checked={settings.language === lang}
                    onChange={() => handleSettingsChange('language', lang)}
                    className="form-radio h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{lang === 'Korean' ? 'Korean (한글)' : 'English'}</span>
                </label>
              ))}
            </div>
          </div>

           <div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Compliance Needs</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {complianceOptions.map(option => (
                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.complianceNeeds.includes(option)}
                    onChange={() => handleComplianceChange(option)}
                    className="form-checkbox h-4 w-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
           <div>
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Upload Reference Folder (Optional)</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Upload a folder containing your current standards, documents, or diagrams to be used as reference.</p>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 dark:border-slate-100/25 px-6 py-10">
                <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-slate-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white dark:bg-slate-800 font-semibold text-primary-600 dark:text-primary-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800 hover:text-primary-500">
                    <span>Select a folder</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" webkitdirectory="" directory="" onChange={handleFileChange} />
                    </label>
                </div>
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">Text, images up to 10MB</p>
                </div>
            </div>
            {files.length > 0 && (
                <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 max-h-32 overflow-y-auto">
                    <p className="font-semibold">Selected files:</p>
                    <ul className="list-disc list-inside">
                        {files.map((file, index) => <li key={index} className="truncate">{(file as any).webkitRelativePath || file.name}</li>)}
                    </ul>
                </div>
            )}
           </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          &larr; Back
        </button>
        <button
          onClick={onGenerate}
          className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Generate Standards ✨
        </button>
      </div>
    </div>
  );
};

export default OrgSettingsComponent;