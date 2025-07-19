import React from 'react';
import { Star, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { FoodAnalysis } from '../types';
import ReportGenerator from './ReportGenerator';

interface AnalysisResultsProps {
  analysis: FoodAnalysis;
  language: 'en' | 'ar';
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, language }) => {
  const text = {
    en: {
      overallRating: 'Overall Rating',
      detailedAnalysis: 'Detailed Analysis',
      presentation: 'Presentation',
      freshness: 'Freshness',
      portionSize: 'Portion Size',
      colorBalance: 'Color Balance',
      plating: 'Plating',
      strengths: 'Strengths',
      improvements: 'Areas for Improvement',
      recommendations: 'AI Recommendations',
      analyzedOn: 'Analyzed on',
    },
    ar: {
      overallRating: 'التقييم الإجمالي',
      detailedAnalysis: 'التحليل التفصيلي',
      presentation: 'العرض',
      freshness: 'الطازجة',
      portionSize: 'حجم الحصة',
      colorBalance: 'توازن الألوان',
      plating: 'التقديم',
      strengths: 'نقاط القوة',
      improvements: 'مجالات التحسين',
      recommendations: 'توصيات الذكاء الاصطناعي',
      analyzedOn: 'تم التحليل في',
    },
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

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Overall Rating */}
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{text[language].overallRating}</h2>
        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getRatingBg(analysis.overallRating)} mb-4`}>
          <span className={`text-4xl font-bold ${getRatingColor(analysis.overallRating)}`}>
            {analysis.overallRating.toFixed(1)}
          </span>
        </div>
        <div className="flex justify-center mb-4">
          {renderStars(analysis.overallRating)}
        </div>
        <p className="text-gray-600">{text[language].analyzedOn} {analysis.analysisDate}</p>
      </div>

      {/* Image Preview */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <img src={analysis.imageUrl} alt={analysis.imageName} className="w-full h-64 object-cover" />
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{text[language].detailedAnalysis}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(analysis.categories || {}).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className={`w-16 h-16 rounded-full ${getRatingBg(value)} flex items-center justify-center mx-auto mb-3`}>
                <span className={`text-xl font-bold ${getRatingColor(value)}`}>
                  {value.toFixed(1)}
                </span>
              </div>
              <p className="font-medium text-gray-700">
                {text[language][key as keyof typeof text[typeof language]]}
              </p>
              <div className="flex justify-center mt-2">
                {renderStars(value)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-gray-800">{text[language].strengths}</h3>
          </div>
          <ul className="space-y-3">
            {(analysis.strengths?.[language] || []).map((strength, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-800">{text[language].improvements}</h3>
          </div>
          <ul className="space-y-3">
            {(analysis.improvements?.[language] || []).map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">{text[language].recommendations}</h3>
        </div>
        <div className="space-y-4">
          {(analysis.recommendations?.[language] || []).map((recommendation, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Report Generator */}
      <ReportGenerator analysis={analysis} language={language} />
    </div>
  );
};

export default AnalysisResults;