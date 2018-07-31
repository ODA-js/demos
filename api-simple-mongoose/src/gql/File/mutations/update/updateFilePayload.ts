import { Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type updateFilePayload {
      clientMutationId: String
      viewer: Viewer
      file: File
    }
  `,
});
