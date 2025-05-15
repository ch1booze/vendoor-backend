import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SuperTokensModule } from 'supertokens-nestjs';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        typePaths: ['./**/*.graphql'],
      }),
    }),
    SuperTokensModule.forRoot({
      framework: 'fastify',
      supertokens: { connectionURI: 'http://0.0.0.0:3567' },
      appInfo: {
        appName: 'kiosk',
        apiDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
      },
      recipeList: [
        Passwordless.init({
          flowType: 'MAGIC_LINK',
          contactMethod: 'EMAIL_OR_PHONE',
        }),
        Session.init(),
      ],
    }),
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
