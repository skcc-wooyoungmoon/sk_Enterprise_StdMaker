import React from 'react';
import { TechCategory, Technology } from './types';

// Generic Icon for placeholders
const PlaceholderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export const TECHNOLOGIES: Record<TechCategory, Technology[]> = {
  [TechCategory.Frontend]: [
    { name: 'React', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 7.75c-2.458 0-4.593 1.631-5.182 4.125a.75.75 0 0 0 1.482.25C8.804 9.941 10.26 8.75 12 8.75c1.74 0 3.196 1.191 3.7 3.125a.75.75 0 0 0 1.482-.25C16.593 9.381 14.458 7.75 12 7.75z"/><circle cx="12" cy="12" r="2.5"/><path d="M9.621 16.318c.523.513 1.258.832 2.079.832s1.556-.319 2.079-.832a.75.75 0 1 0-1.039-1.088c-.29.282-.67.47-1.04.47s-.75-.188-1.04-.47a.75.75 0 1 0-1.039 1.088z"/></svg>, color: 'sky' },
    { name: 'Vue.js', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M18.4,1.8H15.8L12,8.3L8.2,1.8H5.6L12,13.2L18.4,1.8z"/><path d="M5.6,1.8h-4L12,18.8l10.4-17H18.4L12,13.2L5.6,1.8z"/></svg>, color: 'green' },
    { name: 'Angular', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 5.5l1.5 12.5L12 22l8.5-4L22 5.5 12 2zm0 2.47L18.36 7H5.64L12 4.47zM12 19.53L5.5 16.5l-1-8.5h2.5l.5 4L12 15l4.5-3 .5-4h2.5l-1 8.5L12 19.53z"/></svg>, color: 'red' },
    { name: 'TypeScript', logo: <PlaceholderIcon />, color: 'blue' },
    { name: 'Next.js', logo: <PlaceholderIcon />, color: 'gray' },
    { name: 'Tailwind CSS', logo: <PlaceholderIcon />, color: 'teal' },
  ],
  [TechCategory.Backend]: [
    { name: 'Node.js', logo: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-5.5H9.5V11H11V8h2v3h1.5v1.5H13V17h-2z"/></svg>, color: 'green' },
    { name: 'Spring Boot', logo: <PlaceholderIcon />, color: 'green' },
    { name: 'Django', logo: <PlaceholderIcon />, color: 'green' },
    { name: 'FastAPI', logo: <PlaceholderIcon />, color: 'teal' },
    { name: '.NET Core', logo: <PlaceholderIcon />, color: 'purple' },
    { name: 'Go', logo: <PlaceholderIcon />, color: 'sky' },
  ],
  [TechCategory.Database]: [
    { name: 'PostgreSQL', logo: <PlaceholderIcon />, color: 'blue' },
    { name: 'MongoDB', logo: <PlaceholderIcon />, color: 'green' },
    { name: 'Redis', logo: <PlaceholderIcon />, color: 'red' },
    { name: 'MySQL', logo: <PlaceholderIcon />, color: 'orange' },
    { name: 'DynamoDB', logo: <PlaceholderIcon />, color: 'indigo' },
    { name: 'Elasticsearch', logo: <PlaceholderIcon />, color: 'amber' },
    { name: 'OracleDB', logo: <PlaceholderIcon />, color: 'red' },
  ],
  [TechCategory.Cloud]: [
    { name: 'AWS', logo: <PlaceholderIcon />, color: 'orange' },
    { name: 'Azure', logo: <PlaceholderIcon />, color: 'sky' },
    { name: 'GCP', logo: <PlaceholderIcon />, color: 'blue' },
    { name: 'Kubernetes', logo: <PlaceholderIcon />, color: 'blue' },
    { name: 'Terraform', logo: <PlaceholderIcon />, color: 'purple' },
    { name: 'CloudFormation', logo: <PlaceholderIcon />, color: 'orange' },
  ],
  [TechCategory.DevOps]: [
    { name: 'Docker', logo: <PlaceholderIcon />, color: 'sky' },
    { name: 'Jenkins', logo: <PlaceholderIcon />, color: 'red' },
    { name: 'GitHub Actions', logo: <PlaceholderIcon />, color: 'gray' },
    { name: 'GitLab CI', logo: <PlaceholderIcon />, color: 'orange' },
    { name: 'Prometheus', logo: <PlaceholderIcon />, color: 'red' },
    { name: 'Grafana', logo: <PlaceholderIcon />, color: 'orange' },
  ]
};

export const STANDARD_DOCUMENTS_TITLES = [
    "Environment Setup Guide",
    "Architecture Guidelines",
    "Coding Standards",
    "Security Guidelines",
    "API Design Standards",
    "Database Standards",
    "CI/CD Pipeline Guide",
    "Monitoring & Logging Strategy",
    "Sample Code & Boilerplates",
    "AI-Powered Developer Prompts"
];