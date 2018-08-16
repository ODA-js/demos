import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureToDoItem,
  unlinkUserFromTodos,
  linkUserToTodos,
  ensureFile,
  unlinkUserFromFiles,
  linkUserToFiles,
  ensureUser,
  unlinkUserFromFollowings,
  linkUserToFollowings,
  unlinkUserFromFollowers,
  linkUserToFollowers,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateUser(input: updateUserInput!): updateUserPayload
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
        todosUnlink?: object /*ToDoItem*/[];
        todosCreate?: object /*ToDoItem*/[];
        files?: object /*File*/[];
        filesUnlink?: object /*File*/[];
        filesCreate?: object /*File*/[];
        followings?: object /*User*/[];
        followingsUnlink?: object /*User*/[];
        followingsCreate?: object /*User*/[];
        followers?: object /*User*/[];
        followersUnlink?: object /*User*/[];
        followersCreate?: object /*User*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateUser');
      let payload = {
        userName: args.userName,
        password: args.password,
        isAdmin: args.isAdmin,
        isSystem: args.isSystem,
        enabled: args.enabled,
        updatedBy: args.updatedBy,
        updatedAt: args.updatedAt,
      };

      let result;
      let previous;
      try {
        if (args.id) {
          previous = await context.connectors.User.findOneById(args.id);
          result = await context.connectors.User.findOneByIdAndUpdate(
            args.id,
            payload,
          );
        } else if (args.userName) {
          delete payload.userName;
          previous = await context.connectors.User.findOneByUserName(
            args.userName,
          );
          result = await context.connectors.User.findOneByUserNameAndUpdate(
            args.userName,
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
        context.pubsub.publish('User', {
          User: {
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

      if (
        args.todosUnlink &&
        Array.isArray(args.todosUnlink) &&
        args.todosUnlink.length > 0
      ) {
        for (let i = 0, len = args.todosUnlink.length; i < len; i++) {
          let $item = args.todosUnlink[i];
          if ($item) {
            let todos = await ensureToDoItem({
              args: $item,
              context,
              create: false,
            });
            await unlinkUserFromTodos({
              context,
              todos,
              user: result,
            });
          }
        }
      }

      if (
        args.todosCreate &&
        Array.isArray(args.todosCreate) &&
        args.todosCreate.length > 0
      ) {
        for (let i = 0, len = args.todosCreate.length; i < len; i++) {
          let $item = args.todosCreate[i] as { id };
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

      if (args.todos && Array.isArray(args.todos) && args.todos.length > 0) {
        for (let i = 0, len = args.todos.length; i < len; i++) {
          let $item = args.todos[i] as { id };
          if ($item) {
            let todos = await ensureToDoItem({
              args: $item,
              context,
              create: false,
            });

            await linkUserToTodos({
              context,
              todos,
              user: result,
            });
          }
        }
      }

      if (
        args.filesUnlink &&
        Array.isArray(args.filesUnlink) &&
        args.filesUnlink.length > 0
      ) {
        for (let i = 0, len = args.filesUnlink.length; i < len; i++) {
          let $item = args.filesUnlink[i];
          if ($item) {
            let files = await ensureFile({
              args: $item,
              context,
              create: false,
            });
            await unlinkUserFromFiles({
              context,
              files,
              user: result,
            });
          }
        }
      }

      if (
        args.filesCreate &&
        Array.isArray(args.filesCreate) &&
        args.filesCreate.length > 0
      ) {
        for (let i = 0, len = args.filesCreate.length; i < len; i++) {
          let $item = args.filesCreate[i] as { id };
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

      if (args.files && Array.isArray(args.files) && args.files.length > 0) {
        for (let i = 0, len = args.files.length; i < len; i++) {
          let $item = args.files[i] as { id };
          if ($item) {
            let files = await ensureFile({
              args: $item,
              context,
              create: false,
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
        args.followingsUnlink &&
        Array.isArray(args.followingsUnlink) &&
        args.followingsUnlink.length > 0
      ) {
        for (let i = 0, len = args.followingsUnlink.length; i < len; i++) {
          let $item = args.followingsUnlink[i];
          if ($item) {
            let followings = await ensureUser({
              args: $item,
              context,
              create: false,
            });
            await unlinkUserFromFollowings({
              context,
              followings,
              user: result,
            });
          }
        }
      }

      if (
        args.followingsCreate &&
        Array.isArray(args.followingsCreate) &&
        args.followingsCreate.length > 0
      ) {
        for (let i = 0, len = args.followingsCreate.length; i < len; i++) {
          let $item = args.followingsCreate[i] as { id };
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
              create: false,
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
        args.followersUnlink &&
        Array.isArray(args.followersUnlink) &&
        args.followersUnlink.length > 0
      ) {
        for (let i = 0, len = args.followersUnlink.length; i < len; i++) {
          let $item = args.followersUnlink[i];
          if ($item) {
            let followers = await ensureUser({
              args: $item,
              context,
              create: false,
            });
            await unlinkUserFromFollowers({
              context,
              followers,
              user: result,
            });
          }
        }
      }

      if (
        args.followersCreate &&
        Array.isArray(args.followersCreate) &&
        args.followersCreate.length > 0
      ) {
        for (let i = 0, len = args.followersCreate.length; i < len; i++) {
          let $item = args.followersCreate[i] as { id };
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
              create: false,
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
        user: result,
      };
    },
  ),
});
