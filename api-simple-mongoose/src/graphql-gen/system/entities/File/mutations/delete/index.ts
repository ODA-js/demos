import { Schema } from '../../../../common';
import deleteFile from './deleteFile';
import deleteFileInput from './deleteFileInput';
import deleteFilePayload from './deleteFilePayload';

export default new Schema({
  name: 'File.mutation.delete',
  items: [deleteFile, deleteFileInput, deleteFilePayload],
});
