import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UserHasManyFilesConnection {
      pageInfo: PageInfo!
      edges: [UserHasManyFilesEdge]
      # put here your additional connection fields
    }
  `,
});
