import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createToDoItemInput {
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
