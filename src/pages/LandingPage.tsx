
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText, Shield, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img
                src="/lovable-uploads/916f0dcb-d7f5-4370-8fbc-8da1ab90b6f6.png"
                alt="LexPilot Logo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-lexpilot-navy">LexPilot</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-lexpilot-navy hover:text-lexpilot-teal transition-colors">Features</a>
              <a href="#personas" className="text-lexpilot-navy hover:text-lexpilot-teal transition-colors">AI Personas</a>
              <a href="#tools" className="text-lexpilot-navy hover:text-lexpilot-teal transition-colors">Tools</a>
              <Link to="/prompt-builder">
                <Button variant="outline">Prompt Builder</Button>
              </Link>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              {/* Mobile menu button - we could implement a mobile menu if needed */}
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-lexpilot-navy leading-tight">
              AI Co-Pilot for <span className="text-lexpilot-teal">Legal Teams</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              LexPilot helps legal professionals harness the power of AI with confidence. 
              Build effective prompts, create legal workflows, and adopt AI in ways that match your unique working style.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/quiz">
                <Button className="w-full sm:w-auto">
                  Take AI Adoption Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/prompt-builder">
                <Button variant="outline" className="w-full sm:w-auto">
                  Try Prompt Builder
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1643704811778-730072fbffa6?q=80&w=1600&auto=format&fit=crop"
                alt="LexPilot AI Legal Assistant" 
                className="w-full object-cover h-80"
              />
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-500 text-center">LexPilot's AI-powered interface helps legal professionals work smarter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-lexpilot-navy">Designed for Legal Professionals</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Tools and resources tailored specifically for the legal industry
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <FileText className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">AI Prompt Builder</h3>
              <p className="mt-3 text-gray-600">
                Craft effective legal prompts for AI tools tailored to your specific needs and cases.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <Users className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">AI Personas</h3>
              <p className="mt-3 text-gray-600">
                Discover your AI adoption style and get personalized recommendations for your workflow.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <Sparkles className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">Legal Workflows</h3>
              <p className="mt-3 text-gray-600">
                Dynamic AI-powered workflows for common legal tasks and processes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <BookOpen className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">Training Hub</h3>
              <p className="mt-3 text-gray-600">
                Access persona-tailored training modules to improve your AI skills.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <Shield className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">AI Policy Generator</h3>
              <p className="mt-3 text-gray-600">
                Create comprehensive AI usage policies tailored for your organization.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-5">
                <Sparkles className="text-lexpilot-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-lexpilot-navy">Latest AI Developments</h3>
              <p className="mt-3 text-gray-600">
                Stay updated with the newest AI features and capabilities relevant to legal work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Personas Section */}
      <section id="personas" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-lexpilot-navy">Find Your AI Persona</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how you interact with AI and get tailored recommendations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-2 bg-blue-400 rounded-t-lg -mt-6 -mx-6 mb-6"></div>
              <h3 className="text-xl font-semibold text-lexpilot-navy mb-3">The Innovator</h3>
              <p className="text-gray-600 mb-4">
                Early adopters who embrace new AI technologies and enjoy experimenting.
              </p>
              <Link to="/quiz" className="text-lexpilot-teal hover:underline inline-flex items-center">
                Find out if this is you <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-2 bg-green-400 rounded-t-lg -mt-6 -mx-6 mb-6"></div>
              <h3 className="text-xl font-semibold text-lexpilot-navy mb-3">The Pragmatist</h3>
              <p className="text-gray-600 mb-4">
                Practical users who integrate AI tools when they provide clear value.
              </p>
              <Link to="/quiz" className="text-lexpilot-teal hover:underline inline-flex items-center">
                Find out if this is you <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-2 bg-purple-400 rounded-t-lg -mt-6 -mx-6 mb-6"></div>
              <h3 className="text-xl font-semibold text-lexpilot-navy mb-3">The Collaborator</h3>
              <p className="text-gray-600 mb-4">
                Team-oriented users who leverage AI to enhance group productivity.
              </p>
              <Link to="/quiz" className="text-lexpilot-teal hover:underline inline-flex items-center">
                Find out if this is you <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-2 bg-amber-400 rounded-t-lg -mt-6 -mx-6 mb-6"></div>
              <h3 className="text-xl font-semibold text-lexpilot-navy mb-3">The Cautious Adopter</h3>
              <p className="text-gray-600 mb-4">
                Careful users who need proven reliability before integrating AI.
              </p>
              <Link to="/quiz" className="text-lexpilot-teal hover:underline inline-flex items-center">
                Find out if this is you <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8 bg-lexpilot-navy text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Ready to Transform Your Legal Work?</h2>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of legal professionals already using LexPilot to enhance their practice
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/quiz">
              <Button className="w-full sm:w-auto bg-lexpilot-teal hover:bg-lexpilot-teal/90">
                Take AI Adoption Quiz
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <img
                src="/lovable-uploads/916f0dcb-d7f5-4370-8fbc-8da1ab90b6f6.png"
                alt="LexPilot Logo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-lexpilot-navy">LexPilot</span>
            </div>
            <div className="flex space-x-6 mb-6 md:mb-0">
              <a href="#features" className="text-gray-600 hover:text-lexpilot-teal">Features</a>
              <a href="#personas" className="text-gray-600 hover:text-lexpilot-teal">AI Personas</a>
              <Link to="/prompt-builder" className="text-gray-600 hover:text-lexpilot-teal">Prompt Builder</Link>
              <Link to="/legal-workflows" className="text-gray-600 hover:text-lexpilot-teal">Legal Workflows</Link>
            </div>
            <p className="text-gray-500 text-sm">© 2025 LexPilot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
