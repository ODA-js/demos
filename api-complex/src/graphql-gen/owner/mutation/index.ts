import { common } from 'oda-gen-graphql';

import { LoginUserMutation } from './loginUser';

export class OwnerMutations extends common.types.GQLModule {
  protected _name = 'OwnerMutations';
  protected _composite = [
    new LoginUserMutation({}),
  ];
}
