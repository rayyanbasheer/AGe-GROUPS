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
    const { prompt } = req.body;
    const ai = new GoogleGenAI({ 
      apiKey: getApiKey(),
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an AI assistant that extracts project details from natural language text and returns a JSON object.
        The JSON object must have the following fields:
        - title (string)
        - category (string: e.g., 'Residential', 'Commercial', 'Educational', 'Healthcare', 'Religious')
        - status (string: e.g., 'Completed', 'Ongoing')
        - location (string)
        - description (string)
        - imageUrl (string: if a URL is provided in the text use it, otherwise empty string '')
        - images (array of objects: ONLY include if additional image URLs are explicitly provided in the prompt, otherwise return an empty array [])
        
        Return ONLY valid JSON. No markdown formatting, no backticks.`,
        temperature: 0.1,
      },
    });

    let text = response.text || '';
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n?/, '').replace(/```\n?$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n?/, '').replace(/```\n?$/, '');
    }

    res.status(200).json({ data: JSON.parse(text.trim()) });
  } catch (error) {
    console.error('Gemini Parse Error:', error);
    res.status(500).json({ error: 'Failed to parse project details', details: error.message });
  }
}
