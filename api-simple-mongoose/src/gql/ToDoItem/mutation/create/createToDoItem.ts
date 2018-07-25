import {
  ModelType,
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
  linkToUser,
  idToCursor,
  ensureUser,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  type: ModelType.mutation,
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
        dueToDate?: Date;
        published?: boolean;
        location?: object;
        file?: object;
        updatedBy?: string;
        updatedAt?: Date;
        user?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
    ) => {
      logger.trace('createToDoItem');
      let create: any = {
        name: args.name,
        description: args.description,
        done: args.done,
        dueToDate: args.dueToDate,
        published: args.published,
        location: args.location,
        file: args.file,
        updatedBy: args.updatedBy,
        updatedAt: args.updatedAt,
      };

      if (args.id) {
        create.id = fromGlobalId(args.id).id;
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
        cursor: idToCursor(result.id),
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

          await linkToUser({
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
