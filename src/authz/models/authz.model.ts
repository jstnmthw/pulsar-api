import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Authz {
  @Field(() => Boolean, { description: 'Returns true on success' })
  success: boolean;

  @Field(() => String, { description: 'Provides error message' })
  errorMessage: string;
}
