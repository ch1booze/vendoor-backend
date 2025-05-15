import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => User)
  async createUser(
    @Args('id') id: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
  ) {
    return await this.prisma.user.create({ data: { id, firstName, lastName } });
  }
}
