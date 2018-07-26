import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type FollowersEdge {
      node: Follower
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
