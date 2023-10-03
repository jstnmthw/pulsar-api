import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '@/common/decorators/user.decorator';
import { User } from './models/user.model';
import { GqlAuthGuard } from '@/authn/gql-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { PrismaService } from 'nestjs-prisma';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        roles: {
          include: { permissions: true },
        },
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput,
  ) {
    return this.usersService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(
      user.id,
      user.password,
      changePassword,
    );
  }
}
