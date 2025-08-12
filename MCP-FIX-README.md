# 🔧 MCP 配置修复指南

## 问题诊断

你的 `.claude.json` 文件已损坏（大小为 51.4MB，包含图像数据），导致 MCP 服务器无法正常配置。

## 修复步骤

### 方法 1：使用自动修复脚本（推荐）

```bash
# 运行修复脚本
./fix-mcp-config.sh
```

### 方法 2：手动修复

1. **备份损坏的文件**
   ```bash
   mv ~/.claude.json ~/.claude.json.backup
   ```

2. **使用新的配置文件**
   ```bash
   cp claude.json.clean ~/.claude.json
   ```

3. **重新添加 MCP 服务器**
   ```bash
   # 添加 Playwright
   claude mcp add playwright -s user -- npx @playwright/mcp@latest
   
   # 添加 PostgreSQL（请替换为你的实际连接字符串）
   claude mcp add postgresql -s user \
     -e POSTGRES_CONNECTION_STRING="postgresql://user:password@localhost:5432/dbname" \
     -- npx -y @modelcontextprotocol/server-postgres
   ```

4. **验证配置**
   ```bash
   claude mcp list
   ```

## PostgreSQL 连接配置

如果你需要连接到实际的 PostgreSQL 数据库，请更新连接字符串：

1. 编辑 `~/.claude.json`
2. 找到 `POSTGRES_CONNECTION_STRING`
3. 替换为你的实际数据库连接信息：
   ```
   postgresql://[用户名]:[密码]@[主机]:[端口]/[数据库名]
   ```

例如：
- 本地数据库：`postgresql://postgres:mypassword@localhost:5432/mydb`
- 远程数据库：`postgresql://user:pass@db.example.com:5432/production`

## 验证 MCP 是否正常工作

运行以下命令检查配置：

```bash
# 列出所有配置的 MCP 服务器
claude mcp list

# 或在 Claude Code 中使用
/mcp
```

## 文件说明

- `claude.json.clean` - 干净的配置文件模板
- `mcp-config-example.json` - MCP 配置示例
- `fix-mcp-config.sh` - 自动修复脚本

## 故障排除

如果仍然遇到问题：

1. 确保 Claude Code 已更新到最新版本
2. 检查 Node.js 是否正确安装
3. 尝试重启 Claude Code
4. 查看 Claude Code 日志：`~/.claude/logs/`

## 需要帮助？

如果问题持续存在，请在 GitHub 上报告：
https://github.com/anthropics/claude-code/issues