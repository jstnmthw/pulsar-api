import 'reflect-metadata';
import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { BaseModel } from '@/common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstname?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @HideField()
  password: string;

  @Field(() => String, { nullable: true })
  roles?: string[];
}
