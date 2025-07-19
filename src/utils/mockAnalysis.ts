import { FoodAnalysis } from '../types';

const generateMockAnalysis = (imageName: string, imageUrl: string): FoodAnalysis => {
  // Generate realistic random ratings
  const presentation = 6 + Math.random() * 3;
  const freshness = 7 + Math.random() * 2.5;
  const portionSize = 6.5 + Math.random() * 2.5;
  const colorBalance = 6 + Math.random() * 3;
  const plating = 6.5 + Math.random() * 2.5;
  
  const overallRating = (presentation + freshness + portionSize + colorBalance + plating) / 5;

  const mockRecommendations = {
    english: [
      "Consider adding more colorful vegetables to enhance visual appeal and nutritional balance.",
      "The plating could benefit from more height variation to create visual interest.",
      "Try using garnishes that complement the main dish flavors, such as fresh herbs or edible flowers.",
      "The portion size appears optimal, but consider the plate size ratio for better presentation.",
      "Adding a sauce drizzle or dots around the plate could elevate the professional appearance."
    ],
    arabic: [
      "فكر في إضافة المزيد من الخضروات الملونة لتعزيز الجاذبية البصرية والتوازن الغذائي.",
      "يمكن أن يستفيد التقديم من تنويع أكثر في الارتفاعات لخلق اهتمام بصري.",
      "جرب استخدام زينة تكمل نكهات الطبق الرئيسي، مثل الأعشاب الطازجة أو الزهور الصالحة للأكل.",
      "حجم الحصة يبدو مثالياً، لكن فكر في نسبة حجم الطبق للحصول على تقديم أفضل.",
      "إضافة رذاذ الصلصة أو النقاط حول الطبق يمكن أن يرفع من المظهر المهني."
    ]
  };

  const mockStrengths = {
    english: [
      "Excellent food freshness and quality ingredients visible",
      "Good portion control and balanced serving size",
      "Clean plate presentation with proper spacing",
      "Appealing color contrast between ingredients"
    ],
    arabic: [
      "طازجة ممتازة للطعام ومكونات عالية الجودة مرئية",
      "تحكم جيد في الحصة وحجم التقديم متوازن",
      "تقديم نظيف للطبق مع مساحة مناسبة",
      "تباين ألوان جذاب بين المكونات"
    ]
  };

  const mockImprovements = {
    english: [
      "Plating arrangement could be more artistic and creative",
      "Consider adding complementary side garnishes",
      "Temperature contrast elements could enhance the dish",
      "Sauce integration could be more elegant"
    ],
    arabic: [
      "يمكن أن يكون ترتيب التقديم أكثر فنية وإبداعاً",
      "فكر في إضافة زينة جانبية متكاملة",
      "عناصر التباين في درجة الحرارة يمكن أن تعزز الطبق",
      "دمج الصلصة يمكن أن يكون أكثر أناقة"
    ]
  };

  return {
    id: `analysis-${Date.now()}`,
    imageName,
    imageUrl,
    overallRating: Number(overallRating.toFixed(1)),
    analysisDate: new Date().toLocaleDateString(),
    categories: {
      presentation: Number(presentation.toFixed(1)),
      freshness: Number(freshness.toFixed(1)),
      portionSize: Number(portionSize.toFixed(1)),
      colorBalance: Number(colorBalance.toFixed(1)),
      plating: Number(plating.toFixed(1)),
    },
    recommendations: mockRecommendations,
    strengths: mockStrengths,
    improvements: mockImprovements,
  };
};

export { generateMockAnalysis };