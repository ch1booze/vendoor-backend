import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { SuperTokensModule } from 'supertokens-nestjs';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { BusinessesModule } from './businesses/businesses.module';
import { ProductsModule } from './products/products.module';
import { supertokenAppInfo } from './config';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatsModule } from './chats/chats.module';
import { ModelModule } from './model/model.module';

@Module({
  imports: [
    SuperTokensModule.forRootAsync({
      useFactory: () => ({
        framework: 'express',
        supertokens: {
          connectionURI: 'http://0.0.0.0:3567',
        },
        appInfo: supertokenAppInfo,
        recipeList: [
          Passwordless.init({
            flowType: 'USER_INPUT_CODE',
            contactMethod: 'EMAIL_OR_PHONE',
          }),
          Session.init(),
        ],
      }),
    }),
    UserModule,
    PrismaModule,
    BusinessesModule,
    ProductsModule,
    InvoicesModule,
    PaymentsModule,
    ChatsModule,
    ModelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
