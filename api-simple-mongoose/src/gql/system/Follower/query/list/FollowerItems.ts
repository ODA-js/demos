import { Query, logger, RegisterConnectors } from '../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      FollowerItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [FollowerSortOrder]
        filter: FollowerComplexFilter
      ): [Follower]
    }
  `,
  resolver: async (
    owner,
    args: {
      after: string;
      first: number;
      before: string;
      last: number;
      limit: number;
      skip: number;
      orderBy: string | string[];
      filter: object;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('followers');
    let idMap = {
      id: '_id',
    };
    return await context.connectors.Follower.getList({
      ...args,
      idMap,
    });
  },
});
