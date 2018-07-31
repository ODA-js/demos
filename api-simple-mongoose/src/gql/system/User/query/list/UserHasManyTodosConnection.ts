import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type UserHasManyTodosConnection {
      pageInfo: PageInfo!
      edges: [UserHasManyTodosEdge]
      # put here your additional connection fields
    }
  `,
});
