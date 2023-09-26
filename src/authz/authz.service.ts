import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthzService {
  constructor(private readonly prisma: PrismaService) {}

  async addRoleToUser(userId: string, roleId: number): Promise<void> {
    await this.prisma.userRole.create({
      data: {
        userId: userId,
        roleId: roleId,
      },
    });
  }

  async removeRoleFromUser(userId: string, roleId: number): Promise<void> {
    await this.prisma.userRole.delete({
      where: {
        userId_roleId: {
          userId: userId,
          roleId: roleId,
        },
      },
    });
  }
}
