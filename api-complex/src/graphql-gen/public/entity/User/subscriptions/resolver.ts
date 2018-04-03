import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:User');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  User: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('User'), ({ User }, args, context, info) => {
      let allow = context.connectors.User.secure('read', { source: User.node });
      if (allow) {
        return filterIt(User, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
    }),
  },
};

export const resolver = {
  
  UserSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.userName) {
        return "UpdateUserSubscriptionPayload";
      }
      if (obj.args && obj.args.user && obj.args.toDoItem) {
        return "UserHasManyTodosSubscriptionPayload";
      }
      return null;
    }
  },
  
};
