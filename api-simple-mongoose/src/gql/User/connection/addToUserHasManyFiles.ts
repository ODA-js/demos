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
      addToUserHasManyFiles(
        input: addToUserHasManyFilesInput
      ): addToUserHasManyFilesPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        user?: string;
        file?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
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
              relation: 'files',
            },
          },
        });
      }
      return {
        user: source,
      };
    },
  ),
});
