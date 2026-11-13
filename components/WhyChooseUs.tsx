import React from 'react';
import { Shield, Clock, IndianRupee, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      num: '01',
      icon: <Shield className="w-5 h-5" />,
      title: 'IS-Certified Structural Grade',
      metric: 'M20/M25 & Fe-550D',
      description: 'Every project uses primary-mill TMT steel, laboratory-tested concrete cube samples, and branded plumbing and electrical conduits.'
    },
    {
      num: '02',
      icon: <Clock className="w-5 h-5" />,
      title: 'Milestone-Driven Handover',
      metric: '98% On-Time Record',
      description: 'Stage-gated Gantt schedules from foundation excavation to final coat painting ensure predictable completion dates.'
    },
    {
      num: '03',
      icon: <IndianRupee className="w-5 h-5" />,
      title: 'Itemized BOQ Transparency',
      metric: '0% Hidden Escalation',
      description: 'Detailed bill of quantities specifies exact cement brands, tile allowances, and joinery specifications prior to contract signing.'
    },
    {
      num: '04',
      icon: <Users className="w-5 h-5" />,
      title: 'Daily Engineer Supervision',
      metric: '50 km Dedicated Zone',
      description: 'Because we operate strictly within 50 km of Kumbakonam, our resident engineers supervise curing, reinforcement, and masonry daily.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-sm font-semibold text-[#000080] mb-1">
              Engineering Standards
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight text-balance">
              Why property owners across Thanjavur &amp; Kumbakonam choose AGe Groups
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Quantifiable quality assurance backed by three decades of local civil engineering accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50 p-7 border border-slate-200 rounded-lg flex flex-col justify-between hover:border-[#000080]/40 hover:bg-white transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 bg-white border border-slate-200 text-[#000080] flex items-center justify-center rounded-md">
                    {feature.icon}
                  </div>
                  <span className="font-mono-tabular text-xs font-semibold text-[#000080]">
                    {feature.metric}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
