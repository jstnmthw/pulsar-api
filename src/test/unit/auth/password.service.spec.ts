import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../../../auth/password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        PrismaService,
        ConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({ bcryptSaltOrRound: 10 }),
          },
        },
      ],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.bcryptSaltRounds).toBeDefined();
  });

  it('should hash a password', async () => {
    const password = 'password';
    const hash = await service.hashPassword(password);
    expect(hash).toBeDefined();
    expect(hash).not.toEqual(password);
  });

  it('should compare a password', async () => {
    const password = 'password';
    const hash = await service.hashPassword(password);
    const compare = await service.validatePassword(password, hash);
    expect(compare).toBeTruthy();
  });
});
