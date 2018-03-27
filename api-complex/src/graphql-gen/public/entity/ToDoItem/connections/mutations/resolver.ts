import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:ToDoItem');

import {
  fromGlobalId,
  toGlobalId,
} from 'oda-api-graphql';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToToDoItemBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        toDoItem?: string,
        user?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToToDoItemBelongsToUser');
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        toDoItem,
        user,
      };

      await context.connectors.ToDoItem.addToUser(payload);

      let source = await context.connectors.ToDoItem.findOneById(toDoItem);

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'user'
            }
          }
        });
      
        let dest = await context.connectors.User.findOneById(user);

        context.pubsub.publish('User', {
          User: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'todos'
            }
          }
        });
      
      }
      return {
        toDoItem: source,
      };
    }),

  removeFromToDoItemBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        toDoItem?: string,
        user?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromToDoItemBelongsToUser');
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        toDoItem,
        user,
      };
      await context.connectors.ToDoItem.removeFromUser(payload);

      let source = await context.connectors.ToDoItem.findOneById(toDoItem);

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'user'
            }
          }
        });

      
        let dest = await context.connectors.User.findOneById(user);

        context.pubsub.publish('User', {
          User: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'todos'
            }
          }
        });
      
    }

    return {
      toDoItem: source,
    };
  }),

};
