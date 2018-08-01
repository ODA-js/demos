import EmbedToDoItemFilter from './EmbedToDoItemFilter';
import EmbedToDoItemFilterItem from './EmbedToDoItemFilterItem';
import ToDoItemFilter from './ToDoItemFilter';
import ToDoItemFilterItem from './ToDoItemFilterItem';
import { Schema } from '../../../common';

export default new Schema({
  name: 'ToDoItem.queries.filter',
  items: [
    ToDoItemFilterItem,
    ToDoItemFilter,
    EmbedToDoItemFilter,
    EmbedToDoItemFilterItem,
  ],
});
