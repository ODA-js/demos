import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromUserHasManyFilesInput {
      clientMutationId: String
      file: ID!
      user: ID!
    }
  `,
});
