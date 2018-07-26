import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

import { RegisterConnectors } from '../../common';
let logger = log4js.getLogger('graphql:query:File');
import { ModelType, Type, globalIdField, traverse } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type File implements Node {
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
    id: globalIdField('File', ({ _id }) => _id),
    user: async (
      { _id: id }, // owner id
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
