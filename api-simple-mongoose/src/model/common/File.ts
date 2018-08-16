import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as mkdirp from 'mkdirp';
import { common } from 'oda-gen-graphql';
import * as promisesAll from 'promises-all';
import * as shortid from 'shortid';
import { Mutation, Scalar, Query, Schema } from 'oda-gen-common';
import gql from 'graphql-tag';

const uploadDir = './uploads';
const db = lowdb(new FileSync('db.json'));

// Seed an empty DB
db.defaults({ uploads: [] }).write();

// Ensure upload directory exists
mkdirp.sync(uploadDir);

const storeFS = ({
  stream,
  filename,
}): Promise<{ id: string; path: string }> => {
  const id = shortid.generate();
  const path = `${uploadDir}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path })),
  );
};

const storeDB = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write();

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await (upload.rawFile
    ? upload.rawFile
    : upload);
  const { id, path } = await storeFS({ stream, filename: filename });
  return storeDB({
    id,
    filename: filename,
    mimetype,
    encoding,
    path: `http://localhost:3003/${path}`,
  });
};

export const singleUpload = new Mutation({
  schema: gql`
    type RootMutation {
      singleUpload(file: Upload!): File!
    }
  `,
  resolver: (obj, { file }) => processUpload(file),
});

export const multipleUpload = new Mutation({
  schema: gql`
    type RootMutation {
      multipleUpload(files: [Upload!]!): [File!]!
    }
  `,
  resolver: async (obj, { files }) => {
    const { resolve, reject } = await promisesAll.all(files.map(processUpload));
    if (reject.length)
      reject.forEach(({ name, message }) =>
        // eslint-disable-next-line no-console
        console.error(`${name}: ${message}`),
      );

    return resolve;
  },
});

export const uploads = new Query({
  schema: gql`
    type RootQuery {
      uploads: [File]
    }
  `,
  resolver: () => db.get('uploads').value(),
});

export const UploadScalar = new Scalar({
  schema: gql`
    scalar Upload
  `,
  resolver: {
    parseLiteral: () => {
      throw new Error('Upload scalar literal unsupported');
    },
    serialize: () => {
      throw new Error('Upload scalar literal unsupported');
    },
    parseValue: value => value,
  },
});

export default new Schema({
  name: 'FileUpload.schema',
  items: [UploadScalar, uploads, multipleUpload, singleUpload],
});
