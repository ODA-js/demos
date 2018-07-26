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
      removeFromUserBelongsToManyFollowers(
        input: removeFromUserBelongsToManyFollowersInput
      ): removeFromUserBelongsToManyFollowersPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        user?: string;
        userFollowers?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
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
              relation: 'followers',
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
