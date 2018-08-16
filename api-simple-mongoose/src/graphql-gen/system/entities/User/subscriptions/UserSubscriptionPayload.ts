import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union UserSubscriptionPayload =
        UpdateUserSubscriptionPayload
      | UserHasManyTodosSubscriptionPayload
      | UserHasManyFilesSubscriptionPayload
      | UserBelongsToManyFollowingsSubscriptionPayload
      | UserBelongsToManyFollowersSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.userName ||
        obj.password ||
        obj.isAdmin ||
        obj.isSystem ||
        obj.enabled ||
        obj.updatedBy ||
        obj.updatedAt
      ) {
        return 'UpdateUserSubscriptionPayload';
      }
      if (obj.args && obj.args.user && obj.args.toDoItem) {
        return 'UserHasManyTodosSubscriptionPayload';
      }
      if (obj.args && obj.args.user && obj.args.file) {
        return 'UserHasManyFilesSubscriptionPayload';
      }
      if (obj.args && obj.args.user && obj.args.userFollowings) {
        return 'UserBelongsToManyFollowingsSubscriptionPayload';
      }
      if (obj.args && obj.args.user && obj.args.userFollowers) {
        return 'UserBelongsToManyFollowersSubscriptionPayload';
      }
      return null;
    },
  },
});
