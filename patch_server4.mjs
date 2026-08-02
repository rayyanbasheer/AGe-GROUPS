import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');

const regex = /contents: validContents, index: number\) => \!\(index === 0 && m\.role === 'bot'\)\)\.map\(\(m: any\) => \(\{ role: m\.role === 'bot' \? 'model' : 'user', parts: \[\{text: m\.text\}\] \}\)\),/;

code = code.replace(regex, 'contents: validContents,');

fs.writeFileSync('server.ts', code);
