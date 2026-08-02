import fs from 'fs';

// 1. Update server.ts
let serverCode = fs.readFileSync('server.ts', 'utf-8');
serverCode = serverCode.replace("const { prompt } = req.body;", "const { messages } = req.body;");
serverCode = serverCode.replace(
    "contents: prompt,",
    "contents: messages.map((m: any) => ({ role: m.role === 'bot' ? 'model' : 'user', parts: [{text: m.text}] })),"
);
fs.writeFileSync('server.ts', serverCode);

// 2. Update services/gemini.ts
let geminiCode = fs.readFileSync('services/gemini.ts', 'utf-8');
geminiCode = geminiCode.replace(
    "export async function getConstructionAdvice(prompt: string) {", 
    "export async function getConstructionAdvice(messages: {role: string, text: string}[]) {"
);
geminiCode = geminiCode.replace(
    "body: JSON.stringify({ prompt })", 
    "body: JSON.stringify({ messages })"
);
fs.writeFileSync('services/gemini.ts', geminiCode);

// 3. Update components/Assistant.tsx
let assistantCode = fs.readFileSync('components/Assistant.tsx', 'utf-8');
assistantCode = assistantCode.replace(
    "const response = await getConstructionAdvice(userText);",
    "const updatedMessages = [...messages, { role: 'user', text: userText }];\n    const response = await getConstructionAdvice(updatedMessages as any);"
);
fs.writeFileSync('components/Assistant.tsx', assistantCode);
