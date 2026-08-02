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
      
      
      const ai = new GoogleGenAI({ apiKey: getApiKey() });
      
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.map((m: any) => ({ role: m.role === 'bot' ? 'model' : 'user', parts: [{text: m.text}] })),
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
      res.status(500).json({ error: 'Failed to generate content', details: error.message, keyLength: getApiKey().length, keyStart: getApiKey().substring(0,4) });
    }
  });

  // API Route for AI Content Manager
  app.post('/api/parse', async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = new GoogleGenAI({ apiKey: getApiKey() });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: `You are an AI assistant that extracts project details from natural language text and returns a JSON object.
          The JSON object must have the following fields:
          - title (string)
          - category (string: e.g., 'Residential', 'Commercial', 'Educational', 'Healthcare', 'Religious')
          - status (string: e.g., 'Completed', 'Ongoing')
          - location (string)
          - description (string)
          - imageUrl (string: provide a relevant placeholder image URL from Unsplash if not specified, e.g., 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80')
          - images (array of objects, optional, each containing 'url' and 'type' where type is 'interior', 'exterior', or 'general')
          
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
