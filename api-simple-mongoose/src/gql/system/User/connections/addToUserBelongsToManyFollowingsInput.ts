import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToUserBelongsToManyFollowingsInput {
      user: ID!
      userFollowings: ID!
      #additional Edge fields
    }
  `,
});
