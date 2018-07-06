import { ModelType, Union } from '../../common';
import gql from 'graphql-tag';

export default new Union({
  type: ModelType.union,
  schema: gql`
    union ToDoItemSubscriptionPayload =
        UpdateToDoItemSubscriptionPayload
      | ToDoItemBelongsToUserSubscriptionPayload
  `,
  resolver: (obj, context, info) => {
    if (
      obj.id ||
      obj.name ||
      obj.description ||
      obj.done ||
      obj.dueToDate ||
      obj.published ||
      obj.updatedBy ||
      obj.updatedAt
    ) {
      return 'UpdateToDoItemSubscriptionPayload';
    }
    if (obj.args && obj.args.toDoItem && obj.args.user) {
      return 'ToDoItemBelongsToUserSubscriptionPayload';
    }
    return null;
  },
});
