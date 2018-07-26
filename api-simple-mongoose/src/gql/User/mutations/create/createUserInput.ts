import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input createUserInput {
      clientMutationId: String
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
