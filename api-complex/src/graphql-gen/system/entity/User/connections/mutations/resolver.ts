import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:User');

import {
  fromGlobalId,
  toGlobalId,
} from 'oda-api-graphql';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToUserHasManyTodos: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        toDoItem?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToUserHasManyTodos');
      let { id: user } = fromGlobalId(args.user);
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let payload = {
        user,
        toDoItem,
      };

      await context.connectors.User.addToTodos(payload);

      let source = await context.connectors.User.findOneById(user);

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                user: args.user,
                toDoItem: args.toDoItem,
              },
              relation: 'todos'
            }
          }
        });
      
      }
      return {
        user: source,
      };
    }),

  removeFromUserHasManyTodos: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        toDoItem?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromUserHasManyTodos');
      let { id: user } = fromGlobalId(args.user);
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let payload = {
        user,
        toDoItem,
      };
      await context.connectors.User.removeFromTodos(payload);

      let source = await context.connectors.User.findOneById(user);

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                user: args.user,
                toDoItem: args.toDoItem,
              },
              relation: 'todos'
            }
          }
        });

      
    }

    return {
      user: source,
    };
  }),

};
