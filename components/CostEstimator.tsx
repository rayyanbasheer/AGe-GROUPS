import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CostEstimator: React.FC = () => {
  const { t } = useLanguage();
  const [area, setArea] = useState(1500);
  const [type, setType] = useState<'res' | 'com'>('res');

  const rates: Record<'res' | 'com', number> = {
    res: 2200, // INR per sqft
    com: 2650  // INR per sqft
  };

  const estimatedCost = (area * rates[type]).toLocaleString('en-IN');

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-7 sm:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
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

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              {t.estimator.type}
            </label>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setType('res')}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  type === 'res'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.estimator.res} (₹2,200/sq.ft)
              </button>
              <button
                type="button"
                onClick={() => setType('com')}
                className={`flex-1 sm:flex-initial px-5 py-2 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  type === 'com'
                    ? 'bg-[#000080] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.estimator.com} (₹2,650/sq.ft)
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">
              {t.estimator.total}
            </p>
            <p className="font-mono-tabular text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              ₹{estimatedCost}
            </p>
            <p className="text-xs text-slate-500 mt-2 font-mono-tabular">
              Calculated for {area.toLocaleString('en-IN')} sq.ft · {type === 'res' ? 'Standard Residential Construction' : 'Commercial Structural Frame'}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#000080] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.estimator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
