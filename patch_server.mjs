import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/function getApiKey\(\) \{[\s\S]*?return key;\n\}/, `function getApiKey() {
  return process.env.GEMINI_API_KEY || '';
}`);
fs.writeFileSync('server.ts', code);
