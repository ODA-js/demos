import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:File');
import { globalIdField } from 'oda-api-graphql';

import RegisterConnectors from '../../../../data/registerConnectors';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  File: {
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
};
