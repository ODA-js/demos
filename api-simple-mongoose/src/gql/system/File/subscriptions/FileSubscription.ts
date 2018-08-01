import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type FileSubscription {
      mutation: MutationKind!
      node: File!
      payload: FileSubscriptionPayload
      updatedFields: [String]
      previous: UpdateFileSubscriptionPayload
    }
  `,
});
