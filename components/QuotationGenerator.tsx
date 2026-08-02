import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

const QuotationGenerator: React.FC = () => {
  const [projectType, setProjectType] = useState('Residential');
  const [sqft, setSqft] = useState<number | ''>('');
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqft) return;
    
    // Rough estimates per sqft in INR
    const rates: Record<string, number> = {
      'Residential': 2500,
      'Commercial': 3000,
      'Industrial': 2000,
      'Renovation': 1500
    };

    const rate = rates[projectType] || 2500;
    setEstimate(Number(sqft) * rate);
  };

  return (
    <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-sm mb-6">
              <Calculator className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Instant Estimate</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase">Quotation Generator</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Get a rough estimate for your construction project instantly. Select the project type and enter the approximate square footage.
            </p>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Transparent pricing structure</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Based on current market rates</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> No hidden costs</li>
            </ul>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-8 md:p-12 rounded-sm shadow-2xl text-slate-900">
              <form onSubmit={calculateEstimate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Project Type</label>
                  <select 
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider"
                  >
                    <option value="Residential">Residential Villa</option>
                    <option value="Commercial">Commercial Complex</option>
                    <option value="Industrial">Industrial Shed</option>
                    <option value="Renovation">Renovation Work</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Total Area (Sq.Ft)</label>
                  <input 
                    type="number" 
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value ? Number(e.target.value) : '')}
                    required 
                    placeholder="e.g., 1500" 
                    className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-900 rounded-sm p-4 text-xs font-bold uppercase tracking-wider" 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-950 text-white py-4 rounded-sm font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center shadow-xl"
                >
                  Calculate Cost <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </form>

              {estimate !== null && (
                <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-sm text-center animate-in fade-in slide-in-from-bottom-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Estimated Cost</p>
                  <p className="text-3xl md:text-4xl font-black text-blue-950">₹ {estimate.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-slate-400 mt-4 font-medium">*This is a rough estimate. Final cost may vary based on materials and site conditions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationGenerator;
