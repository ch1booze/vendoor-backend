import { cleanEnv, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  GROQ_API_KEY: str(),
  GROQ_MODEL: str(),
  JWT_SECRET: str(),
  MCP_SERVER_URL: str(),
  OTP_SECRET: str(),
});
