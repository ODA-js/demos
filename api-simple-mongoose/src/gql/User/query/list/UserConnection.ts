import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UsersConnection {
      pageInfo: PageInfo!
      edges: [UsersEdge]
      # put here your additional connection fields
    }
  `,
});
