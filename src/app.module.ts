import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { SuperTokensModule } from 'supertokens-nestjs';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { BusinessModule } from './business/business.module';
import { JSONScalar } from 'graphql/json.scalar';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        typePaths: ['./src/**/*.graphql'],
        resolvers: { JSON: new JSONScalar() },
      }),
    }),
    SuperTokensModule.forRoot({
      framework: 'fastify',
      fastifyAdapter: new FastifyAdapter(),
      supertokens: { connectionURI: 'http://0.0.0.0:3567' },
      appInfo: {
        appName: 'vendoor',
        apiDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteDomain: 'http://localhost:3000',
        websiteBasePath: '/auth',
      },
      recipeList: [
        Passwordless.init({
          flowType: 'USER_INPUT_CODE',
          contactMethod: 'EMAIL_OR_PHONE',
        }),
        Session.init(),
      ],
    }),
    UserModule,
    PrismaModule,
    BusinessModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
