import { Query, logger } from '../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      acl(input: aclInput!): aclPayload
    }
  `,
  resolver: async (
    owner,
    args: {
      entity?: string;
    },
    context,
    info,
  ) => {
    logger.trace('acl');
    let result: {
      // what must be in output
      acl?: any; // object,
    };
    result = {};
    // put your code here
    return result;
  },
});
