# GPT-OSS-120B MCP Server

## Overview

This MCP (Model Context Protocol) server integrates GPT-OSS-120B with Claude Desktop, providing powerful AI capabilities through a standardized interface.

## Features

### Available Tools

1. **generateText** - Generate text using GPT-OSS-120B
   - Custom prompts with system instructions
   - Configurable temperature and max tokens
   - Support for multiple AI providers

2. **analyzeCode** - Analyze code for various purposes
   - Code review
   - Performance optimization
   - Documentation generation
   - Security analysis

3. **translateContent** - Translate between languages
   - Support for 10+ languages
   - Maintains tone and style
   - Professional translation quality

4. **summarizeDocument** - Summarize long documents
   - Brief, detailed, or bullet-point formats
   - Configurable summary length
   - Key information preservation

5. **chatCompletion** - Interactive chat with GPT-OSS-120B
   - Multi-turn conversations
   - Streaming support
   - Context-aware responses

### Resources

- **Model Information** - Details about GPT-OSS-120B capabilities
- **Model Capabilities** - Comprehensive feature list

## Installation

### Quick Setup

Run the setup script:

```bash
./setup-mcp.sh
```

### Manual Setup

1. Install dependencies:
```bash
cd mcp-server
npm install
npm install @ai-sdk/openai @ai-sdk/deepseek @ai-sdk/openai-compatible ai
```

2. Build the server:
```bash
npm run build
```

3. Configure Claude Desktop:
   - Copy the configuration from `claude_desktop_config.json`
   - Add it to your Claude Desktop config file
   - Update the API keys as needed

## Configuration

### Environment Variables

- `GPT_OSS_120B_API_URL` - API endpoint for GPT-OSS-120B (default: https://api.gpt-oss-120b.net/v1)
- `GPT_OSS_120B_API_KEY` - API key for authentication
- `OPENAI_API_KEY` - Optional: OpenAI API key for fallback
- `DEEPSEEK_API_KEY` - Optional: DeepSeek API key for alternative provider

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gpt-oss-120b": {
      "command": "node",
      "args": [
        "/path/to/gptoss120b/mcp-server/dist/index.js"
      ],
      "env": {
        "GPT_OSS_120B_API_URL": "your-api-url",
        "GPT_OSS_120B_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage Examples

### In Claude Desktop

Once configured, you can use the MCP tools directly in Claude:

```
Use the gpt-oss-120b MCP server to generate a blog post about AI democratization
```

```
Use the code analysis tool to review my Python code for security issues
```

```
Translate this document from English to Chinese using the MCP server
```

## Development

### Running in Development Mode

```bash
cd mcp-server
npm run dev
```

### Testing the Server

```bash
# Test the server directly
node dist/index.js

# Or use the MCP CLI tools
npx @modelcontextprotocol/cli test
```

## Architecture

The MCP server acts as a bridge between Claude Desktop and the GPT-OSS-120B AI platform:

```
Claude Desktop <-> MCP Protocol <-> MCP Server <-> AI Providers
                                                     ├── GPT-OSS-120B
                                                     ├── OpenAI
                                                     └── DeepSeek
```

## Troubleshooting

### Server not starting
- Check that all dependencies are installed
- Verify the build completed successfully
- Check the path in Claude Desktop config

### API errors
- Verify your API keys are correct
- Check the API URL is accessible
- Ensure you have sufficient credits/quota

### Tool execution failures
- Check the server logs for detailed error messages
- Verify the input parameters are valid
- Ensure the AI provider is configured correctly

## License

This MCP server is part of the GPT-OSS-120B project and follows the same open-source license.