import {
  Mutation,
  ModelType,
  mutateAndGetPayload,
  RegisterConnectors,
  PubSubEngine,
  logger,
  fromGlobalId,
  toGlobalId,
  unlinkToDoItemFromAll,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  type: ModelType.mutation,
  schema: gql`
    extend type RootMutation {
      deleteToDoItem(input: deleteToDoItemInput!): deleteToDoItemPayload
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
      logger.trace('deleteToDoItem');
      let result;
      try {
        if (args.id) {
          await unlinkToDoItemFromAll(
            [
              {
                key: 'id',
                type: 'ID',
                value: args.id,
              },
            ],
            context,
          );

          result = await context.connectors.ToDoItem.findOneByIdAndRemove(
            fromGlobalId(args.id).id,
          );
        }
      } catch (err) {
        throw err;
      }

      if (!result) {
        throw new Error('Specified item not found!');
      }

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'DELETE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      return {
        deletedItemId: toGlobalId('ToDoItem', result.id),
        toDoItem: result,
      };
    },
  ),
});
