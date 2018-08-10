import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToUserHasManyTodosInput {
      user: ID!
      toDoItem: ID!
      #additional Edge fields
    }
  `,
});
