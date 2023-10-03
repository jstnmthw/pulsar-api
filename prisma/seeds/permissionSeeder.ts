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

  for (const subject of Object.values(PermissionSubject)) {
    for (const perms of Object.keys(PermissionAction)) {
      const description = Permissions[`${perms}${subject}`];
      const action = PermissionAction[perms];
      if (description) {
        permissions.push({
          action,
          subject,
          description,
        });
      }
    }
  }

  return permissions;
}

// Justification: This is used dynamically in permissionSeeder.ts
// noinspection JSUnusedGlobalSymbols
export enum PermissionSubject {
  User = 'User',
  Role = 'Role',
  Permission = 'Permission',
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
enum Permissions {
  ManageUser = 'Manages all user resources',
  CreateUser = 'Create user',
  ReadUser = 'Read user',
  UpdateUser = 'Update user',
  DeleteUser = 'Delete user',
  ManageRole = 'Manages all role resources',
  CreateRole = 'Create role',
  ReadRole = 'Read role',
  UpdateRole = 'Update role',
  DeleteRole = 'Delete role',
  ManagePermission = 'Manages all permission resources',
  CreatePermission = 'Create permission',
  ReadPermission = 'Read permission',
  UpdatePermission = 'Update permission',
  DeletePermission = 'Delete permission',
}
