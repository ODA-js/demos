import {
  ModelType,
  Subscription,
  Filter,
  filterIt,
  pubsub,
  withFilter,
} from '../../common';
import gql from 'graphql-tag';

export default new Subscription({
  type: ModelType.type,
  schema: gql`
    extend type RootSubscription {
      ToDoItem(filter: ToDoItemFilterSubscriptions): ToDoItemSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('ToDoItem'),
        ({ ToDoItem }, args, context, info) => {
          let allow = context.connectors.ToDoItem.secure('read', {
            source: ToDoItem.node,
          });
          if (allow) {
            return filterIt(ToDoItem, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: '_id',
      },
    ),
  },
});
