import React, { useState } from 'react';
import { Calculator, Info, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CostEstimator: React.FC = () => {
  const { t, lang } = useLanguage();
  const [area, setArea] = useState(1500);
  const [type, setType] = useState<'res' | 'com'>('res');
  const [finishTier, setFinishTier] = useState<'standard' | 'premium' | 'custom'>('premium');

  const tiers = [
    {
      id: 'standard' as const,
      label: lang === 'en' ? 'Essential Structural' : 'அடிப்படை கட்டமைப்பு',
      factors: ['IS-grade RCC frame & masonry', 'Standard vitrified flooring & joinery', 'Essential electrical & plumbing grid']
    },
    {
      id: 'premium' as const,
      label: lang === 'en' ? 'Premium Architectural' : 'நவீன கட்டடக்கலை',
      factors: ['Custom façade & perforated elevation', 'First-quality teak wood & granite finishes', '3-phase FRLS grid & hydro-sanitary systems']
    },
    {
      id: 'custom' as const,
      label: lang === 'en' ? 'Bespoke Luxury / Commercial' : 'சிறப்பு வடிவமைப்பு',
      factors: ['Cantilevered slabs & double-height spaces', 'Designer cladding, jaali & architectural lighting', 'Tailored structural & MEP engineering']
    }
  ];

  const activeTier = tiers.find((item) => item.id === finishTier) || tiers[1];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-7 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#000080] text-white rounded-md shrink-0 mt-0.5">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight">
                {t.estimator.title}
              </h3>
              <p className="text-slate-600 text-sm mt-0.5">
                {t.estimator.desc}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor="estimator-area-range" className="text-xs font-semibold text-slate-700">
                {t.estimator.area}
              </label>
              <span className="font-mono-tabular font-semibold text-base text-[#000080]">
                {area.toLocaleString('en-IN')} Sq. Ft
              </span>
            </div>
            <input
              id="estimator-area-range"
              type="range"
              min="500"
              max="10000"
              step="100"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000080]"
            />
            <div className="flex justify-between text-xs font-mono-tabular text-slate-400 mt-1">
              <span>500 Sq. Ft</span>
              <span>5,000 Sq. Ft</span>
              <span>10,000 Sq. Ft</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                {t.estimator.type}
              </label>
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 w-full">
                <button
                  type="button"
                  onClick={() => setType('res')}
                  className={`flex-1 px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    type === 'res'
                      ? 'bg-[#000080] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.estimator.res}
                </button>
                <button
                  type="button"
                  onClick={() => setType('com')}
                  className={`flex-1 px-4 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    type === 'com'
                      ? 'bg-[#000080] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.estimator.com}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2">
                {lang === 'en' ? 'Specification Scope' : 'கட்டுமானத் தரம்'}
              </label>
              <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 w-full">
                {tiers.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFinishTier(item.id)}
                    className={`flex-1 px-2.5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 truncate ${
                      finishTier === item.id
                        ? 'bg-[#000080] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.id === 'standard' ? 'Standard' : item.id === 'premium' ? 'Premium' : 'Custom'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#000080] mb-1">
              {t.estimator.total}
            </p>
            <p className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {lang === 'en' ? 'Rate Based on Requirements' : 'தேவைக்கேற்ப மதிப்பீடு'}
            </p>
            <p className="text-xs text-slate-600 mt-1.5 font-mono-tabular">
              {area.toLocaleString('en-IN')} Sq. Ft · {type === 'res' ? t.estimator.res : t.estimator.com} · {activeTier.label}
            </p>

            <ul className="mt-5 space-y-2 border-t border-slate-200 pt-4">
              {activeTier.factors.map((factor, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#000080] shrink-0 mt-0.5" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 space-y-4">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.estimator.disclaimer}
              </p>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#000080] hover:bg-blue-900 text-white text-xs font-display font-semibold transition-colors whitespace-nowrap"
            >
              <span>Request Custom Quote for {area.toLocaleString('en-IN')} Sq. Ft</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
