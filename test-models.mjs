import { GoogleGenAI } from '@google/genai';
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.list();
  console.log(response);
}
run();
