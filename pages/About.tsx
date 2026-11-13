import React, { useState } from 'react';
import { Target, Eye, ClipboardCheck, Search, PencilRuler, Construction, Key, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  embedded?: boolean;
}

const ABOUT_IMAGE = '/src/assets/images/about_engineering_team_1794544868413.jpg';

const About: React.FC<AboutProps> = ({ embedded = false }) => {
  const { t, lang } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const processSteps = [
    {
      num: '01',
      title: lang === 'en' ? 'Site Consultation' : 'ஆலோசனை',
      desc: lang === 'en' ? 'Soil inspection, plot verification, and requirement mapping within 50 km of Kumbakonam.' : 'இட ஆய்வு மற்றும் தேவைகள் மதிப்பீடு.',
      icon: <Search className="w-5 h-5" />
    },
    {
      num: '02',
      title: lang === 'en' ? 'Architectural & Structural Plan' : 'திட்டமிடல்',
      desc: lang === 'en' ? '2D/3D floor layouts, Vasthu alignment, and IS-code structural load calculations.' : 'கட்டடக்கலை மற்றும் கட்டமைப்பு வடிவமைப்பு.',
      icon: <PencilRuler className="w-5 h-5" />
    },
    {
      num: '03',
      title: lang === 'en' ? 'Statutory Approvals' : 'அனுமதி',
      desc: lang === 'en' ? 'DTCP, municipal plan sanctions, and transparent bill-of-quantities sign-off.' : 'அரசு அனுமதி மற்றும் திட்ட ஒப்புதல்.',
      icon: <ClipboardCheck className="w-5 h-5" />
    },
    {
      num: '04',
      title: lang === 'en' ? 'Construction' : 'கட்டுமானம்',
      desc: lang === 'en' ? 'Stage-wise civil execution supervised daily by senior resident engineers.' : 'தேர்ந்தெடுக்கப்பட்ட பொறியாளர்களின் நேரடி மேற்பார்வையில் கட்டுமானம்.',
      icon: <Construction className="w-5 h-5" />
    },
    {
      num: '05',
      title: lang === 'en' ? 'Quality Handover' : 'ஒப்படைப்பு',
      desc: lang === 'en' ? 'Multi-point structural, plumbing, and electrical audit prior to key handover.' : 'முழுமையான தரப் பரிசோதனைக்குப் பின் ஒப்படைப்பு.',
      icon: <Key className="w-5 h-5" />
    },
  ];

  return (
    <div className={embedded ? 'py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden' : 'pt-16 pb-20 bg-white overflow-hidden'}>
      {!embedded && (
        <section className="bg-slate-900 py-20 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm font-medium text-blue-300 mb-2">Established 1995 · Kumbakonam</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight text-balance">
              {t.nav.about}
            </h1>
          </div>
        </section>
      )}

      {/* Who We Are Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-[#000080] mb-2">
              01. Heritage &amp; Engineering Practice
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6 tracking-tight text-balance">
              Three decades of structural integrity across the Cauvery Delta
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed text-base">
              <p>
                Founded in <strong className="text-slate-900 font-semibold">1995 in Kumbakonam, Thanjavur District</strong>, AGe Groups Construction and our affiliate practice, <strong className="text-slate-900 font-semibold">Consulting Engineers</strong>, have delivered over 500 residential, commercial, and institutional landmarks.
              </p>
              <p>
                We intentionally focus our operations within a strict <strong className="text-slate-900 font-semibold">50 km radius of Kumbakonam</strong> (covering Kumbakonam, Thanjavur, Thiruvarur, Mayiladuthurai, and Papanasam) so our principal engineers can inspect every site personally at every concrete pour.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <Eye className="w-5 h-5 text-[#000080]" />
                  <h3 className="font-display font-semibold text-base text-slate-900">Our Vision</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To set the regional benchmark in South India for durable, climate-responsive, and cost-transparent civil engineering.
                </p>
              </div>
              <div className="p-5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <Target className="w-5 h-5 text-[#000080]" />
                  <h3 className="font-display font-semibold text-base text-slate-900">Our Mission</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To execute every foundation, column, and finish with documented quality control, zero hidden escalations, and on-time delivery.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100 h-full min-h-[320px] flex flex-col justify-between group">
              {!imgError ? (
                <img
                  src={ABOUT_IMAGE}
                  alt="Senior civil engineers reviewing structural blueprints on construction site"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 text-center bg-slate-100">
                  <HardHat className="w-10 h-10 text-[#000080] mb-3" />
                  <p className="font-display font-semibold text-slate-900">On-Site Structural Supervision</p>
                  <p className="text-xs text-slate-600 mt-1">Principal Engineers on every project in Kumbakonam</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5-Step Process Section with Animated Structural Beam */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold text-[#000080] mb-1">
              02. Execution Methodology
            </p>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              {lang === 'en' ? 'Our 5-Stage Construction Workflow' : 'எங்கள் 5-நிலை கட்டுமான செயல்முறை'}
            </h3>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Every project follows a documented engineering schedule with stage-by-stage structural sign-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-slate-50 border border-slate-200 rounded-lg flex flex-col justify-between hover:border-[#000080]/40 hover:bg-white transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tabular text-xs font-semibold text-[#000080]">
                    Stage {step.num}
                  </span>
                  <div className="text-slate-700 group-hover:text-[#000080] transition-colors">{step.icon}</div>
                </div>
                <h4 className="font-display font-semibold text-base text-slate-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/70">
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(idx + 1) * 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
                    className="h-full bg-[#000080]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
