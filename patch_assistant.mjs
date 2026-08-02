import fs from 'fs';

let code = fs.readFileSync('components/Assistant.tsx', 'utf-8');

// 1. Add Markdown import
if (!code.includes('import Markdown')) {
    code = code.replace("import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';", "import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';\nimport Markdown from 'react-markdown';");
}

// 2. Replace the initial message text
const oldMessage = "Welcome to AGe GROUPS. How can I assist with your construction inquiry today? If you want a quote, please provide your name, phone number, and project details.";
const newMessage = "Hello! Welcome to **AGe GROUPS Construction**, your expert partner for residential, commercial, and engineering projects. We specialize in high-quality construction services exclusively within **Kumbakonam, Thanjavur, Thiruvarur**, and surrounding areas (strictly within a **50km radius of Kumbakonam**).\\n\\nHow can I assist you with your project today? If you would like to discuss a specific project or request a consultation, please provide:\\n1. Your **Name**\\n2. **Phone Number**\\n3. **Project Details** (including the specific location to verify it is within our service area).\\n\\nFor immediate assistance, you can connect with us on WhatsApp here: [https://wa.me/919842569545](https://wa.me/919842569545)\\n\\n*Please note: Final estimates and technical blueprints should be discussed directly with our engineers at our office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.*";

code = code.replace(oldMessage, newMessage);

// 3. Update the rendering to use Markdown
// We need to replace `{m.text}` with `<div className="markdown-body"><Markdown>{m.text}</Markdown></div>` inside the message loop.
// The code has:
// m.role === 'user' ? 'bg-blue-900 text-white rounded-sm rounded-tr-none shadow-md' : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-sm rounded-tl-none' }"> {m.text} </div>
code = code.replace(
    /\{m\.text\}/g,
    '<div className="markdown-body prose prose-sm max-w-none text-current space-y-2"><Markdown>{m.text}</Markdown></div>'
);

// Actually, wait, let's use tailwind classes for markdown. It's better to just write `<Markdown>{m.text}</Markdown>`.
// Wait, react-markdown might need some styling, but for now just wrapping in Markdown is fine.
// The links should be clickable. By default react-markdown makes `<a>` tags.
// Let's refine the replacement:
code = code.replace(
    '<div className="markdown-body prose prose-sm max-w-none text-current space-y-2"><Markdown>{m.text}</Markdown></div>', 
    '<div className="markdown-body [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:underline [&_a]:text-blue-500"><Markdown>{m.text}</Markdown></div>'
);
// wait I replaced it but I might have run the script multiple times? No, I'll do this cleanly.

fs.writeFileSync('components/Assistant.tsx', code);
