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
      if (obj.id || obj.userName || obj.password || obj.isAdmin || obj.isSystem || obj.enabled || obj.updatedBy || obj.updatedAt) {
        return "UpdateUserSubscriptionPayload";
      }
      if (obj.args && obj.args.user && obj.args.toDoItem) {
        return "UserHasManyTodosSubscriptionPayload";
      }
      if (obj.args && obj.args.user && obj.args.file) {
        return "UserHasManyFilesSubscriptionPayload";
      }
      if (obj.args && obj.args.user && obj.args.userFollowings) {
        return "UserBelongsToManyFollowingsSubscriptionPayload";
      }
      if (obj.args && obj.args.user && obj.args.userFollowers) {
        return "UserBelongsToManyFollowersSubscriptionPayload";
      }
      return null;
    }
  },
  
};
