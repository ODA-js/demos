import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:User');
import {
  globalIdField,
} from 'oda-api-graphql';

import RegisterConnectors from '../../../../data/registerConnectors';
import { idToCursor, emptyConnection, pagination, detectCursorDirection, consts, Filter } from 'oda-api-graphql';

import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  User: {
    id: globalIdField('User', ({ _id }) => _id),
    todos: async (
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


      let user = await context.connectors.User.findOneById(id);
      //HasMany
        let idMap = {
          id: 'id',
        };
      if (user && user.userName) {
        if(!args.filter){
          args.filter = {};
        }
        args.filter.user =  {
          eq: user.userName
        };
        let list = get(selectionSet, 'edges.node') ?
          await context.connectors.ToDoItem.getList({
            ...args,
            idMap,
          }): [];

        if (list.length > 0) {
          let cursor = pagination(args);
          let direction = detectCursorDirection(args)._id;
          let edges = list.map(l => {
            return {
              cursor: idToCursor(l.id),
              node: l,
            };
          });

          let pageInfo = get(selectionSet, 'pageInfo') ?
            {
              startCursor: get(selectionSet, 'pageInfo.startCursor')
                ? edges[0].cursor : undefined,
              endCursor: get(selectionSet, 'pageInfo.endCursor')
                ? edges[edges.length - 1].cursor : undefined,
              hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage') ? (direction === consts.DIRECTION.BACKWARD ? list.length === cursor.limit : false) : undefined,
              hasNextPage: get(selectionSet, 'pageInfo.hasNextPage') ? (direction === consts.DIRECTION.FORWARD ? list.length === cursor.limit : false) : undefined,
              count: get(selectionSet, 'pageInfo.count') ? await context.connectors.ToDoItem.getCount({
                ...args,
                idMap,
                }) : 0,
            } : null;

          result = {
            edges,
            pageInfo,
          };

        } else {
          result = emptyConnection();
        }

      }

      return result;
    },
  },
};
