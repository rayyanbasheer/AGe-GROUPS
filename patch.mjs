import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/full key: " \+ apiKeyToUse/, 'env: " + JSON.stringify(process.env)');
fs.writeFileSync('server.ts', code);
