import toDoItems from './toDoItems';
import ToDoItemComplexFilter from './ToDoItemComplexFilter';
import ToDoItemSortOrder from './ToDoItemSortOrder';
import ToDoItemsConnection from './ToDoItemsConnection';
import ToDoItemsEdge from './ToDoItemsEdge';

import { Schema } from '../../../common';
export default new Schema({
  name: 'ToDoItem.queries.list',
  items: [
    toDoItems,
    ToDoItemComplexFilter,
    ToDoItemSortOrder,
    ToDoItemsConnection,
    ToDoItemsEdge,
  ],
});
