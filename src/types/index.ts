export interface FoodAnalysis {
  id: string;
  imageName: string;
  imageUrl: string;
  overallRating: number;
  analysisDate: string;
  categories: {
    presentation: number;
    freshness: number;
    portionSize: number;
    colorBalance: number;
    plating: number;
  };
  recommendations: {
    english: string[];
    arabic: string[];
  };
  strengths: {
    english: string[];
    arabic: string[];
  };
  improvements: {
    english: string[];
    arabic: string[];
  };
}

export interface Language {
  code: 'en' | 'ar';
  name: string;
  dir: 'ltr' | 'rtl';
}