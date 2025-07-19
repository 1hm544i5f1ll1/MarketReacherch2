import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FoodAnalysis } from '../types';

interface ReportData {
  analysis: FoodAnalysis;
  language: 'en' | 'ar';
  restaurantName?: string;
  reportDate: string;
}

export class RestaurantReportGenerator {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;
  private margin: number;
  private currentY: number;
  private language: 'en' | 'ar';

  constructor(language: 'en' | 'ar' = 'en') {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 20;
    this.currentY = this.margin;
    this.language = language;
  }

  private addNewPage() {
    this.doc.addPage();
    this.currentY = this.margin;
  }

  private checkPageBreak(height: number) {
    if (this.currentY + height > this.pageHeight - this.margin) {
      this.addNewPage();
    }
  }

  private addTitle(text: string, fontSize: number = 20) {
    this.checkPageBreak(15);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += 15;
  }

  private addSubtitle(text: string, fontSize: number = 14) {
    this.checkPageBreak(10);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(text, this.margin, this.currentY);
    this.currentY += 10;
  }

  private addText(text: string, fontSize: number = 10, style: 'normal' | 'bold' = 'normal') {
    this.checkPageBreak(8);
    this.doc.setFontSize(fontSize);
    this.doc.setFont('helvetica', style);
    
    // Handle text wrapping
    const lines = this.doc.splitTextToSize(text, this.pageWidth - 2 * this.margin);
    this.doc.text(lines, this.margin, this.currentY);
    this.currentY += lines.length * 6;
  }

  private addBulletPoint(text: string, indent: number = 0) {
    this.checkPageBreak(8);
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    
    const bulletX = this.margin + indent;
    const textX = bulletX + 5;
    
    this.doc.text('•', bulletX, this.currentY);
    const lines = this.doc.splitTextToSize(text, this.pageWidth - textX - this.margin);
    this.doc.text(lines, textX, this.currentY);
    this.currentY += lines.length * 6;
  }

  private addRatingBox(label: string, rating: number, x: number, y: number, width: number = 35) {
    const height = 25;
    
    // Box background
    const color = rating >= 8 ? [34, 197, 94] : rating >= 6 ? [234, 179, 8] : [239, 68, 68];
    this.doc.setFillColor(color[0], color[1], color[2]);
    this.doc.rect(x, y, width, height, 'F');
    
    // Rating text
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(rating.toFixed(1), x + width/2, y + 12, { align: 'center' });
    
    // Label
    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(label, x + width/2, y + height + 5, { align: 'center' });
  }

  private addExecutiveSummary(analysis: FoodAnalysis) {
    const text = this.language === 'en' ? {
      title: 'EXECUTIVE SUMMARY',
      overallPerformance: 'Overall Performance',
      keyFindings: 'Key Findings',
      businessImpact: 'Business Impact',
      immediateActions: 'Immediate Actions Required',
      rating: 'Rating',
      excellent: 'Excellent - Exceeds industry standards',
      good: 'Good - Meets expectations with room for improvement',
      needsImprovement: 'Needs Improvement - Below industry standards',
      revenueImpact: 'Current presentation quality may impact customer satisfaction and repeat business.',
      brandImage: 'Food presentation directly affects brand perception and social media shareability.',
      competitiveAdvantage: 'Improving visual appeal can differentiate from competitors and justify premium pricing.'
    } : {
      title: 'الملخص التنفيذي',
      overallPerformance: 'الأداء العام',
      keyFindings: 'النتائج الرئيسية',
      businessImpact: 'التأثير على الأعمال',
      immediateActions: 'الإجراءات الفورية المطلوبة',
      rating: 'التقييم',
      excellent: 'ممتاز - يتجاوز معايير الصناعة',
      good: 'جيد - يلبي التوقعات مع مجال للتحسين',
      needsImprovement: 'يحتاج تحسين - أقل من معايير الصناعة',
      revenueImpact: 'جودة العرض الحالية قد تؤثر على رضا العملاء وتكرار الأعمال.',
      brandImage: 'عرض الطعام يؤثر مباشرة على تصور العلامة التجارية وقابلية المشاركة على وسائل التواصل الاجتماعي.',
      competitiveAdvantage: 'تحسين الجاذبية البصرية يمكن أن يميز عن المنافسين ويبرر التسعير المتميز.'
    };

    this.addTitle(text.title);
    this.currentY += 5;

    // Overall Performance Box
    this.addSubtitle(text.overallPerformance);
    const performanceText = analysis.overallRating >= 8 ? text.excellent :
                           analysis.overallRating >= 6 ? text.good : text.needsImprovement;
    this.addText(`${text.rating}: ${analysis.overallRating}/10 - ${performanceText}`);
    this.currentY += 5;

    // Key Findings
    this.addSubtitle(text.keyFindings);
    const strengths = analysis.strengths[this.language === 'en' ? 'english' : 'arabic'];
    const improvements = analysis.improvements[this.language === 'en' ? 'english' : 'arabic'];
    
    strengths.slice(0, 2).forEach(strength => this.addBulletPoint(strength));
    improvements.slice(0, 2).forEach(improvement => this.addBulletPoint(improvement));
    this.currentY += 5;

    // Business Impact
    this.addSubtitle(text.businessImpact);
    this.addBulletPoint(text.revenueImpact);
    this.addBulletPoint(text.brandImage);
    this.addBulletPoint(text.competitiveAdvantage);
    this.currentY += 10;
  }

  private addDetailedAnalysis(analysis: FoodAnalysis) {
    const text = this.language === 'en' ? {
      title: 'DETAILED ANALYSIS',
      categories: 'Performance Categories',
      presentation: 'Presentation',
      freshness: 'Freshness',
      portionSize: 'Portion Size',
      colorBalance: 'Color Balance',
      plating: 'Plating'
    } : {
      title: 'التحليل التفصيلي',
      categories: 'فئات الأداء',
      presentation: 'العرض',
      freshness: 'الطازجة',
      portionSize: 'حجم الحصة',
      colorBalance: 'توازن الألوان',
      plating: 'التقديم'
    };

    this.addTitle(text.title);
    this.addSubtitle(text.categories);

    // Rating boxes
    const startY = this.currentY;
    const boxWidth = 30;
    const spacing = 35;
    
    const categories = [
      { key: 'presentation', label: text.presentation, value: analysis.categories.presentation },
      { key: 'freshness', label: text.freshness, value: analysis.categories.freshness },
      { key: 'portionSize', label: text.portionSize, value: analysis.categories.portionSize },
      { key: 'colorBalance', label: text.colorBalance, value: analysis.categories.colorBalance },
      { key: 'plating', label: text.plating, value: analysis.categories.plating }
    ];

    categories.forEach((category, index) => {
      const x = this.margin + (index * spacing);
      this.addRatingBox(category.label, category.value, x, startY, boxWidth);
    });

    this.currentY = startY + 40;
  }

  private addChefRecommendations(analysis: FoodAnalysis) {
    const text = this.language === 'en' ? {
      title: 'CHEF RECOMMENDATIONS',
      subtitle: 'Immediate Kitchen Improvements',
      techniques: 'Plating Techniques',
      ingredients: 'Ingredient Enhancements',
      presentation: 'Presentation Tips'
    } : {
      title: 'توصيات الشيف',
      subtitle: 'تحسينات المطبخ الفورية',
      techniques: 'تقنيات التقديم',
      ingredients: 'تحسينات المكونات',
      presentation: 'نصائح العرض'
    };

    this.addTitle(text.title);
    this.addSubtitle(text.subtitle);

    const recommendations = analysis.recommendations[this.language === 'en' ? 'english' : 'arabic'];
    
    this.addSubtitle(text.techniques, 12);
    recommendations.slice(0, 3).forEach(rec => this.addBulletPoint(rec));
    
    this.addSubtitle(text.ingredients, 12);
    recommendations.slice(3, 5).forEach(rec => this.addBulletPoint(rec));
    
    this.currentY += 5;
  }

  private addCEOInsights(analysis: FoodAnalysis) {
    const text = this.language === 'en' ? {
      title: 'CEO STRATEGIC INSIGHTS',
      roi: 'Return on Investment Analysis',
      training: 'Staff Training Requirements',
      costs: 'Implementation Costs',
      timeline: 'Implementation Timeline',
      kpis: 'Key Performance Indicators',
      roiText: 'Improving food presentation can increase customer satisfaction by 15-25% and social media engagement by 40%.',
      trainingText: 'Kitchen staff require 2-4 hours of plating technique training. Estimated cost: $200-400 per chef.',
      costsText: 'Initial investment in presentation tools and ingredients: $500-1,500. Monthly ongoing costs: $200-500.',
      timelineText: 'Immediate improvements: 1-2 weeks. Full implementation: 4-6 weeks. ROI visible: 2-3 months.',
      kpiText: 'Track: Customer satisfaction scores, social media mentions, average order value, repeat customer rate.'
    } : {
      title: 'رؤى الرئيس التنفيذي الاستراتيجية',
      roi: 'تحليل العائد على الاستثمار',
      training: 'متطلبات تدريب الموظفين',
      costs: 'تكاليف التنفيذ',
      timeline: 'الجدول الزمني للتنفيذ',
      kpis: 'مؤشرات الأداء الرئيسية',
      roiText: 'تحسين عرض الطعام يمكن أن يزيد رضا العملاء بنسبة 15-25% والمشاركة على وسائل التواصل الاجتماعي بنسبة 40%.',
      trainingText: 'موظفو المطبخ يحتاجون 2-4 ساعات من تدريب تقنيات التقديم. التكلفة المقدرة: 200-400 دولار لكل شيف.',
      costsText: 'الاستثمار الأولي في أدوات العرض والمكونات: 500-1,500 دولار. التكاليف الشهرية المستمرة: 200-500 دولار.',
      timelineText: 'التحسينات الفورية: 1-2 أسبوع. التنفيذ الكامل: 4-6 أسابيع. العائد على الاستثمار مرئي: 2-3 أشهر.',
      kpiText: 'تتبع: درجات رضا العملاء، الإشارات على وسائل التواصل الاجتماعي، متوسط قيمة الطلب، معدل العملاء المتكررين.'
    };

    this.addTitle(text.title);
    
    this.addSubtitle(text.roi, 12);
    this.addText(text.roiText);
    this.currentY += 3;
    
    this.addSubtitle(text.training, 12);
    this.addText(text.trainingText);
    this.currentY += 3;
    
    this.addSubtitle(text.costs, 12);
    this.addText(text.costsText);
    this.currentY += 3;
    
    this.addSubtitle(text.timeline, 12);
    this.addText(text.timelineText);
    this.currentY += 3;
    
    this.addSubtitle(text.kpis, 12);
    this.addText(text.kpiText);
    this.currentY += 5;
  }

  private addActionPlan(analysis: FoodAnalysis) {
    const text = this.language === 'en' ? {
      title: 'ACTION PLAN',
      immediate: 'Immediate Actions (Week 1)',
      shortTerm: 'Short-term Goals (Weeks 2-4)',
      longTerm: 'Long-term Strategy (Months 2-6)',
      immediateActions: [
        'Train kitchen staff on basic plating techniques',
        'Audit current plate and garnish inventory',
        'Implement quality control checklist for food presentation',
        'Take reference photos of improved presentations'
      ],
      shortTermActions: [
        'Establish presentation standards for all menu items',
        'Source high-quality garnish ingredients',
        'Create presentation training materials',
        'Monitor customer feedback and social media mentions'
      ],
      longTermActions: [
        'Develop signature plating styles for the restaurant',
        'Regular presentation quality audits',
        'Advanced plating technique workshops',
        'Menu photography update for marketing materials'
      ]
    } : {
      title: 'خطة العمل',
      immediate: 'الإجراءات الفورية (الأسبوع الأول)',
      shortTerm: 'الأهداف قصيرة المدى (الأسابيع 2-4)',
      longTerm: 'الاستراتيجية طويلة المدى (الشهور 2-6)',
      immediateActions: [
        'تدريب موظفي المطبخ على تقنيات التقديم الأساسية',
        'مراجعة مخزون الأطباق والزينة الحالي',
        'تنفيذ قائمة مراجعة مراقبة الجودة لعرض الطعام',
        'التقاط صور مرجعية للعروض المحسنة'
      ],
      shortTermActions: [
        'وضع معايير العرض لجميع عناصر القائمة',
        'الحصول على مكونات زينة عالية الجودة',
        'إنشاء مواد تدريبية للعرض',
        'مراقبة تعليقات العملاء والإشارات على وسائل التواصل الاجتماعي'
      ],
      longTermActions: [
        'تطوير أساليب تقديم مميزة للمطعم',
        'عمليات تدقيق منتظمة لجودة العرض',
        'ورش عمل تقنيات التقديم المتقدمة',
        'تحديث تصوير القائمة للمواد التسويقية'
      ]
    };

    this.addTitle(text.title);
    
    this.addSubtitle(text.immediate, 12);
    text.immediateActions.forEach(action => this.addBulletPoint(action));
    this.currentY += 3;
    
    this.addSubtitle(text.shortTerm, 12);
    text.shortTermActions.forEach(action => this.addBulletPoint(action));
    this.currentY += 3;
    
    this.addSubtitle(text.longTerm, 12);
    text.longTermActions.forEach(action => this.addBulletPoint(action));
  }

  public async generateReport(data: ReportData): Promise<void> {
    const { analysis, language, restaurantName = 'Restaurant', reportDate } = data;
    this.language = language;

    // Header
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    const title = language === 'en' ? 
      'FOOD PRESENTATION ANALYSIS REPORT' : 
      'تقرير تحليل عرض الطعام';
    this.doc.text(title, this.pageWidth/2, 30, { align: 'center' });
    
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(restaurantName, this.pageWidth/2, 40, { align: 'center' });
    this.doc.text(reportDate, this.pageWidth/2, 50, { align: 'center' });
    
    this.currentY = 70;

    // Add sections
    this.addExecutiveSummary(analysis);
    this.addNewPage();
    this.addDetailedAnalysis(analysis);
    this.addChefRecommendations(analysis);
    this.addNewPage();
    this.addCEOInsights(analysis);
    this.addActionPlan(analysis);

    // Footer on each page
    const pageCount = this.doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(8);
      this.doc.setFont('helvetica', 'normal');
      this.doc.text(
        `${language === 'en' ? 'Page' : 'صفحة'} ${i} ${language === 'en' ? 'of' : 'من'} ${pageCount}`,
        this.pageWidth/2,
        this.pageHeight - 10,
        { align: 'center' }
      );
    }
  }

  public save(filename: string = 'food-analysis-report.pdf'): void {
    this.doc.save(filename);
  }
}

export const generateRestaurantReport = async (
  analysis: FoodAnalysis,
  language: 'en' | 'ar' = 'en',
  restaurantName?: string
): Promise<void> => {
  const generator = new RestaurantReportGenerator(language);
  const reportDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ar-SA');
  
  await generator.generateReport({
    analysis,
    language,
    restaurantName,
    reportDate
  });
  
  const filename = `${restaurantName || 'restaurant'}-food-analysis-${Date.now()}.pdf`;
  generator.save(filename);
};