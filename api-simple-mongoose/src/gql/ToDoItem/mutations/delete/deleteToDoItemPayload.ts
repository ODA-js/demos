import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteToDoItemPayload {
      clientMutationId: String
      viewer: Viewer
      deletedItemId: ID
      toDoItem: ToDoItem
    }
  `,
});
