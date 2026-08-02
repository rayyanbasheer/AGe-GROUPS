import React from 'react';
import { Shield, Clock, IndianRupee, Users } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'We use only top-grade materials and follow strict quality control measures for every project.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Timely Delivery',
      description: 'Our efficient project management ensures your construction is completed right on schedule.'
    },
    {
      icon: <IndianRupee className="w-8 h-8" />,
      title: 'Transparent Pricing',
      description: 'No hidden costs. We provide detailed estimates and maintain financial transparency.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Team',
      description: 'Our team of experienced engineers and skilled laborers bring decades of expertise.'
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-blue-900 mx-auto mb-6"></div>
          <h3 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 tracking-tight uppercase">Why Choose Us</h3>
          <p className="text-slate-500 text-lg">Building trust through excellence, transparency, and commitment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 border border-slate-200 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-900 flex items-center justify-center rounded-sm mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-black text-blue-950 mb-4 uppercase tracking-tight">{feature.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
