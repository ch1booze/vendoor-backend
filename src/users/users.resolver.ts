import { Resolver, Mutation, Args } from '@nestjs/graphql';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'graphql/schema';

@Resolver()
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Boolean)
  async authenticateUser(
    @Args('email', { nullable: true }) email: string,
    @Args('phoneNumber', { nullable: true }) phoneNumber: string,
  ) {
    if (!email && !phoneNumber) {
      throw new Error('Either email or phone number must be provided.');
    }

    const result = await Passwordless.createCode({
      ...(email ? { email } : { phoneNumber }),
      tenantId: 'public',
    });
    console.log(JSON.stringify(result));
    return result.status === 'OK';
  }

  @Mutation(() => User)
  async verifyUser(
    @Args('preAuthSessionId') preAuthSessionId: string,
    @Args('deviceId') deviceId: string,
    @Args('userInputCode') userInputCode: string,
  ) {
    const result = await Passwordless.consumeCode({
      preAuthSessionId,
      deviceId,
      userInputCode,
      tenantId: 'public',
    });

    if (result.status !== 'OK') {
      throw new Error('Invalid or expired code');
    }

    const { user } = result;
    let dbUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await this.prisma.user.create({
        data: {
          id: user.id,
        },
      });
    }

    return dbUser;
  }
}
