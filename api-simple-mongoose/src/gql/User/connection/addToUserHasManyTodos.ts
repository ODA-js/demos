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
      addToUserHasManyTodos(
        input: addToUserHasManyTodosInput
      ): addToUserHasManyTodosPayload
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
      logger.trace('addToUserHasManyTodos');
      let { id: user } = fromGlobalId(args.user);
      let { id: toDoItem } = fromGlobalId(args.toDoItem);
      let payload = {
        user,
        toDoItem,
      };

      await context.connectors.User.addToTodos(payload);

      let source = await context.connectors.User.findOneById(user);

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'LINK',
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
