import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkFileFromUser,
  linkFileToUser,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateFile(input: updateFileInput!): updateFilePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        path?: string;
        filename?: string;
        mimetype?: string;
        encoding?: string;
        user?: object /*User*/;
        userUnlink?: object /*User*/;
        userCreate?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateFile');
      let payload = {
        path: args.path,
        filename: args.filename,
        mimetype: args.mimetype,
        encoding: args.encoding,
      };

      let result;
      let previous;
      try {
        if (args.id) {
          previous = await context.connectors.File.findOneById(args.id);
          result = await context.connectors.File.findOneByIdAndUpdate(
            args.id,
            payload,
          );
        } else if (args.path) {
          delete payload.path;
          previous = await context.connectors.File.findOneByPath(args.path);
          result = await context.connectors.File.findOneByPathAndUpdate(
            args.path,
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
        context.pubsub.publish('File', {
          File: {
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
          await unlinkFileFromUser({
            context,
            user,
            file: result,
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

          await linkFileToUser({
            context,
            user,
            file: result,
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

          await linkFileToUser({
            context,
            user,
            file: result,
          });
        }
      }

      return {
        file: result,
      };
    },
  ),
});
