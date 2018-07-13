import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:File');

import { fromGlobalId, toGlobalId } from 'oda-isomorfic';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToFileBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        file?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToFileBelongsToUser');
      let { id: file } = fromGlobalId(args.file);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        file,
        user,
      };

      await context.connectors.File.addToUser(payload);

      let source = await context.connectors.File.findOneById(file);

      if (context.pubsub) {
        context.pubsub.publish('File', {
          File: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                file: args.file,
                user: args.user,
              },
              relation: 'user',
            },
          },
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
                file: args.file,
                user: args.user,
              },
              relation: 'files',
            },
          },
        });
      }
      return {
        file: source,
      };
    },
  ),

  removeFromFileBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        file?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromFileBelongsToUser');
      let { id: file } = fromGlobalId(args.file);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        file,
        user,
      };
      await context.connectors.File.removeFromUser(payload);

      let source = await context.connectors.File.findOneById(file);

      if (context.pubsub) {
        context.pubsub.publish('File', {
          File: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                file: args.file,
                user: args.user,
              },
              relation: 'user',
            },
          },
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
                file: args.file,
                user: args.user,
              },
              relation: 'files',
            },
          },
        });
      }

      return {
        file: source,
      };
    },
  ),
};