import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { JwtStrategy } from '../../../auth/jwt.strategy';
import { AuthService } from '../../../auth/auth.service';
import { JwtDto } from '../../../auth/dto/jwt.dto';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        AuthService,
        ConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({ bcryptSaltOrRound: 10 }),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
    expect(authService).toBeDefined();
    expect(configService).toBeDefined();
  });

  it('should validate a user', async () => {
    const user: User = {
      id: '1',
      email: 'test@example.com',
      password: 'password',
      firstname: 'Test',
      lastname: 'Example',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const jwtDto: JwtDto = {
      userId: '1',
      iat: 1,
      exp: 1,
    };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    const validate = await strategy.validate(jwtDto);
    expect(validate).toEqual(user);
  });

  it('should throw an error', async () => {
    const jwtDto: JwtDto = {
      userId: '1',
      iat: 1,
      exp: 1,
    };
    jest.spyOn(authService, 'validateUser').mockResolvedValue(null);
    await expect(strategy.validate(jwtDto)).rejects.toThrow();
  });
});
