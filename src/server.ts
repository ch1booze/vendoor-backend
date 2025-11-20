import { Elysia } from 'elysia';
import { auth } from './lib/auth';
import cors from '@elysiajs/cors';
import apollo from '@elysiajs/apollo';
import schema from './graphql/schema.merged';
import { createContext } from './lib/context';
import { errorHandler } from './lib/error-handler';

const app = new Elysia()
	.use(cors())
	.mount(auth.handler)
	.use(
		apollo({
			schema,
			context: createContext,
		}),
	)
	.onError((error) => {
		throw errorHandler(error);
	})
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
