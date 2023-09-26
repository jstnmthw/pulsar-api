import {
  AddRoleToUserInput,
  RemoveRoleFromUserInput,
} from '@/authz/dto/userRole.input';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthzService {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async addRoleToUser(payload: AddRoleToUserInput): Promise<boolean> {
    let env = this.configService.get<string>('NODE_ENV');
    try {
      await this.prisma.userRole.create({
        data: {
          userId: payload.userId,
          roleId: payload.roleId,
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
    let env = this.configService.get<string>('NODE_ENV');
    try {
      await this.prisma.userRole.delete({
        where: {
          userId_roleId: {
            userId: payload.userId,
            roleId: payload.roleId,
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
