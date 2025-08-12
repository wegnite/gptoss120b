import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "GPT-OSS AI Tools & Resources | GPT-OSS-120B Platform",
    description: "Discover GPT-OSS compatible AI tools, resources, and integrations for the GPT-OSS-120B open-source platform. Enhance your GPT-OSS development experience.",
    keywords: "GPT-OSS, GPT-OSS-120B, GPT-OSS tools, GPT-OSS resources, GPT-OSS platform, open source AI",
  };
}

export default function GPTOSSToolsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GPT-OSS AI Tools & Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the comprehensive ecosystem of tools and resources designed for GPT-OSS-120B platform. 
            Find everything you need to build, deploy, and scale your GPT-OSS powered applications.
          </p>
        </div>

        {/* GPT-OSS Core Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">GPT-OSS Core Development Tools</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS SDK</h3>
              <p className="text-muted-foreground mb-4">
                Official SDK for integrating GPT-OSS-120B into your applications with full API support.
              </p>
              <a href="/docs/sdk" className="text-primary hover:underline">
                Learn More →
              </a>
            </div>
            
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS CLI</h3>
              <p className="text-muted-foreground mb-4">
                Command-line interface for managing GPT-OSS deployments and configurations.
              </p>
              <a href="/docs/cli" className="text-primary hover:underline">
                Get Started →
              </a>
            </div>
            
            <div className="rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS Studio</h3>
              <p className="text-muted-foreground mb-4">
                Visual development environment for building GPT-OSS applications without code.
              </p>
              <a href="/studio" className="text-primary hover:underline">
                Try Studio →
              </a>
            </div>
          </div>
        </section>

        {/* GPT-OSS Integrations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">GPT-OSS Platform Integrations</h2>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS for VS Code</h3>
              <p className="text-muted-foreground">
                Enhanced development experience with GPT-OSS-120B directly in your IDE. Features include code completion, 
                documentation generation, and intelligent refactoring powered by GPT-OSS.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS API Gateway</h3>
              <p className="text-muted-foreground">
                Enterprise-grade API management for GPT-OSS deployments with rate limiting, authentication, and monitoring.
              </p>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS Analytics</h3>
              <p className="text-muted-foreground">
                Real-time analytics and insights for your GPT-OSS applications, including usage metrics and performance monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* GPT-OSS Community Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">GPT-OSS Community & Learning</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS Documentation</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive guides and API references for GPT-OSS-120B platform.
              </p>
              <ul className="space-y-2">
                <li><a href="/docs/getting-started" className="text-primary hover:underline">Getting Started Guide</a></li>
                <li><a href="/docs/api" className="text-primary hover:underline">API Reference</a></li>
                <li><a href="/docs/tutorials" className="text-primary hover:underline">Tutorials</a></li>
              </ul>
            </div>
            
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-xl font-semibold mb-3">GPT-OSS Community</h3>
              <p className="text-muted-foreground mb-4">
                Join thousands of developers building with GPT-OSS technology.
              </p>
              <ul className="space-y-2">
                <li><a href="/github" className="text-primary hover:underline">GitHub Organization</a></li>
                <li><a href="/discord" className="text-primary hover:underline">Discord Server</a></li>
                <li><a href="/forum" className="text-primary hover:underline">Community Forum</a></li>
              </ul>
            </div>
          </div>
        </section>


        {/* GPT-OSS Templates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">GPT-OSS Starter Templates</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-2">GPT-OSS Chat App</h3>
              <p className="text-sm text-muted-foreground">Full-featured chat application template</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-2">GPT-OSS API Server</h3>
              <p className="text-sm text-muted-foreground">RESTful API server with GPT-OSS integration</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold mb-2">GPT-OSS Dashboard</h3>
              <p className="text-sm text-muted-foreground">Admin dashboard for GPT-OSS applications</p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12 border-t">
          <h2 className="text-2xl font-bold mb-4">Start Building with GPT-OSS-120B</h2>
          <p className="text-muted-foreground mb-6">
            Join the open-source AI revolution with GPT-OSS platform
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/docs" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90">
              View Documentation
            </a>
            <a href="/github" className="px-6 py-3 border rounded-lg hover:bg-accent">
              GitHub Repository
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}