import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
  toGlobalId,
  idToCursor,
  unlinkUserFromAll,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteUser(input: deleteUserInput!): deleteUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        userName?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteUser');
      let result;
      try {
        if (args.id) {
          await unlinkUserFromAll(
            [
              {
                key: 'id',
                type: 'ID',
                value: args.id,
              },
            ],
            context,
          );

          result = await context.connectors.User.findOneByIdAndRemove(
            fromGlobalId(args.id).id,
          );
        } else if (args.userName) {
          await unlinkUserFromAll(
            [
              {
                key: 'userName',
                type: 'String',
                value: args.userName,
              },
            ],
            context,
          );

          result = await context.connectors.User.findOneByUserNameAndRemove(
            args.userName,
          );
        }
      } catch (err) {
        throw err;
      }

      if (!result) {
        throw new Error('Specified item not found!');
      }

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'DELETE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      return {
        deletedItemId: toGlobalId('User', result.id),
        user: result,
      };
    },
  ),
});
