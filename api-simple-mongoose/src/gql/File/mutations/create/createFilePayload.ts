import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type createFilePayload {
      clientMutationId: String
      viewer: Viewer
      file: FilesEdge
    }
  `,
});
