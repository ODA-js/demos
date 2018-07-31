import { Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type addToUserBelongsToManyFollowingsPayload {
      clientMutationId: String
      viewer: Viewer
      user: User
    }
  `,
});
