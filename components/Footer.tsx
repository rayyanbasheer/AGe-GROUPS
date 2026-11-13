import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-sm text-slate-400 leading-relaxed">
              Consulting Engineers &amp; Builders serving Kumbakonam, Thanjavur, and Thiruvarur since 1995.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
                className="px-3 py-1.5 rounded-md border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                Language: {lang === 'en' ? 'English (Switch to தமிழ்)' : 'தமிழ் (Switch to English)'}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Engineering Services</a></li>
              <li><a href="/#projects" className="hover:text-white transition-colors">Project Portfolio</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Request Proposal</a></li>
            </ul>
          </div>

          {/* Core Capabilities */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">Core Sectors</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Residential Villas &amp; Homes</li>
              <li>Commercial &amp; Retail Complexes</li>
              <li>Educational Institutions</li>
              <li>Healthcare Infrastructure</li>
              <li>Structural Consulting &amp; BOQ</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-semibold text-sm mb-4">Headquarters</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                <span>1st Floor, Annai Complex, Gothandapani St, Anna Nagar, Kumbakonam, TN 612001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-mono-tabular text-slate-200">+91 98425 69545</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="break-all">agegroupskum@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} AGe Groups Construction. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/#contact" className="hover:text-white transition-colors">Consultation Terms</a>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
