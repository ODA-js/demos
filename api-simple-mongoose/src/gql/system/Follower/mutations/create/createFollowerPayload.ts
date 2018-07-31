import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type createFollowerPayload {
      clientMutationId: String
      viewer: Viewer
      follower: FollowersEdge
    }
  `,
});
