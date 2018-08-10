import { Query, logger, RegisterConnectors } from '../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      file(id: ID, path: String): File
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      path?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('file');
    let result;
    if (args.id) {
      result = await context.connectors.File.findOneById(args.id);
    } else if (args.path) {
      result = await context.connectors.File.findOneByPath(args.path);
    }
    return result;
  },
});
