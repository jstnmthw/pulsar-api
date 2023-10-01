import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '@/common/models/base.model';
import { Role } from '@/authz/models/role.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @HideField()
  password: string;

  @Field(() => Role, { nullable: true })
  roles?: Role[];
}
