import { Prisma, PrismaClient } from '@prisma/client';

export async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.deleteMany();

  console.log('Seeding roles...');

  // Create roles
  const rolesData: Prisma.RoleCreateInput[] = [
    {
      name: 'User',
      description: 'Default role for all users',
      createdAt: new Date(),
      permissions: {
        create: [
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
      },
    },
    {
      name: 'Admin',
      description: 'Admin role allows to manage all resources',
      createdAt: new Date(),
      permissions: {
        create: [
          {
            action: Action.Manage,
            subject: 'Admin',
            createdAt: new Date(),
            description: 'Manage role',
          },
        ],
      },
    },
  ];

  try {
    await Promise.all(
      // Map each role to the promise returned by prisma.role.create
      rolesData.map((role) => prisma.role.create({ data: role })),
    );
  } catch (error) {
    console.error(error);
  }

  console.log('Done.');
}

export enum Action {
  Manage = 'MANAGE',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}
