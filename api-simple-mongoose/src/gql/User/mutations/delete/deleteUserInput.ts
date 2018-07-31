import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input deleteUserInput {
      clientMutationId: String
      id: ID
      userName: String
    }
  `,
});
