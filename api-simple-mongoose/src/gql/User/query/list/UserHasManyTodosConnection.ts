import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UserHasManyTodosConnection {
      pageInfo: PageInfo!
      edges: [UserHasManyTodosEdge]
      # put here your additional connection fields
    }
  `,
});
