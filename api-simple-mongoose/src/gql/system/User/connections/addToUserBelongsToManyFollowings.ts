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
      addToUserBelongsToManyFollowings(
        input: addToUserBelongsToManyFollowingsInput
      ): addToUserBelongsToManyFollowingsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        user?: string;
        userFollowings?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToUserBelongsToManyFollowings');
      let { id: user } = args.user;
      let { id: userFollowings } = args.userFollowings;
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
              relation: 'followings',
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
