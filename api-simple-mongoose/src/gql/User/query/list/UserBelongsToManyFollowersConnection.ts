import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type UserBelongsToManyFollowersConnection {
      pageInfo: PageInfo!
      edges: [UserBelongsToManyFollowersEdge]
      # put here your additional connection fields
    }
  `,
});
