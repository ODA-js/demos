import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteFilePayload {
      clientMutationId: String
      viewer: Viewer
      deletedItemId: ID
      file: File
    }
  `,
});
