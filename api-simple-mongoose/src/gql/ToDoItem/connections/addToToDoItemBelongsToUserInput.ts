import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToToDoItemBelongsToUserInput {
      clientMutationId: String
      toDoItem: ID!
      user: ID!
      #additional Edge fields
    }
  `,
});
