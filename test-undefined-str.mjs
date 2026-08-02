import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey: "undefined" });
ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'hello'
}).then(res => console.log(res.text)).catch(console.error);
