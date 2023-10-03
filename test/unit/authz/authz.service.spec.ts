import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { AuthzService } from '@/authz/authz.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '@/authn/password.service';

// Mocks
import configMock from '@mock/config.mock';
import prismaMock from '@mock/prisma.mock';

describe('AuthzService', () => {
  let service: AuthzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthzService,
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

    service = module.get<AuthzService>(AuthzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addRoleToUser', () => {
    it('should add a role to a user', async () => {
      const user = await service.addRoleToUser({ userId: '1', roleId: 1 });
      expect(user).toEqual(true);
    });
  });

  describe('removeRoleFromUser', () => {
    it('should remove a role from a user', async () => {
      const user = await service.removeRoleFromUser({ userId: '1', roleId: 1 });
      expect(user).toEqual(true);
    });
  });
});
