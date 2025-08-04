import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Tool } from '@modelcontextprotocol/sdk/types';
import Groq from 'groq-sdk';
import { env } from 'src/environment';

export class McpClient {
  private mcp: Client;
  private groq: Groq;
  private transport: StreamableHTTPClientTransport | null = null;
  private tools: Tool[] = [];

  constructor() {
    this.mcp = new Client({ name: 'Customer-Agent', version: '1.0.0' });
    this.groq = new Groq({ apiKey: env.GROQ_API_KEY });
    const mcpServerUrl = new URL(env.MCP_SERVER_URL);
    this.transport = new StreamableHTTPClientTransport(mcpServerUrl);
  }

  async connectToServer() {}

  async listTools() {}

  async listPrompts() {}

  async processQuery() {}
}
