import { Schema } from '../../../../common';
import createToDoItem from './createToDoItem';
import createToDoItemInput from './createToDoItemInput';
import createToDoItemPayload from './createToDoItemPayload';

export default new Schema({
  name: 'ToDoItem.mutation.create',
  items: [createToDoItem, createToDoItemInput, createToDoItemPayload],
});
