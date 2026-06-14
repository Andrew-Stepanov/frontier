/**
 * MCP stdio — управление блогом Frontier (SQLite).
 * Запуск: npm run mcp:blog
 * Требует FRONTIER_MCP_TOKEN в окружении.
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getExpectedToken } from './auth.js';
import { registerBlogTools } from './register-tools.js';

async function main() {
  getExpectedToken();

  const server = new McpServer({
    name: 'frontier-blog',
    version: '1.0.0',
    title: 'Frontier Blog',
    description: 'Защищённое добавление и редактирование статей блога',
  });

  registerBlogTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('[frontier-blog-mcp]', err);
  process.exit(1);
});
