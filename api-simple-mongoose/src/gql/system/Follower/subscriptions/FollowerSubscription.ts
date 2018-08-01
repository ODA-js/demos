import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type FollowerSubscription {
      mutation: MutationKind!
      node: Follower!
      payload: FollowerSubscriptionPayload
      updatedFields: [String]
      previous: FollowerSubscriptionPayload
    }
  `,
});
