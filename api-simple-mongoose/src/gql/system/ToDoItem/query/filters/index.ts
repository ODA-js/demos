import EmbedToDoItemFilter from './EmbedToDoItemFilter';
import EmbedToDoItemFilterItem from './EmbedToDoItemFilterItem';
import ToDoItemFilter from './ToDoItemFilter';
import ToDoItemFilterItem from './ToDoItemFilterItem';
import ToDoItemFilterSubscriptions from './ToDoItemFilterSubscriptions';
import ToDoItemFilterSubscriptionsItem from './ToDoItemFilterSubscriptionsItem';
import { Schema } from '../../../common';

export default new Schema({
  name: 'ToDoItem.queries.filter',
  items: [
    ToDoItemFilterItem,
    ToDoItemFilter,
    ToDoItemFilterSubscriptionsItem,
    ToDoItemFilterSubscriptions,
    EmbedToDoItemFilter,
    EmbedToDoItemFilterItem,
  ],
});
