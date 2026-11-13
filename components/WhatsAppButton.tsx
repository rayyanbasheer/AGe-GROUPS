import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { lang } = useLanguage();
  const phoneNumber = '919842569545';

  const textEn = 'Hello AGe GROUPS, I am interested in a construction project consultation.';
  const textTa = 'வணக்கம் AGe GROUPS, நான் ஒரு புதிய கட்டுமானத் திட்டம் குறித்து ஆலோசனை செய்ய விரும்புகிறேன்.';

  const message = encodeURIComponent(lang === 'en' ? textEn : textTa);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-[90] bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2.5 rounded-lg shadow-lg transition-colors flex items-center gap-2 text-xs font-display font-semibold whitespace-nowrap"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-4 h-4" />
      <span>{lang === 'en' ? 'WhatsApp' : 'வாட்ஸ்அப்'}</span>
    </a>
  );
};

export default WhatsAppButton;
