import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateUserSubscriptionPayload {
      id: ID
      userName: String
      password: String
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
      updatedBy: ID
      updatedAt: Date
    }
  `,
});
