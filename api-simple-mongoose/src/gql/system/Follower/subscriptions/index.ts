import Follower from './Follower';
import FollowerSubscriptionPayload from './FollowerSubscriptionPayload';
import FollowerSubscription from './FollowerSubscription';
import { Schema } from '../../common';

export default new Schema({
  name: 'Follower.subscriptions',
  items: [Follower, FollowerSubscriptionPayload, FollowerSubscription],
});
