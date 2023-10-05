import { Authz } from '@/authz/models/authz.model';
import { AuthzService } from '@/authz/authz.service';
import { GqlAuthGuard } from '@/authn/gql-auth.guard';
import { AddRoleToUserInput } from '@/authz/dto/userRole.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Authz)
export class AuthzResolver {
  constructor(private readonly authzService: AuthzService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Authz)
  async addRoleToUser(@Args('data') data: AddRoleToUserInput) {
    const response = await this.authzService.addRoleToUser({
      userId: data.userId,
      roleId: data.roleId,
    });
    return {
      success: response,
      errorMessage: response ? null : 'Role not added to user',
    };
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Authz)
  async removeRoleFromUser(@Args('data') data: AddRoleToUserInput) {
    const response = await this.authzService.removeRoleFromUser({
      userId: data.userId,
      roleId: data.roleId,
    });
    if (response) {
      return {
        status: 201,
      };
    } else {
      return {
        status: 400,
        message: 'Role not removed from user',
      };
    }
  }
}
