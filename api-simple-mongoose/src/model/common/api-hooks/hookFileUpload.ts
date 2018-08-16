import { common } from 'oda-gen-graphql';
import { passport } from 'oda-api-common';
import gql from 'graphql-tag';
import { Schema } from 'oda-gen-common';

const FileUpload = target => async (
  root: any,
  args: any,
  context: any,
  info: any,
) => {
  //сохранить файл и передать ссылку на него в description...
  if (args.input.file) {
    console.log('HOOKED, ', args);
    const upload = await context.userGQL({
      query: gql`
        mutation upload($files: [Upload!]!) {
          files: upload(files: $files) {
            id
            path
            filename
            mimetype
            encoding
          }
        }
      `,
      variables: { files: [args.input.file] },
    });
    debugger;
    args =
      upload.data && upload.data.files
        ? {
            ...args,
            input: {
              ...args.input,
              description: JSON.stringify(upload.data.files),
            },
          }
        : args;
  }

  return target(root, args, context, info);
};

export default new Schema({
  name: 'FileUpload.hook',
  hooks: [
    {
      'RootMutation.createUser': FileUpload,
      'RootMutation.updateUser': FileUpload,
    },
  ],
});
