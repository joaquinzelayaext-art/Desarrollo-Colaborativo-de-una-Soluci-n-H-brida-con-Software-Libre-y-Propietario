import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateResponse(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return {
      success: true,
      response: response.text || 'No se obtuvo respuesta de la IA.',
    };
  } catch (error) {
    console.error('Error al generar respuesta con Gemini:', error);
    throw new Error('Error al procesar la solicitud con la inteligencia artificial.');
  }
}