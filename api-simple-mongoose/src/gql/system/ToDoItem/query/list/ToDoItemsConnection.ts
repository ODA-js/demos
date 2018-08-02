import { Type } from '../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type ToDoItemsConnection {
      pageInfo: PageInfo!
      edges: [ToDoItemsEdge]
      # put here your additional connection fields
    }
  `,
});
