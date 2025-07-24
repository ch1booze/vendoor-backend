import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { env } from 'src/environment';

async function createMcpClient() {
  const client = new Client({ name: 'Customers-Agent', version: '1.0.0' });
  const mcpServerUrl = new URL(env.MCP_SERVER_URL);
  const transport = new StreamableHTTPClientTransport(mcpServerUrl);
  await client.connect(transport);

  return client;
}
