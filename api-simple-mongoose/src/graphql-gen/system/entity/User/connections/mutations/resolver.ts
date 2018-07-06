import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:User');

import {
  fromGlobalId,
  toGlobalId,
} from 'oda-isomorfic';

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

  addToUserHasManyFiles: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        file?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToUserHasManyFiles');
      let { id: user } = fromGlobalId(args.user);
      let { id: file } = fromGlobalId(args.file);
      let payload = {
        user,
        file,
      };

      await context.connectors.User.addToFiles(payload);

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
                file: args.file,
              },
              relation: 'files'
            }
          }
        });
      
      }
      return {
        user: source,
      };
    }),

  removeFromUserHasManyFiles: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        file?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromUserHasManyFiles');
      let { id: user } = fromGlobalId(args.user);
      let { id: file } = fromGlobalId(args.file);
      let payload = {
        user,
        file,
      };
      await context.connectors.User.removeFromFiles(payload);

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
                file: args.file,
              },
              relation: 'files'
            }
          }
        });

      
    }

    return {
      user: source,
    };
  }),

  addToUserBelongsToManyFollowings: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        userFollowings?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToUserBelongsToManyFollowings');
      let { id: user } = fromGlobalId(args.user);
      let { id: userFollowings } = fromGlobalId(args.userFollowings);
      let payload = {
        user,
        userFollowings,
      };

      await context.connectors.User.addToFollowings(payload);

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
                userFollowings: args.userFollowings,
              },
              relation: 'followings'
            }
          }
        });
      
      }
      return {
        user: source,
      };
    }),

  removeFromUserBelongsToManyFollowings: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        userFollowings?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromUserBelongsToManyFollowings');
      let { id: user } = fromGlobalId(args.user);
      let { id: userFollowings } = fromGlobalId(args.userFollowings);
      let payload = {
        user,
        userFollowings,
      };
      await context.connectors.User.removeFromFollowings(payload);

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
                userFollowings: args.userFollowings,
              },
              relation: 'followings'
            }
          }
        });

      
    }

    return {
      user: source,
    };
  }),

  addToUserBelongsToManyFollowers: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        userFollowers?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToUserBelongsToManyFollowers');
      let { id: user } = fromGlobalId(args.user);
      let { id: userFollowers } = fromGlobalId(args.userFollowers);
      let payload = {
        user,
        userFollowers,
      };

      await context.connectors.User.addToFollowers(payload);

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
                userFollowers: args.userFollowers,
              },
              relation: 'followers'
            }
          }
        });
      
      }
      return {
        user: source,
      };
    }),

  removeFromUserBelongsToManyFollowers: mutateAndGetPayload(
    async (
      args: {
        user?: string,
        userFollowers?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromUserBelongsToManyFollowers');
      let { id: user } = fromGlobalId(args.user);
      let { id: userFollowers } = fromGlobalId(args.userFollowers);
      let payload = {
        user,
        userFollowers,
      };
      await context.connectors.User.removeFromFollowers(payload);

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
                userFollowers: args.userFollowers,
              },
              relation: 'followers'
            }
          }
        });

      
    }

    return {
      user: source,
    };
  }),

};
