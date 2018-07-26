import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:File');

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
      createFile(input: createFileInput!): createFilePayload
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
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createFile');
      let create: any = {
        path: args.path,
        filename: args.filename,
        mimetype: args.mimetype,
        encoding: args.encoding,
      };

      if (args.id) {
        create.id = fromGlobalId(args.id).id;
      }

      let result = await context.connectors.File.create(create);

      if (context.pubsub) {
        context.pubsub.publish('File', {
          File: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let fileEdge = {
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
            file: result,
          });
        }
      }

      return {
        file: fileEdge,
      };
    },
  ),
});
