import toDoItems from './toDoItems';
import { Schema } from '../../../common';

export default new Schema({
  name: 'ToDoItem.queries.list',
  items: [toDoItems],
});
