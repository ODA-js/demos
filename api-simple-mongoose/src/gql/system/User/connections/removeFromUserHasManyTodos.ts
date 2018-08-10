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
      removeFromUserHasManyTodos(
        input: removeFromUserHasManyTodosInput
      ): removeFromUserHasManyTodosPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        user?: string;
        toDoItem?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromUserHasManyTodos');
      let { id: user } = args.user;
      let { id: toDoItem } = args.toDoItem;
      let payload = {
        user,
        toDoItem,
      };
      await context.connectors.User.removeFromTodos(payload);

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
                toDoItem: args.toDoItem,
              },
              relation: 'todos',
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
