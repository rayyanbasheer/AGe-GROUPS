
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Clock, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import WhyChooseUs from '../components/WhyChooseUs';
import QuotationGenerator from '../components/QuotationGenerator';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <section id="home" className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-blue-950">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-80"
            alt=""
            aria-hidden="true"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-sm mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-white text-xs font-black uppercase tracking-[0.3em]">{t.hero.subtitle}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase">
              {t.hero.title1} <br />
              <span className="text-slate-300">{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed font-medium">
              {t.hero.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-white text-blue-900 px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm flex items-center justify-center transition-all hover:bg-slate-200 shadow-xl group">
                {t.hero.consult}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#projects" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-sm font-black uppercase tracking-widest text-sm flex items-center justify-center transition-all hover:bg-white/10">
                {t.hero.view}
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 py-10 hidden lg:block shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-8">
            {[
              { label: t.stats.exp, val: '30+', icon: <Clock className="w-8 h-8 text-blue-900" /> },
              { label: t.stats.projects, val: '500+', icon: <Building2 className="w-8 h-8 text-blue-900" /> },
              { label: t.stats.clients, val: '400+', icon: <Users className="w-8 h-8 text-blue-900" /> },
              { label: t.stats.awards, val: '12+', icon: <Award className="w-8 h-8 text-blue-900" /> },
            ].map((stat, i) => (
              <div key={i} className="flex items-center space-x-4 border-r border-slate-200 last:border-r-0">
                <div className="p-2 bg-slate-100 rounded-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-blue-900 text-3xl font-black">{stat.val}</p>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div id="about">
        <About />
      </div>

      <div id="services">
        <Services />
      </div>

      <WhyChooseUs />

      <div id="projects">
        <Projects />
      </div>

      <QuotationGenerator />

      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
