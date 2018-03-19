import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
// import { UserTenantProfileTypeExtention } from './entities/UserTenatnProfile';
import { LoginUserMutation } from './mutations/login.resolver';
import { LodashModule } from 'oda-lodash';
import { User } from './User';

export class CommonExtends extends common.types.GQLModule {
  protected _name = 'CommonExtends';
  protected _composite = [
    new FixupPasswordHook({}),
    new LoginUserMutation({}),
    new LodashModule({}),
    // new User({}),
  ];
}
