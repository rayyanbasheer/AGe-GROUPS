import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { getConstructionAdvice } from '../services/gemini';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    { role: 'bot', text: 'Hello! Welcome to **AGe GROUPS Construction**, your expert partner for residential, commercial, and engineering projects. We specialize in high-quality construction services exclusively within **Kumbakonam, Thanjavur, Thiruvarur**, and surrounding areas (strictly within a **50km radius of Kumbakonam**).\n\nHow can I assist you with your project today? If you would like to discuss a specific project or request a consultation, please provide:\n1. Your **Name**\n2. **Phone Number**\n3. **Project Details** (including the specific location to verify it is within our service area).\n\nFor immediate assistance, you can connect with us on WhatsApp here: [https://wa.me/919842569545](https://wa.me/919842569545)\n\n*Please note: Final estimates and technical blueprints should be discussed directly with our engineers at our office in Kumbakonam (Annai Complex, Anna Nagar) or via phone at +91 98425 69545.*' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    // Check if it looks like a lead (contains phone number)
    const phoneRegex = /(\+91[\s-]?)?[6-9]\d{9}/;
    if (phoneRegex.test(userText)) {
      try {
        await addDoc(collection(db, 'leads'), {
          name: 'Chatbot User',
          phone: userText.match(phoneRegex)?.[0] || 'Unknown',
          message: userText,
          source: 'chatbot',
          createdAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, 'leads');
      }
    }

    const response = await getConstructionAdvice(userText);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white p-4 rounded shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center border-b-4 border-blue-950"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[550px] rounded-sm shadow-[0_20px_50px_rgba(0,0,128,0.3)] border-t-8 border-blue-900 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-white border-b border-slate-100 p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-900 p-2 rounded-sm shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-blue-900 text-xs font-black uppercase tracking-widest">Engineering Bot</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified Agent</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-blue-900 p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 text-xs font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-900 text-white rounded-sm rounded-tr-none shadow-md' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-sm rounded-tl-none'
                }`}>
                  <div className="markdown-body [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:underline [&_a]:text-blue-500"><Markdown>{m.text}</Markdown></div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                  <Loader2 className="w-4 h-4 text-blue-900 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask our experts..."
              className="flex-1 bg-slate-100 border-none focus:ring-1 focus:ring-blue-900 rounded-sm py-3 px-4 text-xs font-bold uppercase tracking-wider"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-900 hover:bg-blue-800 disabled:bg-slate-300 text-white p-3 rounded-sm transition-colors shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="bg-slate-50 p-3 text-center border-t border-slate-200">
            <a href="https://wa.me/919842569545" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-green-600 hover:text-green-700 flex items-center justify-center space-x-1">
              <span>Chat directly on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;