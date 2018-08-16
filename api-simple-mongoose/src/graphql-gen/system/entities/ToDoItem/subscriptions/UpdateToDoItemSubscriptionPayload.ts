import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateToDoItemSubscriptionPayload {
      id: ID
      name: String
      description: String
      done: Boolean
      location: JSON
      file: String
      dueToDate: Date
      published: Boolean
      updatedBy: ID
      updatedAt: Date
    }
  `,
});
