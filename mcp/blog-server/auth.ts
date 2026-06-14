const MIN_TOKEN_LENGTH = 24;

export function getExpectedToken(): string {
  const token = process.env.FRONTIER_MCP_TOKEN?.trim();
  if (!token || token.length < MIN_TOKEN_LENGTH) {
    throw new Error(
      `FRONTIER_MCP_TOKEN не задан или короче ${MIN_TOKEN_LENGTH} символов. Добавьте в .env.local или env MCP-клиента.`,
    );
  }
  return token;
}

export function verifyMcpToken(provided: string): void {
  const expected = getExpectedToken();
  if (provided !== expected) {
    throw new Error('Неверный mcp_token');
  }
}

export function siteBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://frontier-global.club'
  );
}

export function articlePublicUrl(slug: string): string {
  return `${siteBaseUrl()}/blog/${slug}`;
}
