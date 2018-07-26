import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  type: ModelType.input,
  schema: gql`
    input createToDoItemInput {
      clientMutationId: String
      id: ID
      name: String
      description: String
      done: Boolean
      location: JSON
      file: String
      dueToDate: Date
      published: Boolean
      updatedBy: ID
      updatedAt: Date
      user: embedUserInput
    }
  `,
});
