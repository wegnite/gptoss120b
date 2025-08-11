# API 集成文档 - GPT-OSS-120B AI 对话平台

## 1. API 概览

本文档详细说明如何集成各种 LLM API 服务，包括 OpenAI、DeepSeek、Anthropic 以及 GPT-OSS-120B 自定义端点。

## 2. 支持的 API Providers

### 2.1 OpenAI API
```javascript
// 配置
const OPENAI_CONFIG = {
  baseURL: 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
  models: [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-4',
    'gpt-4-turbo-preview',
    'gpt-4-vision-preview'
  ]
};

// 使用示例
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Hello!' }
    ],
    stream: true
  })
});
```

### 2.2 DeepSeek API
```javascript
// 配置
const DEEPSEEK_CONFIG = {
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
  models: [
    'deepseek-chat',
    'deepseek-coder'
  ]
};

// DeepSeek 特殊参数
const deepseekOptions = {
  model: 'deepseek-chat',
  messages: messages,
  temperature: 0.7,
  max_tokens: 4096,
  top_p: 0.95,
  frequency_penalty: 0,
  presence_penalty: 0,
  stream: true
};
```

### 2.3 Anthropic Claude API
```javascript
// 配置
const ANTHROPIC_CONFIG = {
  baseURL: 'https://api.anthropic.com/v1',
  apiKey: process.env.ANTHROPIC_API_KEY,
  models: [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307'
  ]
};

// Claude 特殊格式
const claudeRequest = {
  model: 'claude-3-opus-20240229',
  max_tokens: 4096,
  messages: [
    { role: 'user', content: 'Hello, Claude!' }
  ],
  system: 'You are a helpful assistant.',
  stream: true
};
```

### 2.4 GPT-OSS-120B 自定义端点
```javascript
// 配置（支持多种部署方式）
const GPT_OSS_CONFIG = {
  // Hugging Face Inference API
  huggingface: {
    baseURL: 'https://api-inference.huggingface.co/models/openai/gpt-oss-120b',
    apiKey: process.env.HF_API_KEY
  },
  // 自部署端点
  custom: {
    baseURL: process.env.GPT_OSS_ENDPOINT || 'http://localhost:8000/v1',
    apiKey: process.env.GPT_OSS_API_KEY || ''
  }
};
```

## 3. 统一 API 接口实现

### 3.1 Provider 抽象基类
```typescript
// lib/llm/base-provider.ts
export abstract class BaseProvider {
  protected apiKey: string;
  protected baseURL: string;
  protected headers: Record<string, string>;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(config.apiKey)
    };
  }

  abstract getAuthHeaders(apiKey: string): Record<string, string>;
  abstract formatRequest(messages: Message[], options: GenerateOptions): any;
  abstract parseResponse(data: any): string;

  async *generateStream(
    messages: Message[],
    options?: GenerateOptions
  ): AsyncGenerator<string> {
    const requestBody = this.formatRequest(messages, options);
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = this.parseResponse(parsed);
            if (content) {
              yield content;
            }
          } catch (e) {
            console.error('Parse error:', e);
          }
        }
      }
    }
  }
}
```

### 3.2 各 Provider 实现
```typescript
// lib/llm/providers/openai.ts
export class OpenAIProvider extends BaseProvider {
  getAuthHeaders(apiKey: string) {
    return { 'Authorization': `Bearer ${apiKey}` };
  }

  formatRequest(messages: Message[], options?: GenerateOptions) {
    return {
      model: options?.model || 'gpt-3.5-turbo',
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 2000,
      stream: true,
      ...options
    };
  }

  parseResponse(data: any): string {
    return data.choices[0]?.delta?.content || '';
  }
}

// lib/llm/providers/deepseek.ts
export class DeepSeekProvider extends BaseProvider {
  getAuthHeaders(apiKey: string) {
    return { 'Authorization': `Bearer ${apiKey}` };
  }

  formatRequest(messages: Message[], options?: GenerateOptions) {
    return {
      model: options?.model || 'deepseek-chat',
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 4096,
      top_p: 0.95,
      stream: true
    };
  }

  parseResponse(data: any): string {
    return data.choices[0]?.delta?.content || '';
  }
}

// lib/llm/providers/anthropic.ts
export class AnthropicProvider extends BaseProvider {
  getAuthHeaders(apiKey: string) {
    return {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    };
  }

  formatRequest(messages: Message[], options?: GenerateOptions) {
    // Claude API 格式转换
    const systemMessage = messages.find(m => m.role === 'system');
    const userMessages = messages.filter(m => m.role !== 'system');

    return {
      model: options?.model || 'claude-3-opus-20240229',
      messages: userMessages,
      system: systemMessage?.content || '',
      max_tokens: options?.maxTokens || 4096,
      temperature: options?.temperature || 0.7,
      stream: true
    };
  }

  parseResponse(data: any): string {
    if (data.type === 'content_block_delta') {
      return data.delta?.text || '';
    }
    return '';
  }
}
```

## 4. 环境变量配置

### 4.1 .env.local 示例
```bash
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...

# DeepSeek
DEEPSEEK_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# GPT-OSS-120B
GPT_OSS_ENDPOINT=https://your-deployment.com/v1
GPT_OSS_API_KEY=your-key

# Hugging Face (for GPT-OSS-120B)
HF_API_KEY=hf_...

# 默认模型设置
DEFAULT_MODEL=gpt-3.5-turbo
DEFAULT_TEMPERATURE=0.7
DEFAULT_MAX_TOKENS=2000

# Rate Limiting
RATE_LIMIT_REQUESTS=20
RATE_LIMIT_WINDOW=60000

# Redis (可选，用于缓存)
REDIS_URL=redis://localhost:6379
REDIS_TOKEN=...
```

### 4.2 环境变量验证
```typescript
// lib/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // 至少需要一个 API Key
  OPENAI_API_KEY: z.string().optional(),
  DEEPSEEK_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GPT_OSS_ENDPOINT: z.string().url().optional(),
  
  // 默认配置
  DEFAULT_MODEL: z.string().default('gpt-3.5-turbo'),
  DEFAULT_TEMPERATURE: z.string().transform(Number).default('0.7'),
  DEFAULT_MAX_TOKENS: z.string().transform(Number).default('2000'),
  
  // Rate Limiting
  RATE_LIMIT_REQUESTS: z.string().transform(Number).default('20'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).default('60000'),
}).refine(
  data => data.OPENAI_API_KEY || data.DEEPSEEK_API_KEY || 
         data.ANTHROPIC_API_KEY || data.GPT_OSS_ENDPOINT,
  { message: 'At least one API key or endpoint must be configured' }
);

export const env = envSchema.parse(process.env);
```

## 5. API 路由实现

### 5.1 聊天端点
```typescript
// app/api/chat/route.ts
import { NextRequest } from 'next/server';
import { LLMManager } from '@/lib/llm/manager';

const llmManager = new LLMManager();

export async function POST(req: NextRequest) {
  try {
    const { messages, model, ...options } = await req.json();
    
    // 选择合适的 provider
    const provider = getProviderForModel(model);
    llmManager.setProvider(provider);
    
    // 创建流式响应
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    (async () => {
      try {
        const llmStream = llmManager.generateStream(messages, {
          model,
          ...options
        });

        for await (const chunk of llmStream) {
          await writer.write(
            encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
          );
        }

        await writer.write(encoder.encode('data: [DONE]\n\n'));
      } catch (error) {
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`)
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function getProviderForModel(model: string): string {
  if (model.startsWith('gpt')) return 'openai';
  if (model.startsWith('claude')) return 'anthropic';
  if (model.startsWith('deepseek')) return 'deepseek';
  if (model === 'gpt-oss-120b') return 'gpt-oss';
  return 'openai'; // 默认
}
```

### 5.2 模型列表端点
```typescript
// app/api/models/route.ts
export async function GET() {
  const availableModels = [];

  // 检查各 provider 可用性
  if (process.env.OPENAI_API_KEY) {
    availableModels.push(
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
      { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai' }
    );
  }

  if (process.env.DEEPSEEK_API_KEY) {
    availableModels.push(
      { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'deepseek' },
      { id: 'deepseek-coder', name: 'DeepSeek Coder', provider: 'deepseek' }
    );
  }

  if (process.env.ANTHROPIC_API_KEY) {
    availableModels.push(
      { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'anthropic' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'anthropic' }
    );
  }

  if (process.env.GPT_OSS_ENDPOINT) {
    availableModels.push(
      { id: 'gpt-oss-120b', name: 'GPT-OSS-120B', provider: 'gpt-oss' }
    );
  }

  return Response.json({ models: availableModels });
}
```

## 6. 前端集成

### 6.1 API 客户端
```typescript
// lib/api/chat-client.ts
export class ChatClient {
  private abortController?: AbortController;

  async sendMessage(
    messages: Message[],
    options: ChatOptions,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    this.abortController = new AbortController();

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, ...options }),
      signal: this.abortController.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              onChunk(parsed.content);
            } else if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (e) {
            console.error('Parse error:', e);
          }
        }
      }
    }
  }

  abort() {
    this.abortController?.abort();
  }
}
```

### 6.2 React Hook
```typescript
// hooks/useChat.ts
import { useState, useCallback } from 'react';
import { ChatClient } from '@/lib/api/chat-client';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const client = useRef(new ChatClient());

  const sendMessage = useCallback(async (
    content: string,
    options?: ChatOptions
  ) => {
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      await client.current.sendMessage(
        [...messages, userMessage],
        options || {},
        (chunk) => {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.content += chunk;
            return newMessages;
          });
        }
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    client.current.abort();
    setIsLoading(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopGeneration
  };
}
```

## 7. 错误处理

### 7.1 API 错误类型
```typescript
// lib/errors/api-errors.ts
export class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

export class RateLimitError extends APIError {
  constructor(public retryAfter: number) {
    super(429, 'RATE_LIMIT', `Rate limit exceeded. Retry after ${retryAfter}s`);
  }
}

export class AuthenticationError extends APIError {
  constructor() {
    super(401, 'AUTH_ERROR', 'Invalid API key');
  }
}

export class ModelNotFoundError extends APIError {
  constructor(model: string) {
    super(404, 'MODEL_NOT_FOUND', `Model ${model} not found`);
  }
}
```

### 7.2 错误处理中间件
```typescript
// lib/middleware/error-handler.ts
export function handleAPIError(error: unknown): Response {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return Response.json(
      { 
        error: error.message,
        code: error.code 
      },
      { status: error.status }
    );
  }

  if (error instanceof z.ZodError) {
    return Response.json(
      { 
        error: 'Validation error',
        details: error.errors 
      },
      { status: 400 }
    );
  }

  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## 8. 性能优化

### 8.1 响应缓存
```typescript
// lib/cache/response-cache.ts
import { LRUCache } from 'lru-cache';
import crypto from 'crypto';

export class ResponseCache {
  private cache: LRUCache<string, string>;

  constructor() {
    this.cache = new LRUCache({
      max: 100,
      ttl: 1000 * 60 * 5 // 5 分钟
    });
  }

  generateKey(messages: Message[], options: any): string {
    const data = JSON.stringify({ messages, options });
    return crypto.createHash('md5').update(data).digest('hex');
  }

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
  }
}
```

### 8.2 请求队列
```typescript
// lib/queue/request-queue.ts
export class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private concurrency = 3;

  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.processing) {
        this.process();
      }
    });
  }

  private async process() {
    this.processing = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.concurrency);
      await Promise.all(batch.map(task => task()));
    }

    this.processing = false;
  }
}
```

## 9. 监控和日志

### 9.1 API 调用监控
```typescript
// lib/monitoring/api-monitor.ts
export class APIMonitor {
  static logRequest(
    provider: string,
    model: string,
    startTime: number,
    success: boolean,
    tokenUsage?: TokenUsage
  ) {
    const duration = Date.now() - startTime;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      provider,
      model,
      duration,
      success,
      tokenUsage,
      cost: tokenUsage?.estimatedCost || 0
    };

    // 发送到监控服务
    if (process.env.NODE_ENV === 'production') {
      // 发送到 Google Analytics, Mixpanel 等
      this.sendToAnalytics(logEntry);
    }

    // 本地日志
    console.log('API Call:', logEntry);
  }

  private static sendToAnalytics(data: any) {
    // 实现监控服务集成
  }
}
```

## 10. 测试

### 10.1 模拟 API 响应
```typescript
// __mocks__/api.ts
export class MockLLMProvider {
  async *generateStream(messages: Message[]): AsyncGenerator<string> {
    const response = "This is a mock response.";
    for (const char of response) {
      yield char;
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
}
```

### 10.2 集成测试
```typescript
// __tests__/api/chat.test.ts
describe('Chat API', () => {
  it('should stream response', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }],
        model: 'gpt-3.5-turbo'
      })
    });

    expect(response.headers.get('content-type')).toBe('text/event-stream');
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    let fullResponse = '';
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      fullResponse += decoder.decode(value);
    }

    expect(fullResponse).toContain('data:');
  });
});
```

## 11. 安全考虑

### 11.1 API Key 保护
- 永远不要在客户端暴露 API Key
- 使用环境变量管理敏感信息
- 实现请求签名验证
- 定期轮换 API Key

### 11.2 请求验证
```typescript
// 验证请求来源
export function validateRequest(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  
  if (process.env.NODE_ENV === 'production') {
    return allowedOrigins.includes(origin || '');
  }
  
  return true;
}
```

## 12. 故障排查

### 常见问题和解决方案

| 问题 | 可能原因 | 解决方案 |
|------|---------|----------|
| 401 错误 | API Key 无效 | 检查环境变量配置 |
| 429 错误 | 超过速率限制 | 实现请求队列和重试 |
| 流式响应中断 | 网络不稳定 | 实现自动重连机制 |
| 响应缓慢 | 模型过大 | 使用更小的模型或优化 prompt |
| 内存泄漏 | 流未正确关闭 | 确保清理事件监听器 |