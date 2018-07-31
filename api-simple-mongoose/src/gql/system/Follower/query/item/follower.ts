import { Query, logger, RegisterConnectors, getValue } from '../../../common';
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
      result = await context.connectors.Follower.findOneById(getValue(args.id));
    }
    return result;
  },
});
