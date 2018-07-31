import {
  ModelType,
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
} from '../../common';
import gql from 'graphql-tag';

export default new Mutation({
  type: ModelType.mutation,
  schema: gql`
    extend type RootMutation {
      addToToDoItemBelongsToUser(
        input: addToToDoItemBelongsToUserInput
      ): addToToDoItemBelongsToUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        toDoItem?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
    ) => {
      logger.trace('addToToDoItemBelongsToUser');
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        toDoItem,
        user,
      };

      await context.connectors.ToDoItem.addToUser(payload);

      let source = await context.connectors.ToDoItem.findOneById(toDoItem);

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'LINK',
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
            mutation: 'LINK',
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