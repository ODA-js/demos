import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateFileSubscriptionPayload {
      id: ID
      path: String
      filename: String
      mimetype: String
      encoding: String
    }
  `,
});
