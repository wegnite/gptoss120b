import { openai } from '@ai-sdk/openai';
import { deepseek } from '@ai-sdk/deepseek';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { generateText, streamText } from 'ai';

// GPT-OSS-120B AI Integration Module
// This module bridges MCP server with various AI providers

export interface AIProvider {
  name: string;
  model: string;
  apiKey?: string;
  baseURL?: string;
}

// Configure GPT-OSS-120B provider
const gptOSS120B = createOpenAICompatible({
  name: 'gpt-oss-120b',
  baseURL: process.env.GPT_OSS_120B_API_URL || 'https://api.gpt-oss-120b.net/v1',
  apiKey: process.env.GPT_OSS_120B_API_KEY || 'gpt-oss-120b-free',
  headers: {
    'X-Model-Version': '120B',
  },
});

// Available AI providers configuration
export const providers = {
  'gpt-oss-120b': {
    provider: gptOSS120B,
    model: 'gpt-oss-120b',
  },
  'openai': {
    provider: openai,
    model: 'gpt-4-turbo',
  },
  'deepseek': {
    provider: deepseek,
    model: 'deepseek-chat',
  },
};

// Generate text with specified provider
export async function generateAIText({
  provider = 'gpt-oss-120b',
  prompt,
  systemPrompt,
  maxTokens = 1000,
  temperature = 0.7,
}: {
  provider?: string;
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}) {
  const aiProvider = providers[provider as keyof typeof providers];
  
  if (!aiProvider) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system' as const, content: systemPrompt });
  }
  messages.push({ role: 'user' as const, content: prompt });

  const { text } = await generateText({
    model: aiProvider.provider(aiProvider.model),
    messages,
    maxTokens,
    temperature,
  });

  return text;
}

// Stream text generation
export async function streamAIText({
  provider = 'gpt-oss-120b',
  messages,
  maxTokens = 1000,
  temperature = 0.7,
}: {
  provider?: string;
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  maxTokens?: number;
  temperature?: number;
}) {
  const aiProvider = providers[provider as keyof typeof providers];
  
  if (!aiProvider) {
    throw new Error(`Unknown provider: ${provider}`);
  }

  const { textStream } = await streamText({
    model: aiProvider.provider(aiProvider.model),
    messages,
    maxTokens,
    temperature,
  });

  return textStream;
}

// Code analysis function
export async function analyzeCode({
  code,
  language,
  analysisType,
  provider = 'gpt-oss-120b',
}: {
  code: string;
  language: string;
  analysisType: 'review' | 'optimize' | 'document' | 'security';
  provider?: string;
}) {
  const prompts = {
    review: `Review the following ${language} code and provide detailed feedback on code quality, potential bugs, and improvements:\n\n${code}`,
    optimize: `Optimize the following ${language} code for better performance and efficiency:\n\n${code}`,
    document: `Generate comprehensive documentation for the following ${language} code:\n\n${code}`,
    security: `Analyze the following ${language} code for security vulnerabilities and provide recommendations:\n\n${code}`,
  };

  const systemPrompt = `You are an expert ${language} developer specialized in code ${analysisType}.`;

  return generateAIText({
    provider,
    prompt: prompts[analysisType],
    systemPrompt,
    maxTokens: 2000,
    temperature: 0.3,
  });
}

// Translation function
export async function translateText({
  text,
  sourceLang,
  targetLang,
  provider = 'gpt-oss-120b',
}: {
  text: string;
  sourceLang: string;
  targetLang: string;
  provider?: string;
}) {
  const langMap: { [key: string]: string } = {
    en: 'English',
    zh: 'Chinese',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    ja: 'Japanese',
    ko: 'Korean',
    ru: 'Russian',
    ar: 'Arabic',
    pt: 'Portuguese',
  };

  const prompt = `Translate the following text from ${langMap[sourceLang] || sourceLang} to ${langMap[targetLang] || targetLang}. Maintain the tone and style of the original text:\n\n${text}`;
  
  const systemPrompt = 'You are a professional translator with native-level fluency in multiple languages.';

  return generateAIText({
    provider,
    prompt,
    systemPrompt,
    maxTokens: Math.max(1000, text.length * 2),
    temperature: 0.3,
  });
}

// Document summarization
export async function summarizeText({
  content,
  maxLength = 500,
  style = 'brief',
  provider = 'gpt-oss-120b',
}: {
  content: string;
  maxLength?: number;
  style?: 'brief' | 'detailed' | 'bullet-points';
  provider?: string;
}) {
  const styleInstructions = {
    brief: `Provide a brief summary in ${maxLength} words or less.`,
    detailed: `Provide a detailed summary covering all key points in ${maxLength} words or less.`,
    'bullet-points': `Provide a summary in bullet points format, with key takeaways in ${maxLength} words or less.`,
  };

  const prompt = `Summarize the following document. ${styleInstructions[style]}\n\nDocument:\n${content}`;
  
  const systemPrompt = 'You are an expert at analyzing and summarizing complex documents while preserving key information.';

  return generateAIText({
    provider,
    prompt,
    systemPrompt,
    maxTokens: maxLength * 2,
    temperature: 0.3,
  });
}

// Chat completion
export async function chatCompletion({
  messages,
  stream = false,
  provider = 'gpt-oss-120b',
}: {
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;
  stream?: boolean;
  provider?: string;
}) {
  if (stream) {
    return streamAIText({
      provider,
      messages,
      maxTokens: 2000,
      temperature: 0.7,
    });
  } else {
    const aiProvider = providers[provider as keyof typeof providers];
    
    if (!aiProvider) {
      throw new Error(`Unknown provider: ${provider}`);
    }

    const { text } = await generateText({
      model: aiProvider.provider(aiProvider.model),
      messages,
      maxTokens: 2000,
      temperature: 0.7,
    });

    return text;
  }
}

// Export all functions for use in MCP server
export default {
  generateAIText,
  streamAIText,
  analyzeCode,
  translateText,
  summarizeText,
  chatCompletion,
};