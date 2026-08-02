
import React, { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CostEstimator: React.FC = () => {
  const { t } = useLanguage();
  const [area, setArea] = useState(1000);
  const [type, setType] = useState('res');
  
  const rates: Record<string, number> = {
    res: 1800, // INR per sqft
    com: 2200  // INR per sqft
  };

  const estimatedCost = (area * rates[type]).toLocaleString('en-IN');

  return (
    <div className="bg-white border-2 border-blue-900 p-8 md:p-12 shadow-2xl rounded-sm">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-900 text-white rounded-sm">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tight">{t.estimator.title}</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t.estimator.desc}</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-600">{t.estimator.area}</label>
            <span className="text-blue-900 font-black">{area} Sq. Ft</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="10000" 
            step="100" 
            value={area}
            onChange={(e) => setArea(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-widest text-slate-600 block mb-3">{t.estimator.type}</label>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setType('res')}
              className={`py-4 rounded-sm border-2 font-black uppercase tracking-widest text-xs transition-all ${type === 'res' ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'border-slate-200 text-slate-400 hover:border-blue-900'}`}
            >
              {t.estimator.res}
            </button>
            <button 
              onClick={() => setType('com')}
              className={`py-4 rounded-sm border-2 font-black uppercase tracking-widest text-xs transition-all ${type === 'com' ? 'bg-blue-900 border-blue-900 text-white shadow-lg' : 'border-slate-200 text-slate-400 hover:border-blue-900'}`}
            >
              {t.estimator.com}
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-8 border-t-4 border-blue-900">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{t.estimator.total}</p>
          <p className="text-4xl md:text-5xl font-black text-blue-950 tracking-tighter">
            ₹{estimatedCost}
          </p>
        </div>

        <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-sm">
          <Info className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-900/70 font-bold uppercase tracking-wider italic">
            {t.estimator.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CostEstimator;
