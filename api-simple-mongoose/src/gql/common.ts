import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:query');
import * as get from 'lodash/get';
import gql from 'graphql-tag';
import {
  globalIdField,
  emptyConnection,
  idToCursor,
  pagination,
  detectCursorDirection,
  consts,
  mutateAndGetPayload,
} from 'oda-api-graphql';
import { lib } from 'oda-gen-common';

import { fromGlobalId, toGlobalId } from 'oda-isomorfic';

import { PubSubEngine } from 'graphql-subscriptions';

const { selectionTree: traverse } = lib;

import { utils } from 'oda-api-graphql';
import RegisterConnectors from '../graphql-gen/data/registerConnectors';

const { validId } = utils;

import {
  Enum,
  Input,
  Interface,
  ModelType,
  Mutation,
  ObjectResolver,
  EnumResolver,
  FieldDefinition,
  IGQLInput,
  ModelTypes,
  Query,
  Resolver,
  ResolverFunction,
  Scalar,
  ScalarResolver,
  Type,
  Union,
  Schema,
  UnionInterfaceResolverFunction,
} from './typedef';

export {
  Enum,
  Input,
  Interface,
  ModelType,
  Mutation,
  ObjectResolver,
  EnumResolver,
  FieldDefinition,
  IGQLInput,
  ModelTypes,
  Query,
  Resolver,
  ResolverFunction,
  Scalar,
  ScalarResolver,
  Type,
  Union,
  Schema,
  UnionInterfaceResolverFunction,
};

export function getValue(value) {
  if (typeof value === 'string') {
    return validId(value) ? value : fromGlobalId(value).id;
  } else {
    return value;
  }
}

export async function fixCount(
  length: number,
  cursor: { skip?: number; limit?: number },
  getCount: () => Promise<Number>,
) {
  const count = await getCount();
  if (count > 0) {
    if (length == cursor.limit) {
      return count;
    }
    if (length < cursor.limit) {
      return cursor.skip + length;
    } else {
      return count;
    }
  }
  return count;
}

async function ensureUser({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  } else if (args.userName) {
    fArgs = '$userName: String';
    filter = 'userName: $userName';
    variables = {
      userName: args.userName,
    };
  }
  let user;
  if (filter) {
    user = await context
      .userGQL({
        query: gql`query findUser(${fArgs}){
            user(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.user);
  }

  if (!user) {
    if (create) {
      user = await context
        .userGQL({
          query: gql`
            mutation createUser($user: createUserInput!) {
              createUser(input: $user) {
                user {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            user: {
              userName: args.userName,
              password: args.password,
              isAdmin: args.isAdmin,
              isSystem: args.isSystem,
              enabled: args.enabled,
              todos: args.todos,
              files: args.files,
              followings: args.followings,
              followers: args.followers,
              id: args.id,
              updatedBy: args.updatedBy,
              updatedAt: args.updatedAt,
            },
          },
        })
        .then(r => r.data.createUser.user.node);
    }
  } else {
    // update
    user = await context
      .userGQL({
        query: gql`
          mutation updateUser($user: updateUserInput!) {
            updateUser(input: $user) {
              user {
                id
              }
            }
          }
        `,
        variables: {
          user: {
            userName: args.userName,
            password: args.password,
            isAdmin: args.isAdmin,
            isSystem: args.isSystem,
            enabled: args.enabled,
            todos: args.todos,
            files: args.files,
            followings: args.followings,
            followers: args.followers,
            id: args.id,
            updatedBy: args.updatedBy,
            updatedAt: args.updatedAt,
          },
        },
      })
      .then(r => r.data.updateUser.user);
  }
  return user;
}

async function linkToUser({ context, user, toDoItem }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation addToToDoItemBelongsToUser(
          $input: addToToDoItemBelongsToUserInput!
        ) {
          addToToDoItemBelongsToUser(input: $input) {
            toDoItem {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: user.id,
        },
      },
    });
  }
}

async function unlinkFromUser({ context, user, toDoItem }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation removeFromToDoItemBelongsToUser(
          $input: removeFromToDoItemBelongsToUserInput!
        ) {
          removeFromToDoItemBelongsToUser(input: $input) {
            toDoItem {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: user.id,
        },
      },
    });
  }
}

async function unlinkToDoItemFromAll(
  args: {
    key;
    type;
    value;
  }[],
  context: { userGQL: (args: any) => Promise<any> },
) {
  if (args.length > 0 && context) {
    const variables = args.reduce((res, cur) => {
      res[cur.key] = cur.value;
      return res;
    }, {});

    const qArgs = args
      .reduce((res, cur) => {
        res.push(`$${cur.key}: ${cur.type}`);
        return res;
      }, [])
      .join(',');

    const pArgs = args
      .reduce((res, cur) => {
        res.push(`${cur.key}: $${cur.key}`);
        return res;
      }, [])
      .join(',');
    const unlinkFragment = gql`
      fragment UnlinkToDoItem on ToDoItem {
        id
        userUnlink: user {
          id
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: toDoItem(${pArgs}){
            ...UnlinkToDoItem
          }
        }
        ${unlinkFragment}
        `,
        variables,
      })
      .then(r => r.data || r.data.input);

    if (input) {
      await context.userGQL({
        query: gql`
          mutation unlink($input: updateToDoItemInput!) {
            updateToDoItem(input: $input) {
              toDoItem {
                ...UnlinkToDoItem
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: input,
      });
    }
  }
}

export {
  RegisterConnectors,
  validId,
  get,
  traverse,
  pagination,
  detectCursorDirection,
  idToCursor,
  logger,
  consts,
  emptyConnection,
  unlinkToDoItemFromAll,
  unlinkFromUser,
  linkToUser,
  ensureUser,
  PubSubEngine,
  mutateAndGetPayload,
  fromGlobalId,
  toGlobalId,
  globalIdField,
};
