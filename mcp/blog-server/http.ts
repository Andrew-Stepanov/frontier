/**
 * MCP Streamable HTTP — для удалённого подключения с Bearer-токеном.
 * Запуск: npm run mcp:blog:http
 * POST /mcp с заголовком Authorization: Bearer <FRONTIER_MCP_TOKEN>
 */
import { randomUUID } from 'node:crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { getExpectedToken } from './auth.js';
import { registerBlogTools } from './register-tools.js';

const PORT = Number(process.env.FRONTIER_MCP_HTTP_PORT ?? 3847);

function createBlogServer() {
  const server = new McpServer({
    name: 'frontier-blog',
    version: '1.0.0',
    title: 'Frontier Blog',
  });
  registerBlogTools(server);
  return server;
}

function assertBearer(req: { headers: { authorization?: string } }): boolean {
  const expected = getExpectedToken();
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return false;
  return header.slice(7) === expected;
}

async function main() {
  getExpectedToken();

  const app = createMcpExpressApp({ host: '0.0.0.0' });

  app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'frontier-blog-mcp' });
  });

  app.all('/mcp', async (req, res) => {
    if (!assertBearer(req)) {
      res.status(401).setHeader(
        'WWW-Authenticate',
        'Bearer realm="frontier-blog", error="invalid_token"',
      );
      res.json({ error: 'Unauthorized' });
      return;
    }

    const server = createBlogServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  app.listen(PORT, () => {
    console.log(`[frontier-blog-mcp] HTTP http://127.0.0.1:${PORT}/mcp`);
  });
}

main().catch((err) => {
  console.error('[frontier-blog-mcp]', err);
  process.exit(1);
});
