import { Input } from '../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToUserBelongsToManyFollowersInput {
      user: ID!
      userFollowers: ID!
      #additional Edge fields
    }
  `,
});
