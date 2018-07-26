import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type removeFromUserHasManyTodosPayload {
      clientMutationId: String
      viewer: Viewer
      user: User
    }
  `,
});
