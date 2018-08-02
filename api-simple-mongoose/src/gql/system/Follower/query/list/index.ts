import FollowersEdge from './FollowersEdge';
import FollowersConnection from './FollowersConnection';
import followers from './followers';
import FollowerSortOrder from './FollowerSortOrder';
import FollowerComplexFilter from './FollowerComplexFilter';
import { Schema } from '../../../common';
export default new Schema({
  name: 'Follower.queries.list',
  items: [
    FollowersEdge,
    FollowersConnection,
    followers,
    FollowerSortOrder,
    FollowerComplexFilter,
  ],
});
