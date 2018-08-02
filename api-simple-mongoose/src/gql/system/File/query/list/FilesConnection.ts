import { Type } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type FilesConnection {
      pageInfo: PageInfo!
      edges: [FilesEdge]
      # put here your additional connection fields
    }
  `,
});
