import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/function getApiKey\(\) \{[\s\S]*?return process\.env\.GEMINI_API_KEY \|\| '';\n\}/, `function getApiKey() {
  let key = (process.env.GEMINI_API_KEY || '').trim();
  if (!key || key === 'MY_GEMINI_API_KEY' || key === 'undefined') {
    key = (process.env.Default_Gemini_API_Key || '').trim();
  }
  return key;
}`);
fs.writeFileSync('server.ts', code);
