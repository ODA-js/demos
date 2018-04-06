import { common } from 'oda-gen-graphql';
import { passport } from 'oda-api-common';

const FileUpload = (target) => async (root: any, args: object, context: any, info: any) => {
  console.log('HOOKED, ', args);
  return target(root, args, context, info);
};

export class ToDoItemHook extends common.types.GQLModule {
  protected _name = 'ToDoItem';
  protected _mutationEntry = {
    'mutationEntry': [`
      createToDoItem(input: createToDoItemInput!, files:[Upload]): createToDoItemPayload
      updateToDoItem(input: updateToDoItemInput!, files:[Upload]): updateToDoItemPayload
      deleteToDoItem(input: deleteToDoItemInput!): deleteToDoItemPayload`
    ],
  }
}

export class FileUploadHook extends common.types.GQLModule {
  protected _name = 'FileUploadHook';
  protected _hooks = [
    {
      'RootMutation.createToDoItem': FileUpload,
      'RootMutation.updateToDoItem': FileUpload,
    },
  ];
}
