import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromFileBelongsToUserInput {
      clientMutationId: String
      user: ID!
      file: ID!
    }
  `,
});
