import ToDoItem from './ToDoItem';
import ToDoItemBelongsToUserArgsSubscriptionPayload from './ToDoItemBelongsToUserArgsSubscriptionPayload';
import ToDoItemBelongsToUserSubscriptionPayload from './ToDoItemBelongsToUserSubscriptionPayload';
import ToDoItemFilterSubscriptions from './ToDoItemFilterSubscriptions';
import ToDoItemFilterSubscriptionsItem from './ToDoItemFilterSubscriptionsItem';
import ToDoItemSubscription from './ToDoItemSubscription';
import ToDoItemSubscriptionPayload from './ToDoItemSubscriptionPayload';
import UpdateToDoItemSubscriptionPayload from './UpdateToDoItemSubscriptionPayload';

import { Schema } from '../../common';

export default new Schema({
  name: 'ToDoItem.subscriptions',
  items: [
    ToDoItem,
    ToDoItemBelongsToUserArgsSubscriptionPayload,
    ToDoItemBelongsToUserSubscriptionPayload,
    ToDoItemFilterSubscriptions,
    ToDoItemFilterSubscriptionsItem,
    ToDoItemSubscription,
    ToDoItemSubscriptionPayload,
    UpdateToDoItemSubscriptionPayload,
  ],
});
