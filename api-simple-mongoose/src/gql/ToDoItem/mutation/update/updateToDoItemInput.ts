import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input updateToDoItemInput {
      clientMutationId: String
      id: ID
      name: String
      description: String
      done: Boolean
      dueToDate: Date
      published: Boolean
      updatedBy: ID
      updatedAt: Date
      user: embedUserInput
      userUnlink: embedUserInput
      userCreate: createUserInput
    }
  `,
});
