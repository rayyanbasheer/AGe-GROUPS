import fs from 'fs';

let code = fs.readFileSync('server.ts', 'utf-8');

code = code.replace("const { messages } = req.body;", "const { prompt } = req.body;");
code = code.replace(
    "contents: messages.map((m: any) => ({ role: m.role === 'bot' ? 'model' : 'user', parts: [{text: m.text}] })),",
    "contents: prompt,"
);

fs.writeFileSync('server.ts', code);
