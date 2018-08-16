import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      follower(id: ID): Follower
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('follower');
    let result;
    if (args.id) {
      result = await context.connectors.Follower.findOneById(args.id);
    }
    return result;
  },
});
