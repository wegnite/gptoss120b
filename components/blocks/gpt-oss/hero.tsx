"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Sparkles, 
  Upload, 
  Mic, 
  Code2, 
  Image as ImageIcon,
  FileText,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function GPTOSSHero() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
      setMessage("");
    }
  };

  const suggestedPrompts = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort an array",
    "What are the latest AI breakthroughs in 2025?",
    "Generate a business plan for a startup",
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950" />
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              2025 Release • Version 4.0
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            GPT-OSS-120B
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Next-Generation Open Source AI Model
          </p>
          
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            Revolutionary artificial intelligence with advanced reasoning capabilities,
            multimodal support, and specialized coding features
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Badge variant="secondary" className="px-3 py-1">
              <Globe className="w-3 h-3 mr-1" />
              120B Parameters
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Code2 className="w-3 h-3 mr-1" />
              Code Generation
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <ImageIcon className="w-3 h-3 mr-1" />
              Multimodal
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <FileText className="w-3 h-3 mr-1" />
              Context: 200K
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <div className="p-6 md:p-8">
            {/* Sample message */}
            {isTyping && (
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="inline-block animate-pulse">Thinking...</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested prompts */}
            {!message && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Try asking:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(prompt)}
                      className="text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm text-gray-600 dark:text-gray-300"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask GPT-OSS-120B anything..."
                className="w-full resize-none pr-24 min-h-[56px] max-h-[200px] text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim()}
                  className={cn(
                    "h-8 w-8 transition-all",
                    message.trim() 
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  )}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Press Enter to send • Shift+Enter for new line</span>
              <span>Free to use • No login required</span>
            </div>
          </div>
        </Card>

        {/* Stats preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">2025</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Release Year</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">4.0</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Version</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">120B</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Parameters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">200K</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Context</div>
          </div>
        </div>
      </div>
    </section>
  );
}