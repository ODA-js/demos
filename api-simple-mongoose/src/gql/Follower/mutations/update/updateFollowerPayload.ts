import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type updateFollowerPayload {
      clientMutationId: String
      viewer: Viewer
      follower: Follower
    }
  `,
});
