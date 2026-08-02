import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');

const newChatRoute = `  app.post('/api/chat', async (req, res) => {
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
            last.parts[0].text += '\\n' + m.text;
          } else {
            validContents.push({ role, parts: [{ text: m.text }] });
          }
        }
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: validContents,
        config: {
          systemInstruction: \`You are an expert construction consultant for AGe GROUPS Construction (Tamil Nadu, India). 
          You provide high-level advice on residential, commercial, and engineering projects. 
          IMPORTANT CONSTRAINT: AGe GROUPS ONLY operates within Kumbakonam, Thanjavur, Thiruvarur, and surrounding areas (strictly within a 50km radius of Kumbakonam). If a user asks for projects outside this area, politely inform them that you do not service that location.
          Keep responses professional, concise, and helpful. 
          If the user asks for a quote or wants to proceed, ask for their name, phone number, and project details (including location to verify it is within 50km).
          Always mention that final estimates and technical details should be discussed directly with AGe GROUPS engineers at their office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.
          Avoid specific price quotes, instead use ranges or factors that influence price.
          Direct users to WhatsApp for immediate contact by providing this link: https://wa.me/919842569545\`,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Error:', error);
      res.status(500).json({ error: 'Failed to generate content', details: error.message });
    }
  });`;

const startIndex = code.indexOf("  // API Route for Chatbot");
const endIndex = code.indexOf("  // API Route for AI Content Manager");
code = code.substring(0, startIndex) + "  // API Route for Chatbot\n" + newChatRoute + "\n\n" + code.substring(endIndex);

fs.writeFileSync('server.ts', code);
