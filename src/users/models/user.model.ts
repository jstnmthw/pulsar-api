import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '@/common/models/base.model';
import { Role } from '@/authz/models/role.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { description: 'User model id' })
  id?: string;

  @Field(() => String, { description: 'User model email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'User model first name', nullable: true })
  firstname?: string;

  @Field(() => String, { description: 'User model last name', nullable: true })
  lastname?: string;

  @Field(() => String, { description: 'User model password' })
  @HideField()
  password: string;

  @Field(() => [Role], { description: 'User model roles', nullable: true })
  roles?: Role[];
}
