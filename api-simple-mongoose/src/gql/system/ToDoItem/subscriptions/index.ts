import ToDoItem from './ToDoItem';
import UpdateToDoItemSubscriptionPayload from './UpdateToDoItemSubscriptionPayload';
import ToDoItemSubscription from './ToDoItemSubscription';
import ToDoItemBelongsToUserArgsSubscriptionPayload from './ToDoItemBelongsToUserArgsSubscriptionPayload';
import ToDoItemBelongsToUserSubscriptionPayload from './ToDoItemBelongsToUserSubscriptionPayload';
import ToDoItemSubscriptionPayload from './ToDoItemSubscriptionPayload';
import { Schema } from '../../common';

export default new Schema({
  name: 'ToDoItem.subscriptions',
  items: [
    ToDoItem,
    UpdateToDoItemSubscriptionPayload,
    ToDoItemSubscription,
    ToDoItemBelongsToUserArgsSubscriptionPayload,
    ToDoItemBelongsToUserSubscriptionPayload,
    ToDoItemSubscriptionPayload,
  ],
});
