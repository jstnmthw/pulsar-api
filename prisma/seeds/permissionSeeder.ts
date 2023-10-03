import { PrismaClient } from '@prisma/client';

export async function permissionSeeder(prisma: PrismaClient) {
  await prisma.permission.deleteMany();

  console.log('Seeding permissions...');

  const permissions = getPermissions();

  // console.log(permissions);
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
      const permission = Permissions[`${perms}${subject}`];
      const action = PermissionAction[perms];
      if (permission) {
        permissions.push({
          action,
          subject,
          description: permission.description,
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
const Permissions = {
  // User
  ManageUser: {
    description: 'Manages all user resources',
    condition: '',
  },
  CreateUser: {
    description: 'Create user',
    condition: '',
  },
  ReadUser: {
    description: 'Read user',
    condition: '',
  },
  UpdateUser: {
    description: 'Update user',
    condition: '',
  },
  DeleteUser: {
    description: 'Delete user',
    condition: '',
  },

  // Role
  ManageRole: {
    description: 'Manages all role resources',
    condition: '',
  },
  CreateRole: {
    description: 'Create role',
    condition: '',
  },
  ReadRole: {
    description: 'Read role',
    condition: '',
  },
  UpdateRole: {
    description: 'Update role',
    condition: '',
  },
  DeleteRole: {
    description: 'Delete role',
    condition: '',
  },

  // Permission
  ManagePermission: {
    description: 'Manages all permission resources',
    condition: '',
  },
  CreatePermission: {
    description: 'Create permission',
    condition: '',
  },
  ReadPermission: {
    description: 'Read permission',
    condition: '',
  },
  UpdatePermission: {
    description: 'Update permission',
    condition: '',
  },
  DeletePermission: {
    description: 'Delete permission',
    condition: '',
  },
};
