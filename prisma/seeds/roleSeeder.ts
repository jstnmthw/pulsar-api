import { PermissionAction, Prisma, PrismaClient } from '@prisma/client';

export async function roleSeeder(prisma: PrismaClient) {
  await prisma.role.deleteMany();

  console.log('Seeding roles...');

  const crudPermissions = await prisma.permission.findMany({
    where: {
      subject: 'user',
      NOT: {
        action: PermissionAction.MANAGE,
      },
    },
  });

  const managePermissions = await prisma.permission.findMany({
    where: {
      subject: 'user',
      action: PermissionAction.MANAGE,
    },
  });

  // Create roles
  const rolesData: Prisma.RoleCreateInput[] = [
    {
      name: 'User',
      description: 'Default role for all users',
      createdAt: new Date(),
      permissions: {
        connect: crudPermissions,
      },
    },
    {
      name: 'Admin',
      description: 'Admin role for managing all resources',
      createdAt: new Date(),
      permissions: {
        connect: managePermissions,
      },
    },
  ];

  try {
    await Promise.all(
      rolesData.map((role) => prisma.role.create({ data: role })),
    );
  } catch (error) {
    console.error(error);
  }

  console.log('Done.');
}
