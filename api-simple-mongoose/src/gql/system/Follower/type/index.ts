import * as _ from 'lodash';
import * as get from 'lodash/get';
import { Type, traverse, logger } from '../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type Follower {
      # # Follower
      follower: String
      # # Following
      following: String
      # # Id
      id: ID!
    }
  `,
  resolver: {
    id: ({ _id, id }) => _id || id,
  },
});
