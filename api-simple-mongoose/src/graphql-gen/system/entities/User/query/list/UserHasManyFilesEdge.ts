import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type UserHasManyFilesEdge {
      node: File
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
