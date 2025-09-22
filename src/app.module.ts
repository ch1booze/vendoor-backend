import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './environment';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';

@Module({
  imports: [
    AuthModule.forRoot(auth),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
