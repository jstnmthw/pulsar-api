import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddRoleToUserInput {
  @Field()
  userId: string;

  @Field()
  roleId: number;
}

@InputType()
export class RemoveRoleFromUserInput {
  @Field()
  userId: string;

  @Field()
  roleId: number;
}
