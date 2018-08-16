import { Schema } from 'oda-gen-common';
import passwordHook from './api-hooks/fixupPassword';
import fileUpload from './api-hooks/hookFileUpload';
import { LodashSchema } from 'oda-lodash';

export default new Schema({
  name: 'common.overrides',
  items: [passwordHook, fileUpload, LodashSchema],
});
