import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Tool, Prompt } from '@modelcontextprotocol/sdk/types';
import Groq from 'groq-sdk';
import { env } from 'src/environment';

export class McpClient {
  private mcp: Client;
  private groq: Groq;
  private transport: StreamableHTTPClientTransport;
  private tools: Tool[] = [];
  private prompts: Prompt[] = [];

  constructor() {
    this.mcp = new Client({ name: 'Customer-Agent', version: '1.0.0' });
    this.groq = new Groq({ apiKey: env.GROQ_API_KEY });
    const mcpServerUrl = new URL(env.MCP_SERVER_URL);
    this.transport = new StreamableHTTPClientTransport(mcpServerUrl);
  }

  async connectToServer() {
    this.mcp.connect(this.transport);
    const tools = await this.mcp.listTools();
    const prompts = await this.mcp.listPrompts();

    return { tools, prompts };
  }

  async processQuery() {}
}
