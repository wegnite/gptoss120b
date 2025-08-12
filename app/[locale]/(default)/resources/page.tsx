import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: "AI Resources & Tools | GPT-OSS-120B",
    description: "Discover AI tools, resources, and directories to enhance your AI development experience.",
  };
}

export default async function ResourcesPage() {
  
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
              href="/docs"
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
              href="/components"
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
              href="/templates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Get Templates →
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
                href="/github"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:underline"
              >
                GitHub Repository
              </a>
              <a
                href="/discord"
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

      </div>
    </main>
  );
}