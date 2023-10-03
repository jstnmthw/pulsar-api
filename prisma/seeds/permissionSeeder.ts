import { PrismaClient } from '@prisma/client';

export async function permissionSeeder(prisma: PrismaClient) {
  await prisma.permission.deleteMany();

  console.log('Seeding permissions...');

  const permissions = getPermissions();

  try {
    await Promise.all(
      permissions.map((permission) =>
        prisma.permission.create({ data: permission }),
      ),
    );
  } catch (error) {
    console.error(error);
  }

  console.log('Done.');
}

function getPermissions() {
  const permissions = [];

  for (const perms of Object.keys(PermissionAction)) {
    for (const subject of Object.values(PermissionSubject)) {
      const description = PermissionDescription[`${perms}${subject}`];
      const action = PermissionAction[perms];
      if (description) {
        permissions.push({ action, subject, description });
      }
    }
  }
  return permissions;
}

export enum PermissionSubject {
  User = 'User',
}

// Justification: This is used dynamically in permissionSeeder.ts
// noinspection JSUnusedGlobalSymbols
enum PermissionAction {
  Manage = 'MANAGE',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

// Justification: This is used dynamically in permissionSeeder.ts
// noinspection JSUnusedGlobalSymbols
enum PermissionDescription {
  ManageUser = 'Manages all user resources',
  CreateUser = 'Create user',
  ReadUser = 'Read user',
  UpdateUser = 'Update user',
  DeleteUser = 'Delete user',
}
