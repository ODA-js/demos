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
      Follower(filter: FollowerFilterSubscriptions): FollowerSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Follower'),
        ({ Follower }, args, context, info) => {
          let allow = context.connectors.Follower.secure('read', {
            source: Follower.node,
          });
          if (allow) {
            return filterIt(Follower, context.queryCheck);
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
