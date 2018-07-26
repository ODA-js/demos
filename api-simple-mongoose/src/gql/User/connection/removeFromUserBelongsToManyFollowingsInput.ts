import { ModelType, Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromUserBelongsToManyFollowingsInput {
      clientMutationId: String
      userFollowings: ID!
      user: ID!
    }
  `,
});
