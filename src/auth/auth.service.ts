import {
	Injectable,
	NotFoundException,
	BadRequestException,
	ConflictException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './models/token.model';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SignupInput } from './dto/signup.input';
import { PasswordService } from './password.service';
import { JwtSignModel } from '@/auth/models/jwt-sign.model';
import { SecurityConfig } from '@/common/configs/config.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly prisma: PrismaService,
		private readonly passwordService: PasswordService,
		private readonly configService: ConfigService,
	) {}

	async createUser(payload: SignupInput): Promise<Token> {
		const hashedPassword = await this.passwordService.hashPassword(
			payload.password,
		);

		try {
			const user = await this.prisma.user.create({
				data: {
					...payload,
					password: hashedPassword,
					role: 'USER',
				},
			});

			return this.generateTokens({
				userId: user.id,
			});
		} catch (e) {
			if (
				e instanceof Prisma.PrismaClientKnownRequestError &&
				e.code === 'P2002'
			) {
				throw new ConflictException(`Email ${payload.email} already used.`);
			}
			throw new Error(e);
		}
	}

	async login(email: string, password: string): Promise<Token> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new NotFoundException(`No user found for email: ${email}`);
		}

		const passwordValid = await this.passwordService.validatePassword(
			password,
			user.password,
		);

		if (!passwordValid) {
			throw new BadRequestException('Invalid password');
		}

		return this.generateTokens({
			userId: user.id,
		});
	}

	validateUser(userId: string): Promise<User> {
		return this.prisma.user.findUnique({ where: { id: userId } });
	}

	getUserFromToken(token: string): Promise<User> {
		const id = this.jwtService.decode(token)['userId'];
		return this.prisma.user.findUnique({ where: { id } });
	}

	generateTokens(payload: { userId: string }): Token {
		return {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(payload),
		};
	}

	private generateAccessToken(payload: { userId: string }): string {
		const jwt = this.configService.get<JwtSignModel>('JWT_ACCESS_SECRET');
		return this.jwtService.sign(payload, {
			secret: jwt.JWT_ACCESS_SECRET,
		});
	}

	private generateRefreshToken(payload: { userId: string }): string {
		const securityConfig = this.configService.get<SecurityConfig>('security');
		const jwt = this.configService.get<JwtSignModel>('JWT_REFRESH_SECRET');
		return this.jwtService.sign(payload, {
			secret: jwt.JWT_REFRESH_SECRET,
			expiresIn: securityConfig.refreshIn,
		});
	}

	refreshToken(token: string) {
		try {
			const jwt = this.configService.get<JwtSignModel>('JWT_REFRESH_SECRET');
			const { userId } = this.jwtService.verify(token, {
				secret: jwt.JWT_REFRESH_SECRET,
			});
			return this.generateTokens({
				userId,
			});
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
