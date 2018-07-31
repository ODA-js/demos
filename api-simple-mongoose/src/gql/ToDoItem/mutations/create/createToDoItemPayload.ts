import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type createToDoItemPayload {
      clientMutationId: String
      viewer: Viewer
      toDoItem: ToDoItemsEdge
    }
  `,
});
