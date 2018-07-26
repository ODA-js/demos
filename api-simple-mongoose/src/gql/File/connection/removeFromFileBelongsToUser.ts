import {
  ModelType,
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
} from '../../common';
import gql from 'graphql-tag';

export default new Mutation({
  type: ModelType.mutation,
  schema: gql`
    extend type RootMutation {
      removeFromFileBelongsToUser(
        input: removeFromFileBelongsToUserInput
      ): removeFromFileBelongsToUserPayload
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
});
