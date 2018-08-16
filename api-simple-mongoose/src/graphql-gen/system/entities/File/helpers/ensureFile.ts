import gql from 'graphql-tag';

export default async function ensureFile({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  } else if (args.path) {
    fArgs = '$path: String';
    filter = 'path: $path';
    variables = {
      path: args.path,
    };
  }
  let file;
  if (filter) {
    file = await context
      .userGQL({
        query: gql`query findFile(${fArgs}){
            file(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.file);
  }

  if (!file) {
    if (create) {
      file = await context
        .userGQL({
          query: gql`
            mutation createFile($file: createFileInput!) {
              createFile(input: $file) {
                file {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            file: {
              path: args.path,
              filename: args.filename,
              mimetype: args.mimetype,
              encoding: args.encoding,
              user: args.user,
              id: args.id,
            },
          },
        })
        .then(r => r.data.createFile.file.node);
    }
  } else {
    // update
    file = await context
      .userGQL({
        query: gql`
          mutation updateFile($file: updateFileInput!) {
            updateFile(input: $file) {
              file {
                id
              }
            }
          }
        `,
        variables: {
          file: {
            path: args.path,
            filename: args.filename,
            mimetype: args.mimetype,
            encoding: args.encoding,
            user: args.user,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updateFile.file);
  }
  return file;
}
