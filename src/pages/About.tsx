import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Target, 
  Heart, 
  Shield, 
  Zap,
  Users,
  ArrowRight,
  Github,
  Mail,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Zap,
      title: 'Simplicity First',
      description: 'We believe powerful tools should be easy to use. No complex menus or confusing options.'
    },
    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'Your documents stay in your browser. We don\'t store, track, or access your content.'
    },
    {
      icon: Heart,
      title: 'Free Forever',
      description: 'Font and Format is completely free. No hidden fees, no premium tiers, no subscriptions.'
    },
    {
      icon: Users,
      title: 'Built for Everyone',
      description: 'Whether you\'re a student, professional, or casual user - our editor works for you.'
    }
  ];

  const faqs = [
    {
      question: 'Is Font and Format really free?',
      answer: 'Yes! Font and Format is 100% free to use. There are no hidden costs, premium features, or subscriptions. We believe everyone should have access to quality document editing tools.'
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account required. Just open the editor and start creating. Your work stays in your browser until you export it.'
    },
    {
      question: 'Is my data safe?',
      answer: 'Absolutely. All document editing happens locally in your browser. We never upload, store, or have access to your documents. Your privacy is our priority.'
    },
    {
      question: 'What formats can I export to?',
      answer: 'Currently, you can export your documents to PDF format. We\'re working on adding more export options in the future.'
    },
    {
      question: 'Can I use Font and Format on mobile?',
      answer: 'Yes! Font and Format is fully responsive and works on tablets and mobile devices, though we recommend a larger screen for the best editing experience.'
    },
    {
      question: 'Are there any usage limits?',
      answer: 'To ensure fair usage for everyone, we have reasonable rate limits: 10 PDF exports per hour and 20 image uploads per hour. These limits reset automatically.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#274364]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="Font and Format" className="w-10 h-10 rounded-lg" />
              <span className="text-xl font-semibold text-white">Font and Format</span>
            </button>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/')}
                className="text-white/70 hover:text-white transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-white transition-colors"
              >
                About
              </button>
              <Button 
                onClick={() => navigate('/editor')}
                className="bg-[#3FBCBA] hover:bg-[#35a5a3] text-white"
              >
                Open Editor
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#274364] to-[#1a2d42] py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Font and Format
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A free, privacy-focused document editor built for everyone. 
            Create beautiful documents without the complexity.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#3FBCBA]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-[#3FBCBA]" />
            </div>
            <h2 className="text-3xl font-bold text-[#274364] mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We created Font and Format because we believe document creation should be 
              simple, accessible, and free. Too many tools are bloated with features you'll 
              never use, require expensive subscriptions, or compromise your privacy. 
              We're different.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Our goal is to provide a clean, intuitive document editor that lets you focus 
              on what matters most: your content. No distractions, no barriers, just a 
              powerful tool that works.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#274364] mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-[#274364] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#274364] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#274364] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#274364] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#274364] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join thousands of users who create beautiful documents with Font and Format every day.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/editor')}
            className="bg-[#3FBCBA] hover:bg-[#35a5a3] text-white text-lg px-10 py-6 gap-2"
          >
            <FileText className="w-5 h-5" />
            Start Creating
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2d42] py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.svg" alt="Font and Format" className="w-10 h-10 rounded-lg" />
                <span className="text-xl font-semibold text-white">Font and Format</span>
              </div>
              <p className="text-white/60">
                Free online document editor with rich text formatting and PDF export.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/editor')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    Editor
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/about')}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.producthunt.com/posts/font-and-format"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  title="Product Hunt"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.993-.806-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.88 4.2 4.199 0 2.321-1.881 4.201-4.201 4.201z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/nxgntools/font-and-format"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:contact@nxgntools.com"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://nxgntools.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                  title="NxgnTools"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <p className="text-white/40 text-sm mt-4">
                A product by <a href="https://nxgntools.com" target="_blank" rel="noopener noreferrer" className="text-[#3FBCBA] hover:underline">NxgnTools</a>
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm text-center">
              © {new Date().getFullYear()} Font and Format. Free online document editor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
