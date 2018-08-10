import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createFollower(input: createFollowerInput!): createFollowerPayload
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
      logger.trace('createFollower');
      let create: any = {
        follower: args.follower,
        following: args.following,
      };

      if (args.id) {
        create.id = args.id;
      }

      let result = await context.connectors.Follower.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Follower', {
          Follower: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let followerEdge = {
        cursor: result.id,
        node: result,
      };

      return {
        follower: followerEdge,
      };
    },
  ),
});
