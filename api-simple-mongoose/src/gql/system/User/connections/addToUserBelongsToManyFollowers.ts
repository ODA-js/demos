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
      addToUserBelongsToManyFollowers(
        input: addToUserBelongsToManyFollowersInput
      ): addToUserBelongsToManyFollowersPayload
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
      logger.trace('addToUserBelongsToManyFollowers');
      let { id: user } = args.user;
      let { id: userFollowers } = args.userFollowers;
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
