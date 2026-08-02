import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf-8');

// Replace contents: prompt with contents: messages (map them)
// Wait, the client will send 'messages' instead of 'prompt'.
code = code.replace("const { prompt } = req.body;", "const { messages } = req.body;");

code = code.replace(
    "contents: prompt,",
    "contents: messages.map((m: any) => ({ role: m.role === 'bot' ? 'model' : 'user', parts: [{text: m.text}] })),"
);

fs.writeFileSync('server.ts', code);
