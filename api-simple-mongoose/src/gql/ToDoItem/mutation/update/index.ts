import { Schema } from '../../../common';
import updateToDoItem from './updateToDoItem';
import updateToDoItemInput from './updateToDoItemInput';
import updateToDoItemPayload from './updateToDoItemPayload';

export default new Schema({
  name: 'ToDoItem.mutation.update',
  items: [updateToDoItem, updateToDoItemInput, updateToDoItemPayload],
});
