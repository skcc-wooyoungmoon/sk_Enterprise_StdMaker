export enum TechCategory {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Database = 'Database',
  Cloud = 'Cloud',
  DevOps = 'DevOps',
}

export interface Technology {
  name: string;
  logo: JSX.Element;
  color: string; // Tailwind color class e.g., 'blue-500'
}

export interface TechSelection {
  [key: string]: string[];
}

export interface OrgSettings {
  teamSize: number;
  projectComplexity: 'Low' | 'Medium' | 'High';
  complianceNeeds: string[];
  language: 'English' | 'Korean';
}

export interface UploadedFile {
  name: string;
  path: string;
  type: string;
  content: string; // base64 encoded string
}

export interface GeneratedDocument {
  title: string;
  content: string; // Markdown content from Gemini
}

export interface GenerationResult {
    documents: GeneratedDocument[];
}