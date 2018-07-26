import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

import { RegisterConnectors } from '../../common';
let logger = log4js.getLogger('graphql:query:ToDoItem');
import { ModelType, Type, globalIdField, traverse } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type ToDoItem implements Node {
      # # Name
      name: String
      # # Description
      description: String
      # # Done
      done: Boolean
      # # Location
      location: JSON
      # # File
      file: String
      # # Due To Date
      dueToDate: Date
      # # Published
      published: Boolean
      # # Id
      id: ID!
      # # Updated By
      updatedBy: ID
      # # Updated At
      updatedAt: Date
      # # User
      user: User
    }
  `,
  resolver: {
    id: globalIdField('ToDoItem', ({ _id }) => _id),
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

      let toDoItem = await context.connectors.ToDoItem.findOneById(id);
      //BelongsTo
      if (toDoItem && toDoItem.user) {
        result = await context.connectors.User.findOneByUserName(toDoItem.user);
      }

      return result;
    },
  },
});
