import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type addToToDoItemBelongsToUserPayload {
      clientMutationId: String
      viewer: Viewer
      toDoItem: ToDoItem
    }
  `,
});
