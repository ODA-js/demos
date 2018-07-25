import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateToDoItemSubscriptionPayload {
      id: ID
      name: String
      description: String
      done: Boolean
      dueToDate: Date
      published: Boolean
      location: JSON
      file: [Upload!]
      updatedBy: ID
      updatedAt: Date
    }
  `,
});
