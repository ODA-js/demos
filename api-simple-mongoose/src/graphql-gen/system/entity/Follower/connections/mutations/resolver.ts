import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Follower');

import { fromGlobalId, toGlobalId } from 'oda-isomorfic';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {};