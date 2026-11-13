import React from 'react';
import { SERVICES } from '../constants';
import { Hammer, PencilRuler, Layers, Zap, Droplets, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import CostEstimator from '../components/CostEstimator';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  embedded?: boolean;
}

const Services: React.FC<ServicesProps> = ({ embedded = false }) => {
  const { t, lang } = useLanguage();

  const projectScope = [
    { num: '01', title: 'Site Development & Surveying', icon: <Map className="w-5 h-5" />, details: 'Total station land surveying, soil bearing capacity testing, and earthwork grading.' },
    { num: '02', title: 'Substructure & Foundations', icon: <Layers className="w-5 h-5" />, details: 'Isolated footings, raft foundations, and anti-termite chemical soil treatment.' },
    { num: '03', title: 'Reinforced Concrete & Steel', icon: <Hammer className="w-5 h-5" />, details: 'Fe-550D TMT steel reinforcement and M20/M25 machine-mixed structural concrete.' },
    { num: '04', title: 'Architectural Finishing', icon: <PencilRuler className="w-5 h-5" />, details: 'Teak joinery, vitrified/granite flooring, weather-coat exterior emulsions, and elevation work.' },
    { num: '05', title: 'Plumbing & Hydro-Sanitary', icon: <Droplets className="w-5 h-5" />, details: 'Concealed CPVC/UPVC piping, rainwater harvesting sumps, and pressure-tested drainage.' },
    { num: '06', title: 'Electrical & Three-Phase Grids', icon: <Zap className="w-5 h-5" />, details: 'FRLS copper wiring, modular switchgear, inverter provisioning, and earthing pits.' },
  ];

  return (
    <div className={embedded ? 'py-20 lg:py-24 bg-slate-50 border-b border-slate-200' : 'pt-16 pb-20 bg-slate-50'}>
      {!embedded && (
        <section className="bg-slate-900 py-20 text-center border-b border-slate-800 mb-16">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm font-medium text-blue-300 mb-2">Civil &amp; Structural Engineering</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              {t.nav.services}
            </h1>
          </div>
        </section>
      )}

      {/* Primary Services Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold text-[#000080] mb-1">
              03. Core Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight text-balance">
              Specialized construction across four core sectors
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            From custom family villas to multi-story commercial complexes and institutional campuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((s, idx) => {
            const isWide = idx === 0 || idx === 3;
            const title = lang === 'ta' && s.titleTa ? s.titleTa : s.title;
            const desc = lang === 'ta' && s.descriptionTa ? s.descriptionTa : s.description;
            const details = lang === 'ta' && s.detailsTa ? s.detailsTa : s.details;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className={`${
                  isWide ? 'md:col-span-7' : 'md:col-span-5'
                } bg-white border border-slate-200 rounded-lg p-7 sm:p-8 flex flex-col justify-between hover:border-[#000080]/40 transition-colors`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="font-mono-tabular font-semibold text-[#000080]">
                      0{idx + 1}. Sector
                    </span>
                    <span>Design &amp; Construction</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3 tracking-tight">
                    {title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
                  {details.map((d, i) => (
                    <React.Fragment key={i}>
                      <span>{d}</span>
                      {i < details.length - 1 && (
                        <span aria-hidden="true" className="text-slate-300">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Cost Estimator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <CostEstimator />
      </section>

      {/* Full Spectrum Engineering Scope */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="mb-10">
          <p className="text-sm font-semibold text-[#000080] mb-1">
            04. Technical Scope
          </p>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            End-to-end civil &amp; MEP engineering execution
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectScope.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={{ y: -3 }}
              className="p-6 bg-white border border-slate-200 hover:border-[#000080]/40 rounded-lg flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tabular text-xs font-semibold text-slate-500">
                    {item.num}
                  </span>
                  <div className="p-2 rounded-md bg-slate-100 text-[#000080]">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-display font-semibold text-base text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
