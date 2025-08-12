import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  
  return {
    title: "AI Resources & Tools | GPT-OSS-120B",
    description: "Discover AI tools, resources, and directories to enhance your AI development experience.",
  };
}

export default async function ResourcesPage() {
  const t = await getTranslations();
  
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI Resources & Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore curated AI resources and tools for developers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Documentation Section */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
            <p className="text-muted-foreground mb-4">
              Comprehensive guides and API documentation for GPT-OSS-120B
            </p>
            <a
              href="https://docs.gpt-oss-120b.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Documentation →
            </a>
          </div>

          {/* Components Library */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Component Library</h2>
            <p className="text-muted-foreground mb-4">
              Ready-to-use UI components for AI applications
            </p>
            <a
              href="https://gpt-oss-120b.ai/components"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Browse Components →
            </a>
          </div>

          {/* Templates */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Templates</h2>
            <p className="text-muted-foreground mb-4">
              Starter templates for building AI-powered applications
            </p>
            <a
              href="https://gpt-oss-120b.ai/templates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get Templates →
            </a>
          </div>

          {/* AI Tools Directory */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">AI Tools Discovery</h2>
            <p className="text-muted-foreground mb-4">
              Explore a comprehensive directory of AI tools and services. Find the perfect tools for your AI projects.
            </p>
            <a
              href="https://mossai.org"
              title="MossAI Tools Directory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Discover AI Tools →
            </a>
          </div>

          {/* Community Resources */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Community</h2>
            <p className="text-muted-foreground mb-4">
              Join our community for support and collaboration
            </p>
            <div className="space-y-2">
              <a
                href="https://github.com/gpt-oss-120b"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:underline"
              >
                GitHub Repository
              </a>
              <a
                href="https://discord.gg/HQNnrzjZQS"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:underline"
              >
                Discord Community
              </a>
            </div>
          </div>

          {/* Learning Resources */}
          <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Learning</h2>
            <p className="text-muted-foreground mb-4">
              Tutorials and guides to master AI development
            </p>
            <a
              href="/blog"
              className="text-primary hover:underline"
            >
              Read Tutorials →
            </a>
          </div>
        </div>

        {/* Partner Tools Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Partner Tools & Services</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://thinkany.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold mb-2">ThinkAny</h3>
              <p className="text-sm text-muted-foreground">AI-powered thinking assistant</p>
            </a>
            
            <a
              href="https://heybeauty.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold mb-2">HeyBeauty</h3>
              <p className="text-sm text-muted-foreground">AI beauty and style advisor</p>
            </a>
            
            <a
              href="https://pagen.so"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold mb-2">Pagen</h3>
              <p className="text-sm text-muted-foreground">AI page generator</p>
            </a>
            
            <a
              href="https://mossai.org"
              title="MossAI Tools Directory"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow text-center"
            >
              <h3 className="font-semibold mb-2">MossAI</h3>
              <p className="text-sm text-muted-foreground">Comprehensive AI tools directory</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}