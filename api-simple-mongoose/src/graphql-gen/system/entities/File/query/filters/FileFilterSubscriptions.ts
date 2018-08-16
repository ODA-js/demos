import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input FileFilterSubscriptions {
      or: [FileFilterSubscriptions]
      and: [FileFilterSubscriptions]
      mutation: WhereMutationKind
      node: FileFilterSubscriptionsItem
      previous: FileFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
