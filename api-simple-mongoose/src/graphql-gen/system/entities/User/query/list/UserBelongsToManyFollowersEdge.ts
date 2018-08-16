import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type UserBelongsToManyFollowersEdge {
      node: User
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
