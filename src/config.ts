import Joi from 'joi';

export const supertokenAppInfo = {
  appName: 'vendoor',
  apiDomain: 'http://localhost:3000',
  apiBasePath: '/auth',
  websiteDomain: 'http://localhost:3000',
  websiteBasePath: '/auth',
};

export const envSchema = Joi.object({
  DATABASE_URL: Joi.string().uri().required(),
  GROQ_API: Joi.string().uri().required(),
  GROQ_LLAMAINDEX_MODEL: Joi.string().required(),
});
