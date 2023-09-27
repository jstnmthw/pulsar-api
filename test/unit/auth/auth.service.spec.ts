import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/authn/auth.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '@/authn/password.service';

// Mocks
import prismaMock from '@mock/prisma.mock';
import configMock from '@mock/config.mock';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PasswordService,
        JwtService,
        {
          provide: ConfigService,
          useValue: configMock,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = await service.createUser({
        email: 'marge@simpson.com',
        password: 'password',
      });

      expect(user).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should throw an error if user already exists', async () => {
      try {
        await service.createUser({
          email: 'homer@simpson.com',
          password: 'password',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email homer@simpson.com already used.');
      }
    });

    it('should catch all other errors', async () => {
      await expect(async () => {
        await service
          .createUser({
            email: '',
            password: 'password',
          })
          .catch((e) => {
            throw e;
          });
      }).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should return a token', async () => {
      const token = await service.login('homer@simpson.com', 'password');
      expect(token).toBeDefined();
      expect(token).toHaveProperty('accessToken');
      expect(token).toHaveProperty('refreshToken');
    });

    it('should throw an error if user does not exist', async () => {
      await expect(
        service.login('marge@simpson.com', 'password'),
      ).rejects.toThrowError('No user found for email: ');
    });

    it('should throw an error if password is invalid', async () => {
      await expect(
        service.login('homer@simpson.com', 'wrong_password'),
      ).rejects.toThrowError('Invalid password');
    });
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      const user = await service.validateUser('1');

      expect(user).toEqual({
        id: '1',
        email: 'homer@simpson.com',
        password:
          '$2b$10$deZ/BJ2JxadVqET1xEEN4ekTF3a0F4d3TrVRs2nPqvZZ6aOHjqK/W', // password
        firstname: 'Homer',
        lastname: 'Simpson',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        role: 'USER',
      });
    });
  });

  describe('getUserFromToken', () => {
    it('should return a user', async () => {
      const token = service.generateTokens({ userId: '1' });
      const user = await service.getUserFromToken(token.accessToken);

      expect(user).toBeDefined();
      expect(user.id).toBe('1');
      expect(user.email).toBe('homer@simpson.com');
      expect(user.password).toBe(
        '$2b$10$deZ/BJ2JxadVqET1xEEN4ekTF3a0F4d3TrVRs2nPqvZZ6aOHjqK/W',
      );
    });
  });

  describe('generateTokens', () => {
    it('should return a token', async () => {
      const token = service.generateTokens({
        userId: '1',
      });

      expect(token).toBeDefined();
      expect(token).toHaveProperty('accessToken');
      expect(token).toHaveProperty('refreshToken');
      expect(token.accessToken).toBeDefined();
      expect(token.refreshToken).toBeDefined();
    });
  });

  describe('refreshToken', () => {
    it('should return a token', async () => {
      const token = await service.login('homer@simpson.com', 'password');
      const newToken = service.refreshToken(token.refreshToken);

      expect(newToken).toBeDefined();
      expect(newToken).toHaveProperty('accessToken');
      expect(newToken).toHaveProperty('refreshToken');
    });

    it('should throw an error if token is invalid', async () => {
      try {
        service.refreshToken('invalid_token');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Unauthorized');
      }
    });
  });
});
