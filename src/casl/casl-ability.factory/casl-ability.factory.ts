import { PrismaClient, User, Role, Permission } from '@prisma/client';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

const prisma = new PrismaClient();

type ResourceType = 'User' | 'Role' | 'Permission';

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
      Role: Role;
      Permission: Permission;
    }>,
  ],
  PrismaQuery
>;

async function fetchPermissions(userId: string) {
  const rolePermissions = prisma.role.findMany({
    where: { users: { some: { id: userId } } },
    include: { permissions: true },
  });

  return (await rolePermissions).flatMap((role) => role.permissions);
}

export async function buildAbilities(userId: string): Promise<AppAbility> {
  const permissions = await fetchPermissions(userId);
  const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

  permissions.forEach((permission) => {
    const { action, subject } = permission;
    can(action, subject as ResourceType);
    can('read', 'Role');
    console.log(`User ${userId} has ${action} permission on ${subject}`);
  });
  const buildR = build();
  console.log(buildR.rules);
  return buildR;
}

export async function createAbility(userId: string) {
  return await buildAbilities(userId);
}
