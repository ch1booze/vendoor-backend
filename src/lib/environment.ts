import { cleanEnv, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  BETTER_AUTH_SECRET: str(),
  DATABASE_URL: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GROQ_API_KEY: str(),
  GROQ_MODEL: str(),
  JWT_SECRET: str(),
  MCP_SERVER_URL: str(),
  OTP_SECRET: str(),
});