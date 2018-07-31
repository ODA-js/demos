import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type UserBelongsToManyFollowingsConnection {
      pageInfo: PageInfo!
      edges: [UserBelongsToManyFollowingsEdge]
      # put here your additional connection fields
    }
  `,
});
