import EmbedFollowerFilter from './EmbedFollowerFilter';
import EmbedFollowerFilterItem from './EmbedFollowerFilterItem';
import FollowerFilter from './FollowerFilter';
import FollowerFilterItem from './FollowerFilterItem';
import FollowerFilterSubscriptions from './FollowerFilterSubscriptions';
import FollowerFilterSubscriptionsItem from './FollowerFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Follower.queries.filter',
  items: [
    FollowerFilterItem,
    FollowerFilter,
    FollowerFilterSubscriptionsItem,
    FollowerFilterSubscriptions,
    EmbedFollowerFilter,
    EmbedFollowerFilterItem,
  ],
});
