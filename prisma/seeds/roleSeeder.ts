import { Prisma, PrismaClient } from '@prisma/client';
import { Action } from './permissionSeeder';

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
            action: Action.Read,
            subject: 'User',
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
            subject: 'all',
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
