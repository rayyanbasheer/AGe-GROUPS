import { GoogleGenAI } from '@google/genai';

function getApiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
  }
  return key || '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;
    const ai = new GoogleGenAI({ 
      apiKey: getApiKey(),
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
    
    let validContents = [];
    for (const m of messages) {
      const role = m.role === 'bot' ? 'model' : 'user';
      if (validContents.length === 0) {
        if (role === 'user') validContents.push({ role, parts: [{ text: m.text }] });
      } else {
        const last = validContents[validContents.length - 1];
        if (last.role === role) {
          last.parts[0].text += '\n' + m.text;
        } else {
          validContents.push({ role, parts: [{ text: m.text }] });
        }
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: validContents,
      config: {
        systemInstruction: `You are an expert construction consultant for AGe GROUPS Construction (Tamil Nadu, India). 
        You provide high-level advice on residential, commercial, and engineering projects. 
        IMPORTANT CONSTRAINT: AGe GROUPS ONLY operates within Kumbakonam, Thanjavur, Thiruvarur, and surrounding areas (strictly within a 50km radius of Kumbakonam). If a user asks for projects outside this area, politely inform them that you do not service that location.
        Keep responses professional, concise, and helpful. 
        If the user asks for a quote or wants to proceed, ask for their name, phone number, and project details (including location to verify it is within 50km).
        Always mention that final estimates and technical details should be discussed directly with AGe GROUPS engineers at their office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.
        Avoid specific price quotes, instead use ranges or factors that influence price.
        Direct users to WhatsApp for immediate contact by providing this link: https://wa.me/919842569545`,
        temperature: 0.7,
      },
    });

    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Failed to generate content', details: error.message });
  }
}
