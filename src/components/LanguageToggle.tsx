// Composant LanguageToggle: components/LanguageToggle.tsx
import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button 
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">{language === 'fr' ? 'FR' : 'EN'}</span>
      <div className="relative w-10 h-5 bg-gray-700 rounded-full">
        <div className={`absolute top-0.5 w-4 h-4 bg-purple-500 rounded-full transition-transform duration-300 ${language === 'fr' ? 'left-0.5' : 'left-5.5'}`}></div>
      </div>
    </button>
  );
}