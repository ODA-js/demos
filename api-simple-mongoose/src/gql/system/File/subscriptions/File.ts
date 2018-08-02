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
      File(filter: FileFilterSubscriptions): FileSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('File'),
        ({ File }, args, context, info) => {
          let allow = context.connectors.File.secure('read', {
            source: File.node,
          });
          if (allow) {
            return filterIt(File, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: '_id',
        user: 'user',
      },
    ),
  },
});
