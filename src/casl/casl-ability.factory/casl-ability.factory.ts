import { PrismaClient, User } from '@prisma/client';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

const prisma = new PrismaClient();

type ResourceType = 'User' | 'Post';

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
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
    const subjectType = permission.subject.toLowerCase() as ResourceType;
    if (Object.keys(can).includes(subjectType)) {
      can(permission.action, 'User', permission.condition);
    } else {
      throw new Error('Invalid subject type');
    }
  });
  return build();
}

export async function createAbilityForUser(userId: string) {
  return await buildAbilities(userId);
}
