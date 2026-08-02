import fs from 'fs';

let assistantCode = fs.readFileSync('components/Assistant.tsx', 'utf-8');
assistantCode = assistantCode.replace("import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';", "import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';\nimport Markdown from 'react-markdown';");

assistantCode = assistantCode.replace(
    /\{m\.text\}/g,
    '<div className="markdown-body [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:underline [&_a]:text-blue-500"><Markdown>{m.text}</Markdown></div>'
);

// We should also replace the initial message to have proper bold formatting and look great.
const oldMessage = "Welcome to AGe GROUPS. How can I assist with your construction inquiry today? If you want a quote, please provide your name, phone number, and project details.";
const newMessage = "Hello! Welcome to **AGe GROUPS Construction**, your expert partner for residential, commercial, and engineering projects. We specialize in high-quality construction services exclusively within **Kumbakonam, Thanjavur, Thiruvarur**, and surrounding areas (strictly within a **50km radius of Kumbakonam**).\\n\\nHow can I assist you with your project today? If you would like to discuss a specific project or request a consultation, please provide:\\n1. Your **Name**\\n2. **Phone Number**\\n3. **Project Details** (including the specific location to verify it is within our service area).\\n\\nFor immediate assistance, you can connect with us on WhatsApp here: [https://wa.me/919842569545](https://wa.me/919842569545)\\n\\n*Please note: Final estimates and technical blueprints should be discussed directly with our engineers at our office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.*";

assistantCode = assistantCode.replace(oldMessage, newMessage);

fs.writeFileSync('components/Assistant.tsx', assistantCode);
