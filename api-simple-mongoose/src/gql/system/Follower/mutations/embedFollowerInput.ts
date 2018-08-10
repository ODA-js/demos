import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedFollowerInput {
      id: ID
      follower: String
      following: String
    }
  `,
});
