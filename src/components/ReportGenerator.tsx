import React, { useState } from 'react';
import { Download, FileText, Building2, User } from 'lucide-react';
import { FoodAnalysis } from '../types';
import { generateRestaurantReport } from '../utils/pdfGenerator';

interface ReportGeneratorProps {
  analysis: FoodAnalysis;
  language: 'en' | 'ar';
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ analysis, language }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [restaurantName, setRestaurantName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const text = {
    en: {
      title: 'Generate Professional Report',
      subtitle: 'Create a comprehensive PDF report for management and kitchen staff',
      restaurantName: 'Restaurant Name (Optional)',
      restaurantPlaceholder: 'Enter your restaurant name',
      generateReport: 'Generate PDF Report',
      generating: 'Generating Report...',
      features: {
        title: 'Report Includes:',
        executive: 'Executive Summary for CEO/Management',
        detailed: 'Detailed Analysis with Ratings',
        chef: 'Actionable Recommendations for Chefs',
        business: 'Business Impact & ROI Analysis',
        action: 'Implementation Action Plan',
        kpi: 'Key Performance Indicators to Track'
      },
      benefits: {
        title: 'Perfect for:',
        management: 'Restaurant Management Reviews',
        training: 'Staff Training & Development',
        quality: 'Quality Control Documentation',
        improvement: 'Continuous Improvement Planning'
      }
    },
    ar: {
      title: 'إنشاء تقرير احترافي',
      subtitle: 'إنشاء تقرير PDF شامل للإدارة وموظفي المطبخ',
      restaurantName: 'اسم المطعم (اختياري)',
      restaurantPlaceholder: 'أدخل اسم مطعمك',
      generateReport: 'إنشاء تقرير PDF',
      generating: 'جاري إنشاء التقرير...',
      features: {
        title: 'يتضمن التقرير:',
        executive: 'ملخص تنفيذي للرئيس التنفيذي/الإدارة',
        detailed: 'تحليل مفصل مع التقييمات',
        chef: 'توصيات قابلة للتنفيذ للطهاة',
        business: 'تأثير الأعمال وتحليل العائد على الاستثمار',
        action: 'خطة عمل التنفيذ',
        kpi: 'مؤشرات الأداء الرئيسية للمتابعة'
      },
      benefits: {
        title: 'مثالي لـ:',
        management: 'مراجعات إدارة المطعم',
        training: 'تدريب وتطوير الموظفين',
        quality: 'توثيق مراقبة الجودة',
        improvement: 'تخطيط التحسين المستمر'
      }
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await generateRestaurantReport(analysis, language, restaurantName || undefined);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
      setShowForm(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-blue-600" />
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{text[language].title}</h3>
          <p className="text-gray-600">{text[language].subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            {text[language].features.title}
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.executive}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.detailed}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.chef}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.business}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.action}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].features.kpi}</span>
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-green-600" />
            {text[language].benefits.title}
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].benefits.management}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].benefits.training}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].benefits.quality}</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700">{text[language].benefits.improvement}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 flex items-center gap-3 mx-auto"
            >
              <Download className="w-5 h-5" />
              {text[language].generateReport}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="restaurant-name" className="block text-sm font-medium text-gray-700 mb-2">
                {text[language].restaurantName}
              </label>
              <input
                type="text"
                id="restaurant-name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder={text[language].restaurantPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    {text[language].generating}
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    {text[language].generateReport}
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;