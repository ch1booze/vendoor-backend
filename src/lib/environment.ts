import { cleanEnv, str } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
  BETTER_AUTH_SECRET: str(),
  GROQ_API_KEY: str(),
  GROQ_MODEL: str(),
  MCP_SERVER_URL: str(),
});
