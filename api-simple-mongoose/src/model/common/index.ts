import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
// import { FileUploadHook } from './api-hooks/hookFileUpload';
import { LoginUserMutation } from './mutations/login.resolver';
import { LodashModule } from 'oda-lodash';

export class CommonExtends extends common.types.GQLModule {
  protected _name = 'CommonExtends';
  protected _composite = [
    new FixupPasswordHook({}),
    // new FileUploadHook({}),
    new LoginUserMutation({}),
    new LodashModule({}),
  ];
}
