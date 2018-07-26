import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromUserHasManyTodosInput {
      clientMutationId: String
      toDoItem: ID!
      user: ID!
    }
  `,
});
