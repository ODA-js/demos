import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteFollowerPayload {
      clientMutationId: String
      viewer: Viewer
      deletedItemId: ID
      follower: Follower
    }
  `,
});
