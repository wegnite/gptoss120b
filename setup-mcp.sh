#!/bin/bash

echo "🚀 Setting up GPT-OSS-120B MCP Server..."

# Navigate to MCP server directory
cd mcp-server

# Install dependencies
echo "📦 Installing MCP server dependencies..."
npm install

# Install additional AI SDK dependencies
echo "🤖 Installing AI SDK dependencies..."
npm install @ai-sdk/openai @ai-sdk/deepseek @ai-sdk/openai-compatible ai

# Build the TypeScript files
echo "🔨 Building MCP server..."
npm run build

echo "✅ MCP server setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update the API keys in claude_desktop_config.json"
echo "2. Copy the mcpServers configuration to your Claude Desktop config:"
echo "   - macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "   - Windows: %APPDATA%/Claude/claude_desktop_config.json"
echo "   - Linux: ~/.config/Claude/claude_desktop_config.json"
echo ""
echo "3. Restart Claude Desktop to load the MCP server"
echo ""
echo "🎉 Your GPT-OSS-120B MCP server is ready to use!"