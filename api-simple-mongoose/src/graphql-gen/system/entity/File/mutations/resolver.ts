import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:File');
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
            todos: args.todos,
            files: args.files,
            id: args.id,
            updatedBy: args.updatedBy,
            updatedAt: args.updatedAt,
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
          todos: args.todos,
          files: args.files,
          id: args.id,
          updatedBy: args.updatedBy,
          updatedAt: args.updatedAt,
        },
      }
    }).then(r => r.data.updateUser.user);
  }
  return user;
}


async function linkToUser({
  context,
  user,
  file,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation addToFileBelongsToUser($input:addToFileBelongsToUserInput!) {
          addToFileBelongsToUser(input:$input){
            file {
              id
            }
          }
        }`,
      variables: {
        input: {
          file: toGlobalId('File', file.id),
          user: user.id,
        }
      }
    });
  }
}

async function unlinkFromUser({
  context, user,  file,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation removeFromFileBelongsToUser($input: removeFromFileBelongsToUserInput!) {
          removeFromFileBelongsToUser(input:$input){
            file {
              id
            }
          }
        }`,
      variables: {
        input: {
          file: toGlobalId('File', file.id),
          user: user.id,
        }
      }
    });
  }
}


async function unlinkFileFromAll(args:{
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
      fragment UnlinkFile on File {
        id
        userUnlink: user{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: file(${pArgs}){
            ...UnlinkFile
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateFileInput!) {
          updateFile(input: $input) {
            file {
              ...UnlinkFile
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
  createFile: mutateAndGetPayload( async (args: {
      id?: string,
      path?: string,
      filename?: string,
      mimetype?: string,
      encoding?: string,
      user?: object/*User*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createFile');
    let create: any = {
      path: args.path,
      filename: args.filename,
      mimetype: args.mimetype,
      encoding: args.encoding,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.File.create(create);

    if (context.pubsub) {
      context.pubsub.publish('File', {
        File: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let fileEdge = {
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
          file: result,
        });
      }
    
    }

    return {
      file: fileEdge,
    };
  }),

  updateFile:  mutateAndGetPayload( async (args:  {
      id?: string,
      path?: string,
      filename?: string,
      mimetype?: string,
      encoding?: string,
      user?: object/*User*/,
      userUnlink?: object/*User*/,
      userCreate?: object/*User*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateFile');
    let payload = {
      path: args.path,
      filename: args.filename,
      mimetype: args.mimetype,
      encoding: args.encoding,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.File.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.File.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.path) {
        delete payload.path;
        previous = await context.connectors.File.findOneByPath(args.path);
        result = await context.connectors.File.findOneByPathAndUpdate(args.path, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('File', {
        File: {
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
          file: result,
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
          file: result,
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
          file: result,
        });
      }
    
    }

    return {
      file: result,
    };
  }),

  deleteFile:  mutateAndGetPayload(async (args: {
      id?: string,
      path?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteFile');
    let result;
    try {
      if (args.id) {

        await unlinkFileFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.File.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.path) {

        await unlinkFileFromAll([{
          key: 'path',
          type: 'String',
          value: args.path,
        }],
          context,
        );

        result = await context.connectors.File.findOneByPathAndRemove(args.path);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('File', {
        File: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('File', result.id),
      file: result,
    };
  }),
}
;
