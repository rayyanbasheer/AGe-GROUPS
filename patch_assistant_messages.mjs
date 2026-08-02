import fs from 'fs';

let code = fs.readFileSync('components/Assistant.tsx', 'utf-8');

// Change `const response = await getConstructionAdvice(userText);`
// to pass the updated messages array
// First, we need to build the updated messages array because setMessages(prev => ...) is asynchronous and won't have updated the state variable yet.

code = code.replace(
    "const response = await getConstructionAdvice(userText);",
    "const updatedMessages = [...messages, { role: 'user', text: userText }];\n    const response = await getConstructionAdvice(updatedMessages as any);"
);

// We need to change the setMessages(prev => [...prev, {role: 'user'...}]) to use updatedMessages directly or just keep it and use updatedMessages for the API call.

fs.writeFileSync('components/Assistant.tsx', code);
