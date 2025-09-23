import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule.forRoot(auth), PrismaModule],
})
export class AppModule {}
