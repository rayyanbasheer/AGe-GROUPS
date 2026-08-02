import fs from 'fs';

let code = fs.readFileSync('components/Assistant.tsx', 'utf-8');

code = code.replace("import Markdown from 'react-markdown';\n", "");
code = code.replace("import Markdown from 'react-markdown';", "");

const newMessage = "Hello! Welcome to **AGe GROUPS Construction**, your expert partner for residential, commercial, and engineering projects. We specialize in high-quality construction services exclusively within **Kumbakonam, Thanjavur, Thiruvarur**, and surrounding areas (strictly within a **50km radius of Kumbakonam**).\\n\\nHow can I assist you with your project today? If you would like to discuss a specific project or request a consultation, please provide:\\n1. Your **Name**\\n2. **Phone Number**\\n3. **Project Details** (including the specific location to verify it is within our service area).\\n\\nFor immediate assistance, you can connect with us on WhatsApp here: [https://wa.me/919842569545](https://wa.me/919842569545)\\n\\n*Please note: Final estimates and technical blueprints should be discussed directly with our engineers at our office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.*";
const oldMessage = "Welcome to AGe GROUPS. How can I assist with your construction inquiry today? If you want a quote, please provide your name, phone number, and project details.";

// Note: I need to be careful with the exact string replacement since it might have been formatted.
// It's safer to just replace the whole role: 'bot' line
code = code.replace(
    /\{ role: 'bot', text: 'Hello! Welcome to \*\*AGe GROUPS Construction\*\*(.*)\*' \}/s,
    "{ role: 'bot', text: 'Welcome to AGe GROUPS. How can I assist with your construction inquiry today? If you want a quote, please provide your name, phone number, and project details.' }"
);

code = code.replace(
    /const updatedMessages = \[\.\.\.messages, \{ role: 'user', text: userText \}\];\n    const response = await getConstructionAdvice\(updatedMessages as any\);/,
    "const response = await getConstructionAdvice(userText);"
);

code = code.replace(
    '<div className="markdown-body [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:underline [&_a]:text-blue-500"><Markdown>{m.text}</Markdown></div>',
    '{m.text}'
);


fs.writeFileSync('components/Assistant.tsx', code);
