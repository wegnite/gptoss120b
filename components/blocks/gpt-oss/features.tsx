"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Code2, 
  Image as ImageIcon, 
  MessageSquare, 
  Shield, 
  Zap,
  Globe,
  Database,
  Sparkles,
  FileText,
  Terminal,
  Palette
} from "lucide-react";

export default function GPTOSSFeatures() {
  const [activeTab, setActiveTab] = useState("reasoning");

  const features = {
    reasoning: {
      title: "Advanced Reasoning",
      description: "State-of-the-art logical reasoning and problem-solving capabilities",
      icon: Brain,
      highlights: [
        "Complex mathematical problem solving",
        "Multi-step logical deduction",
        "Abstract concept understanding",
        "Scientific research assistance",
      ],
      demo: "Solve complex calculus problems, analyze scientific papers, or reason through philosophical questions with unprecedented accuracy.",
    },
    coding: {
      title: "Code Generation",
      description: "Professional-grade code generation and debugging across languages",
      icon: Code2,
      highlights: [
        "Support for 50+ programming languages",
        "Full-stack development assistance",
        "Automated code review and optimization",
        "Test generation and debugging",
      ],
      demo: "Generate complete applications, refactor legacy code, or create comprehensive test suites with contextual understanding.",
    },
    multimodal: {
      title: "Multimodal Capabilities",
      description: "Process and generate content across text, images, and more",
      icon: ImageIcon,
      highlights: [
        "Image understanding and analysis",
        "Document processing and OCR",
        "Chart and diagram interpretation",
        "Visual question answering",
      ],
      demo: "Analyze complex diagrams, extract data from images, or generate detailed descriptions of visual content.",
    },
    conversation: {
      title: "Natural Conversation",
      description: "Human-like dialogue with context retention and personality",
      icon: MessageSquare,
      highlights: [
        "200K token context window",
        "Multi-turn conversation memory",
        "Personality customization",
        "Emotional intelligence",
      ],
      demo: "Engage in deep discussions, maintain context across long conversations, and adapt communication style to your needs.",
    },
  };

  const coreFeatures = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Built-in safety measures and ethical guidelines for responsible AI use",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized inference with streaming responses for real-time interaction",
    },
    {
      icon: Globe,
      title: "Multilingual",
      description: "Native support for 95+ languages with cultural context awareness",
    },
    {
      icon: Database,
      title: "Extensive Knowledge",
      description: "Training data up to 2025 with continuous learning capabilities",
    },
    {
      icon: Terminal,
      title: "API Access",
      description: "Developer-friendly API with comprehensive SDKs and documentation",
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Fine-tuning support for specialized domain applications",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Cutting-Edge AI Capabilities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            GPT-OSS-120B brings together the latest advances in artificial intelligence 
            to deliver unmatched performance across diverse tasks
          </p>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="mb-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {Object.entries(features).map(([key, feature]) => {
                const Icon = feature.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{feature.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(features).map(([key, feature]) => {
              const Icon = feature.icon;
              return (
                <TabsContent key={key} value={key}>
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900">
                    <div className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {feature.description}
                          </p>
                          <ul className="space-y-3 mb-6">
                            {feature.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="w-2 h-2 bg-white rounded-full" />
                                </span>
                                <span className="text-gray-700 dark:text-gray-200">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              <strong>Example:</strong> {feature.demo}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 md:w-64">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-30" />
                            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                              <Icon className="w-32 h-32 mx-auto opacity-20" />
                              <div className="text-center mt-4">
                                <div className="text-3xl font-bold">120B</div>
                                <div className="text-sm opacity-90">Parameters</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        {/* Core Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Core Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technical Specifications */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Technical Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">200K</div>
                <div className="text-sm text-gray-300">Context Window</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">150</div>
                <div className="text-sm text-gray-300">Tokens/Second</div>
              </div>
              <div className="text-center">
                <Database className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">2025</div>
                <div className="text-sm text-gray-300">Knowledge Cutoff</div>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">95+</div>
                <div className="text-sm text-gray-300">Languages</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}