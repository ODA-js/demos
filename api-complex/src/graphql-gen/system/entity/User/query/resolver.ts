import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:query');
import * as get from 'lodash/get';

import { fromGlobalId } from 'oda-isomorfic';
import RegisterConnectors from '../../../../data/registerConnectors';
import { emptyConnection, idToCursor, pagination, detectCursorDirection, consts } from 'oda-api-graphql';
import { lib } from 'oda-gen-common';

const { selectionTree: traverse } = lib;

import { utils } from 'oda-api-graphql';

const { validId } = utils;

export function getValue(value) {
    if (typeof value === 'string') {
      return validId(value) ? value : fromGlobalId(value).id;
    } else {
      return value;
    }
}

export async function fixCount(length: number, cursor: { skip?: number, limit?: number; }, getCount: () => Promise<Number>) {
  const count = await getCount();
  if (count > 0) {
    if (length == cursor.limit) {
      return count
    }
    if (length < cursor.limit) {
      return cursor.skip + length;
    }
  } else {
    return count;
  }
}

export const query: { [key: string]: any } = {
  users: async (
    owner,
    args: {
      after: string,
      first: number,
      before: string,
      last: number,
      orderBy: string | string[],
      filter: object,
      limit: number,
      skip: number,
    },
    context: { connectors: RegisterConnectors },
    info
  ) => {
    logger.trace('users');
    let result;
    let selectionSet = traverse(info);

    let idMap = {
      id: '_id',
    };

    let list = get(selectionSet, 'edges.node') ? await context.connectors.User.getList({
      ...args,
      idMap,
    }) : [];

    if (list.length > 0) {
      let cursor = pagination(args);
      let direction = detectCursorDirection(args)._id;

      let edges = get(selectionSet, 'edges') ?
        list.map(l => {
          return {
            cursor: idToCursor(l.id),
            node: l,
          };
        }) : null;

      let pageInfo = get(selectionSet, 'pageInfo') ?
        {
          startCursor: get(selectionSet, 'pageInfo.startCursor')
            ? edges[0].cursor : undefined,
          endCursor: get(selectionSet, 'pageInfo.endCursor')
            ? edges[edges.length - 1].cursor : undefined,
          hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage') ? (direction === consts.DIRECTION.BACKWARD ? list.length === cursor.limit : false) : undefined,
          hasNextPage: get(selectionSet, 'pageInfo.hasNextPage') ? (direction === consts.DIRECTION.FORWARD ? list.length === cursor.limit : false) : undefined,
          count: get(selectionSet, 'pageInfo.count') ?  await fixCount(list.length, cursor, () => context.connectors.User.getCount({
              ...args,
              idMap,
            })) : 0,
        } : null;

      result = {
        edges,
        pageInfo,
      };
    } else {
      result = emptyConnection();
    }
    return result;
  },
  user: async (
    owner,
    args: {
      id?: string,
      userName?: string,
    },
    context: { connectors: RegisterConnectors },
    info
  ) => {
    logger.trace('user');
    let result;
    if (args.id) {
      result = await context.connectors.User.findOneById(getValue(args.id));
    } else if (args.userName) {
      result = await context.connectors.User.findOneByUserName(args.userName);
    }
    return result;
  },
};