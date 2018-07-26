import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type removeFromFileBelongsToUserPayload {
      clientMutationId: String
      viewer: Viewer
      file: File
    }
  `,
});
