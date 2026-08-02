import fs from 'fs';

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf-8');
    
    if (!code.includes('function getApiKey()')) {
        code = code.replace(/import \{ GoogleGenAI \} from '@google\/genai';/, "import { GoogleGenAI } from '@google/genai';\n\nfunction getApiKey() {\n  let key = (process.env.GEMINI_API_KEY || '').trim();\n  if (!key || key === 'MY_GEMINI_API_KEY' || key === 'undefined') {\n    key = (process.env.Default_Gemini_API_Key || '').trim();\n  }\n  return key;\n}");
    }
    
    // Replace all apiKey: process.env.GEMINI_API_KEY or apiKeyToUse with getApiKey()
    code = code.replace(/apiKey: \(process\.env\.GEMINI_API_KEY \|\| ''\)\.trim\(\)/g, 'apiKey: getApiKey()');
    code = code.replace(/apiKey: process\.env\.GEMINI_API_KEY/g, 'apiKey: getApiKey()');
    code = code.replace(/apiKey: apiKeyToUse/g, 'apiKey: getApiKey()');
    
    // Remove the debug code from server.ts
    code = code.replace(/if \(prompt === "debug"\) return res\.json\(\{ text: "Key length: " \+ apiKeyToUse\.length \+ ", env: " \+ JSON\.stringify\(process\.env\) \}\);/, '');
    code = code.replace(/const apiKeyToUse = \(process\.env\.GEMINI_API_KEY \|\| ''\)\.trim\(\);/, '');
    code = code.replace(/console\.log\("API KEY IN SERVER:", process\.env\.GEMINI_API_KEY \? process\.env\.GEMINI_API_KEY\.substring\(0,4\) : "MISSING"\);/, '');
    
    fs.writeFileSync(filePath, code);
}

fixFile('server.ts');
fixFile('api/chat.ts');
fixFile('api/parse.ts');
