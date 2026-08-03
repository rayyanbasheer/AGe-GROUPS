import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/gemini-1\.5-flash-latest/g, 'gemini-3.6-flash');
fs.writeFileSync('server.ts', code);
