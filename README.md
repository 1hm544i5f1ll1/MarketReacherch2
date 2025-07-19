# Restaurant AI Food Analysis App

A professional food presentation analysis tool powered by AI computer vision technology. Upload food images to receive detailed analysis, ratings, and actionable recommendations for restaurant management and kitchen staff.

![App Preview](https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400)

## Features

- 🤖 **AI-Powered Analysis**: Advanced computer vision for food quality assessment
- 📊 **Detailed Ratings**: Comprehensive scoring across 5 key categories
- 📋 **Professional Reports**: Generate PDF reports for management and staff
- 🌍 **Bilingual Support**: Full English and Arabic language support
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎯 **Actionable Insights**: Specific recommendations for chefs and restaurant owners
- 📈 **Business Intelligence**: ROI analysis and strategic insights for CEOs

## Analysis Categories

- **Presentation**: Visual appeal and artistic arrangement
- **Freshness**: Quality and freshness of ingredients
- **Portion Size**: Appropriate serving sizes and value
- **Color Balance**: Visual harmony and contrast
- **Plating**: Professional plating techniques and execution

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenAI API key (optional - app works in demo mode without it)

## Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd restaurant-ai-food-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

4. **Configure OpenAI API Key (Optional)**
   - Open the `.env` file in a text editor
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your API key from: https://platform.openai.com/api-keys

   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically open in your default browser

3. **Start analyzing food images**
   - Upload food images using drag & drop or file selection
   - Take photos directly using your device camera
   - View detailed analysis results and generate PDF reports

## Usage Modes

### Demo Mode (No API Key Required)
- Uses mock analysis with realistic sample data
- Perfect for testing all features without costs
- Generates professional PDF reports with example data
- Status indicator shows: 🟡 "Using Mock Analysis"

### AI Mode (Requires OpenAI API Key)
- Real computer vision analysis of your food images
- Personalized recommendations based on actual image content
- More accurate and specific feedback
- Status indicator shows: 🟢 "AI Analysis Ready"

## Getting OpenAI API Key

1. **Create OpenAI Account**
   - Visit https://platform.openai.com/api-keys
   - Sign up for a new account or log in

2. **Generate API Key**
   - Navigate to the API Keys section
   - Click "Create new secret key"
   - Copy the generated key (starts with `sk-`)

3. **Add to Environment**
   - Paste the key in your `.env` file
   - Restart the development server

**Note**: OpenAI API usage incurs costs. Check their pricing at https://openai.com/pricing

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code analysis

## Project Structure

```
src/
├── components/          # React components
│   ├── AnalysisResults.tsx    # Analysis results display
│   ├── ApiKeySetup.tsx        # API key configuration modal
│   ├── ExampleReports.tsx     # Example analysis reports
│   ├── Header.tsx             # Application header
│   ├── ImageUpload.tsx        # Image upload interface
│   └── ReportGenerator.tsx    # PDF report generation
├── services/           # External services
│   └── openaiService.ts      # OpenAI API integration
├── types/              # TypeScript type definitions
│   └── index.ts              # Application types
├── utils/              # Utility functions
│   ├── exampleReports.ts     # Sample analysis data
│   ├── mockAnalysis.ts       # Mock analysis generator
│   └── pdfGenerator.ts       # PDF report generation
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Features Overview

### Image Analysis
- Drag & drop image upload
- Camera capture support
- Supported formats: JPG, PNG, WEBP
- Real-time analysis progress

### Professional Reports
- Executive summary for management
- Detailed analysis with ratings
- Chef recommendations
- Business impact analysis
- Implementation action plans
- Key performance indicators

### Bilingual Support
- Complete English interface
- Full Arabic translation
- RTL (Right-to-Left) text support
- Culturally appropriate content

## Troubleshooting

### Common Issues

**"Using Mock Analysis" appears**
- This means no OpenAI API key is configured
- Add your API key to the `.env` file to enable real AI analysis
- The app works perfectly in demo mode for testing

**Images not uploading**
- Check file format (JPG, PNG, WEBP supported)
- Ensure file size is reasonable (< 10MB recommended)
- Try refreshing the page

**PDF generation fails**
- Check browser permissions for downloads
- Ensure popup blockers aren't interfering
- Try a different browser if issues persist

**Development server won't start**
- Ensure Node.js version 16+ is installed
- Delete `node_modules` and run `npm install` again
- Check for port conflicts (default: 5173)

### API Key Issues

**"Analysis failed" error**
- Verify API key is correct and active
- Check OpenAI account has sufficient credits
- Ensure API key has proper permissions

**Slow analysis**
- Large images take longer to process
- OpenAI API response times vary
- Consider resizing images before upload

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section above
- Review OpenAI API documentation
- Create an issue in the project repository

## Acknowledgments

- OpenAI for computer vision API
- Pexels for stock food photography
- Tailwind CSS for styling framework
- Lucide React for icons

---

**Ready to analyze your food presentation?** Start the development server and upload your first image!