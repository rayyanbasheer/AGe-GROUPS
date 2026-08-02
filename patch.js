const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/async function startServer\(\) \{/, 'async function startServer() {\n  console.log("API KEY IN SERVER:", process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0,4) : "MISSING");');
fs.writeFileSync('server.ts', code);
