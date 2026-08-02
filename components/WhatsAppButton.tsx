
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { lang } = useLanguage();
  const phoneNumber = "919842569545";
  
  const textEn = "Hello AGe GROUPS, I am interested in a construction project consultation.";
  const textTa = "வணக்கம் AGe GROUPS, நான் ஒரு புதிய கட்டுமானத் திட்டம் குறித்து ஆலோசனை செய்ய விரும்புகிறேன்.";
  
  const message = encodeURIComponent(lang === 'en' ? textEn : textTa);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[100] bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center border-b-4 border-[#075E54] group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-black text-[10px] uppercase tracking-widest">
        {lang === 'en' ? 'WhatsApp Us' : 'வாட்ஸ்அப்'}
      </span>
    </a>
  );
};

export default WhatsAppButton;
