
import React from 'react';
import { Target, Eye, Shield, Users2, Check, ClipboardCheck, Search, PencilRuler, Construction, Key } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t, lang } = useLanguage();

  const processSteps = [
    { title: lang === 'en' ? 'Consultation' : 'ஆலோசனை', icon: <Search className="w-6 h-6" /> },
    { title: lang === 'en' ? 'Planning' : 'திட்டமிடல்', icon: <PencilRuler className="w-6 h-6" /> },
    { title: lang === 'en' ? 'Approval' : 'அனுமதி', icon: <ClipboardCheck className="w-6 h-6" /> },
    { title: lang === 'en' ? 'Construction' : 'கட்டுமானம்', icon: <Construction className="w-6 h-6" /> },
    { title: lang === 'en' ? 'Handover' : 'ஒப்படைப்பு', icon: <Key className="w-6 h-6" /> },
  ];

  return (
    <div className="pt-0 pb-20">
      <section className="bg-blue-950 pt-48 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">{t.nav.about}</h1>
          <p className="text-xl text-slate-300 font-medium uppercase tracking-widest">Building Trust Since 1995</p>
        </div>
      </section>

      {/* Process Section - NEW FEATURE */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-black text-blue-950 uppercase tracking-tighter">
              {lang === 'en' ? 'Our 5-Step Journey' : 'எங்கள் 5-நிலை பயணம்'}
            </h3>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-900/10 -translate-y-1/2 hidden lg:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center group">
                  <div className="w-16 h-16 bg-white border-2 border-blue-900 text-blue-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all shadow-xl">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Step 0{i+1}</span>
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-950">{step.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-16 h-1 bg-blue-900 mb-8"></div>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 mb-8 uppercase tracking-tighter">Who We Are</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-medium">
              <p>
                AGe Groups Construction, along with its affiliate <strong>Consulting Engineers</strong>, 
                was founded in <strong>1995 in Kumbakonam, Thanjavur District</strong>.
              </p>
              <p>
                With over <strong>30+ years of dedicated experience</strong>, our company has built 
                a strong reputation for maintaining quality in every detail. 
              </p>
            </div>
          </div>
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000" 
              className="rounded-sm shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              alt="Engineering work"
            />
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-950 p-16 rounded-sm text-white shadow-2xl relative overflow-hidden group">
              <Eye className="w-12 h-12 text-slate-400 mb-8" />
              <h3 className="text-3xl font-black mb-6 uppercase tracking-widest">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                To become one of the most trusted construction companies in South India by delivering innovative, 
                sustainable, and high-quality construction solutions.
              </p>
            </div>
            <div className="bg-slate-200 p-16 rounded-sm text-blue-950 shadow-lg group">
              <Target className="w-12 h-12 text-blue-900 mb-8" />
              <h3 className="text-3xl font-black mb-6 uppercase tracking-widest">Our Mission</h3>
              <p className="text-blue-900/80 text-lg leading-relaxed font-medium">
                To build durable and modern structures while maintaining the highest standards of quality, safety, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
