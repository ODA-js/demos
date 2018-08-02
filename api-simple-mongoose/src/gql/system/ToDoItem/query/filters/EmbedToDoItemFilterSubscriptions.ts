import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input ToDoItemFilterSubscriptions {
      or: [ToDoItemFilterSubscriptions]
      and: [ToDoItemFilterSubscriptions]
      mutation: WhereMutationKind
      node: ToDoItemFilterSubscriptionsItem
      previous: ToDoItemFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
