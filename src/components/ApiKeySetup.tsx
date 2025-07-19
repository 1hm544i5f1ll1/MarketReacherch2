import React, { useState } from 'react';
import { Key, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeySetupProps {
  language: 'en' | 'ar';
  onClose: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ language, onClose }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const text = {
    en: {
      title: 'OpenAI API Key Required',
      subtitle: 'To use real AI analysis, you need to configure your OpenAI API key',
      instructions: 'Setup Instructions',
      step1: '1. Visit OpenAI Platform',
      step2: '2. Sign up or log in to your account',
      step3: '3. Navigate to API Keys section',
      step4: '4. Create a new API key',
      step5: '5. Copy the API key',
      step6: '6. Create a .env file in your project root',
      step7: '7. Add: VITE_OPENAI_API_KEY=your_api_key_here',
      step8: '8. Restart the development server',
      warning: 'Important: Keep your API key secure and never share it publicly',
      openaiLink: 'Get OpenAI API Key',
      mockMode: 'Continue with Mock Analysis',
      showInstructions: 'Show Setup Instructions',
      hideInstructions: 'Hide Instructions',
      note: 'Note: Mock analysis provides example results for demonstration purposes'
    },
    ar: {
      title: 'مطلوب مفتاح OpenAI API',
      subtitle: 'لاستخدام التحليل الحقيقي بالذكاء الاصطناعي، تحتاج لتكوين مفتاح OpenAI API',
      instructions: 'تعليمات الإعداد',
      step1: '1. زيارة منصة OpenAI',
      step2: '2. التسجيل أو تسجيل الدخول لحسابك',
      step3: '3. الانتقال لقسم مفاتيح API',
      step4: '4. إنشاء مفتاح API جديد',
      step5: '5. نسخ مفتاح API',
      step6: '6. إنشاء ملف .env في جذر مشروعك',
      step7: '7. إضافة: VITE_OPENAI_API_KEY=your_api_key_here',
      step8: '8. إعادة تشغيل خادم التطوير',
      warning: 'مهم: احتفظ بمفتاح API آمناً ولا تشاركه علناً أبداً',
      openaiLink: 'احصل على مفتاح OpenAI API',
      mockMode: 'المتابعة مع التحليل التجريبي',
      showInstructions: 'عرض تعليمات الإعداد',
      hideInstructions: 'إخفاء التعليمات',
      note: 'ملاحظة: التحليل التجريبي يوفر نتائج مثال لأغراض العرض'
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Key className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{text[language].title}</h2>
              <p className="text-gray-600">{text[language].subtitle}</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm">{text[language].note}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5" />
              {showInstructions ? text[language].hideInstructions : text[language].showInstructions}
            </button>

            {showInstructions && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-800 mb-4">{text[language].instructions}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="font-medium text-gray-700">{text[language].step1}</span>
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {text[language].openaiLink}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-gray-700">{text[language].step2}</p>
                  <p className="text-gray-700">{text[language].step3}</p>
                  <p className="text-gray-700">{text[language].step4}</p>
                  <p className="text-gray-700">{text[language].step5}</p>
                  <p className="text-gray-700">{text[language].step6}</p>
                  <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{text[language].step7}</p>
                  <p className="text-gray-700">{text[language].step8}</p>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-800 text-sm font-medium">{text[language].warning}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                {text[language].openaiLink}
              </a>
              
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                {text[language].mockMode}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;