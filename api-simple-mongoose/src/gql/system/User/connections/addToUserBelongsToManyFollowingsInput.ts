import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToUserBelongsToManyFollowingsInput {
      clientMutationId: String
      user: ID!
      userFollowings: ID!
      #additional Edge fields
    }
  `,
});
