import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:ToDoItem');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'oda-isomorfic';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureUser({
  args, context, create
}) {
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
    user = await context.userGQL({
      query: gql`query findUser(${fArgs}){
            user(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.user);
  }

  if (!user) {
    if (create) {
      user = await context.userGQL({
        query: gql`mutation createUser($user: createUserInput!) {
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
            id: args.id,
          },
        }
      }).then(r => r.data.createUser.user.node);
    }
  } else {
    // update
    user = await context.userGQL({
      query: gql`mutation updateUser($user: updateUserInput!) {
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
          id: args.id,
        },
      }
    }).then(r => r.data.updateUser.user);
  }
  return user;
}


async function linkToUser({
  context,
  user,
  toDoItem,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation addToToDoItemBelongsToUser($input:addToToDoItemBelongsToUserInput!) {
          addToToDoItemBelongsToUser(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: user.id,
        }
      }
    });
  }
}

async function unlinkFromUser({
  context, user,  toDoItem,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation removeFromToDoItemBelongsToUser($input: removeFromToDoItemBelongsToUserInput!) {
          removeFromToDoItemBelongsToUser(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: user.id,
        }
      }
    });
  }
}


async function linkToCreatedBy({
  context,
  createdBy,
  toDoItem,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`mutation addToToDoItemBelongsToCreatedBy($input:addToToDoItemBelongsToCreatedByInput!) {
          addToToDoItemBelongsToCreatedBy(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: createdBy.id,
        }
      }
    });
  }
}

async function unlinkFromCreatedBy({
  context, createdBy,  toDoItem,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`mutation removeFromToDoItemBelongsToCreatedBy($input: removeFromToDoItemBelongsToCreatedByInput!) {
          removeFromToDoItemBelongsToCreatedBy(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: createdBy.id,
        }
      }
    });
  }
}


async function linkToUpdateBy({
  context,
  updateBy,
  toDoItem,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`mutation addToToDoItemBelongsToUpdateBy($input:addToToDoItemBelongsToUpdateByInput!) {
          addToToDoItemBelongsToUpdateBy(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: updateBy.id,
        }
      }
    });
  }
}

async function unlinkFromUpdateBy({
  context, updateBy,  toDoItem,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`mutation removeFromToDoItemBelongsToUpdateBy($input: removeFromToDoItemBelongsToUpdateByInput!) {
          removeFromToDoItemBelongsToUpdateBy(input:$input){
            toDoItem {
              id
            }
          }
        }`,
      variables: {
        input: {
          toDoItem: toGlobalId('ToDoItem', toDoItem.id),
          user: updateBy.id,
        }
      }
    });
  }
}


async function unlinkToDoItemFromAll(args:{
  key,
  type,
  value,
}[],
  context: {userGQL: (args: any)=>Promise<any>},
){
  if (args.length > 0 && context) {

    const variables = args.reduce((res, cur) => {
      res[cur.key] = cur.value;
      return res;
    }, {});

    const qArgs = args.reduce((res, cur) => {
      res.push(`$${cur.key}: ${cur.type}`);
      return res;
    }, []).join(',');

    const pArgs = args.reduce((res, cur) => {
      res.push(`${cur.key}: $${cur.key}`);
      return res;
    }, []).join(',');
    const unlinkFragment = gql`
      fragment UnlinkToDoItem on ToDoItem {
        id
        userUnlink: user{
          id
        }
        createdByUnlink: createdBy{
          id
        }
        updateByUnlink: updateBy{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: toDoItem(${pArgs}){
            ...UnlinkToDoItem
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
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
        variables: input
      });
    }
  }
}

export const mutation = {
  createToDoItem: mutateAndGetPayload( async (args: {
      id?: string,
      name?: string,
      description?: string,
      done?: boolean,
      dueToDate?: Date,
      published?: boolean,
      createdAt?: Date,
      updatedAt?: Date,
      removed?: boolean,
      owner?: string,
      user?: object/*User*/,
      createdBy?: object/*User*/,
      updateBy?: object/*User*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createToDoItem');
    let create: any = {
      name: args.name,
      description: args.description,
      done: args.done,
      dueToDate: args.dueToDate,
      published: args.published,
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
      removed: args.removed,
      owner: args.owner,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.ToDoItem.create(create);

    if (context.pubsub) {
      context.pubsub.publish('ToDoItem', {
        ToDoItem: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let toDoItemEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.user ) {
    
      let $item = args.user as { id, };
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUser({
          context,
          user,
          toDoItem: result,
        });
      }
    
    }


    if (args.createdBy ) {
    
      let $item = args.createdBy as { id, };
      if ($item) {
        let createdBy = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToCreatedBy({
          context,
          createdBy,
          toDoItem: result,
        });
      }
    
    }


    if (args.updateBy ) {
    
      let $item = args.updateBy as { id, };
      if ($item) {
        let updateBy = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUpdateBy({
          context,
          updateBy,
          toDoItem: result,
        });
      }
    
    }

    return {
      toDoItem: toDoItemEdge,
    };
  }),

  updateToDoItem:  mutateAndGetPayload( async (args:  {
      id?: string,
      name?: string,
      description?: string,
      done?: boolean,
      dueToDate?: Date,
      published?: boolean,
      createdAt?: Date,
      updatedAt?: Date,
      removed?: boolean,
      owner?: string,
      user?: object/*User*/,
      userUnlink?: object/*User*/,
      userCreate?: object/*User*/,
      createdBy?: object/*User*/,
      createdByUnlink?: object/*User*/,
      createdByCreate?: object/*User*/,
      updateBy?: object/*User*/,
      updateByUnlink?: object/*User*/,
      updateByCreate?: object/*User*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateToDoItem');
    let payload = {
      name: args.name,
      description: args.description,
      done: args.done,
      dueToDate: args.dueToDate,
      published: args.published,
      createdAt: args.createdAt,
      updatedAt: args.updatedAt,
      removed: args.removed,
      owner: args.owner,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.ToDoItem.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.ToDoItem.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('ToDoItem', {
        ToDoItem: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    if (args.userUnlink ) {
    
      let $item = args.userUnlink;
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromUser({
          context,
          user,
          toDoItem: result,
        });
      }
    
    }

    if (args.userCreate ) {
    
      let $item = args.userCreate as { id, };
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUser({
          context,
          user,
          toDoItem: result,
        });
      }
    
    }

    if (args.user ) {
    
      let $item = args.user as { id, };
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await linkToUser({
          context,
          user,
          toDoItem: result,
        });
      }
    
    }

    if (args.createdByUnlink ) {
    
      let $item = args.createdByUnlink;
      if ($item) {
        let createdBy = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromCreatedBy({
          context,
          createdBy,
          toDoItem: result,
        });
      }
    
    }

    if (args.createdByCreate ) {
    
      let $item = args.createdByCreate as { id, };
      if ($item) {
        let createdBy = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToCreatedBy({
          context,
          createdBy,
          toDoItem: result,
        });
      }
    
    }

    if (args.createdBy ) {
    
      let $item = args.createdBy as { id, };
      if ($item) {
        let createdBy = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await linkToCreatedBy({
          context,
          createdBy,
          toDoItem: result,
        });
      }
    
    }

    if (args.updateByUnlink ) {
    
      let $item = args.updateByUnlink;
      if ($item) {
        let updateBy = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromUpdateBy({
          context,
          updateBy,
          toDoItem: result,
        });
      }
    
    }

    if (args.updateByCreate ) {
    
      let $item = args.updateByCreate as { id, };
      if ($item) {
        let updateBy = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUpdateBy({
          context,
          updateBy,
          toDoItem: result,
        });
      }
    
    }

    if (args.updateBy ) {
    
      let $item = args.updateBy as { id, };
      if ($item) {
        let updateBy = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await linkToUpdateBy({
          context,
          updateBy,
          toDoItem: result,
        });
      }
    
    }

    return {
      toDoItem: result,
    };
  }),

  deleteToDoItem:  mutateAndGetPayload(async (args: {
      id?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteToDoItem');
    let result;
    try {
      if (args.id) {

        await unlinkToDoItemFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.ToDoItem.findOneByIdAndRemove(fromGlobalId(args.id).id);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('ToDoItem', {
        ToDoItem: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('ToDoItem', result.id),
      toDoItem: result,
    };
  }),
}
;
