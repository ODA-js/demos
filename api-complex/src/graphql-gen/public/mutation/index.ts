import { common } from 'oda-gen-graphql';

import { LoginUserMutation } from './loginUser';

export class PublicMutations extends common.types.GQLModule {
  protected _name = 'PublicMutations';
  protected _composite = [
    new LoginUserMutation({}),
  ];
}
