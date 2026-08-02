
export async function getConstructionAdvice(messages: {role: string, text: string}[]) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please call us at +91 98425 69545 for direct assistance.";
  }
}

export async function parseProjectFromText(prompt: string) {
  try {
    const response = await fetch('/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Gemini Parse Error:", error);
    throw new Error("Failed to parse project details from text.");
  }
}
