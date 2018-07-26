import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type removeFromUserBelongsToManyFollowingsPayload {
      clientMutationId: String
      viewer: Viewer
      user: User
    }
  `,
});
