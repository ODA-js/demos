import { common } from 'oda-gen-graphql';
import { FixupPasswordHook } from './api-hooks/fixupPassword';
import { FileUploadHook, ToDoItemHook } from './api-hooks/hookFileUpload';
// import { UserTenantProfileTypeExtention } from './entities/UserTenatnProfile';
import { LoginUserMutation } from './mutations/login.resolver';
import { LodashModule } from 'oda-lodash';
import { FileType } from './File';

export class CommonExtends extends common.types.GQLModule {
  protected _name = 'CommonExtends';
  protected _composite = [
    new FixupPasswordHook({}),
    new FileUploadHook({}),
    new ToDoItemHook({}),
    new LoginUserMutation({}),
    new LodashModule({}),
    new FileType({}),
  ];
}
