import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { getConstructionAdvice } from '../services/gemini';
import { db, OperationType, handleFirestoreError } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
    {
      role: 'bot',
      text: 'Welcome to **AGe Groups Construction**. We provide civil engineering and construction services within a **50 km radius of Kumbakonam** (Kumbakonam, Thanjavur, and Thiruvarur).\n\nHow can I help with your project today? To request an engineer callback, share your **Name**, **Phone Number**, and **Plot Location**.'
    }
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
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

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

    const updatedMessages = [...messages, { role: 'user', text: userText }];
    const response = await getConstructionAdvice(updatedMessages as any);
    setMessages((prev) => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90]">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open engineering consultant chat"
          className="bg-[#000080] hover:bg-blue-900 text-white px-4 py-3 rounded-lg shadow-lg transition-colors flex items-center gap-2 text-xs font-display font-semibold whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Engineer</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-lg shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#000080] p-1.5 rounded-md">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-white text-sm font-display font-semibold">AGe Engineering Desk</h4>
                <p className="text-xs text-slate-400">Kumbakonam · 50 km Service Zone</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] p-3.5 text-xs leading-relaxed rounded-lg ${
                    m.role === 'user'
                      ? 'bg-[#000080] text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <div className="markdown-body [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&_a]:underline [&_a]:text-blue-600">
                    <Markdown>{m.text}</Markdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <Loader2 className="w-4 h-4 text-[#000080] animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about construction rates or plot location..."
              className="flex-1 bg-slate-50 border border-slate-300 focus:border-[#000080] rounded-md py-2 px-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="bg-[#000080] hover:bg-blue-900 disabled:bg-slate-300 text-white p-2.5 rounded-md transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="bg-slate-50 px-3 py-2 text-center border-t border-slate-200">
            <a
              href="https://wa.me/919842569545"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              Connect directly on WhatsApp (+91 98425 69545)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assistant;