import { PrismaClient } from '@prisma/client';

export enum Action {
  Manage = 'MANAGE',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export async function permissionSeeder(prisma: PrismaClient) {
  await prisma.permission.deleteMany();

  console.log('Seeding permission...');

  await prisma.permission.createMany({
    data: [
      {
        action: Action.Manage,
        subject: 'User',
      },
      {
        action: Action.Create,
        subject: 'User',
      },
      {
        action: Action.Read,
        subject: 'User',
      },
      {
        action: Action.Update,
        subject: 'User',
      },
      {
        action: Action.Delete,
        subject: 'User',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding permission completed!');
}
