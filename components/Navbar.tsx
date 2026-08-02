
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/#home' },
    { name: t.nav.about, path: '/#about' },
    { name: t.nav.services, path: '/#services' },
    { name: t.nav.projects, path: '/#projects' },
    { name: t.nav.contact, path: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  const navBgClass = isHome 
    ? (scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-6') 
    : (scrolled ? 'bg-white shadow-lg py-2' : 'bg-blue-950/20 backdrop-blur-sm py-4');

  const linkColorClass = scrolled || !isHome ? 'text-blue-900' : 'text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
             <Logo light={!scrolled || (!isHome && !scrolled)} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:opacity-70 ${
                  location.hash === link.path.substring(1) || (location.pathname === '/' && link.path === '/#home' && !location.hash)
                    ? (isHome && !scrolled ? 'text-white border-b-2 border-white' : 'text-blue-800 border-b-2 border-blue-800') 
                    : linkColorClass
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className={`flex items-center space-x-1 px-3 py-1 border rounded-sm text-[10px] font-black uppercase tracking-widest transition-colors ${
                scrolled || !isHome ? 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white' : 'border-white text-white hover:bg-white hover:text-blue-900'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            <Link to="/#contact" onClick={(e) => handleNavClick(e, '/#contact')} className="bg-[#000080] hover:bg-blue-900 text-white px-6 py-2.5 rounded-sm shadow-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all transform hover:scale-105">
              {t.nav.getQuote}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className={`px-2 py-1 border rounded-sm text-[10px] font-black ${(scrolled || !isHome) ? 'border-blue-900 text-blue-900' : 'border-white text-white'}`}
            >
              {lang === 'en' ? 'தமிழ்' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${(scrolled || !isHome) ? 'text-blue-900' : 'text-white'} p-2 bg-white/10 rounded-sm`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 ${isOpen ? 'max-h-screen py-10 opacity-100 border-t border-slate-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
        <div className="flex flex-col space-y-6 px-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`text-sm font-black uppercase tracking-[0.3em] ${location.hash === link.path.substring(1) || (location.pathname === '/' && link.path === '/#home' && !location.hash) ? 'text-blue-800' : 'text-slate-500'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="bg-[#000080] text-white px-6 py-4 rounded-sm text-center text-xs font-black uppercase tracking-[0.4em]"
          >
            {t.nav.getQuote}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
