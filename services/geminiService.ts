
import { GoogleGenAI } from "@google/genai";

export async function generateValentineMessage(name: string = "someone special"): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, incredibly sweet, and slightly playful Valentine's Day message for ${name}. 
      The vibe should be "cutest thing ever". Keep it under 3 sentences. Do not use hashtags.`,
      config: {
        temperature: 1,
      },
    });

    return response.text || "You make my heart skip a beat! Happy Valentine's Day! ❤️";
  } catch (error) {
    console.error("Error generating message:", error);
    return "You're the most amazing person! Happy Valentine's Day! ❤️";
  }
}
