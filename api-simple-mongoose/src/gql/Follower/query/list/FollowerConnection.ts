import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type FollowersConnection {
      pageInfo: PageInfo!
      edges: [FollowersEdge]
      # put here your additional connection fields
    }
  `,
});
