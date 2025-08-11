"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function GPTOSSFAQ() {
  const faqs = [
    {
      question: "What exactly is GPT-OSS-120B and how does it work?",
      answer: "GPT-OSS-120B is a cutting-edge open-source large language model with 120 billion parameters. It uses a transformer architecture optimized for both performance and efficiency, enabling advanced reasoning, code generation, and multimodal understanding. The model processes input through multiple attention layers to generate contextually relevant responses.",
    },
    {
      question: "Is GPT-OSS-120B really free to use?",
      answer: "Yes, GPT-OSS-120B is completely free and open source. You can use it for personal projects, commercial applications, or research without any licensing fees. The model weights, training code, and inference engines are all publicly available under an open-source license.",
    },
    {
      question: "How does GPT-OSS-120B compare to GPT-4 or Claude?",
      answer: "While GPT-4 and Claude are proprietary models with larger parameter counts, GPT-OSS-120B offers comparable performance in many tasks while being completely open source. It excels in coding tasks, reasoning, and has a 200K token context window. The main advantages are zero cost, full control, and the ability to fine-tune for specific use cases.",
    },
    {
      question: "What are the system requirements to run GPT-OSS-120B?",
      answer: "For optimal performance, you'll need a system with at least 48GB of VRAM (2x RTX 4090 or equivalent) for full precision, or 24GB VRAM for quantized versions. Cloud deployment options are available through various providers. For API access, no special hardware is required as you can use hosted endpoints.",
    },
    {
      question: "Can I fine-tune GPT-OSS-120B for my specific use case?",
      answer: "Absolutely! GPT-OSS-120B supports fine-tuning for specialized domains. You can adapt the model for specific industries, languages, or tasks using techniques like LoRA or full fine-tuning. The community provides extensive documentation and tools to make fine-tuning accessible even for smaller teams.",
    },
    {
      question: "What programming languages does GPT-OSS-120B support?",
      answer: "GPT-OSS-120B supports over 50 programming languages including Python, JavaScript, TypeScript, Java, C++, Go, Rust, Ruby, PHP, Swift, and many more. It can generate code, debug existing code, explain complex algorithms, and even help with system design and architecture decisions.",
    },
    {
      question: "How do I get started with GPT-OSS-120B?",
      answer: "Getting started is easy! You can: 1) Use the web interface at gpt-oss-120b.ai for immediate access, 2) Access the API endpoints for integration into your applications, 3) Download the model weights for local deployment, or 4) Use one of the many community-maintained libraries and tools. Comprehensive documentation and tutorials are available on our GitHub repository.",
    },
    {
      question: "Is there a rate limit or usage restriction?",
      answer: "When using the free web interface, there are reasonable rate limits to ensure fair access for all users (typically 100 requests per hour). For unlimited usage, you can self-host the model or use community-provided endpoints. Commercial API providers also offer GPT-OSS-120B with various pricing tiers.",
    },
    {
      question: "What about data privacy and security?",
      answer: "GPT-OSS-120B can be deployed entirely on-premise, giving you complete control over your data. When self-hosted, no data leaves your infrastructure. The model includes built-in safety features and can be configured with additional security layers. For the web interface, we follow industry-standard security practices and don't store conversation history.",
    },
    {
      question: "Where can I get support or join the community?",
      answer: "The GPT-OSS-120B community is active and welcoming! You can join our Discord server for real-time help, contribute to the GitHub repository, participate in the forums, or follow updates on social media. Regular community calls and hackathons provide opportunities to learn and collaborate with other developers.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <HelpCircle className="w-3 h-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about GPT-OSS-120B
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="text-base font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help Card */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-0">
          <div className="text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Can't find the answer you're looking for? Our community is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/gptoss120b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Join Discord Community
              </a>
              <a
                href="https://github.com/gpt-oss/gpt-oss-120b"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors text-gray-700 dark:text-gray-300"
              >
                View Documentation
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}