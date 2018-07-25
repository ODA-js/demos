import { ModelType, Input, Type } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input removeFromToDoItemBelongsToUserInput {
      clientMutationId: String
      user: ID!
      toDoItem: ID!
    }
  `,
});
