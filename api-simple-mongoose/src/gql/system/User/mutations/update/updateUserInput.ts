import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateUserInput {
      id: ID
      userName: String
      password: String
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
      updatedBy: ID
      updatedAt: Date
      todos: [embedToDoItemInput]
      todosUnlink: [embedToDoItemInput]
      todosCreate: [createToDoItemInput]
      files: [embedFileInput]
      filesUnlink: [embedFileInput]
      filesCreate: [createFileInput]
      followings: [embedUserInput]
      followingsUnlink: [embedUserInput]
      followingsCreate: [createUserInput]
      followers: [embedUserInput]
      followersUnlink: [embedUserInput]
      followersCreate: [createUserInput]
    }
  `,
});
