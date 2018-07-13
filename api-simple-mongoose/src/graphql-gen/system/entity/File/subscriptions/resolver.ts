import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:File');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  File: {
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
};

export const resolver = {
  FileSubscriptionPayload: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.path || obj.filename || obj.mimetype || obj.encoding) {
        return 'UpdateFileSubscriptionPayload';
      }
      if (obj.args && obj.args.file && obj.args.user) {
        return 'FileBelongsToUserSubscriptionPayload';
      }
      return null;
    },
  },
};
