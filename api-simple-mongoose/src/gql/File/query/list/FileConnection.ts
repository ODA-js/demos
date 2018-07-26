import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type FilesConnection {
      pageInfo: PageInfo!
      edges: [FilesEdge]
      # put here your additional connection fields
    }
  `,
});
