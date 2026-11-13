import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

const QuotationGenerator: React.FC = () => {
  const [projectType, setProjectType] = useState('Residential');
  const [sqft, setSqft] = useState<number | ''>('');
  const [submitted, setSubmitted] = useState(false);

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sqft) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 text-blue-300 text-xs font-semibold mb-3">
              <Calculator className="w-4 h-4" />
              <span>Requirement-Based Assessment</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Custom Quotation Planner
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
              Construction rates per sq.ft vary based on soil testing, structural design, elevation complexity, and material choices. Share your approximate area to request a tailored Bill of Quantities (BOQ).
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-8 rounded-lg border border-slate-200 text-slate-900">
              <form onSubmit={handleRequestQuote} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => {
                      setProjectType(e.target.value);
                      setSubmitted(false);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-3 text-sm text-slate-900"
                  >
                    <option value="Residential">Residential Villa / Home</option>
                    <option value="Commercial">Commercial Complex</option>
                    <option value="Industrial">Industrial Structure</option>
                    <option value="Renovation">Renovation Work</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Approximate Area (Sq. Ft)</label>
                  <input
                    type="number"
                    value={sqft}
                    onChange={(e) => {
                      setSqft(e.target.value ? Number(e.target.value) : '');
                      setSubmitted(false);
                    }}
                    required
                    placeholder="e.g., 2200"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-3 text-sm text-slate-900"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#000080] hover:bg-blue-900 text-white py-3.5 rounded-md font-display font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span>Check Requirement Scope</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {submitted && sqft && (
                <div className="mt-6 p-5 bg-slate-50 border border-slate-200 rounded-md">
                  <p className="text-xs font-semibold text-[#000080] mb-1">
                    {projectType} · {Number(sqft).toLocaleString('en-IN')} Sq. Ft
                  </p>
                  <p className="text-sm font-display font-bold text-slate-900">
                    Rate Customized to Your Requirements
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Per-sq.ft pricing is finalized after reviewing your floor plan, soil bearing conditions, and material specifications with our engineers.
                  </p>
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
