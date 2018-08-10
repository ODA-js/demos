import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkToDoItemToUser,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createToDoItem(input: createToDoItemInput!): createToDoItemPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        description?: string;
        done?: boolean;
        location?: object;
        file?: string;
        dueToDate?: Date;
        published?: boolean;
        updatedBy?: string;
        updatedAt?: Date;
        user?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createToDoItem');
      let create: any = {
        name: args.name,
        description: args.description,
        done: args.done,
        location: args.location,
        file: args.file,
        dueToDate: args.dueToDate,
        published: args.published,
        updatedBy: args.updatedBy,
        updatedAt: args.updatedAt,
      };

      if (args.id) {
        create.id = args.id;
      }

      let result = await context.connectors.ToDoItem.create(create);

      if (context.pubsub) {
        context.pubsub.publish('ToDoItem', {
          ToDoItem: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let toDoItemEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.user) {
        let $item = args.user as { id };
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkToDoItemToUser({
            context,
            user,
            toDoItem: result,
          });
        }
      }

      return {
        toDoItem: toDoItemEdge,
      };
    },
  ),
});
