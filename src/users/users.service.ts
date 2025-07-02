import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SigninupUserBody,
  UpdateUserBody,
  VerifyUserBody,
} from './users.types';
import Passwordless from 'supertokens-node/recipe/passwordless';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signinupUser(body: SigninupUserBody) {
    const { email, phoneNumber } = body;

    const result = await Passwordless.createCode({
      ...(email ? { email } : { phoneNumber: phoneNumber! }),
      tenantId: 'public',
    });

    console.log(JSON.stringify(result));

    return result.status === 'OK';
  }

  async verifyUser(body: VerifyUserBody) {
    const { preAuthSessionId, deviceId, userInputCode } = body;
    const result = await Passwordless.consumeCode({
      preAuthSessionId,
      deviceId,
      userInputCode,
      tenantId: 'public',
    });

    if (result.status !== 'OK') {
      throw new UnauthorizedException('Invalid or expired code');
    }

    await this.prisma.user.upsert({
      where: { id: result.user.id },
      create: { id: result.user.id },
      update: {},
    });

    return true;
  }

  async updateUser(userId: string, body: UpdateUserBody) {
    const { firstName, lastName } = body;
    await this.prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName },
    });

    return true;
  }

  async getUser(userId: string) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }
}
