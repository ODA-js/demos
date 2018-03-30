import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:ToDoItem');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  ToDoItem: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('ToDoItem'), ({ ToDoItem }, args, context, info) => {
      let allow = context.connectors.ToDoItem.can('read', { source: ToDoItem.node });
      if (allow) {
        return filterIt(ToDoItem, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
      createdBy: 'createdBy',
      updateBy: 'updateBy',
    }),
  },
};

export const resolver = {
  
  ToDoItemSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.name || obj.description || obj.done || obj.dueToDate || obj.published || obj.createdAt || obj.updatedAt || obj.removed || obj.owner) {
        return "UpdateToDoItemSubscriptionPayload";
      }
      if (obj.args && obj.args.toDoItem && obj.args.user) {
        return "ToDoItemBelongsToUserSubscriptionPayload";
      }
      if (obj.args && obj.args.toDoItem && obj.args.user) {
        return "ToDoItemBelongsToCreatedBySubscriptionPayload";
      }
      if (obj.args && obj.args.toDoItem && obj.args.user) {
        return "ToDoItemBelongsToUpdateBySubscriptionPayload";
      }
      return null;
    }
  },
  
};
