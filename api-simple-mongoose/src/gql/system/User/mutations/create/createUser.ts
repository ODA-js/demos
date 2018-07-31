import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  fromGlobalId,
  idToCursor,
  ensureToDoItem,
  linkUserToTodos,
  ensureFile,
  linkUserToFiles,
  ensureUser,
  linkUserToFollowings,
  linkUserToFollowers,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createUser(input: createUserInput!): createUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        userName?: string;
        password?: string;
        isAdmin?: boolean;
        isSystem?: boolean;
        enabled?: boolean;
        updatedBy?: string;
        updatedAt?: Date;
        todos?: object /*ToDoItem*/[];
        files?: object /*File*/[];
        followings?: object /*User*/[];
        followers?: object /*User*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createUser');
      let create: any = {
        userName: args.userName,
        password: args.password,
        isAdmin: args.isAdmin,
        isSystem: args.isSystem,
        enabled: args.enabled,
        updatedBy: args.updatedBy,
        updatedAt: args.updatedAt,
      };

      if (args.id) {
        create.id = fromGlobalId(args.id).id;
      }

      let result = await context.connectors.User.create(create);

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let userEdge = {
        cursor: idToCursor(result.id),
        node: result,
      };

      if (args.todos && Array.isArray(args.todos) && args.todos.length > 0) {
        for (let i = 0, len = args.todos.length; i < len; i++) {
          let $item = args.todos[i] as { id };
          if ($item) {
            let todos = await ensureToDoItem({
              args: $item,
              context,
              create: true,
            });
            await linkUserToTodos({
              context,
              todos,
              user: result,
            });
          }
        }
      }

      if (args.files && Array.isArray(args.files) && args.files.length > 0) {
        for (let i = 0, len = args.files.length; i < len; i++) {
          let $item = args.files[i] as { id };
          if ($item) {
            let files = await ensureFile({
              args: $item,
              context,
              create: true,
            });
            await linkUserToFiles({
              context,
              files,
              user: result,
            });
          }
        }
      }

      if (
        args.followings &&
        Array.isArray(args.followings) &&
        args.followings.length > 0
      ) {
        for (let i = 0, len = args.followings.length; i < len; i++) {
          let $item = args.followings[i] as { id };
          if ($item) {
            let followings = await ensureUser({
              args: $item,
              context,
              create: true,
            });
            await linkUserToFollowings({
              context,
              followings,
              user: result,
            });
          }
        }
      }

      if (
        args.followers &&
        Array.isArray(args.followers) &&
        args.followers.length > 0
      ) {
        for (let i = 0, len = args.followers.length; i < len; i++) {
          let $item = args.followers[i] as { id };
          if ($item) {
            let followers = await ensureUser({
              args: $item,
              context,
              create: true,
            });
            await linkUserToFollowers({
              context,
              followers,
              user: result,
            });
          }
        }
      }

      return {
        user: userEdge,
      };
    },
  ),
});
