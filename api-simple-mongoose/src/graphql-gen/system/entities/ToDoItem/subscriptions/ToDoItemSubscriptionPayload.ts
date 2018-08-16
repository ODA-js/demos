import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union ToDoItemSubscriptionPayload =
        UpdateToDoItemSubscriptionPayload
      | ToDoItemBelongsToUserSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.name ||
        obj.description ||
        obj.done ||
        obj.location ||
        obj.file ||
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
  },
});
