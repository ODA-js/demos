import ToDoItemsEdge from './ToDoItemsEdge';
import ToDoItemsConnection from './ToDoItemsConnection';
import allToDoItems from './allToDoItems';
import toDoItems from './toDoItems';
import ToDoItemSortOrder from './ToDoItemSortOrder';
import ToDoItemComplexFilter from './ToDoItemComplexFilter';
import { Schema } from '../../../common';
export default new Schema({
  name: 'ToDoItem.queries.list',
  items: [
    ToDoItemsEdge,
    ToDoItemsConnection,
    allToDoItems,
    toDoItems,
    ToDoItemSortOrder,
    ToDoItemComplexFilter,
  ],
});
