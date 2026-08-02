const fs = require('fs');
let content = fs.readFileSync('components/Assistant.tsx', 'utf-8');
// Prettify it a bit so I can read it if needed
console.log(content.includes('Markdown'));
