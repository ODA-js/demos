import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type ToDoItemSubscription {
      mutation: MutationKind!
      node: ToDoItem!
      payload: ToDoItemSubscriptionPayload
      updatedFields: [String]
      previous: UpdateToDoItemSubscriptionPayload
    }
  `,
});
