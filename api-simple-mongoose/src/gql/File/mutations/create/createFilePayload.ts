import { ModelType, Input, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type createFilePayload {
      clientMutationId: String
      viewer: Viewer
      file: FilesEdge
    }
  `,
});
