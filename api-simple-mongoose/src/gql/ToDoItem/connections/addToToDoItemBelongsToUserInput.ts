import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input addToToDoItemBelongsToUserInput {
      clientMutationId: String
      toDoItem: ID!
      user: ID!
      #additional Edge fields
    }
  `,
});
