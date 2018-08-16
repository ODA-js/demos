import { Schema } from '../../../../common';
import deleteToDoItem from './deleteToDoItem';
import deleteToDoItemInput from './deleteToDoItemInput';
import deleteToDoItemPayload from './deleteToDoItemPayload';

export default new Schema({
  name: 'ToDoItem.mutation.delete',
  items: [deleteToDoItem, deleteToDoItemInput, deleteToDoItemPayload],
});
