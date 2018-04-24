import { common } from 'oda-gen-graphql';
import { passport } from 'oda-api-common';

const FileUpload = (target) => async (root: any, args: object, context: any, info: any) => {
  //сохранить файл и передать ссылку на него в description...
  if (Array.isArray(args.files) && args.files.length > 0) {
    console.log('HOOKED, ', args);
    const upload = await context.userGQL({
      query: `
      mutation uploadFiles($files: [Upload!]!) {
        files:multipleUpload(files: $files){
          id
          path
          filename
          mimetype
          encoding
        }
      }
      `,
      variables: { files: args.files }
    });
    debugger;
    args = (upload.data && upload.data.files) ? {
      ...args,
      input: {
        ...args.input,
        description: JSON.stringify(upload.data.files),
      }
    } : args;
  }

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
