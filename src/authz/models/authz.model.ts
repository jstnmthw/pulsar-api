import { ObjectType } from '@nestjs/graphql';
import { User } from '@/users/models/user.model';
import { Token } from '@/common/models/token.model';

@ObjectType()
export class Authz extends Token {
  user: User;
}
