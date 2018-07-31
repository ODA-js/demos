import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteUserPayload {
      clientMutationId: String
      viewer: Viewer
      deletedItemId: ID
      user: User
    }
  `,
});
