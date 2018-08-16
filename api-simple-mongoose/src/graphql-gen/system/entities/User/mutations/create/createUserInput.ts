import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createUserInput {
      id: ID
      userName: String!
      password: String!
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
      updatedBy: ID
      updatedAt: Date
      todos: [embedToDoItemInput]
      files: [embedFileInput]
      followings: [embedUserInput]
      followers: [embedUserInput]
    }
  `,
});
