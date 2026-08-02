import fs from 'fs';

let code = fs.readFileSync('services/gemini.ts', 'utf-8');

code = code.replace("export async function getConstructionAdvice(messages: {role: string, text: string}[]) {", "export async function getConstructionAdvice(prompt: string) {");
code = code.replace("body: JSON.stringify({ messages })", "body: JSON.stringify({ prompt })");

fs.writeFileSync('services/gemini.ts', code);
