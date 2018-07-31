import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToFileBelongsToUserInput {
      clientMutationId: String
      file: ID!
      user: ID!
      #additional Edge fields
    }
  `,
});
