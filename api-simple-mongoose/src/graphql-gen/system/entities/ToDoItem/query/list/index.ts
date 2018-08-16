import ToDoItemsEdge from './ToDoItemsEdge';
import ToDoItemsConnection from './ToDoItemsConnection';
import toDoItemItems from './toDoItemItems';
import toDoItems from './toDoItems';
import ToDoItemSortOrder from './ToDoItemSortOrder';
import ToDoItemComplexFilter from './ToDoItemComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'ToDoItem.queries.list',
  items: [
    ToDoItemsEdge,
    ToDoItemsConnection,
    toDoItemItems,
    toDoItems,
    ToDoItemSortOrder,
    ToDoItemComplexFilter,
  ],
});
