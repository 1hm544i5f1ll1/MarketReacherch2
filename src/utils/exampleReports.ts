import { FoodAnalysis } from '../types';

export const exampleReports: FoodAnalysis[] = [
  // High-quality gourmet dish
  {
    id: 'example-1',
    imageName: 'gourmet-salmon.jpg',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    overallRating: 8.7,
    analysisDate: '2025-01-27',
    categories: {
      presentation: 9.2,
      freshness: 8.8,
      portionSize: 8.5,
      colorBalance: 9.0,
      plating: 8.0
    },
    recommendations: {
      english: [
        "Add a small microgreen garnish to enhance the color contrast and add a fresh element",
        "Consider a light sauce drizzle around the plate edge for a more professional finish",
        "The salmon portion is excellent - maintain this consistency across all servings",
        "Try adding a small edible flower for an elegant touch that complements the sophisticated plating"
      ],
      arabic: [
        "أضف زينة صغيرة من الخضروات الورقية لتعزيز التباين اللوني وإضافة عنصر طازج",
        "فكر في رذاذ خفيف من الصلصة حول حافة الطبق للحصول على لمسة نهائية أكثر احترافية",
        "حصة السلمون ممتازة - حافظ على هذا الاتساق في جميع الحصص",
        "جرب إضافة زهرة صالحة للأكل صغيرة للحصول على لمسة أنيقة تكمل التقديم المتطور"
      ]
    },
    strengths: {
      english: [
        "Exceptional color balance with vibrant vegetables and perfectly cooked salmon",
        "Professional plating technique with excellent use of negative space",
        "Perfect portion control - restaurant-quality serving size",
        "Outstanding freshness evident in the crisp vegetables and glossy fish",
        "Sophisticated composition with well-balanced elements"
      ],
      arabic: [
        "توازن ألوان استثنائي مع خضروات نابضة بالحياة وسلمون مطبوخ بشكل مثالي",
        "تقنية تقديم احترافية مع استخدام ممتاز للمساحة السلبية",
        "تحكم مثالي في الحصة - حجم تقديم بجودة المطعم",
        "طازجة متميزة واضحة في الخضروات المقرمشة والسمك اللامع",
        "تركيب متطور مع عناصر متوازنة بشكل جيد"
      ]
    },
    improvements: {
      english: [
        "Consider adding a complementary sauce to tie all flavors together",
        "A small height variation could add more visual drama to the presentation"
      ],
      arabic: [
        "فكر في إضافة صلصة متكاملة لربط جميع النكهات معاً",
        "تنويع صغير في الارتفاع يمكن أن يضيف المزيد من الدراما البصرية للتقديم"
      ]
    }
  },

  // Average home-cooked meal
  {
    id: 'example-2',
    imageName: 'pasta-dish.jpg',
    imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    overallRating: 6.4,
    analysisDate: '2025-01-27',
    categories: {
      presentation: 5.8,
      freshness: 7.2,
      portionSize: 6.5,
      colorBalance: 6.0,
      plating: 6.5
    },
    recommendations: {
      english: [
        "Add fresh basil leaves or parsley for color contrast and aromatic appeal",
        "Consider using a wider, shallower bowl to better showcase the pasta",
        "A light sprinkle of parmesan cheese would enhance both visual appeal and flavor",
        "Try twirling the pasta into a neat nest shape for more elegant presentation",
        "Add a few cherry tomatoes or colorful vegetables to brighten the dish"
      ],
      arabic: [
        "أضف أوراق الريحان الطازجة أو البقدونس للتباين اللوني والجاذبية العطرية",
        "فكر في استخدام وعاء أوسع وأقل عمقاً لعرض المعكرونة بشكل أفضل",
        "رش خفيف من جبن البارميزان سيعزز الجاذبية البصرية والنكهة",
        "جرب لف المعكرونة في شكل عش أنيق للحصول على تقديم أكثر أناقة",
        "أضف بعض طماطم الكرز أو الخضروات الملونة لإضاءة الطبق"
      ]
    },
    strengths: {
      english: [
        "Good portion size appropriate for a main course",
        "Pasta appears to be cooked to proper al dente texture",
        "Clean plate presentation without spillage",
        "Sauce distribution looks even throughout the dish"
      ],
      arabic: [
        "حجم حصة جيد مناسب للطبق الرئيسي",
        "تبدو المعكرونة مطبوخة بالقوام المناسب",
        "تقديم نظيف للطبق بدون انسكاب",
        "توزيع الصلصة يبدو متساوياً في جميع أنحاء الطبق"
      ]
    },
    improvements: {
      english: [
        "Lacks visual interest - needs more color variety",
        "Plating could be more artistic and restaurant-style",
        "Missing garnish elements that would elevate the presentation",
        "Bowl choice doesn't complement the dish optimally"
      ],
      arabic: [
        "يفتقر للاهتمام البصري - يحتاج المزيد من تنوع الألوان",
        "يمكن أن يكون التقديم أكثر فنية وبأسلوب المطعم",
        "عناصر الزينة المفقودة التي من شأنها أن ترفع من التقديم",
        "اختيار الوعاء لا يكمل الطبق بشكل مثالي"
      ]
    }
  },

  // Poor presentation example
  {
    id: 'example-3',
    imageName: 'burger-fries.jpg',
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    overallRating: 4.2,
    analysisDate: '2025-01-27',
    categories: {
      presentation: 3.5,
      freshness: 5.0,
      portionSize: 4.8,
      colorBalance: 3.8,
      plating: 4.0
    },
    recommendations: {
      english: [
        "Arrange fries in a neat stack or fan pattern instead of scattered placement",
        "Add colorful vegetables like lettuce, tomato, and pickles to the burger for visual appeal",
        "Use a larger plate to give components more space and create better composition",
        "Consider adding a small side salad or coleslaw for color contrast",
        "Secure the burger with a decorative pick to maintain structure",
        "Add a sauce cup or small ramekin for dipping to elevate the presentation"
      ],
      arabic: [
        "رتب البطاطس المقلية في كومة أنيقة أو نمط مروحي بدلاً من الوضع المبعثر",
        "أضف خضروات ملونة مثل الخس والطماطم والمخلل للبرغر للجاذبية البصرية",
        "استخدم طبقاً أكبر لإعطاء المكونات مساحة أكثر وخلق تركيب أفضل",
        "فكر في إضافة سلطة جانبية صغيرة أو سلطة الكرنب للتباين اللوني",
        "ثبت البرغر بعود زينة للحفاظ على الهيكل",
        "أضف كوب صلصة أو وعاء صغير للغمس لرفع مستوى التقديم"
      ]
    },
    strengths: {
      english: [
        "Generous portion size that provides good value",
        "Burger bun appears fresh and properly toasted",
        "Fries look crispy and golden brown"
      ],
      arabic: [
        "حجم حصة سخي يوفر قيمة جيدة",
        "خبز البرغر يبدو طازجاً ومحمصاً بشكل صحيح",
        "البطاطس المقلية تبدو مقرمشة وذهبية اللون"
      ]
    },
    improvements: {
      english: [
        "Very poor plating presentation - looks haphazard and unprofessional",
        "Lacks any color variety - predominantly brown and beige tones",
        "No garnish or decorative elements to enhance visual appeal",
        "Components are crowded together without thoughtful arrangement",
        "Missing fresh vegetables that would add color and nutritional balance",
        "Plate size is too small for the portion, creating a cluttered appearance"
      ],
      arabic: [
        "تقديم ضعيف جداً - يبدو عشوائياً وغير احترافي",
        "يفتقر لأي تنوع في الألوان - ألوان بنية وبيج في الغالب",
        "لا توجد زينة أو عناصر زخرفية لتعزيز الجاذبية البصرية",
        "المكونات مزدحمة معاً بدون ترتيب مدروس",
        "خضروات طازجة مفقودة من شأنها أن تضيف لوناً وتوازناً غذائياً",
        "حجم الطبق صغير جداً للحصة، مما يخلق مظهراً مزدحماً"
      ]
    }
  },

  // Excellent fine dining example
  {
    id: 'example-4',
    imageName: 'fine-dining-steak.jpg',
    imageUrl: 'https://images.pexels.com/photos/299347/pexels-photo-299347.jpeg?auto=compress&cs=tinysrgb&w=800',
    overallRating: 9.3,
    analysisDate: '2025-01-27',
    categories: {
      presentation: 9.5,
      freshness: 9.2,
      portionSize: 9.0,
      colorBalance: 9.8,
      plating: 9.0
    },
    recommendations: {
      english: [
        "This is an exemplary presentation that demonstrates professional fine dining standards",
        "The sauce work is exceptional - consider this as a template for other dishes",
        "Maintain this level of precision in vegetable cutting and arrangement",
        "The color balance achieved here should be replicated across the menu"
      ],
      arabic: [
        "هذا تقديم مثالي يُظهر معايير الطعام الفاخر المهنية",
        "عمل الصلصة استثنائي - اعتبر هذا كقالب للأطباق الأخرى",
        "حافظ على هذا المستوى من الدقة في تقطيع وترتيب الخضروات",
        "توازن الألوان المحقق هنا يجب تكراره في جميع أنحاء القائمة"
      ]
    },
    strengths: {
      english: [
        "Masterful plating technique with perfect balance and composition",
        "Exceptional color harmony with vibrant vegetables and rich protein",
        "Professional sauce application with artistic drizzle patterns",
        "Perfect portion control demonstrating fine dining standards",
        "Outstanding freshness visible in every component",
        "Sophisticated use of height and texture variation",
        "Impeccable attention to detail in garnish placement"
      ],
      arabic: [
        "تقنية تقديم بارعة مع توازن وتركيب مثالي",
        "انسجام ألوان استثنائي مع خضروات نابضة بالحياة وبروتين غني",
        "تطبيق صلصة احترافي مع أنماط رذاذ فنية",
        "تحكم مثالي في الحصة يُظهر معايير الطعام الفاخر",
        "طازجة متميزة مرئية في كل مكون",
        "استخدام متطور لتنويع الارتفاع والملمس",
        "اهتمام لا تشوبه شائبة بالتفاصيل في وضع الزينة"
      ]
    },
    improvements: {
      english: [
        "This presentation is near perfect - only minor refinements possible",
        "Could consider a small edible flower for an extra luxury touch"
      ],
      arabic: [
        "هذا التقديم مثالي تقريباً - تحسينات طفيفة فقط ممكنة",
        "يمكن النظر في زهرة صالحة للأكل صغيرة للمسة فخامة إضافية"
      ]
    }
  },

  // Dessert example
  {
    id: 'example-5',
    imageName: 'chocolate-dessert.jpg',
    imageUrl: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
    overallRating: 7.8,
    analysisDate: '2025-01-27',
    categories: {
      presentation: 8.2,
      freshness: 7.5,
      portionSize: 8.0,
      colorBalance: 7.8,
      plating: 7.5
    },
    recommendations: {
      english: [
        "Add a contrasting color element like fresh berries or mint leaves",
        "Consider dusting the plate rim with powdered sugar for elegance",
        "A small quenelle of vanilla ice cream would provide temperature contrast",
        "Try adding some texture with crushed nuts or cookie crumbs",
        "A decorative chocolate garnish could enhance the luxury appeal"
      ],
      arabic: [
        "أضف عنصر لوني متباين مثل التوت الطازج أو أوراق النعناع",
        "فكر في رش حافة الطبق بالسكر البودرة للأناقة",
        "كرة صغيرة من آيس كريم الفانيليا ستوفر تباين درجة الحرارة",
        "جرب إضافة بعض الملمس مع المكسرات المطحونة أو فتات البسكويت",
        "زينة الشوكولاتة الزخرفية يمكن أن تعزز جاذبية الفخامة"
      ]
    },
    strengths: {
      english: [
        "Rich, decadent appearance that's very appealing",
        "Good portion size for a dessert course",
        "Smooth, professional chocolate work",
        "Clean plate presentation with good composition"
      ],
      arabic: [
        "مظهر غني ومترف جذاب جداً",
        "حجم حصة جيد لطبق الحلوى",
        "عمل شوكولاتة ناعم واحترافي",
        "تقديم نظيف للطبق مع تركيب جيد"
      ]
    },
    improvements: {
      english: [
        "Lacks color variety - predominantly brown tones",
        "Could benefit from fresh fruit or colorful garnish",
        "Plating could be more artistic with sauce work",
        "Missing textural contrast elements"
      ],
      arabic: [
        "يفتقر لتنوع الألوان - ألوان بنية في الغالب",
        "يمكن أن يستفيد من الفاكهة الطازجة أو الزينة الملونة",
        "يمكن أن يكون التقديم أكثر فنية مع عمل الصلصة",
        "عناصر التباين في الملمس مفقودة"
      ]
    }
  }
];