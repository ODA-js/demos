import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createFileInput {
      id: ID
      path: String!
      filename: String
      mimetype: String
      encoding: String
      user: embedUserInput
    }
  `,
});
