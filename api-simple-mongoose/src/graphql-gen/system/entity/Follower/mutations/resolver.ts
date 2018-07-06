import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Follower');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'oda-isomorfic';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';



async function unlinkFollowerFromAll(args:{
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
      fragment UnlinkFollower on Follower {
        id
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: follower(${pArgs}){
            ...UnlinkFollower
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateFollowerInput!) {
          updateFollower(input: $input) {
            follower {
              ...UnlinkFollower
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
  createFollower: mutateAndGetPayload( async (args: {
      id?: string,
      follower?: string,
      following?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createFollower');
    let create: any = {
      follower: args.follower,
      following: args.following,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Follower.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Follower', {
        Follower: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let followerEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };

    return {
      follower: followerEdge,
    };
  }),

  updateFollower:  mutateAndGetPayload( async (args:  {
      id?: string,
      follower?: string,
      following?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateFollower');
    let payload = {
      follower: args.follower,
      following: args.following,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Follower.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Follower.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Follower', {
        Follower: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    return {
      follower: result,
    };
  }),

  deleteFollower:  mutateAndGetPayload(async (args: {
      id?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteFollower');
    let result;
    try {
      if (args.id) {

        await unlinkFollowerFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Follower.findOneByIdAndRemove(fromGlobalId(args.id).id);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Follower', {
        Follower: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Follower', result.id),
      follower: result,
    };
  }),
}
;
