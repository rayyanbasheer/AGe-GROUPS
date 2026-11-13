import React, { useState, useRef } from 'react';
import { ArrowRight, Building2, Users, Clock, Award } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import WhyChooseUs from '../components/WhyChooseUs';
import ConstructionScrollAnimation from '../components/ConstructionScrollAnimation';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import Contact from './Contact';

const HERO_IMAGE = '/src/assets/images/hero_construction_landmark_1794544867175.jpg';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [heroImgError, setHeroImgError] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const stats = [
    { label: t.stats.exp, val: '30+', unit: 'Yrs', icon: <Clock className="w-5 h-5 text-[#000080]" /> },
    { label: t.stats.projects, val: '500+', unit: 'Sites', icon: <Building2 className="w-5 h-5 text-[#000080]" /> },
    { label: t.stats.clients, val: '400+', unit: 'Families & Firms', icon: <Users className="w-5 h-5 text-[#000080]" /> },
    { label: t.stats.awards, val: '50 km', unit: 'Kumbakonam Radius', icon: <Award className="w-5 h-5 text-[#000080]" /> },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative bg-slate-900 text-white pt-28 pb-16 lg:pt-32 lg:pb-24 border-b border-slate-800 overflow-hidden"
      >
        {/* Subtle Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 2-Column Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <p className="text-sm font-medium text-blue-300 mb-3">
                {t.hero.subtitle}
              </p>
              <h1
                className="font-display font-bold text-white tracking-tight text-balance mb-6 leading-[1.12]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.75rem)' }}
              >
                {t.hero.title1}{' '}
                <span className="text-slate-300">{t.hero.title2}</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                {t.hero.desc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-white text-[#000080] font-display font-semibold text-sm hover:bg-slate-100 transition-colors duration-150 whitespace-nowrap shrink-0 group"
                >
                  {t.hero.consult}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-display font-semibold text-sm transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  {t.hero.view}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col"
            >
              <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-800/50 h-full min-h-[280px] lg:min-h-[380px] flex flex-col justify-end group">
                {!heroImgError ? (
                  <motion.img
                    style={{ y: imageParallaxY }}
                    src={HERO_IMAGE}
                    alt="Modern reinforced concrete and glass commercial and residential building by AGe Groups Construction"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover lg:h-full scale-105 transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full min-h-[320px] bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 text-center">
                    <Building2 className="w-12 h-12 text-blue-300 mb-3" />
                    <p className="font-display font-semibold text-white text-base">AGe Groups Structural Engineering</p>
                    <p className="text-xs text-slate-400 mt-1">Kumbakonam · Thanjavur · Thiruvarur</p>
                  </div>
                )}
                <div className="relative z-10 inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-5">
                  <div className="flex items-center justify-between text-xs text-slate-200">
                    <span>Structural Design &amp; Construction</span>
                    <span className="font-mono-tabular text-blue-200">IS 456:2000 Compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-width 4-Column KPI Row Below Hero Split */}
          <div className="mt-12 pt-10 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-lg p-5 flex items-start justify-between transition-colors"
              >
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono-tabular font-semibold text-2xl sm:text-3xl text-white">
                      {stat.val}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{stat.unit}</span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
                </div>
                <div className="p-2 bg-white/95 rounded-md shrink-0">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div id="about">
        <About embedded />
      </div>

      {/* Interactive Scroll-Linked Construction & Crane Simulation */}
      <ConstructionScrollAnimation />

      <div id="services">
        <Services embedded />
      </div>

      <WhyChooseUs />

      <div id="projects">
        <Projects embedded />
      </div>

      <div id="contact">
        <Contact embedded />
      </div>
    </div>
  );
};

export default Home;
