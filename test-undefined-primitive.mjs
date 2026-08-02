import { GoogleGenAI } from '@google/genai';
process.env.GEMINI_API_KEY = ""; // simulate it being not set in env? Or wait, if we delete it:
delete process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: undefined });
ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'hello'
}).then(res => console.log(res.text)).catch(console.error);
