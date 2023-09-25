import { User } from '@prisma/client';
import { PureAbility, AbilityBuilder } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      User: User;
    }>,
  ],
  PrismaQuery
>;
const { can, cannot, build } = new AbilityBuilder<AppAbility>(
  createPrismaAbility,
);

can('read', 'User', { id: '1' });
cannot('read', 'User', { id: '2' });

const ability = build();
ability.can('read', 'User');
ability.cannot('read', 'User');
