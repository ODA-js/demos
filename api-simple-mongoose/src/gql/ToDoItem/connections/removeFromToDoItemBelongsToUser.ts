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
      removeFromToDoItemBelongsToUser(
        input: removeFromToDoItemBelongsToUserInput
      ): removeFromToDoItemBelongsToUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        toDoItem?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromToDoItemBelongsToUser');
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        toDoItem,
        user,
      };
      await context.connectors.ToDoItem.removeFromUser(payload);

      let source = await context.connectors.ToDoItem.findOneById(toDoItem);

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'user',
            },
          },
        });

        let dest = await context.connectors.User.findOneById(user);

        context.pubsub.publish('User', {
          User: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                toDoItem: args.toDoItem,
                user: args.user,
              },
              relation: 'todos',
            },
          },
        });
      }

      return {
        toDoItem: source,
      };
    },
  ),
});
