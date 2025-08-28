import { GoogleGenAI, Type } from "@google/genai";
import { TechSelection, OrgSettings, UploadedFile, GenerationResult, GeneratedDocument } from '../types';
import { STANDARD_DOCUMENTS_TITLES } from "../constants";

// This is a placeholder for the API key.
// In a real application, this would be securely managed.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // A bit of a hack to make it work in this environment. 
  // Normally you'd throw an error or have a proper fallback.
  console.warn("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY! });


function buildPrompt(techSelection: TechSelection, orgSettings: OrgSettings, files: UploadedFile[]): (string | { inlineData: { mimeType: string; data: string } })[] {
    let promptParts: (string | { inlineData: { mimeType: string; data: string } })[] = [];

    const techStackString = Object.entries(techSelection)
        .map(([category, techs]) => `${category}: ${techs.join(', ')}`)
        .join('\n');

    let promptText = `
        You are a world-class enterprise solutions architect. Your task is to generate a comprehensive set of 10 development standard documents for a large corporation.
        The output MUST be a single JSON object.

        **Language for Output:** Please generate all documents in ${orgSettings.language}.

        **Audience:** Enterprise Developers and Architects.
        **Tone:** Professional, authoritative, and clear.
        **Goal:** Create detailed, practical, and extensive documentation that can be used immediately by development teams. Some documents should be very long, potentially over 100 pages if printed, with in-depth explanations, code examples, and best practices.

        **Company Context:**
        - Team Size: Approximately ${orgSettings.teamSize} developers.
        - Project Complexity: ${orgSettings.projectComplexity}.
        - Compliance Requirements: ${orgSettings.complianceNeeds.join(', ') || 'None specified'}.

        **Core Technology Stack:**
        ${techStackString}

        **Instructions:**
        1. Generate content for ALL 10 of the following documents: ${STANDARD_DOCUMENTS_TITLES.join(', ')}.
        2. The content for each document must be in Markdown format.
        3. Include detailed code snippets, configuration examples, and diagrams (using Mermaid or ASCII art) where appropriate.
        4. The output must be a single, valid JSON object matching the provided schema. Do not add any text or formatting before or after the JSON object.
    `;

    if (files.length > 0) {
        promptText += "\n\n**Reference Documents Provided by User:**\n";
        promptText += "The user has uploaded the following files from a folder. Use their content and file structure as a primary reference and inspiration for the generated standards, adapting them to the selected technology stack and best practices.\n\n";
        files.forEach(file => {
            promptText += `- ${file.path}\n`;
            if (file.type.startsWith('image/')) {
                 promptParts.push({ inlineData: { mimeType: file.type, data: file.content } });
            } else {
                // Assuming text content is base64 encoded text
                 try {
                    promptText += `\n--- START ${file.path} ---\n${atob(file.content)}\n--- END ${file.path} ---\n`;
                 } catch(e) {
                    console.error("Failed to decode file content:", file.path, e);
                    promptText += `\n--- (Could not decode content for ${file.path}) ---\n`;
                 }
            }
        });
    }

    promptParts.unshift(promptText);

    return promptParts;
}

export const generateStandards = async (
    techSelection: TechSelection,
    orgSettings: OrgSettings,
    files: UploadedFile[]
): Promise<GenerationResult> => {
    
    const promptParts = buildPrompt(techSelection, orgSettings, files);
    const contents = promptParts.length === 1 && typeof promptParts[0] === 'string'
        ? promptParts[0]
        : { parts: promptParts.map(p => typeof p === 'string' ? { text: p } : p) };


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    documents: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { 
                                    type: Type.STRING,
                                    description: "The title of the standard document."
                                },
                                content: {
                                    type: Type.STRING,
                                    description: "The full content of the document in Markdown format. This should be extremely detailed and comprehensive."
                                }
                            },
                            required: ["title", "content"]
                        }
                    }
                },
                required: ["documents"]
            },
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedResult: GenerationResult = JSON.parse(jsonText);
        
        // Validate the structure
        if (!parsedResult.documents || !Array.isArray(parsedResult.documents)) {
            throw new Error("Invalid JSON structure: 'documents' array not found.");
        }
        
        // Ensure all titles are present
        const receivedTitles = new Set(parsedResult.documents.map(d => d.title));
        const missingTitles = STANDARD_DOCUMENTS_TITLES.filter(t => !receivedTitles.has(t));
        if(missingTitles.length > 0) {
            console.warn(`AI response was missing some documents: ${missingTitles.join(', ')}`);
        }

        return parsedResult;
    } catch (error) {
        console.error("Failed to parse Gemini response as JSON:", error);
        console.error("Raw response:", response.text);
        throw new Error("The AI returned an invalid response format. Please try again.");
    }
};