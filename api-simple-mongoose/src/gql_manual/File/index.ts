import { Type, mutateAndGetPayload, Schema, Scalar } from '../common';
import gql from 'graphql-tag';
import { Mutation } from '../typedef';
import * as promisesAll from 'promises-all';
import * as config from 'config';
import * as shortid from 'shortid';
import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const uploadDir = config.get<string>('upload');

const getFileInfo = (filename, uploadDir) => {
  const id = shortid.generate();
  return {
    id,
    path: `${uploadDir}/${id}-${filename}`,
  };
};

const storeFS = ({
  stream,
  filename,
}): Promise<{ id: string; path: string }> => {
  const file = getFileInfo(filename, uploadDir);
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(file.path);
        reject(error);
      })
      .pipe(fs.createWriteStream(file.path))
      .on('error', error => reject(error))
      .on('finish', () => resolve(file)),
  );
};

const processUpload = async (upload, context) => {
  const { stream, filename, mimetype, encoding } = await (upload.rawFile
    ? upload.rawFile
    : upload);
  const { path } = await storeFS({ stream, filename });
  const result = await context.userGQL({
    query: gql`
      mutation createFile($file: createFileInput!) {
        file: createFile(input: $file) @_(get: file) {
          file @_(get: node) {
            node {
              path
              filename
              mimetype
              encoding
              id
            }
          }
        }
      }
    `,
    variables: {
      file: {
        filename,
        mimetype,
        encoding,
        path,
      },
    },
  });
  if (result.data) {
    return result.data.file;
  } else {
    if (result.errors) {
      throw result.errors;
    }
  }
};

export const upload = new Mutation({
  schema: gql`
    type TempFile {
      id: ID!
      path: String!
      filename: String!
      mimetype: String!
      encoding: String
    }

    extend type RootMutation {
      upload(files: [Upload!]!): [TempFile!]!
    }
  `,
  resolver: async (_, { files }, context) => {
    const { resolve, reject } = await promisesAll.all(
      files.map(upload => processUpload(upload, context)),
    );
    if (reject.length)
      reject.forEach(({ name, message }) =>
        // eslint-disable-next-line no-console
        console.error(`${name}: ${message}`),
      );
    return resolve;
  },
});

export const uploadScalar = new Scalar({
  schema: gql`
    scalar Upload
  `,
  resolver: {
    parseValue: input => input,
  },
});

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
      variables: { files: args.input.file },
    });
    args =
      upload.data && upload.data.files
        ? {
            ...args,
            input: {
              ...args.input,
              file: upload.data.files[0],
              description: JSON.stringify(upload.data.files),
            },
          }
        : args;
  }

  return target(root, args, context, info);
};

export default new Schema({
  name: 'uploadFile',
  items: [upload, uploadScalar],
  hooks: [
    {
      'RootMutation.createToDoItem': FileUpload,
      'RootMutation.updateToDoItem': FileUpload,
    },
  ],
});
