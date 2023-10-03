import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { AuthzService } from '@/authz/authz.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from '@/authn/password.service';
import { ConfigService } from '@nestjs/config';

describe('AuthzService', () => {
  let authzService: AuthzService;
  let prismaService: PrismaService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthzService,
        PasswordService,
        JwtService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    authzService = module.get<AuthzService>(AuthzService);
    prismaService = module.get<PrismaService>(PrismaService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(authzService).toBeDefined();
  });

  describe('addRoleToUser', () => {
    it('should add a role to a user', async () => {
      const response = await authzService.addRoleToUser({
        userId: '1',
        roleId: 1,
      });
      expect(response).toEqual(true);
    });

    it('should return false in production', async () => {
      (configService.get as jest.Mock).mockReturnValue('production');
      jest
        .spyOn(prismaService.user, 'update')
        .mockRejectedValueOnce(new Error());

      const res = await authzService.removeRoleFromUser({
        userId: '1',
        roleId: 1,
      });

      expect(res).toEqual(false);
    });

    it('should throw an error in development', async () => {
      (configService.get as jest.Mock).mockReturnValue('development');
      jest
        .spyOn(prismaService.user, 'update')
        .mockRejectedValueOnce(new Error());

      try {
        await authzService.removeRoleFromUser({
          userId: '1',
          roleId: 1,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('removeRoleFromUser', () => {
    it('should remove a role from a user', async () => {
      const user = await authzService.removeRoleFromUser({
        userId: '1',
        roleId: 1,
      });
      expect(user).toEqual(true);
    });

    it('should return false in production', async () => {
      jest
        .spyOn(prismaService.user, 'update')
        .mockRejectedValueOnce(new Error());

      try {
        await authzService.addRoleToUser({
          userId: '1',
          roleId: 1,
        });
      } catch (error) {
        expect(Error).toBe(Error);
      }
    });

    it('should throw an error in development', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('production');
      jest.spyOn(prismaService.user, 'update').mockRejectedValue(new Error());

      try {
        await authzService.addRoleToUser({
          userId: '1',
          roleId: 1,
        });
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
