import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '@/common/models/base.model';
import { Role } from '@/authz/models/role.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: true, description: 'User model id' })
  id?: string;

  @Field(() => String, { nullable: true, description: 'User model email' })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true, description: 'User model first name' })
  firstname?: string;

  @Field(() => String, { nullable: true, description: 'User model last name' })
  lastname?: string;

  @Field(() => String, { nullable: true, description: 'User model password' })
  @HideField()
  password: string;

  @Field(() => Role, { nullable: true, description: 'User model roles' })
  roles?: Role[];
}
