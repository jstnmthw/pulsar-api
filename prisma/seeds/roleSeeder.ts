import { PermissionAction, Prisma, PrismaClient } from '@prisma/client';

export async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.deleteMany();

  console.log('Seeding roles...');

  const userPermissions = await prisma.permission.findMany({
    where: {
      subject: 'user',
      NOT: {
        action: PermissionAction.MANAGE,
      },
    },
  });

  const adminPermissions = await prisma.permission.findMany({
    where: {
      subject: 'user',
      action: PermissionAction.MANAGE,
    },
  });

  const adminRolePermissions = await prisma.permission.findMany({
    where: {
      subject: 'role',
      action: PermissionAction.MANAGE,
    },
  });

  const adminPermissionPermissions = await prisma.permission.findMany({
    where: {
      subject: 'permission',
      action: PermissionAction.MANAGE,
    },
  });

  // Create roles
  const roles: Prisma.RoleCreateInput[] = [
    {
      name: 'User',
      description: 'Default role for all users',
      createdAt: new Date(),
      permissions: {
        connect: userPermissions,
      },
    },
    {
      name: 'Admin',
      description: 'Admin role for managing all resources',
      createdAt: new Date(),
      permissions: {
        connect: [
          ...adminPermissions,
          ...adminRolePermissions,
          ...adminPermissionPermissions,
        ],
      },
    },
  ];

  try {
    await Promise.all(roles.map((role) => prisma.role.create({ data: role })));
  } catch (error) {
    console.error(error);
  }

  console.log('Done.');
}
