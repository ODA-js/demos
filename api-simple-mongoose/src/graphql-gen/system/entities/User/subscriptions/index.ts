import User from './User';
import UpdateUserSubscriptionPayload from './UpdateUserSubscriptionPayload';
import UserSubscription from './UserSubscription';
import UserHasManyTodosArgsSubscriptionPayload from './UserHasManyTodosArgsSubscriptionPayload';
import UserHasManyTodosSubscriptionPayload from './UserHasManyTodosSubscriptionPayload';
import UserHasManyFilesArgsSubscriptionPayload from './UserHasManyFilesArgsSubscriptionPayload';
import UserHasManyFilesSubscriptionPayload from './UserHasManyFilesSubscriptionPayload';
import UserBelongsToManyFollowingsArgsSubscriptionPayload from './UserBelongsToManyFollowingsArgsSubscriptionPayload';
import UserBelongsToManyFollowingsSubscriptionPayload from './UserBelongsToManyFollowingsSubscriptionPayload';
import UserBelongsToManyFollowersArgsSubscriptionPayload from './UserBelongsToManyFollowersArgsSubscriptionPayload';
import UserBelongsToManyFollowersSubscriptionPayload from './UserBelongsToManyFollowersSubscriptionPayload';
import UserSubscriptionPayload from './UserSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'User.subscriptions',
  items: [
    User,
    UpdateUserSubscriptionPayload,
    UserSubscription,
    UserHasManyTodosArgsSubscriptionPayload,
    UserHasManyTodosSubscriptionPayload,
    UserHasManyFilesArgsSubscriptionPayload,
    UserHasManyFilesSubscriptionPayload,
    UserBelongsToManyFollowingsArgsSubscriptionPayload,
    UserBelongsToManyFollowingsSubscriptionPayload,
    UserBelongsToManyFollowersArgsSubscriptionPayload,
    UserBelongsToManyFollowersSubscriptionPayload,
    UserSubscriptionPayload,
  ],
});
