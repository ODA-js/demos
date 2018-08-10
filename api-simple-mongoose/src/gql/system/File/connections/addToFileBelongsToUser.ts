import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      addToFileBelongsToUser(
        input: addToFileBelongsToUserInput
      ): addToFileBelongsToUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        file?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToFileBelongsToUser');
      let { id: file } = args.file;
      let { id: user } = args.user;
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
});
