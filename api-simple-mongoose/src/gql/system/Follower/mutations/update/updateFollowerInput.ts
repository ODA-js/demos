import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateFollowerInput {
      clientMutationId: String
      id: ID
      follower: String
      following: String
    }
  `,
});
