import { Type } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type FollowersConnection {
      pageInfo: PageInfo!
      edges: [FollowersEdge]
      # put here your additional connection fields
    }
  `,
});
