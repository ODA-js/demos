import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input FollowerFilterSubscriptions {
      or: [FollowerFilterSubscriptions]
      and: [FollowerFilterSubscriptions]
      mutation: WhereMutationKind
      node: FollowerFilterSubscriptionsItem
      previous: FollowerFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
