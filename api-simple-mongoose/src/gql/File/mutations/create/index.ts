import { Schema } from '../../../common';
import createFile from './createFile';
import createFileInput from './createFileInput';
import createFilePayload from './createFilePayload';

export default new Schema({
  name: 'File.mutation.create',
  items: [createFile, createFileInput, createFilePayload],
});
