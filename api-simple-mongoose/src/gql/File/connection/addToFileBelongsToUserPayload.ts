import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type addToFileBelongsToUserPayload {
      clientMutationId: String
      viewer: Viewer
      file: File
    }
  `,
});
