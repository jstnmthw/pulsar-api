import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@/common/models/base.model';

@ObjectType()
export class Permission extends BaseModel {
  @Field({ description: 'ID of permission' })
  id: number;

  @Field({ description: 'Action for permission' })
  action: string;

  @Field({ description: 'Subject for permission' })
  subject: string;

  @Field({
    description: 'Condition of permission',
    nullable: true,
  })
  condition?: string;

  @Field({ description: 'Description of permission' })
  description: string;
}
