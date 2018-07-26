import create from './create';
import _delete from './delete';
import update from './update';
import embedFileInput from './embedFileInput';

import { Schema } from '../../common';

export default new Schema({
  name: 'File.mutations',
  items: [create, _delete, update, embedFileInput],
});
