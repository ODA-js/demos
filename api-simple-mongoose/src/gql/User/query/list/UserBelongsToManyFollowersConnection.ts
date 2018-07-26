import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UserBelongsToManyFollowersConnection {
      pageInfo: PageInfo!
      edges: [UserBelongsToManyFollowersEdge]
      # put here your additional connection fields
    }
  `,
});
