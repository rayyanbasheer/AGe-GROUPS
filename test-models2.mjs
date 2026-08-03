import { GoogleGenAI } from '@google/genai';
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let req = await ai.models.list();
  for await (const m of ai.models.list()) {
    if (m.name.includes('flash')) console.log(m.name);
  }
}
run();
