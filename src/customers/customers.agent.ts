import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Tool } from '@modelcontextprotocol/sdk/types';
import OpenAI from 'openai';
import { env } from 'src/environment';

export class McpClient {
  private mcp: Client;
  private groq: OpenAI;
  private transport: StreamableHTTPClientTransport | null = null;
  private tools: Tool[] = [];

  constructor() {
    this.mcp = new Client({ name: 'Customer-Agent', version: '1.0.0' });
    this.groq = new OpenAI({
      apiKey: env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });
    const mcpServerUrl = new URL(env.MCP_SERVER_URL);
    this.transport = new StreamableHTTPClientTransport(mcpServerUrl);
    this.mcp.connect(this.transport);
  }

  async listTools() {
    const response = await this.groq.responses.create({
      model: 'gemma2-9b-it',
      tools: [
        {
          type: 'mcp',
          server_label: 'deepwiki',
          server_url: 'https://mcp.deepwiki.com/mcp',
          require_approval: 'never',
        },
      ],
      input:
        'What transport protocols are supported in the 2025-03-26 version of the MCP spec?',
    });

    console.log(response.output_text);
  }
}
