import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignupInput } from '@/authn/dto/signup.input';
import { Authz } from '@/authz/models/authz.model';

@Resolver(() => Authz)
export class AuthZResolver {
  @Mutation(() => Authz)
  async addRoleToUser(@Args('data') data: SignupInput) {
    data.email = data.email.toLowerCase();
  }
}
