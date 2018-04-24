import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as mkdirp from 'mkdirp';
import { common } from 'oda-gen-graphql';
import * as promisesAll from 'promises-all';
import * as shortid from 'shortid';

const uploadDir = './uploads'
const db = lowdb(new FileSync('db.json'))

// Seed an empty DB
db.defaults({ uploads: [] }).write()

// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeFS = ({ stream, filename }): Promise<{ id: string; path: string }> => {
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
}

const storeDB = file =>
  db
    .get('uploads')
    .push(file)
    .last()
    .write()

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await (upload.rawFile ? upload.rawFile : upload)
  const { id, path } = await storeFS({ stream, filename: filename })
  return storeDB({ id, filename: filename, mimetype, encoding, path: `http://localhost:3003/${path}` })
}

export class FileType extends common.types.GQLModule {
  protected _name = 'FileType'

  protected _typeDef = {
    entry: [`
      scalar Upload
  `],
  }
  protected _resolver: { [key: string]: any } = {
    Upload: {
      __parseLiteral: () => {
        throw new Error('Upload scalar literal unsupported')
      },
      __serialize: () => {
        throw new Error('Upload scalar literal unsupported')
      },
      __parseValue: value => value,
    }
  }

  protected _queryEntry = {
    entry: [`
      uploads: [File]
    `]
  }
  protected _mutationEntry = {
    entry: [`
      singleUpload (file: Upload!): File!
      multipleUpload (files: [Upload!]!): [File!]!
    `],
  }

  protected _mutation = {
    singleUpload: (obj, { file }) => processUpload(file),
    multipleUpload: async (obj, { files }) => {
      const { resolve, reject } = await promisesAll.all(
        files.map(processUpload)
      )

      if (reject.length)
        reject.forEach(({ name, message }) =>
          // eslint-disable-next-line no-console
          console.error(`${name}: ${message}`)
        )

      return resolve
    }
  }
  protected _query = {
    uploads: () => db.get('uploads').value()
  }
}

