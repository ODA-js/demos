import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type createUserPayload {
      clientMutationId: String
      viewer: Viewer
      user: UsersEdge
    }
  `,
});
