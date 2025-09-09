// Composant Header avec navigation: components/Header.tsx
import { useState } from 'react';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/app/context/LanguageContext';
import MercureMekinda from './MercureMekinda';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { translations } = useLanguage();

  const navItems = [
    { name: translations.nav.home, href: '#home' },
    { name: translations.nav.projects, href: '#projects' },
    { name: translations.nav.experience, href: '#experience' },
    { name: translations.nav.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-sm z-50 py-4 px-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          <MercureMekinda />
        </a>
        
        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <LanguageToggle />
          <a 
            href="/cv.pdf" 
            download 
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {translations.nav.cv}
          </a>
        </nav>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center space-x-4">
          <LanguageToggle />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile ouvert */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 mt-4 py-4 rounded-lg shadow-xl">
          <div className="container mx-auto flex flex-col space-y-4">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="text-gray-300 hover:text-white transition-colors duration-300 py-2 px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="/cv.pdf" 
              download 
              className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-center mx-4 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {translations.nav.cv}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}