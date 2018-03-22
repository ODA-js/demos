import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
// import { UserTenantProfileTypeExtention } from './entities/UserTenatnProfile';
import { LoginUserMutation } from './mutations/login.resolver';
import { RegisterUserMutation } from './registerUserMutation';
import { ACL } from './_acl';

export class CommonExtends extends common.types.GQLModule {
  protected _extend = [
    new ACL({}),
    new FixupPasswordHook({}),
    new RegisterUserMutation({}),
    new LoginUserMutation({}),
  ];
}
