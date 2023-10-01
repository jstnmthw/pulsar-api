import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';

@ObjectType()
export class Permission extends BaseModel {
  @Field()
  action: string;

  @Field()
  subject: string;

  @Field()
  condition: string;

  @Field()
  description: string;
}
