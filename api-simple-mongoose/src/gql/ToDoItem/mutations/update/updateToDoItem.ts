import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
  idToCursor,
  ensureUser,
  unlinkToDoItemFromUser,
  linkToDoItemToUser,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateToDoItem(input: updateToDoItemInput!): updateToDoItemPayload
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
        userUnlink?: object /*User*/;
        userCreate?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateToDoItem');
      let payload = {
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

      let result;
      let previous;
      try {
        if (args.id) {
          previous = await context.connectors.ToDoItem.findOneById(
            fromGlobalId(args.id).id,
          );
          result = await context.connectors.ToDoItem.findOneByIdAndUpdate(
            fromGlobalId(args.id).id,
            payload,
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
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      if (args.userUnlink) {
        let $item = args.userUnlink;
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkToDoItemFromUser({
            context,
            user,
            toDoItem: result,
          });
        }
      }

      if (args.userCreate) {
        let $item = args.userCreate as { id };
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

      if (args.user) {
        let $item = args.user as { id };
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkToDoItemToUser({
            context,
            user,
            toDoItem: result,
          });
        }
      }

      return {
        toDoItem: result,
      };
    },
  ),
});
