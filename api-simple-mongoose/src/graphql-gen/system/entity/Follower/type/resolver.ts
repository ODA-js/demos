import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:Follower');
import { globalIdField } from 'oda-api-graphql';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  Follower: {
    id: globalIdField('Follower', ({ _id }) => _id),
  },
};
