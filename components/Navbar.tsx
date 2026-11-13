import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, path: '/#home', id: 'home' },
    { name: t.nav.about, path: '/#about', id: 'about' },
    { name: t.nav.services, path: '/#services', id: 'services' },
    { name: t.nav.projects, path: '/#projects', id: 'projects' },
    { name: t.nav.contact, path: '/#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, id: string) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      setIsOpen(false);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-2 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, '/#home', 'home')}
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000080]"
        >
          <Logo light={false} className="h-11 sm:h-12" />
        </Link>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === `/${link.id}` ||
              location.hash === `#${link.id}` ||
              (location.pathname === '/' && !location.hash && link.id === 'home');
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.id)}
                className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#000080] border-[#000080] font-semibold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#000080] bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors whitespace-nowrap shrink-0"
            aria-label="Toggle language between English and Tamil"
          >
            <Globe className="w-3.5 h-3.5 text-[#000080]" />
            <span>{lang === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          <Link
            to="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact', 'contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#000080] hover:bg-blue-900 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000080]"
          >
            {t.nav.getQuote}
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Structural Beam */}
      <motion.div
        style={{ scaleX }}
        className="h-0.5 bg-[#000080] origin-left w-full"
      />

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path, link.id)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:text-[#000080] hover:bg-slate-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact', 'contact')}
              className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#000080] hover:bg-blue-900 rounded-md transition-colors"
            >
              {t.nav.getQuote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
