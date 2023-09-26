import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Authz } from '@/authz/models/authz.model';
import { AuthzService } from '@/authz/authz.service';
import { AddRoleToUserInput } from '@/authz/dto/userRole.input';

@Resolver(() => Authz)
export class AuthzResolver {
  constructor(private readonly authzService: AuthzService) {}

  @Mutation(() => Authz)
  async addRoleToUser(@Args('data') data: AddRoleToUserInput) {
    const response = await this.authzService.addRoleToUser({
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
        message: 'Role not added to user',
      };
    }
  }

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
