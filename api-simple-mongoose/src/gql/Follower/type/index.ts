import * as _ from 'lodash';
import * as get from 'lodash/get';
import { Type, globalIdField, traverse, logger } from '../../common';
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
