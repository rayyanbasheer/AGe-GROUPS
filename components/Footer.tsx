
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Logo light={true} />
            </div>
            <p className="text-sm leading-relaxed mt-4">
              Building Quality. Creating Trust Since 1995.
              Excellence, quality, and structural integrity are the foundations of our legacy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/#about" className="hover:text-white transition-colors uppercase tracking-wider">About Us</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors uppercase tracking-wider">Our Services</a></li>
              <li><a href="/#projects" className="hover:text-white transition-colors uppercase tracking-wider">Featured Projects</a></li>
              <li><a href="/#projects" className="hover:text-white transition-colors uppercase tracking-wider">Media Gallery</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors uppercase tracking-wider">Contact Support</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">Services</h4>
            <ul className="space-y-4 text-sm">
              <li>Residential Construction</li>
              <li>Commercial Real Estate</li>
              <li>Educational Infrastructure</li>
              <li>Healthcare Facilities</li>
              <li>Structural Engineering</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                <span>1st floor, Annai Complex, Gothandapani St, Anna Nagar, Kumbakonam, TN 612001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>+91 98425 69545</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="break-all">agegroupskum@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
          <p>&copy; {new Date().getFullYear()} AGe GROUPS Construction.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <Link to="/admin" className="hover:text-white opacity-50 hover:opacity-100">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
