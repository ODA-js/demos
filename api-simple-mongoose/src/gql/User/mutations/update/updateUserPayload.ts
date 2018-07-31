import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type updateUserPayload {
      clientMutationId: String
      viewer: Viewer
      user: User
    }
  `,
});
