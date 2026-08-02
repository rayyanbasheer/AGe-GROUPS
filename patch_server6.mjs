import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf-8');

const regex = /const ai = new GoogleGenAI\(\{ \s*apiKey: getApiKey\(\),\s*httpOptions: \{ headers: \{ 'User-Agent': 'aistudio-build' \} \}\s*\}\);/g;
// Wait, parse block has:
// const ai = new GoogleGenAI({ 
//    apiKey: getApiKey(),
//   httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
// });
// Oh wait, my previous regex replaced ALL instances of GoogleGenAI initialization!
