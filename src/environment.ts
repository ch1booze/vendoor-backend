import { cleanEnv, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  GROQ_API_KEY: str(),
  GROQ_MODEL: str(),
  JWT_SECRET: str(),
});
