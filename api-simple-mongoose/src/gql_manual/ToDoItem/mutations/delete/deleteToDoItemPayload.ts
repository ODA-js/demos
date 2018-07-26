import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type deleteToDoItemPayload {
      clientMutationId: String
      viewer: Viewer
      deletedItemId: ID
      toDoItem: ToDoItem
    }
  `,
});
