import followers from './followers';
import FollowerComplexFilter from './FollowerComplexFilter';
import FollowerSortOrder from './FollowerSortOrder';
import FollowersConnection from './FollowersConnection';
import FollowersEdge from './FollowersEdge';

import { Schema } from '../../../common';
export default new Schema({
  name: 'Follower.queries.list',
  items: [
    followers,
    FollowerComplexFilter,
    FollowerSortOrder,
    FollowersConnection,
    FollowersEdge,
  ],
});
