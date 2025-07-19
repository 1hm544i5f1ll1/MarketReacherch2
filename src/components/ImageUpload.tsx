import React, { useCallback, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  language: 'en' | 'ar';
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, language, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const text = {
    en: {
      dragDrop: 'Drag and drop your food image here',
      clickUpload: 'Click to upload',
      analyzing: 'Analyzing your food image...',
      supportedFormats: 'Supported formats: JPG, PNG, WEBP',
      takePhoto: 'Take Photo',
      uploadImage: 'Upload Image',
      changeImage: 'Change Image',
    },
    ar: {
      dragDrop: 'اسحب وأفلت صورة الطعام هنا',
      clickUpload: 'انقر للرفع',
      analyzing: 'جاري تحليل صورة الطعام...',
      supportedFormats: 'الصيغ المدعومة: JPG, PNG, WEBP',
      takePhoto: 'التقط صورة',
      uploadImage: 'رفع صورة',
      changeImage: 'تغيير الصورة',
    },
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">{text[language].analyzing}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          <button
            onClick={clearPreview}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="p-6">
            <p className="text-gray-600 mb-4">{text[language].changeImage}</p>
            <input
              type="file"
              id="file-upload-change"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
            <label
              htmlFor="file-upload-change"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors duration-200"
            >
              {text[language].uploadImage}
            </label>
          </div>
        </div>
      ) : (
        <div
          className={`border-3 border-dashed p-12 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-orange-500 bg-orange-50' 
              : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-6">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-700 mb-2">
              {text[language].dragDrop}
            </p>
            <p className="text-gray-500 mb-6">{text[language].clickUpload}</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
            />
            <label
              htmlFor="file-upload"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-flex items-center gap-2 transition-colors duration-200"
            >
              <Upload className="w-5 h-5" />
              {text[language].uploadImage}
            </label>
            
            <input
              type="file"
              id="camera-upload"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
            />
            <label
              htmlFor="camera-upload"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-flex items-center gap-2 transition-colors duration-200"
            >
              <Camera className="w-5 h-5" />
              {text[language].takePhoto}
            </label>
          </div>
          
          <p className="text-sm text-gray-400 mt-4">{text[language].supportedFormats}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;