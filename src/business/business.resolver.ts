import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Business } from 'graphql/schema';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver()
export class BusinessResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Business)
  async registerBusiness(
    @Args('userID') userId: string,
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('description') description?: string,
    @Args('workingHours') workingHours?: object,
  ) {
    return await this.prisma.business.create({
      data: {
        name,
        type,
        description,
        workingHours,
        user: { connect: { id: userId } },
      },
    });
  }

  @Mutation(() => Business)
  async updateBusiness(
    @Args('id') id: string,
    @Args('name') name?: string,
    @Args('type') type?: string,
    @Args('description') description?: string,
    @Args('workingHours') workingHours?: object,
  ) {
    return await this.prisma.business.update({
      where: { id },
      data: {
        name,
        type,
        description,
        workingHours,
      },
    });
  }
}
