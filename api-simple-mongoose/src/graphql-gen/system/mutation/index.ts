import { common } from 'oda-gen-graphql';

import { LoginUserMutation } from './loginUser';

export class SystemMutations extends common.types.GQLModule {
  protected _name = 'SystemMutations';
  protected _composite = [new LoginUserMutation({})];
}
