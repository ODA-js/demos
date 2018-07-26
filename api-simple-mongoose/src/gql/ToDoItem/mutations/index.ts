import create from './create';
import _delete from './delete';
import update from './update';
import embedToDoItemInput from './embedToDoItemInput';

import { Schema } from '../../common';

export default new Schema({
  name: 'ToDoItem.mutations',
  items: [create, _delete, update, embedToDoItemInput],
});
