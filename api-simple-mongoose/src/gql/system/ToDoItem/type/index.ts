import * as _ from 'lodash';
import * as get from 'lodash/get';

import { RegisterConnectors } from '../../common';
import { Type, traverse, logger } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type ToDoItem implements IUpdated {
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
    id: ({ _id, id }) => _id || id,
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
