import { ModelType, Type } from '../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union FileSubscriptionPayload =
        UpdateFileSubscriptionPayload
      | FileBelongsToUserSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.path || obj.filename || obj.mimetype || obj.encoding) {
        return 'UpdateFileSubscriptionPayload';
      }
      if (obj.args && obj.args.file && obj.args.user) {
        return 'FileBelongsToUserSubscriptionPayload';
      }
      return null;
    },
  },
});
