import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromToDoItemBelongsToUserInput {
      clientMutationId: String
      user: ID!
      toDoItem: ID!
    }
  `,
});
