import {
  PureAbility,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { User } from '@/users/models/user.model';
import { Injectable } from '@nestjs/common';

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      PureAbility<[Action, Subjects]>
    >(PureAbility as AbilityClass<AppAbility>);

    // user.roles;

    can(Action.Update, User, { id: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

export enum Action {
  // Manage = 'manage',
  // Create = 'create',
  // Read = 'read',
  Update = 'update',
  // Delete = 'delete',
}
