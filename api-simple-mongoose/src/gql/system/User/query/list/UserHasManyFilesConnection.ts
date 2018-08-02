import { Type } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type UserHasManyFilesConnection {
      pageInfo: PageInfo!
      edges: [UserHasManyFilesEdge]
      # put here your additional connection fields
    }
  `,
});
