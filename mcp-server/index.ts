import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import aiIntegration from './ai-integration.js';

// GPT-OSS-120B MCP Server
const server = new Server(
  {
    name: 'gpt-oss-120b-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Define tools for GPT-OSS-120B AI operations
const TOOLS = {
  generateText: {
    description: 'Generate text using GPT-OSS-120B model',
    inputSchema: z.object({
      prompt: z.string().describe('The input prompt for text generation'),
      maxTokens: z.number().optional().default(1000).describe('Maximum tokens to generate'),
      temperature: z.number().optional().default(0.7).describe('Temperature for randomness'),
      systemPrompt: z.string().optional().describe('System prompt to guide the model'),
    }),
  },
  analyzeCode: {
    description: 'Analyze code using GPT-OSS-120B for review, optimization, or documentation',
    inputSchema: z.object({
      code: z.string().describe('The code to analyze'),
      language: z.string().describe('Programming language of the code'),
      analysisType: z.enum(['review', 'optimize', 'document', 'security']).describe('Type of analysis to perform'),
    }),
  },
  translateContent: {
    description: 'Translate content between languages using GPT-OSS-120B',
    inputSchema: z.object({
      text: z.string().describe('Text to translate'),
      sourceLang: z.string().describe('Source language code (e.g., en, zh)'),
      targetLang: z.string().describe('Target language code (e.g., en, zh)'),
    }),
  },
  summarizeDocument: {
    description: 'Summarize long documents using GPT-OSS-120B',
    inputSchema: z.object({
      content: z.string().describe('Document content to summarize'),
      maxLength: z.number().optional().default(500).describe('Maximum summary length in words'),
      style: z.enum(['brief', 'detailed', 'bullet-points']).optional().default('brief'),
    }),
  },
  chatCompletion: {
    description: 'Interactive chat completion with GPT-OSS-120B',
    inputSchema: z.object({
      messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      })).describe('Chat message history'),
      stream: z.boolean().optional().default(false).describe('Enable streaming response'),
    }),
  },
};

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.entries(TOOLS).map(([name, tool]) => ({
      name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })),
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generateText': {
        // Integration with GPT-OSS-120B API
        const { prompt, maxTokens, temperature, systemPrompt } = args as any;
        
        // TODO: Implement actual API call to GPT-OSS-120B
        // This is a placeholder for the actual implementation
        const response = await callGPTOSS120B({
          prompt,
          maxTokens,
          temperature,
          systemPrompt,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: response,
            },
          ],
        };
      }

      case 'analyzeCode': {
        const { code, language, analysisType } = args as any;
        
        // TODO: Implement code analysis logic
        const analysis = await analyzeWithGPTOSS120B({
          code,
          language,
          analysisType,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: analysis,
            },
          ],
        };
      }

      case 'translateContent': {
        const { text, sourceLang, targetLang } = args as any;
        
        // TODO: Implement translation logic
        const translation = await translateWithGPTOSS120B({
          text,
          sourceLang,
          targetLang,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: translation,
            },
          ],
        };
      }

      case 'summarizeDocument': {
        const { content, maxLength, style } = args as any;
        
        // TODO: Implement summarization logic
        const summary = await summarizeWithGPTOSS120B({
          content,
          maxLength,
          style,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: summary,
            },
          ],
        };
      }

      case 'chatCompletion': {
        const { messages, stream } = args as any;
        
        // TODO: Implement chat completion logic
        const completion = await chatWithGPTOSS120B({
          messages,
          stream,
        });
        
        return {
          content: [
            {
              type: 'text',
              text: completion,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing tool ${name}: ${error}`,
        },
      ],
    };
  }
});

// AI Integration functions using actual providers
async function callGPTOSS120B(params: any): Promise<string> {
  return aiIntegration.generateAIText({
    prompt: params.prompt,
    systemPrompt: params.systemPrompt,
    maxTokens: params.maxTokens,
    temperature: params.temperature,
  });
}

async function analyzeWithGPTOSS120B(params: any): Promise<string> {
  return aiIntegration.analyzeCode({
    code: params.code,
    language: params.language,
    analysisType: params.analysisType,
  });
}

async function translateWithGPTOSS120B(params: any): Promise<string> {
  return aiIntegration.translateText({
    text: params.text,
    sourceLang: params.sourceLang,
    targetLang: params.targetLang,
  });
}

async function summarizeWithGPTOSS120B(params: any): Promise<string> {
  return aiIntegration.summarizeText({
    content: params.content,
    maxLength: params.maxLength,
    style: params.style,
  });
}

async function chatWithGPTOSS120B(params: any): Promise<string> {
  const result = await aiIntegration.chatCompletion({
    messages: params.messages,
    stream: params.stream,
  });
  
  if (params.stream) {
    // Handle streaming response
    let fullText = '';
    for await (const chunk of result as AsyncIterable<string>) {
      fullText += chunk;
    }
    return fullText;
  }
  
  return result as string;
}

// Resources for model information
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'gpt-oss-120b://model/info',
        name: 'GPT-OSS-120B Model Information',
        description: 'Information about the GPT-OSS-120B model',
        mimeType: 'application/json',
      },
      {
        uri: 'gpt-oss-120b://model/capabilities',
        name: 'Model Capabilities',
        description: 'Detailed capabilities of GPT-OSS-120B',
        mimeType: 'application/json',
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case 'gpt-oss-120b://model/info':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              name: 'GPT-OSS-120B',
              version: '1.0.0',
              parameters: '120B',
              contextWindow: 200000,
              inferenceSpeed: '150 tokens/second',
              openSource: true,
              free: true,
            }, null, 2),
          },
        ],
      };

    case 'gpt-oss-120b://model/capabilities':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              multimodal: {
                image: true,
                document: true,
                chart: true,
                ocr: true,
              },
              codeGeneration: {
                languages: 50,
                fullStack: true,
                codeReview: true,
                testing: true,
              },
              reasoning: {
                mathematical: true,
                logical: true,
                scientific: true,
                abstract: true,
              },
              languages: {
                supported: ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'ru', 'ar', 'pt'],
                translation: true,
              },
            }, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('GPT-OSS-120B MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});