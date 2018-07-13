import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Follower');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Follower: {
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
};

export const resolver = {};
