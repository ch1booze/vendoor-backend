import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninupUserDto, UpdateUserDto, VerifyUserDto } from './users.dto';
import Passwordless from 'supertokens-node/recipe/passwordless';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signinupUser(dto: SigninupUserDto) {
    const { email, phoneNumber } = dto;

    const result = await Passwordless.createCode({
      ...(email ? { email } : { phoneNumber: phoneNumber! }),
      tenantId: 'public',
    });

    return result.status === 'OK';
  }

  async verifyUser(dto: VerifyUserDto) {
    const { preAuthSessionId, deviceId, userInputCode } = dto;
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

  async updateUser(userId: string, dto: UpdateUserDto) {
    const { firstName, lastName } = dto;
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
