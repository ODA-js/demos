import * as _ from 'lodash';
import * as get from 'lodash/get';

import { RegisterConnectors } from '../../../common';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type File {
      # # Path
      path: String!
      # # Filename
      filename: String
      # # Mimetype
      mimetype: String
      # # Encoding
      encoding: String
      # # Id
      id: ID!
      # # Owner
      user: User
    }
  `,
  resolver: {
    id: ({ id }) => id,

    user: async (
      { id }, // owner id
      args: {
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any;
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;
      let selectionSet = traverse(info);

      let file = await context.connectors.File.findOneById(id);
      //BelongsTo
      if (file && file.user) {
        result = await context.connectors.User.findOneById(file.user);
      }

      return result;
    },
  },
});
