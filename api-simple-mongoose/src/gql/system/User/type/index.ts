import * as _ from 'lodash';
import * as get from 'lodash/get';

import { RegisterConnectors } from '../../common';
import {
  idToCursor,
  emptyConnection,
  pagination,
  detectCursorDirection,
  consts,
  Filter,
} from 'oda-api-graphql';
import { Type, globalIdField, traverse, logger } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type User implements Node {
      # # User/Email
      userName: String!
      # # Password
      password: String!
      # # Is Administrator
      isAdmin: Boolean
      # # Is System User
      isSystem: Boolean
      # # Allow To Login
      enabled: Boolean
      # # Id
      id: ID!
      # # Updated By
      updatedBy: ID
      # # Updated At
      updatedAt: Date
      # # Todo List
      todos(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [ToDoItemSortOrder]
        filter: ToDoItemComplexFilter
      ): UserHasManyTodosConnection
      # # User Files
      files(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [FileSortOrder]
        filter: FileComplexFilter
      ): UserHasManyFilesConnection
      # # Followings
      followings(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [UserSortOrder]
        filter: UserComplexFilter
      ): UserBelongsToManyFollowingsConnection
      # # Followers
      followers(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [UserSortOrder]
        filter: UserComplexFilter
      ): UserBelongsToManyFollowersConnection
    }
  `,
  resolver: {
    id: globalIdField('User', ({ _id }) => _id),
    todos: async (
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

      let user = await context.connectors.User.findOneById(id);
      //HasMany
      let idMap = {
        id: 'id',
      };
      if (user && user.userName) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.user = {
          eq: user.userName,
        };
        let list = get(selectionSet, 'edges.node')
          ? await context.connectors.ToDoItem.getList({
              ...args,
              idMap,
            })
          : [];

        if (list.length > 0) {
          let cursor = pagination(args);
          let direction = detectCursorDirection(args)._id;
          let edges = list.map(l => {
            return {
              cursor: idToCursor(l.id),
              node: l,
            };
          });

          let pageInfo = get(selectionSet, 'pageInfo')
            ? {
                startCursor: get(selectionSet, 'pageInfo.startCursor')
                  ? edges[0].cursor
                  : undefined,
                endCursor: get(selectionSet, 'pageInfo.endCursor')
                  ? edges[edges.length - 1].cursor
                  : undefined,
                hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage')
                  ? direction === consts.DIRECTION.BACKWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                  ? direction === consts.DIRECTION.FORWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                count: get(selectionSet, 'pageInfo.count')
                  ? await context.connectors.ToDoItem.getCount({
                      ...args,
                      idMap,
                    })
                  : 0,
              }
            : null;

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
    files: async (
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

      let user = await context.connectors.User.findOneById(id);
      //HasMany
      let idMap = {
        id: 'id',
        user: 'user',
      };
      if (user && user.id) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.user = {
          eq: user.id,
        };
        let list = get(selectionSet, 'edges.node')
          ? await context.connectors.File.getList({
              ...args,
              idMap,
            })
          : [];

        if (list.length > 0) {
          let cursor = pagination(args);
          let direction = detectCursorDirection(args)._id;
          let edges = list.map(l => {
            return {
              cursor: idToCursor(l.id),
              node: l,
            };
          });

          let pageInfo = get(selectionSet, 'pageInfo')
            ? {
                startCursor: get(selectionSet, 'pageInfo.startCursor')
                  ? edges[0].cursor
                  : undefined,
                endCursor: get(selectionSet, 'pageInfo.endCursor')
                  ? edges[edges.length - 1].cursor
                  : undefined,
                hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage')
                  ? direction === consts.DIRECTION.BACKWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                  ? direction === consts.DIRECTION.FORWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                count: get(selectionSet, 'pageInfo.count')
                  ? await context.connectors.File.getCount({
                      ...args,
                      idMap,
                    })
                  : 0,
              }
            : null;

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
    followings: async (
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

      let user = await context.connectors.User.findOneById(id);
      //BelongsToMany

      if (user && user.id) {
        const cursor = pagination(args);
        let direction = detectCursorDirection(args)._id;
        const _args = {
          ..._.pick(args, [
            'limit',
            'skip',
            'first',
            'after',
            'last',
            'before',
          ]),
        } as {
          limit?: number;
          skip?: number;
          first?: number;
          after?: string;
          last?: number;
          before?: string;
          filter?: {
            [k: string]: any;
          };
        };

        _args.filter = {
          following: {
            eq: user.id,
          },
        };
        let idMap = {
          id: 'id',
        };

        const itemCheck = Filter.Process.create(args.filter || {}, idMap);

        let links = await context.connectors.Follower.getList(
          _args,
          async link => {
            let result = await context.connectors.User.findOneById(
              link.follower,
            );
            if (result) {
              return itemCheck({
                ...result,
              });
            } else {
              return false;
            }
          },
        );
        if (links.length > 0) {
          let res = await context.connectors.User.getList({
            filter: {
              id: { in: links.map(i => i.follower) },
            },
          });

          if (res.length > 0) {
            let hItems = res.reduce((hash, item) => {
              hash[item.id] = item;
              return hash;
            }, {});

            let edges = links
              .map(l => {
                return {
                  cursor: idToCursor(l.id),
                  node: hItems[l.follower],
                };
              })
              .filter(l => l.node);

            let pageInfo = get(selectionSet, 'pageInfo')
              ? {
                  startCursor: get(selectionSet, 'pageInfo.startCursor')
                    ? edges[0].cursor
                    : undefined,
                  endCursor: get(selectionSet, 'pageInfo.endCursor')
                    ? edges[edges.length - 1].cursor
                    : undefined,
                  hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage')
                    ? direction === consts.DIRECTION.BACKWARD
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                    ? direction === consts.DIRECTION.FORWARD
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  count: get(selectionSet, 'pageInfo.count')
                    ? await context.connectors.User.getCount({
                        filter: {
                          id: { in: links.map(i => i.follower) },
                        },
                      })
                    : 0,
                }
              : null;

            result = {
              edges,
              pageInfo,
            };
          } else {
            result = emptyConnection();
          }
        } else {
          result = emptyConnection();
        }
      }

      return result;
    },
    followers: async (
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

      let user = await context.connectors.User.findOneById(id);
      //BelongsToMany

      if (user && user.id) {
        const cursor = pagination(args);
        let direction = detectCursorDirection(args)._id;
        const _args = {
          ..._.pick(args, [
            'limit',
            'skip',
            'first',
            'after',
            'last',
            'before',
          ]),
        } as {
          limit?: number;
          skip?: number;
          first?: number;
          after?: string;
          last?: number;
          before?: string;
          filter?: {
            [k: string]: any;
          };
        };

        _args.filter = {
          follower: {
            eq: user.id,
          },
        };
        let idMap = {
          id: 'id',
        };

        const itemCheck = Filter.Process.create(args.filter || {}, idMap);

        let links = await context.connectors.Follower.getList(
          _args,
          async link => {
            let result = await context.connectors.User.findOneById(
              link.following,
            );
            if (result) {
              return itemCheck({
                ...result,
              });
            } else {
              return false;
            }
          },
        );
        if (links.length > 0) {
          let res = await context.connectors.User.getList({
            filter: {
              id: { in: links.map(i => i.following) },
            },
          });

          if (res.length > 0) {
            let hItems = res.reduce((hash, item) => {
              hash[item.id] = item;
              return hash;
            }, {});

            let edges = links
              .map(l => {
                return {
                  cursor: idToCursor(l.id),
                  node: hItems[l.following],
                };
              })
              .filter(l => l.node);

            let pageInfo = get(selectionSet, 'pageInfo')
              ? {
                  startCursor: get(selectionSet, 'pageInfo.startCursor')
                    ? edges[0].cursor
                    : undefined,
                  endCursor: get(selectionSet, 'pageInfo.endCursor')
                    ? edges[edges.length - 1].cursor
                    : undefined,
                  hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage')
                    ? direction === consts.DIRECTION.BACKWARD
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                    ? direction === consts.DIRECTION.FORWARD
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  count: get(selectionSet, 'pageInfo.count')
                    ? await context.connectors.User.getCount({
                        filter: {
                          id: { in: links.map(i => i.following) },
                        },
                      })
                    : 0,
                }
              : null;

            result = {
              edges,
              pageInfo,
            };
          } else {
            result = emptyConnection();
          }
        } else {
          result = emptyConnection();
        }
      }

      return result;
    },
  },
});
