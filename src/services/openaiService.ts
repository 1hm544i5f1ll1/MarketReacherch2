import OpenAI from 'openai';
import { FoodAnalysis } from '../types';

class OpenAIService {
  private openai: OpenAI | null = null;
  private isConfigured = false;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (apiKey && apiKey !== 'your_openai_api_key_here') {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
      this.isConfigured = true;
    }
  }

  public isReady(): boolean {
    return this.isConfigured && this.openai !== null;
  }

  public async analyzeFoodImage(imageUrl: string, imageName: string): Promise<FoodAnalysis> {
    if (!this.isReady()) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const prompt = `You are a professional food critic and restaurant consultant with expertise in culinary presentation, food quality assessment, and restaurant operations. Analyze this food image and provide a comprehensive evaluation.

Please provide your analysis in the following JSON format:

{
  "overallRating": [number between 1-10],
  "categories": {
    "presentation": [number between 1-10],
    "freshness": [number between 1-10], 
    "portionSize": [number between 1-10],
    "colorBalance": [number between 1-10],
    "plating": [number between 1-10]
  },
  "strengths": {
    "english": [array of 3-5 specific strengths],
    "arabic": [array of 3-5 specific strengths in Arabic]
  },
  "improvements": {
    "english": [array of 3-5 specific areas for improvement],
    "arabic": [array of 3-5 specific areas for improvement in Arabic]
  },
  "recommendations": {
    "english": [array of 4-6 actionable recommendations for chefs],
    "arabic": [array of 4-6 actionable recommendations in Arabic]
  }
}

Focus on:
- Visual presentation and plating technique
- Color balance and contrast
- Portion size appropriateness
- Apparent freshness of ingredients
- Professional kitchen standards
- Actionable improvements for restaurant staff

Provide specific, constructive feedback that restaurant owners and chefs can implement immediately.`;

      const response = await this.openai!.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high"
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from OpenAI');
      }

      const analysisData = JSON.parse(jsonMatch[0]);

      // Create the complete FoodAnalysis object
      const analysis: FoodAnalysis = {
        id: `analysis-${Date.now()}`,
        imageName,
        imageUrl,
        overallRating: Number(analysisData.overallRating.toFixed(1)),
        analysisDate: new Date().toLocaleDateString(),
        categories: {
          presentation: Number(analysisData.categories.presentation.toFixed(1)),
          freshness: Number(analysisData.categories.freshness.toFixed(1)),
          portionSize: Number(analysisData.categories.portionSize.toFixed(1)),
          colorBalance: Number(analysisData.categories.colorBalance.toFixed(1)),
          plating: Number(analysisData.categories.plating.toFixed(1))
        },
        strengths: analysisData.strengths,
        improvements: analysisData.improvements,
        recommendations: analysisData.recommendations
      };

      return analysis;

    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const openaiService = new OpenAIService();