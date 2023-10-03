import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';
import { User } from '@/users/models/user.model';
import { Permission } from '@/authz/models/permission.model';

@ObjectType()
export class Role extends BaseModel {
  @Field(() => Number, { description: 'ID of role' })
  id: number;

  @Field(() => String, { description: 'Name of role' })
  name: string;

  @Field(() => String, { description: 'Description of role' })
  description: string;

  @Field(() => [User], { description: 'Users of role' })
  users?: User[];

  @Field(() => [Permission], { description: 'Permissions of role' })
  permissions?: Permission[];
}
