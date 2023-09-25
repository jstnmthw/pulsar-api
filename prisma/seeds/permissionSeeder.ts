import { PrismaClient } from '@prisma/client';

export enum Action {
  Manage = 'MANAGE',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export async function permissionSeeder(prisma: PrismaClient) {
  console.log('Seeding permissions:');

  await prisma.permission.deleteMany();

  console.log('[1/2] Seeding permission for User');
  await prisma.permission.createMany({
    data: [
      {
        action: Action.Manage,
        subject: 'User',
        createdAt: new Date(),
        description: 'Manage user',
      },
      {
        action: Action.Create,
        subject: 'User',
        createdAt: new Date(),
        description: 'Create user',
      },
      {
        action: Action.Read,
        subject: 'User',
        createdAt: new Date(),
        description: 'Read user',
      },
      {
        action: Action.Update,
        subject: 'User',
        createdAt: new Date(),
        description: 'Update user',
      },
      {
        action: Action.Delete,
        subject: 'User',
        createdAt: new Date(),
        description: 'Delete user',
      },
    ],
    skipDuplicates: true,
  });

  console.log('[2/2] Seeding permission for Role');
  await prisma.permission.createMany({
    data: [
      {
        action: Action.Manage,
        subject: 'Admin',
        createdAt: new Date(),
        description: 'Manage role',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Done.');
}
