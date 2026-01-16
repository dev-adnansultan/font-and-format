import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Type, 
  Image, 
  List, 
  Link, 
  Palette,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Type, title: 'Rich Text Formatting', description: 'Bold, italic, underline, headings, and more' },
    { icon: Palette, title: 'Colors & Highlights', description: 'Customize text colors and background highlights' },
    { icon: List, title: 'Lists & Structure', description: 'Bullet points, numbered lists, and blockquotes' },
    { icon: Image, title: 'Image Support', description: 'Insert and position images in your document' },
    { icon: Link, title: 'Hyperlinks', description: 'Add clickable links to your content' },
    { icon: Download, title: 'PDF Export', description: 'Download your document as a professional PDF' },
  ];

  const benefits = [
    'No signup required',
    'Completely free to use',
    'Works in your browser',
    'Real-time preview',
    'Privacy focused - data stays local',
    'Mobile friendly',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#274364] to-[#1a2d42]">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Font and Format" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-semibold text-white">Font and Format</span>
          </div>
          <Button 
            onClick={() => navigate('/editor')}
            className="bg-[#3FBCBA] hover:bg-[#35a5a3] text-white"
          >
            Open Editor
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm">
            <Sparkles className="w-4 h-4 text-[#3FBCBA]" />
            Free Online Document Editor
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Create Beautiful Documents<br />
          <span className="text-[#3FBCBA]">Export to PDF Instantly</span>
        </h1>
        
        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          A powerful, free document editor with rich text formatting. 
          No signup required. Create, format, and export professional documents in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => navigate('/editor')}
            className="bg-[#3FBCBA] hover:bg-[#35a5a3] text-white text-lg px-8 py-6 gap-2"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
          >
            Learn More
          </Button>
        </div>

        {/* Preview Image */}
        <div className="mt-16 relative">
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg p-8 text-left">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-[#274364] rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                <div className="h-6 bg-[#3FBCBA] rounded w-1/2 mt-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#274364] mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Powerful features to create professional documents without the complexity
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-gray-200 hover:border-[#3FBCBA] hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#3FBCBA]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#3FBCBA]" />
                </div>
                <h3 className="text-xl font-semibold text-[#274364] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#274364] mb-12">
              Why Choose Font and Format?
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#3FBCBA] flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#274364] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Create Your Document?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Start creating beautiful, professionally formatted documents right now. No signup, no hassle.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/editor')}
            className="bg-[#3FBCBA] hover:bg-[#35a5a3] text-white text-lg px-10 py-6 gap-2"
          >
            <FileText className="w-5 h-5" />
            Create Document
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2d42] py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Font and Format" className="w-8 h-8 rounded" />
              <span className="text-white/80">Font and Format</span>
            </div>
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Font and Format. Free online document editor.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
