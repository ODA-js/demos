import { Schema } from '../../../../common';
import updateFile from './updateFile';
import updateFileInput from './updateFileInput';
import updateFilePayload from './updateFilePayload';

export default new Schema({
  name: 'File.mutation.update',
  items: [updateFile, updateFileInput, updateFilePayload],
});
