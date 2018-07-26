import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type addToUserBelongsToManyFollowersPayload {
      clientMutationId: String
      viewer: Viewer
      user: User
    }
  `,
});
