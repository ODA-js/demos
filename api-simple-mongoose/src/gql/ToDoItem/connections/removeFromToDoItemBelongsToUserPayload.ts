import { ModelType, Input, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type removeFromToDoItemBelongsToUserPayload {
      clientMutationId: String
      viewer: Viewer
      toDoItem: ToDoItem
    }
  `,
});
