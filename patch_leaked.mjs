import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(
  "let key = (process.env.GEMINI_API_KEY || '').trim();",
  "let key = (process.env.GEMINI_API_KEY || '').trim();\n  if (key === 'AIzaSyC8548WAxLIViuUIEu1diN27zjbhhRW0PQ') {\n    key = ''; // Ignore leaked key\n  }"
);
fs.writeFileSync('server.ts', code);
