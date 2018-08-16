import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkFileFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteFile(input: deleteFileInput!): deleteFilePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        path?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteFile');
      let result;
      try {
        if (args.id) {
          await unlinkFileFromAll(
            [
              {
                key: 'id',
                type: 'ID',
                value: args.id,
              },
            ],
            context,
          );

          result = await context.connectors.File.findOneByIdAndRemove(args.id);
        } else if (args.path) {
          await unlinkFileFromAll(
            [
              {
                key: 'path',
                type: 'String',
                value: args.path,
              },
            ],
            context,
          );

          result = await context.connectors.File.findOneByPathAndRemove(
            args.path,
          );
        }
      } catch (err) {
        throw err;
      }

      if (!result) {
        throw new Error('Specified item not found!');
      }

      if (context.pubsub) {
        context.pubsub.publish('File', {
          File: {
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
        file: result,
      };
    },
  ),
});
