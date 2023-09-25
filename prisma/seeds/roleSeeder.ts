import { Prisma, PrismaClient } from '@prisma/client';
import { Action } from './permissionSeeder';

export async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.deleteMany();

  console.log('Seeding roles...');

  // Get all roles from the database to assign them to users
  const permissions = await prisma.permission.findMany();

  // Create roles
  const rolesData: Prisma.RoleCreateInput[] = [
    {
      name: 'User',
      description: 'Default role for all users',
      createdAt: new Date(),
    },
    {
      name: 'Admin',
      description: 'Admin role allows to manage all resources',
      createdAt: new Date(),
    },
  ];

  // Create in the database and store the created roles in an array
  const roles = await Promise.all(
    // Map each role to the promise returned by prisma.role.create
    rolesData.map((role) => prisma.role.create({ data: role })),
  );

  await prisma.rolePermission.createMany({
    data: [
      {
        roleId: roles.find((role) => role.name === 'User').id,
        permissionId: permissions.find(
          (permission) =>
            permission.action === Action.Read && permission.subject === 'User',
        ).id,
      },
      {
        roleId: roles.find((role) => role.name === 'Admin').id,
        permissionId: permissions.find(
          (permission) =>
            permission.action === Action.Update &&
            permission.subject === 'User',
        ).id,
      },
    ],
  });

  console.log('Done.');
}
