import {
  AddRoleToUserInput,
  RemoveRoleFromUserInput,
} from '@/authz/dto/userRole.input';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { accessibleBy } from '@casl/prisma';
import { createAbility } from '@/casl/casl-ability.factory/casl-ability.factory';

@Injectable()
export class AuthzService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async addRoleToUser(payload: AddRoleToUserInput): Promise<boolean> {
    const env = this.configService.get<string>('NODE_ENV');
    const ability = await createAbility(payload.userId);
    try {
      await this.prisma.role.update({
        where: {
          AND: [
            accessibleBy(ability).Role,
            {
              id: payload.roleId,
            },
          ],
        } as Prisma.RoleWhereUniqueInput,
        data: {
          users: {
            connect: {
              id: payload.userId,
            },
          },
        },
      });
      return true;
    } catch (e) {
      if (env !== 'production') {
        throw new Error(e);
      }
      return false;
    }
  }

  async removeRoleFromUser(payload: RemoveRoleFromUserInput): Promise<boolean> {
    const env = this.configService.get<string>('NODE_ENV');
    try {
      await this.prisma.user.update({
        where: { id: payload.userId },
        data: {
          roles: {
            disconnect: {
              id: payload.roleId,
            },
          },
        },
      });
      return true;
    } catch (e) {
      if (env !== 'production') {
        throw new Error(e);
      }
      return false;
    }
  }
}
