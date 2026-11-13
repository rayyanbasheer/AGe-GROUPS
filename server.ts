import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

function getApiKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
  }
  return key || '';
}

async function startServer() {
  
  const app = express();
  const PORT = 3000;

  app.use(express.json());


  // API Route for Chatbot
  app.post('/api/chat', async (req, res) => {
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

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'Failed to generate content', details: error.message });
    }
  });

  // API Route for AI Content Manager
  app.post('/api/parse', async (req, res) => {
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
      if (text.startsWith('\`\`\`json')) {
        text = text.replace(/\`\`\`json\n?/, '').replace(/\`\`\`\n?$/, '');
      } else if (text.startsWith('\`\`\`')) {
        text = text.replace(/\`\`\`\n?/, '').replace(/\`\`\`\n?$/, '');
      }

      res.json({ data: JSON.parse(text.trim()) });
    } catch (error: any) {
      console.error('Gemini Parse Error:', error);
      res.status(500).json({ error: 'Failed to parse project details', details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use('/src/assets', express.static(path.join(process.cwd(), 'src/assets')));
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
