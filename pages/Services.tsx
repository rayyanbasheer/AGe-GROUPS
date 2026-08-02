
import React from 'react';
import { SERVICES } from '../constants';
import { Check, Hammer, PencilRuler, Cog, Layers, Zap, Droplets, Map } from 'lucide-react';
import CostEstimator from '../components/CostEstimator';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const projectScope = [
    { title: 'Site Development', icon: <Map className="w-6 h-6" />, details: 'Land grading and preparation.' },
    { title: 'Foundations', icon: <Layers className="w-6 h-6" />, details: 'Concrete works and structural base.' },
    { title: 'Steel Works', icon: <Hammer className="w-6 h-6" />, details: 'Robust steel structural frameworks.' },
    { title: 'Architecture', icon: <PencilRuler className="w-6 h-6" />, details: 'Finishing and aesthetic design.' },
    { title: 'Plumbing', icon: <Droplets className="w-6 h-6" />, details: 'Water and drainage systems.' },
    { title: 'Electrical', icon: <Zap className="w-6 h-6" />, details: 'Power and lighting grids.' },
  ];

  return (
    <div className="pt-0 pb-20">
      <section className="bg-blue-950 pt-48 pb-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">{t.nav.services}</h1>
          <p className="text-xl text-slate-400 font-medium uppercase tracking-[0.2em]">Engineering Excellence Across Every Sector</p>
        </div>
      </section>

      {/* Estimator Section - NEW FEATURE */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <CostEstimator />
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-blue-900 uppercase tracking-[0.4em] mb-4">Domains</h2>
          <h3 className="text-4xl font-black text-blue-950 uppercase tracking-tighter">Construction Expertise</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((s) => (
            <div key={s.id} className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="md:w-1/3 bg-blue-950 flex items-center justify-center p-12 group-hover:bg-blue-900 transition-colors">
                <Cog className="w-20 h-20 text-white opacity-20 group-hover:opacity-40" />
              </div>
              <div className="md:w-2/3 p-10">
                <h3 className="text-2xl font-black text-blue-950 mb-4 uppercase tracking-tight">{s.title}</h3>
                <p className="text-slate-500 mb-6 text-sm font-medium leading-relaxed">{s.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {s.details.map((d, i) => (
                    <div key={i} className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-900 mr-2"></div>
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Scope Grid */}
      <section className="py-24 bg-blue-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Capabilities</h2>
            <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter">Full Spectrum Engineering</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {projectScope.map((item, idx) => (
              <div key={idx} className="p-10 bg-blue-950 hover:bg-blue-900 transition-colors group">
                <div className="w-14 h-14 rounded-sm bg-white text-blue-950 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-lg font-black mb-3 uppercase tracking-widest">{item.title}</h4>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
