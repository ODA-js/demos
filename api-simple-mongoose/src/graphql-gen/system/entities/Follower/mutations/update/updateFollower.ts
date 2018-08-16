import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateFollower(input: updateFollowerInput!): updateFollowerPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        follower?: string;
        following?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateFollower');
      let payload = {
        follower: args.follower,
        following: args.following,
      };

      let result;
      let previous;
      try {
        if (args.id) {
          previous = await context.connectors.Follower.findOneById(args.id);
          result = await context.connectors.Follower.findOneByIdAndUpdate(
            args.id,
            payload,
          );
        }
      } catch (err) {
        throw err;
      }

      if (!result) {
        throw new Error('Specified item not found!');
      }

      if (context.pubsub) {
        context.pubsub.publish('Follower', {
          Follower: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      return {
        follower: result,
      };
    },
  ),
});
