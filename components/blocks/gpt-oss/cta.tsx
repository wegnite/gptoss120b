import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Github, Book, Zap, Download } from "lucide-react";

export default function GPTOSSCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-pink-600/90" />
          <div className="relative z-10 p-12 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Using GPT-OSS-120B Today
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
              Experience the power of next-generation AI. Free, open-source, and ready to transform your projects.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Try Web Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Model
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                100% Free
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                No Sign-up Required
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Instant Access
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Start Options */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Web Interface
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Start chatting immediately with our web interface. No installation needed.
                </p>
                <a href="#" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1">
                  Open Web App
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  GitHub Repository
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Access source code, contribute, and self-host the model.
                </p>
                <a 
                  href="/github"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  View on GitHub
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Book className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                  Documentation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Comprehensive guides, API references, and tutorials.
                </p>
                <a 
                  href="/docs"
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  Read Docs
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Integration Code Example */}
        <Card className="mt-16 p-8 bg-gray-900 text-white overflow-hidden">
          <h3 className="text-xl font-bold mb-4">Quick Integration</h3>
          <p className="text-gray-300 mb-6">Get started with just a few lines of code:</p>
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-green-400">
{`# Install the GPT-OSS client
pip install gpt-oss-120b

# Use the model
from gpt_oss import GPTModel

model = GPTModel("gpt-oss-120b")
response = model.generate("Explain quantum computing")
print(response)`}
            </pre>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">Python</Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">JavaScript</Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">TypeScript</Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">Go</Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">Rust</Badge>
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">Java</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}