import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';

@ObjectType()
export class Role extends BaseModel {
  @Field(() => Number, { description: 'ID of role' })
  id: number;

  @Field(() => String, { description: 'Name of role' })
  name: string;

  @Field(() => String, { description: 'Description of role' })
  description: string;
}
