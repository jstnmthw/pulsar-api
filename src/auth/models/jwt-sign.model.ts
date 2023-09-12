import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtSignModel {
	@Field(() => String, { description: 'JWT access token' })
	JWT_ACCESS_SECRET: string;

	@Field(() => String, { description: 'JWT refresh token' })
	JWT_REFRESH_SECRET: string;
}
