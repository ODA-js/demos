import { Type } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type FilesEdge {
      node: File
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
