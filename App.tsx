
import React, { useState, useCallback } from 'react';
import { TechSelection, OrgSettings, UploadedFile, GeneratedDocument, GenerationResult } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Stepper from './components/Stepper';
import TechStackSelector from './components/TechStackSelector';
import OrgSettingsComponent from './components/OrgSettings';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateStandards } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [techSelection, setTechSelection] = useState<TechSelection>({});
  const [orgSettings, setOrgSettings] = useState<OrgSettings>({
    teamSize: 10,
    projectComplexity: 'Medium',
    complianceNeeds: [],
    language: 'English',
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocument[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);
  const handleStartOver = () => {
    setCurrentStep(1);
    setGeneratedDocs(null);
    setTechSelection({});
    setOrgSettings({
      teamSize: 10,
      projectComplexity: 'Medium',
      complianceNeeds: [],
      language: 'English',
    });
    setUploadedFiles([]);
    setError(null);
  }

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentStep(3);

    try {
      const result: GenerationResult = await generateStandards(techSelection, orgSettings, uploadedFiles);
      setGeneratedDocs(result.documents);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? `Failed to generate standards: ${e.message}` : 'An unknown error occurred.');
      setGeneratedDocs([]);
    } finally {
      setIsLoading(false);
    }
  }, [techSelection, orgSettings, uploadedFiles]);
  
  const renderStep = () => {
    if (isLoading) {
       return (
        <div className="flex flex-col items-center justify-center text-center p-8 min-h-[60vh]">
          <LoadingSpinner />
          <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-6">Generating Your Custom Standards...</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">This may take a few moments. The AI is crafting detailed documentation based on your selections.</p>
        </div>
      );
    }

    if(currentStep === 3 && generatedDocs !== null) {
      return <ResultsDisplay documents={generatedDocs} error={error} onStartOver={handleStartOver} />;
    }

    switch (currentStep) {
      case 1:
        return <TechStackSelector initialSelection={techSelection} onNext={setTechSelection} nextStep={handleNextStep} />;
      case 2:
        return (
          <OrgSettingsComponent
            initialSettings={orgSettings}
            initialFiles={uploadedFiles}
            onBack={handlePrevStep}
            onGenerate={handleGenerate}
            setOrgSettings={setOrgSettings}
            setUploadedFiles={setUploadedFiles}
          />
        );
      default:
        return <div className="text-center p-8">Invalid step.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Stepper currentStep={currentStep} />
          <div className="p-4 sm:p-6 md:p-10">
            {renderStep()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
