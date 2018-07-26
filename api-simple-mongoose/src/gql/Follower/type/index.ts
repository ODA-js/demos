import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';
let logger = log4js.getLogger('graphql:query:Follower');
import { ModelType, Type, globalIdField, traverse } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type Follower implements Node {
      # # Follower
      follower: String
      # # Following
      following: String
      # # Id
      id: ID!
    }
  `,
  resolver: {
    id: globalIdField('Follower', ({ _id }) => _id),
  },
});
