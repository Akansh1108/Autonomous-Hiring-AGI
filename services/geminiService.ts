
import { GoogleGenAI } from "@google/genai";
import { AssessmentStageType } from '../types';
import { SYSTEM_PROMPTS, RESPONSE_SCHEMAS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateAssessment = async (
  stage: AssessmentStageType,
  userData: string
): Promise<any> => {
  try {
    const systemInstruction = SYSTEM_PROMPTS[stage];
    const responseSchema = RESPONSE_SCHEMAS[stage];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [{ text: userData }] },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error(`Error generating ${stage} assessment:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate assessment for ${stage}. Reason: ${error.message}`);
    }
    throw new Error(`An unknown error occurred during ${stage} assessment.`);
  }
};
