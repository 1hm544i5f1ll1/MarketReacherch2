import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { exampleReports } from '../utils/exampleReports';
import AnalysisResults from './AnalysisResults';

interface ExampleReportsProps {
  language: 'en' | 'ar';
}

const ExampleReports: React.FC<ExampleReportsProps> = ({ language }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showFullReport, setShowFullReport] = useState(false);

  const text = {
    en: {
      title: 'Example Analysis Reports',
      subtitle: 'See how our AI analyzes different types of food presentations',
      viewReport: 'View Full Report',
      backToExamples: 'Back to Examples',
      next: 'Next Example',
      previous: 'Previous Example',
      exampleOf: 'Example',
      overallRating: 'Overall Rating',
    },
    ar: {
      title: 'أمثلة على تقارير التحليل',
      subtitle: 'شاهد كيف يحلل الذكاء الاصطناعي أنواع مختلفة من عروض الطعام',
      viewReport: 'عرض التقرير الكامل',
      backToExamples: 'العودة للأمثلة',
      next: 'المثال التالي',
      previous: 'المثال السابق',
      exampleOf: 'مثال',
      overallRating: 'التقييم الإجمالي',
    },
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % exampleReports.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + exampleReports.length) % exampleReports.length);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-green-100';
    if (rating >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (showFullReport) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setShowFullReport(false)}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
          {text[language].backToExamples}
        </button>
        <AnalysisResults analysis={exampleReports[currentExample]} language={language} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{text[language].title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{text[language].subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <img 
            src={exampleReports[currentExample].imageUrl} 
            alt={exampleReports[currentExample].imageName}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {text[language].exampleOf} {currentExample + 1}/{exampleReports.length}
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-full ${getRatingBg(exampleReports[currentExample].overallRating)} flex items-center justify-center`}>
                <span className={`text-xl font-bold ${getRatingColor(exampleReports[currentExample].overallRating)}`}>
                  {exampleReports[currentExample].overallRating}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{text[language].overallRating}</h3>
                <p className="text-gray-600">{exampleReports[currentExample].analysisDate}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowFullReport(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Eye className="w-5 h-5" />
              {text[language].viewReport}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {Object.entries(exampleReports[currentExample].categories).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`w-12 h-12 rounded-full ${getRatingBg(value)} flex items-center justify-center mx-auto mb-2`}>
                  <span className={`text-sm font-bold ${getRatingColor(value)}`}>
                    {value.toFixed(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 capitalize">{key}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevExample}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              {text[language].previous}
            </button>
            
            <div className="flex gap-2">
              {exampleReports.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentExample(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentExample ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextExample}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              {text[language].next}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleReports;