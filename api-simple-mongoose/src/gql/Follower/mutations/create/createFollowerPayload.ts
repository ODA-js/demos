import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type createFollowerPayload {
      clientMutationId: String
      viewer: Viewer
      follower: FollowersEdge
    }
  `,
});
