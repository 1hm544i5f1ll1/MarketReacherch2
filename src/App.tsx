import React, { useState } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import AnalysisResults from './components/AnalysisResults';
import ExampleReports from './components/ExampleReports';
import ApiKeySetup from './components/ApiKeySetup';
import { FoodAnalysis } from './types';
import { generateMockAnalysis } from './utils/mockAnalysis';
import { openaiService } from './services/openaiService';

function App() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showApiSetup, setShowApiSetup] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    // Create image URL for preview
    const imageUrl = URL.createObjectURL(file);
    
    try {
      let analysisResult: FoodAnalysis;
      
      if (openaiService.isReady()) {
        // Use real OpenAI analysis
        analysisResult = await openaiService.analyzeFoodImage(imageUrl, file.name);
      } else {
        // Show API setup modal first
        setShowApiSetup(true);
        setIsAnalyzing(false);
        return;
      }
      
      setAnalysis(analysisResult);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisError(error instanceof Error ? error.message : 'Analysis failed');
      
      // Fallback to mock analysis
      setTimeout(() => {
        const mockAnalysis = generateMockAnalysis(file.name, imageUrl);
        setAnalysis(mockAnalysis);
        setAnalysisError(null);
      }, 1000);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApiSetupClose = () => {
    setShowApiSetup(false);
    // Continue with mock analysis
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      const imageUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        const mockAnalysis = generateMockAnalysis(file.name, imageUrl);
        setAnalysis(mockAnalysis);
        setIsAnalyzing(false);
      }, 1000);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setIsAnalyzing(false);
    setShowExamples(false);
    setAnalysisError(null);
  };

  const toggleExamples = () => {
    setShowExamples(!showExamples);
    setAnalysis(null);
    setIsAnalyzing(false);
    setAnalysisError(null);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-red-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* API Status Indicator */}
        <div className="mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
            openaiService.isReady() 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              openaiService.isReady() ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            {openaiService.isReady() 
              ? (language === 'en' ? 'AI Analysis Ready' : 'تحليل الذكاء الاصطناعي جاهز')
              : (language === 'en' ? 'Using Mock Analysis' : 'استخدام التحليل التجريبي')
            }
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={resetAnalysis}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              !showExamples && !analysis && !isAnalyzing
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {language === 'en' ? 'Upload & Analyze' : 'رفع وتحليل'}
          </button>
          <button
            onClick={toggleExamples}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              showExamples
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {language === 'en' ? 'View Examples' : 'عرض الأمثلة'}
          </button>
        </div>

        {/* Error Message */}
        {analysisError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-red-500 mt-0.5">⚠️</div>
              <div>
                <p className="text-red-800 font-medium">
                  {language === 'en' ? 'Analysis Error' : 'خطأ في التحليل'}
                </p>
                <p className="text-red-700 text-sm mt-1">{analysisError}</p>
                <p className="text-red-600 text-sm mt-2">
                  {language === 'en' 
                    ? 'Falling back to mock analysis for demonstration...' 
                    : 'التراجع للتحليل التجريبي للعرض...'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Show examples */}
        {showExamples && (
          <ExampleReports language={language} />
        )}

        {/* Upload section */}
        {!analysis && !isAnalyzing && !showExamples && (
          <div className="mb-8">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              language={language}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}

        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="mb-8">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              language={language}
              isAnalyzing={isAnalyzing}
            />
          </div>
        )}

        {/* Analysis results */}
        {analysis && !showExamples && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Analysis Results' : 'نتائج التحليل'}
              </h2>
              <button
                onClick={resetAnalysis}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                {language === 'en' ? 'Analyze New Image' : 'تحليل صورة جديدة'}
              </button>
            </div>
            <AnalysisResults analysis={analysis} language={language} />
          </div>
        )}

        {/* Welcome section */}
        {!analysis && !isAnalyzing && !showExamples && (
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {language === 'en' 
                  ? 'Professional Food Analysis at Your Fingertips'
                  : 'تحليل طعام احترافي في متناول يديك'
                }
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {language === 'en'
                  ? 'Upload your food images and get instant AI-powered insights on presentation, freshness, plating, and actionable recommendations to improve your culinary creations.'
                  : 'ارفع صور طعامك واحصل على رؤى فورية مدعومة بالذكاء الاصطناعي حول العرض والطازجة والتقديم وتوصيات قابلة للتنفيذ لتحسين إبداعاتك الطهوية.'
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📸</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {language === 'en' ? 'Upload Image' : 'رفع الصورة'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'en' 
                      ? 'Take a photo or upload an existing image of your dish'
                      : 'التقط صورة أو ارفع صورة موجودة لطبقك'
                    }
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {language === 'en' ? 'AI Analysis' : 'تحليل الذكاء الاصطناعي'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'en'
                      ? 'Our AI analyzes presentation, freshness, and plating quality'
                      : 'يحلل الذكاء الاصطناعي العرض والطازجة وجودة التقديم'
                    }
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">
                    {language === 'en' ? 'Get Insights' : 'احصل على رؤى'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'en'
                      ? 'Receive detailed ratings and actionable improvement suggestions'
                      : 'احصل على تقييمات مفصلة واقتراحات تحسين قابلة للتنفيذ'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* API Key Setup Modal */}
      {showApiSetup && (
        <ApiKeySetup language={language} onClose={handleApiSetupClose} />
      )}
    </div>
  );
}

export default App;