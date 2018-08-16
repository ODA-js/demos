import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkFollowerFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteFollower(input: deleteFollowerInput!): deleteFollowerPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteFollower');
      let result;
      try {
        if (args.id) {
          await unlinkFollowerFromAll(
            [
              {
                key: 'id',
                type: 'ID',
                value: args.id,
              },
            ],
            context,
          );

          result = await context.connectors.Follower.findOneByIdAndRemove(
            args.id,
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
            mutation: 'DELETE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      return {
        deletedItemId: result.id,
        follower: result,
      };
    },
  ),
});
