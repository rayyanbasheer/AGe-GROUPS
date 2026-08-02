import { loadEnv } from 'vite';
const env = loadEnv('development', '.', '');
console.log("From loadEnv:", env.GEMINI_API_KEY);
console.log("From process:", process.env.GEMINI_API_KEY);
