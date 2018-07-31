import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input deleteFileInput {
      clientMutationId: String
      id: ID
      path: String
    }
  `,
});
