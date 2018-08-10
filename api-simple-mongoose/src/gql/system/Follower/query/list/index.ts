import FollowersEdge from './FollowersEdge';
import FollowersConnection from './FollowersConnection';
import allFollowers from './allFollowers';
import followers from './followers';
import FollowerSortOrder from './FollowerSortOrder';
import FollowerComplexFilter from './FollowerComplexFilter';
import { Schema } from '../../../common';
export default new Schema({
  name: 'Follower.queries.list',
  items: [
    FollowersEdge,
    FollowersConnection,
    allFollowers,
    followers,
    FollowerSortOrder,
    FollowerComplexFilter,
  ],
});
