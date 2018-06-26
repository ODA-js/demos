import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:User');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'oda-isomorfic';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureToDoItem({
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

  }
  let toDoItem;
  if (filter) {
    toDoItem = await context.userGQL({
      query: gql`query findToDoItem(${fArgs}){
            toDoItem(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.toDoItem);
  }

  if (!toDoItem) {
    if (create) {
      toDoItem = await context.userGQL({
        query: gql`mutation createToDoItem($toDoItem: createToDoItemInput!) {
            createToDoItem(input: $toDoItem) {
              toDoItem {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          toDoItem: {
            name: args.name,
            description: args.description,
            done: args.done,
            dueToDate: args.dueToDate,
            published: args.published,
            user: args.user,
            id: args.id,
            updatedBy: args.updatedBy,
            updatedAt: args.updatedAt,
          },
        }
      }).then(r => r.data.createToDoItem.toDoItem.node);
    }
  } else {
    // update
    toDoItem = await context.userGQL({
      query: gql`mutation updateToDoItem($toDoItem: updateToDoItemInput!) {
            updateToDoItem(input: $toDoItem) {
              toDoItem {
                id
              }
            }
          }
          `,
      variables: {
        toDoItem: {
          name: args.name,
          description: args.description,
          done: args.done,
          dueToDate: args.dueToDate,
          published: args.published,
          user: args.user,
          id: args.id,
          updatedBy: args.updatedBy,
          updatedAt: args.updatedAt,
        },
      }
    }).then(r => r.data.updateToDoItem.toDoItem);
  }
  return toDoItem;
}
async function ensureFile({
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

  } else if (args.path) {
    fArgs = '$path: String';
    filter = 'path: $path';
    variables = {
      path: args.path,
    };
  }
  let file;
  if (filter) {
    file = await context.userGQL({
      query: gql`query findFile(${fArgs}){
            file(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.file);
  }

  if (!file) {
    if (create) {
      file = await context.userGQL({
        query: gql`mutation createFile($file: createFileInput!) {
            createFile(input: $file) {
              file {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          file: {
            path: args.path,
            filename: args.filename,
            mimetype: args.mimetype,
            encoding: args.encoding,
            user: args.user,
            id: args.id,
          },
        }
      }).then(r => r.data.createFile.file.node);
    }
  } else {
    // update
    file = await context.userGQL({
      query: gql`mutation updateFile($file: updateFileInput!) {
            updateFile(input: $file) {
              file {
                id
              }
            }
          }
          `,
      variables: {
        file: {
          path: args.path,
          filename: args.filename,
          mimetype: args.mimetype,
          encoding: args.encoding,
          user: args.user,
          id: args.id,
        },
      }
    }).then(r => r.data.updateFile.file);
  }
  return file;
}


async function linkToTodos({
  context,
  todos,
  user,
}) {
  if (todos) {
    await context.userGQL({
      query: gql`mutation addToUserHasManyTodos($input:addToUserHasManyTodosInput!) {
          addToUserHasManyTodos(input:$input){
            user {
              id
            }
          }
        }`,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          toDoItem: todos.id,
        }
      }
    });
  }
}

async function unlinkFromTodos({
  context, todos,  user,
}) {
  if (todos) {
    await context.userGQL({
      query: gql`mutation removeFromUserHasManyTodos($input: removeFromUserHasManyTodosInput!) {
          removeFromUserHasManyTodos(input:$input){
            user {
              id
            }
          }
        }`,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          toDoItem: todos.id,
        }
      }
    });
  }
}


async function linkToFiles({
  context,
  files,
  user,
}) {
  if (files) {
    await context.userGQL({
      query: gql`mutation addToUserHasManyFiles($input:addToUserHasManyFilesInput!) {
          addToUserHasManyFiles(input:$input){
            user {
              id
            }
          }
        }`,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          file: files.id,
        }
      }
    });
  }
}

async function unlinkFromFiles({
  context, files,  user,
}) {
  if (files) {
    await context.userGQL({
      query: gql`mutation removeFromUserHasManyFiles($input: removeFromUserHasManyFilesInput!) {
          removeFromUserHasManyFiles(input:$input){
            user {
              id
            }
          }
        }`,
      variables: {
        input: {
          user: toGlobalId('User', user.id),
          file: files.id,
        }
      }
    });
  }
}


async function unlinkUserFromAll(args:{
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
      fragment UnlinkUser on User {
        id
        todosUnlink: todos@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        filesUnlink: files@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: user(${pArgs}){
            ...UnlinkUser
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateUserInput!) {
          updateUser(input: $input) {
            user {
              ...UnlinkUser
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
  createUser: mutateAndGetPayload( async (args: {
      id?: string,
      userName?: string,
      password?: string,
      isAdmin?: boolean,
      isSystem?: boolean,
      enabled?: boolean,
      updatedBy?: string,
      updatedAt?: Date,
      todos?: object/*ToDoItem*/[],
      files?: object/*File*/[],
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createUser');
    let create: any = {
      userName: args.userName,
      password: args.password,
      isAdmin: args.isAdmin,
      isSystem: args.isSystem,
      enabled: args.enabled,
      updatedBy: args.updatedBy,
      updatedAt: args.updatedAt,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.User.create(create);

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let userEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.todos && Array.isArray(args.todos) && args.todos.length > 0 ) {
    
      for (let i = 0, len = args.todos.length; i < len; i++) {
    
      let $item = args.todos[i] as { id, };
      if ($item) {
        let todos = await ensureToDoItem({
          args: $item,
          context,
          create: true,
        });

        await linkToTodos({
          context,
          todos,
          user: result,
        });
      }
    
      }
    
    }


    if (args.files && Array.isArray(args.files) && args.files.length > 0 ) {
    
      for (let i = 0, len = args.files.length; i < len; i++) {
    
      let $item = args.files[i] as { id, };
      if ($item) {
        let files = await ensureFile({
          args: $item,
          context,
          create: true,
        });

        await linkToFiles({
          context,
          files,
          user: result,
        });
      }
    
      }
    
    }

    return {
      user: userEdge,
    };
  }),

  updateUser:  mutateAndGetPayload( async (args:  {
      id?: string,
      userName?: string,
      password?: string,
      isAdmin?: boolean,
      isSystem?: boolean,
      enabled?: boolean,
      updatedBy?: string,
      updatedAt?: Date,
      todos?: object/*ToDoItem*/[],
      todosUnlink?: object/*ToDoItem*/[],
      todosCreate?: object/*ToDoItem*/[],
      files?: object/*File*/[],
      filesUnlink?: object/*File*/[],
      filesCreate?: object/*File*/[],
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateUser');
    let payload = {
      userName: args.userName,
      password: args.password,
      isAdmin: args.isAdmin,
      isSystem: args.isSystem,
      enabled: args.enabled,
      updatedBy: args.updatedBy,
      updatedAt: args.updatedAt,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.User.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.User.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.userName) {
        delete payload.userName;
        previous = await context.connectors.User.findOneByUserName(args.userName);
        result = await context.connectors.User.findOneByUserNameAndUpdate(args.userName, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    if (args.todosUnlink && Array.isArray(args.todosUnlink) && args.todosUnlink.length > 0 ) {
    
      for (let i = 0, len = args.todosUnlink.length; i < len; i++) {
    
      let $item = args.todosUnlink[i];
      if ($item) {
        let todos = await ensureToDoItem({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromTodos({
          context,
          todos,
          user: result,
        });
      }
    
      }
    
    }

    if (args.todosCreate && Array.isArray(args.todosCreate) && args.todosCreate.length > 0 ) {
    
      for (let i = 0, len = args.todosCreate.length; i < len; i++) {
    
      let $item = args.todosCreate[i] as { id, };
      if ($item) {
        let todos = await ensureToDoItem({
          args: $item,
          context,
          create: true,
        });

        await linkToTodos({
          context,
          todos,
          user: result,
        });
      }
    
      }
    
    }

    if (args.todos && Array.isArray(args.todos) && args.todos.length > 0 ) {
    
      for (let i = 0, len = args.todos.length; i < len; i++) {
    
      let $item = args.todos[i] as { id, };
      if ($item) {
        let todos = await ensureToDoItem({
          args: $item,
          context,
          create: false,
        });

        await linkToTodos({
          context,
          todos,
          user: result,
        });
      }
    
      }
    
    }

    if (args.filesUnlink && Array.isArray(args.filesUnlink) && args.filesUnlink.length > 0 ) {
    
      for (let i = 0, len = args.filesUnlink.length; i < len; i++) {
    
      let $item = args.filesUnlink[i];
      if ($item) {
        let files = await ensureFile({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromFiles({
          context,
          files,
          user: result,
        });
      }
    
      }
    
    }

    if (args.filesCreate && Array.isArray(args.filesCreate) && args.filesCreate.length > 0 ) {
    
      for (let i = 0, len = args.filesCreate.length; i < len; i++) {
    
      let $item = args.filesCreate[i] as { id, };
      if ($item) {
        let files = await ensureFile({
          args: $item,
          context,
          create: true,
        });

        await linkToFiles({
          context,
          files,
          user: result,
        });
      }
    
      }
    
    }

    if (args.files && Array.isArray(args.files) && args.files.length > 0 ) {
    
      for (let i = 0, len = args.files.length; i < len; i++) {
    
      let $item = args.files[i] as { id, };
      if ($item) {
        let files = await ensureFile({
          args: $item,
          context,
          create: false,
        });

        await linkToFiles({
          context,
          files,
          user: result,
        });
      }
    
      }
    
    }

    return {
      user: result,
    };
  }),

  deleteUser:  mutateAndGetPayload(async (args: {
      id?: string,
      userName?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteUser');
    let result;
    try {
      if (args.id) {

        await unlinkUserFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.User.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.userName) {

        await unlinkUserFromAll([{
          key: 'userName',
          type: 'String',
          value: args.userName,
        }],
          context,
        );

        result = await context.connectors.User.findOneByUserNameAndRemove(args.userName);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('User', result.id),
      user: result,
    };
  }),
}
;
