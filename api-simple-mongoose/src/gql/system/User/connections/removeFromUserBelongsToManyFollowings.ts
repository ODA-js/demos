import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
} from '../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromUserBelongsToManyFollowings(
        input: removeFromUserBelongsToManyFollowingsInput
      ): removeFromUserBelongsToManyFollowingsPayload
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
