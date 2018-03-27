import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:ToDoItem');
import {
  globalIdField,
} from 'oda-api-graphql';

import RegisterConnectors from '../../../../data/registerConnectors';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  ToDoItem: {
    id: globalIdField('ToDoItem', ({ _id }) => _id),
    user: async (
      {_id: id}, // owner id
      args:{
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info) => {
      let result;
      let selectionSet = traverse(info);


      let toDoItem = await context.connectors.ToDoItem.findOneById(id);
      //BelongsTo
      if (toDoItem && toDoItem.user) {
        result = await context.connectors.User.findOneByUserName(toDoItem.user);

      }

      return result;
    },
    createdBy: async (
      {_id: id}, // owner id
      args:{
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info) => {
      let result;
      let selectionSet = traverse(info);


      let toDoItem = await context.connectors.ToDoItem.findOneById(id);
      //BelongsTo
      if (toDoItem && toDoItem.createdBy) {
        result = await context.connectors.User.findOneById(toDoItem.createdBy);

      }

      return result;
    },
    updateBy: async (
      {_id: id}, // owner id
      args:{
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info) => {
      let result;
      let selectionSet = traverse(info);


      let toDoItem = await context.connectors.ToDoItem.findOneById(id);
      //BelongsTo
      if (toDoItem && toDoItem.updateBy) {
        result = await context.connectors.User.findOneById(toDoItem.updateBy);

      }

      return result;
    },
  },
};
