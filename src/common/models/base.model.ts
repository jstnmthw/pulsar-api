import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field({
    description: 'Date and time model created.',
  })
  createdAt: Date;

  @Field({
    description: 'Date and time last model updated.',
  })
  updatedAt: Date;

  @Field({
    description: 'Date and time model deleted.',
    nullable: true,
  })
  deletedAt?: Date;
}
