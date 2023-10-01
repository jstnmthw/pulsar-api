import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';

@ObjectType()
export class Permission extends BaseModel {
  @Field(() => Number, { description: 'ID of permission' })
  id: number;

  @Field(() => String, { description: 'Action for permission' })
  action: string;

  @Field(() => String, { description: 'Subject for permission' })
  subject: string;

  @Field(() => String, { description: 'Condition of permission' })
  condition: string;

  @Field(() => String, { description: 'Description of permission' })
  description: string;
}
