import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromUserBelongsToManyFollowersInput {
      clientMutationId: String
      userFollowers: ID!
      user: ID!
    }
  `,
});
