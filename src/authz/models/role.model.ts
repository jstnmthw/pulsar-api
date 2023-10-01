import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';
import { Permission } from '@/authz/models/permission.model';

@ObjectType()
export class Role extends BaseModel {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Permission], { nullable: true })
  permissions: Permission[];
}
