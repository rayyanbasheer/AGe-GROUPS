import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/starts with: " \+ apiKeyToUse\.substring\(0, 4\)/, 'full key: " + apiKeyToUse');
fs.writeFileSync('server.ts', code);
