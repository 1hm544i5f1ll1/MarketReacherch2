import React from 'react';
import { Camera, Globe } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const text = {
    en: {
      title: 'Restaurant AI Food Analyzer',
      subtitle: 'Advanced computer vision for food quality assessment',
    },
    ar: {
      title: 'محلل الطعام الذكي للمطاعم',
      subtitle: 'رؤية حاسوبية متقدمة لتقييم جودة الطعام',
    },
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{text[language].title}</h1>
              <p className="text-orange-100 mt-1">{text[language].subtitle}</p>
            </div>
          </div>
          
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;